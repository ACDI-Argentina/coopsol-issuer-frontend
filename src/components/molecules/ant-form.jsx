import React, { useState, useImperativeHandle } from 'react';
import { Form } from 'antd';
import ReCAPTCHA from 'react-google-recaptcha';
import PropTypes from 'prop-types';
import ButtonLogin from '../atoms/ButtonLogin/button-login';
import { inputRenderer } from '../../utils/form-helper';
const { useForm } = Form;

const AntForm = React.forwardRef((p, r) => {
  const {
    handleSubmit,
    handleErrorSubmit,
    inputs,
    submitText,
    submitTheme,
    disabled,
    noSubmitButton,
    RECAPTCHA_SITE_KEY,
    resetOnSubmit,
    topSubmitButton,
    initialValues,
    labelCol,
    wrapperCol
  } = p;

  const [submittedCount, setSubmittedCount] = useState(0);
  const [captchaResult, setCaptchaResult] = useState();
  const [captchaWarning, setCaptchaWarning] = useState(false);
  const [form] = useForm();

  const formItems = inputRenderer(inputs, form, submittedCount);

  const onSubmit = toSubmitData => {
    if (resetOnSubmit) form.resetFields();
    handleSubmit(toSubmitData);
  };

  const processEventValues = values => {
    setSubmittedCount(submittedCount + 1);
    if (RECAPTCHA_SITE_KEY && !captchaResult) return setCaptchaWarning(true);
    setCaptchaWarning(false);
    onSubmit({ ...values, captchaResult });
  };

  const preSubmit = () => {
    const validCaptcha = !(RECAPTCHA_SITE_KEY && !captchaResult);
    setSubmittedCount(submittedCount + 1);
    // eslint-disable-next-line no-unused-expressions
    validCaptcha ? setCaptchaWarning(false) : setCaptchaWarning(true);
    return { validCaptcha, captchaResult };
  };

  useImperativeHandle(r, () => ({
    form,
    preSubmit
  }));

  const submitButton = () => {
    return !noSubmitButton ? (
      <div>
        <Form.Item>
          <ButtonLogin
            type="primary"
            htmlType="submit"
            text={submitText}
            disabled={disabled}
            theme={submitTheme}
          />
        </Form.Item>
      </div>
    ) : (
      undefined
    );
  };

  return (
    <Form
      onFinish={processEventValues}
      onFinishFailed={handleErrorSubmit}
      colon={false}
      form={form}
      initialValues={initialValues}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
    >
      {topSubmitButton && submitButton()}
      {formItems}
      {RECAPTCHA_SITE_KEY && (
        <div className="captcha">
          <Form.Item>
            <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={value => setCaptchaResult(value)} />
            {captchaWarning && <p className="CaptchaText">*Complete la verificacion por captcha</p>}
          </Form.Item>
        </div>
      )}

      {!topSubmitButton && submitButton()}
    </Form>
  );
});

AntForm.propTypes = {
  disabled: PropTypes.bool,
  handleErrorSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  inputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  noSubmitButton: PropTypes.bool,
  recaptchaSiteKey: PropTypes.string,
  resetOnSubmit: PropTypes.bool,
  submitButtonClass: PropTypes.string,
  submitText: PropTypes.string,
  submitTheme: PropTypes.string,
  topSubmitButton: PropTypes.bool
};

AntForm.defaultProps = {
  submitButtonClass: 'buttonSection',
  noSubmitButton: false,
  disabled: false,
  submitText: 'aceptar',
  submitTheme: undefined,
  handleErrorSubmit: () => {},
  handleSubmit: () => {},
  RECAPTCHA_SITE_KEY: undefined,
  resetOnSubmit: false,
  topSubmitButton: false
};

export default AntForm;
