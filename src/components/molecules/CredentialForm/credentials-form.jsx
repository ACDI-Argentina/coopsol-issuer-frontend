import React, { useState, useContext, useEffect } from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';
import './_style.scss';

import { AppContext } from '../../../services/providers/app-context';
import { useHistory } from 'react-router-dom';
import DynamicInput from '../DynamicInput/DynamicInput';

import DidiBackend from '../../../services/didi/DidiBackend';
import { message } from 'antd';
import ButtonAntd from '../../atoms/ButtonAntd/ButtonAntd';
import { logAction } from '../../../services/api-calls/logs';


/* const Values = styled.div`
  border: 2px solid red;
  position: absolute;
  z-index: 2;
  left: 50px;
  background-color:white;
  max-width: 400px;
  padding: 20px;

` */

const Container = styled.div`
  flex: 1;
  max-width: 550px; /* Add media query */
  box-sizing: border-box;
  padding: 35px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: rgba(255,255,255,0.75);
  align-self: center;
  border-radius: 12px;

  .ant-checkbox-wrapper{
    margin-left: 8px;
  }
  
  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
  }
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

  const formatField = field => {
    let value = values[field.name];

    if (field.type === "Boolean") {
      value = value ? value.toString() : "false";
    }

    if (field.type === "Checkbox") {
      console.log(value.toString()); //Revisar si esto debe pasarse asi
      value = value ? value.toString() : "false";
    }

    if (field.type === "Date") {
      const rawValue = values[field.name]; 
      const newTs = new Date(rawValue).setUTCHours(12, 0, 0, 0, 0);
      const formattedValue = new Date(newTs).toISOString();
      value = formattedValue;
    }

    return {
      name: field.name,
      value: value
    }
  }


  let certFields = fields.filter(f => f.section === "cert").map(formatField);
  const participantFields = fields.filter(f => f.section === "participant").map(formatField);
  const othersFields = fields.filter(f => f.section === "others").map(formatField);

  certFields = [{ name: "CREDENCIAL", value: credentialName }, ...certFields];

  return {
    "cert": certFields,
    "participant": [participantFields],
    "others": othersFields,
  }
}


const CredentialForm = ({ template, subject }) => {

  const history = useHistory();
  const [fields, setFields] = useState([]);
  const [credentialName, setCredentialName] = useState("");
  const [thereAreErrors, setThereAreErrors] = useState(false);

  const { setAppState } = useContext(AppContext);

  useEffect(() => {

  }, [])

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

  const validate = (values) => {
    const errors = {};
    fields.filter(f => f.required).map(f => f.name).forEach(fieldName => {
      if (!values[fieldName] || (typeof values[fieldName] === "string" && values[fieldName]?.trim() === "")) {
        errors[fieldName] = "Requerido";
      }
    });

    setThereAreErrors(Object.keys(errors).length > 0);

    return errors;
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const data = getDataFromFields(credentialName, fields, values);

      console.log(data)
      setSubmitting(true);
      const result = await new DidiBackend().credentials().create({
        data: JSON.stringify(data),
        split: false,
        microCredentials: [],
        templateId: template._id
      })
      if (result.status === "success") {
        message.success(`Credencial creada exitosamente`);
        setSubmitting(false);
        logAction("CREDENTIAL_CREATION", { credential: result.data[0] });
        return goToCredentials();
      } else {
        message.error(`Ha ocurrido un error al crear la credencial, intente nuevamente`);
      }
      setSubmitting(false);

    } catch (err) {
      setSubmitting(false);
      console.log(err);
    }
  }

  //tener en cuenta que si el subject no tiene did podriamos crear una precredencial para emitir despues una vez que tengamos el did
  /* 
      await saveCredential({
        ...values,
        subject: subject?._id,
        template: template?._id
      });

      setSubmitting(false);
      goToCredentials(); */


  return (

    <Container>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validateOnChange={thereAreErrors}
        validateOnBlur={thereAreErrors}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          submitForm
        }) => (

          <>
            {/*          

        Form values inspector

          <div style={{
              border: "2px solid red",
              position: "absolute",
              backgroundColor: "rgba(255,255,255,0.9)",
              left: 0,
              top: 0,
              maxWidth: "800px",
              padding: "50px"
            }}>
              <pre>
                {JSON.stringify(values, null, 3)}
              </pre>
            </div>
 */}

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
                <ButtonAntd
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                  type="submit"
                  loading={isSubmitting}
                  onClick={submitForm}
                >
                  Guardar
                </ButtonAntd>


              </FormButtons>

            </form>
          </>
        )}



      </Formik>
    </Container >

  );
};

export default CredentialForm;


