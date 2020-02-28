import React from 'react';
import { Form, Input, Icon, Slider, InputNumber } from 'antd';
import { iconColor } from './inputs-formats';

const AntComponentTranslator = {
  [undefined]: Input,
  Text: Input.TextArea,
  Number: InputNumber,
  Slider
};

export const inputRenderer = (inputs, form, submittedCount) => {
  const { getFieldDecorator } = form;
  return inputs.map(({ formItem, ...input }) => {
    const {
      prefixOptions,
      prefixDefaultValue,
      classNameDiv,
      name,
      key,
      rules,
      initialValue,
      label,
      toolTip,
      iconType,
      component,
      hasFeedback,
      title,
      extra,
      ...inputProperties
    } = input;

    const AntComponent = AntComponentTranslator[component];

    const touched = form.touched && form.touched[name];
    const hasError = form.errors && form.errors[name];
    const touchedError = hasError && touched;

    const prefix = () =>
      iconType ? <Icon type={iconType} style={{ color: iconColor }} /> : undefined;

    if (component === 'customDiv')
      return (
        <div className={classNameDiv} key={key}>
          <h2>{title}</h2>
        </div>
      );
    return (
      <div className={classNameDiv} key={key}>
        <Form.Item
          key={key}
          {...formItem}
          label={
            toolTip ? (
              <span>
                {label} &nbsp;
                {toolTip}
              </span>
            ) : (
              label
            )
          }
          hasFeedback={(hasFeedback && submittedCount) || (hasFeedback && touched)}
          help={submittedCount || touchedError ? hasError : false}
          extra={extra}
        >
          {getFieldDecorator(name, { rules, initialValue })(
            <AntComponent {...inputProperties} />
          )}
        </Form.Item>
      </div>
    );
  });
};
