import { useState } from 'react';

import TitlePage from 'components/atoms/TitlePage/title-page';
import { useHistory } from 'react-router-dom';
import './_style.scss';

import { Input, message } from 'antd';
import { useFormik } from 'formik';
import { CoopsolBackend } from 'services/di';

const Settings = ({ }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({

    initialValues: {
      newPassword: '',
      repeatNewPassword: '',
    },
    validateOnBlur: true, 
    validateOnChange: false, 
    validate: (values) => {
      let errors = {};
      
      const { newPassword, repeatNewPassword } = values;

      if(newPassword.length === 0 && repeatNewPassword.length === 0){
        return {};
      }

      if(newPassword.length < 6){
        errors.newPassword = "Las contraseña debe tener 6 caracteres como mínimo"
      }

      if (newPassword !== repeatNewPassword) { 
        errors.repeatNewPassword = "Las contraseñas no coinciden"
        
      }
      console.log(`Validate `, values, errors)
      return errors;
    },

    

    onSubmit: async  values => {

      /* Check passwords? y mandarle un minlenght de 6 */
      /* Podemos acceder al ctx para la fn de cambiar contrease;a */
      try{
        setLoading(true); 
        const results = await CoopsolBackend().changePassword(values);
        console.log(results);
        message.success("Contraseña actualizada con éxito");

      } catch(err){
        message.error("Ha ocurrido un error al intentar actualizar la contraseña");
      }
      setLoading(false);
    },

  });

  return (
    <div className="Settings">
      <TitlePage
        history={history}
        text="Configuración"
      />

      <div className="Settings-content">

        <h3>Cambiar Contraseña</h3>
        <div className="Settings-form-wrapper">
          <div className="Settings-form-container">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label>Contraseña anterior</label>
                <Input.Password
                  name="prev-password"
                  placeholder="Basic usage"
                  value="12345678"
                  visibilityToggle={false}
                />
              </div>
              <div className="form-group">
                <label>Nueva contraseña</label>
                <Input.Password
                  id="newPassword"
                  name="newPassword"
                  onChange={formik.handleChange}
                  value={formik.values.newPassword}
                  status={formik.errors.newPassword? "error": ""}
                  onBlur={formik.handleBlur}
                />
                <div className="ant-form-item-explain-error">{formik.errors.newPassword}</div>
              </div>
              <div className="form-group">
                <label>Confirmar nueva contraseña</label>
                <Input.Password
                  id="repeatNewPassword"
                  name="repeatNewPassword"
                  onChange={formik.handleChange}
                  value={formik.values.repeatNewPassword}
                  status={formik.errors.repeatNewPassword? "error": ""}
                  onBlur={formik.handleBlur}
                />
                <div className="ant-form-item-explain-error">{formik.errors.repeatNewPassword}</div>
                
              </div>
              <button style={{
                backgroundColor: "#333333",
                color: "#cecece",
                padding: "10px",
                margin: "10px 0px",
                borderRadius: "4px",
                cursor: "pointer"

              }}>Actualizar contraseña</button>

            </form>
          </div>

        </div>
      </div>

    </div>
  )
}
export default Settings;