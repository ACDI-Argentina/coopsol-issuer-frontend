
import { Input, Select } from 'antd';
import { Formik } from 'formik';
import styled from 'styled-components';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';
import { CoopsolBackend } from 'services/di';
const { Option } = Select;


const FormWrapper = styled.div`
  display: flex;  
  width: 100%;
  
`
const FormContainer = styled.div`
  flex: 1;
  padding: 0px 15px;
`
const ButtonContainer = styled.div`
  display:flex;
  justify-content: flex-end;
  margin-top: 30px;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.7rem 0px;
`

const UserForm = ({ user, onSuccess }) => {

  const initialValues = {
    name: user?.name,
  }

  return (
    <FormWrapper>
      <FormContainer>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={async (values, { setSubmitting }) => {
            console.log(`handle submit!`, values);
            let result;
            if (user?._id) {
              console.log(`Update user`)
              result = await CoopsolBackend().users().update(user?._id, values);

            } else {
              console.log(`create user`)
              result = await CoopsolBackend().users().create(values);
            }
            typeof onSuccess === "function" && onSuccess(result);
            console.log(result);

          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldValue,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>

              <InputContainer>
                Nombre
                <Input
                  type="text"
                  name="name"
                  value={values["name"]}
                  onChange={handleChange} />
              </InputContainer>

              <InputContainer> {/* Solo en el alta */}
                Email
                <Input
                  type="text"
                  name="email"
                  value={values["email"]}
                  onChange={handleChange} />
              </InputContainer>

              <InputContainer> {/* Solo en el alta */}
                Contraseña
                <Input.Password
                  type="text"
                  name="password"
                  value={values["password"]}
                  onChange={handleChange} />
              </InputContainer>

              <InputContainer>
                Roles
                <Select
                  style={{ width: "100%" }}
                  mode="multiple"
                  allowClear
                  value={values.roles}
                  onChange={roles => setFieldValue("roles", roles)}

                >
                  <Option key="BASIC" value="BASIC">BASIC</Option>
                  <Option key="ADMIN" value="ADMIN">ADMIN</Option>
                </Select>
              </InputContainer>

              <ButtonContainer>
                <ButtonPrimary
                  disabled={isSubmitting}
                  type="submit"
                  text="Guardar"
                  theme={`ThemePrimary ${isSubmitting ? "disabled" : ""}`}
                />
              </ButtonContainer>
            </form>
          )}

        </Formik>

      </FormContainer>
    </FormWrapper>
  )
}
export default UserForm;