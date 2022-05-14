import React, { useState, useContext, useEffect } from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';
import './_style.scss';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';

import { AppContext } from '../../../services/providers/app-context';
import { useHistory } from 'react-router-dom';
import DynamicInput from '../DynamicInput/DynamicInput';

import api from "../../../services/api-calls/all"
import DidiBackend from '../../../services/api-calls/DidiBackend';

const Container = styled.div`
  flex: 1;
  max-width: 550px; /* Add media query */
  box-sizing: border-box;
  padding: 35px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: rgba(255,255,255,0.75);
  align-self: center;
  border-radius: 12px;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0px;
`

const FormButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 30px 10px 0px;
`

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.03rem;
`

const getDefaultValues = fields => {
  return fields?.map(field => ({ name: field.name, value: field?.defaultValue || '' })).reduce(
    (prev, current) => prev ? { ...prev, [current.name]: current.value } : { [current.name]: current.value },
    {}
  );
}


const getDataFromFields = (credentialName, fields, values) => {
  let certFields = fields.filter(f => f.section === "cert").map(f => ({ name: f.name, value: values[f.name] }));
  const participantFields = fields.filter(f => f.section === "participant").map(f => ({ name: f.name, value: values[f.name] }));
  const othersFields = fields.filter(f => f.section === "others").map(f => ({ name: f.name, value: values[f.name] }));

  certFields = [{ name: "CREDENCIAL", value: credentialName }, ...certFields];

  return {
    "cert": certFields,
    "participant": [participantFields],
    "others": othersFields,
  }
}


const CredentialForm = ({ template, subject }) => {
  const { saveCredential } = api();
  const history = useHistory();
  const [fields, setFields] = useState([]);
  const [credentialName, setCredentialName] = useState("");
  const [thereAreErrors, setThereAreErrors] = useState(false);

  const { setAppState } = useContext(AppContext);



  useEffect(() => {
    if (template?.data) {

      //getFieldsFromTemplate
      const credentialName = template?.data?.cert?.filter(field => field.name === "CREDENCIAL")[0].defaultValue;
      const certFields = template?.data?.cert?.filter(field => field.name !== "CREDENCIAL").map(field => ({ ...field, section: "cert" }));
      const participantFields = template?.data?.participant.map(field => ({ ...field, section: "participant" }))
      const othersFields = template?.data?.others.map(field => ({ ...field, section: "others" }))

      setCredentialName(credentialName);


      setFields([
        ...certFields,
        ...participantFields, //a los valores para estos campos los vamos a sacar del subject, y deberian ser de solo lectura
        ...othersFields,
      ]);

    }
  }, [template])


  const goToCredentials = defaultActiveTabKey => {
    setAppState({ defaultActiveTabKey });
    history.push('/credentials');
  };

  const initialValues = {
    ...getDefaultValues(fields),
    DID: subject?.did,
    NOMBRE: subject?.firstname,
    APELLIDO: subject?.lastname,
    DNI: `${subject?.dni || ''}`,
  }


  return (

    <Container>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validateOnChange={thereAreErrors}
        validateOnBlur={thereAreErrors}
        validate={(values) => {
          const errors = {};
          fields.filter(f => f.required).map(f => f.name).forEach(fieldName => {
            if(!values[fieldName] || (typeof values[fieldName] === "string" && values[fieldName]?.trim() === "")){
              errors[fieldName] = "Requerido";
            }
          });

          setThereAreErrors(Object.keys(errors).length > 0);

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(`handle submit!`, values);

          //Moverlo a una function getDataFromFields
          const data = getDataFromFields(credentialName, fields, values);

          //console.log(data);
          return;
          const result = await DidiBackend().credentials.create({
            data: JSON.stringify(data),
            split: false,
            microCredentials: [],
            templateId: template._id
          })

          console.log(result)

          //tener en cuenta que si el subject no tiene did podriamos crear una precredencial para emitir despues una vez que tengamos el did
          /* 
                    await saveCredential({
                      ...values,
                      subject: subject?._id,
                      template: template?._id
                    });
          
                    setSubmitting(false);
                    goToCredentials(); */
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <Title>
              {credentialName}
            </Title>


            {fields?.map((field, idx) => (
              <InputContainer key={idx}>
                {field.type !== "Boolean" && field.name} {field.required && `*`}

                <DynamicInput
                  field={field}
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  error={errors[field.name]}
                />
              </InputContainer>
            ))}

            <FormButtons>

              <ButtonPrimary
                disabled={isSubmitting || Object.keys(errors).length > 0}
                type="submit"
                text="Guardar"
                theme={`ThemePrimary ${isSubmitting || Object.keys(errors).length > 0 ? "disabled" : ""}`}
              />
            </FormButtons>

          </form>
        )}



      </Formik>
    </Container >

  );
};

export default CredentialForm;


