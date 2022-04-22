import React, { useState, useContext, useEffect } from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';
import './_style.scss';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';

import { AppContext } from '../../../services/providers/app-context';
import { useHistory } from 'react-router-dom';
import DynamicInput from '../DynamicInput/DynamicInput';

import api from "../../../services/api-calls/all"

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


const getDefaultValues = fields => {
  return fields.map(field => field.name).reduce(
    (prev, current) => prev? {...prev, [current]: ''} : {[current]: ''},
    {}
  );
}


const CredentialForm = ({ template, subject }) => {
  const { saveCredential } = api();
  const history = useHistory();
  const [fields, setFields] = useState([]);
  const { setAppState } = useContext(AppContext);


  /* TODO: Buscar los campos del template desde el back, pero para renderizar por ahora nos sirve */
  useEffect(() => {
    setFields(template.fields);
  }, [template])

  
  const goToCredentials = defaultActiveTabKey => {
    setAppState({ defaultActiveTabKey });
    history.push('/credentials');
  };

  const goBack = () => {
    history.goBack();
  };

  const initialValues = {
    ...getDefaultValues(template.fields),
    nombre: `${subject?.firstname || ''} ${subject?.lastname || ''}`,
    dni: `${subject?.dni || ''}`,
    /* fechanacimiento: "",  moment(new Date(1990, 3, 17), "DD/MM/YYYY"), no contamos con este dato*/
  }


  return (

    <Container>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting }) => {
          console.log(`handle submit!`, values);

          await saveCredential({
            ...values,
            subject: subject?._id,
            template: template?._id
          });          

          setSubmitting(false);
          goToCredentials();
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
            {fields?.map((field, idx) => (
              <InputContainer key={idx}>
                {field.type !== "Boolean" && field.label}

                <DynamicInput
                  field={field}
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  setFieldValue={setFieldValue}
                />
              </InputContainer>
            ))}

            <FormButtons>

              <ButtonPrimary
                disabled={isSubmitting} 
                type="submit"
                text="Guardar"
                theme={`ThemePrimary ${isSubmitting ? "disabled" : ""}`}
              />
            </FormButtons>

          </form>
        )}



      </Formik>
    </Container >

  );
};

export default CredentialForm;


