import React from 'react';
import { Form, Input, Slider, InputNumber } from 'antd';

const AntComponentTranslator = {
  [undefined]: Input,
  Text: Input.TextArea,
  Number: InputNumber,
  Slider
};

export const inputRenderer = (inputs, form, submittedCount) => {
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

    if (component === 'customDiv')
      return (
        <div className={classNameDiv} key={key}>
          <h2>{title}</h2>
        </div>
      );
    return (
      <div className={classNameDiv} key={key}>
        <Form.Item rules={rules} label={label} name={name} extra={extra}>
          {<AntComponent {...inputProperties} />}
        </Form.Item>
      </div>
    );
  });
};
