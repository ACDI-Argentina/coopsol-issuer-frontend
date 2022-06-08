import { Typography } from 'antd';
import React, { useState, useContext, useEffect } from 'react';
import { Input, DatePicker, Checkbox } from 'antd';
const { Text } = Typography;

const DynamicInput = ({ field, onChange, setFieldValue, value, error, ...props }) => {

  let input = null;

  switch (field.type) {
    case "Text":
    case "String": {
      input = (
        <Input
          name={field.name}
          type="text"
          placeholder={field.description}
          value={value}
          onChange={onChange}
          status={error ? "error" : ""}
          {...props}
        />
      );
      break;
    }
    case "Paragraph": {
      input = (
        <Input.TextArea
          name={field.name}
          type="text"
          placeholder={field.description}
          value={value}
          onChange={onChange}
          status={error ? "error" : ""}
          {...props}
        />
      );
      break;
    }
    case "Number": {
      input = (
        <Input
          name={field.name}
          type="number"
          placeholder={field.description}
          value={value}
          onChange={onChange}
          status={error ? "error" : ""}
          {...props}
        />
      );
      break;
    }
    case "Date": {
      input = (
        <DatePicker
          name={field.name}
          format="DD/MM/YYYY"
          status={error ? "error" : ""}
          onChange={(date, dateString) => {
            typeof setFieldValue === "function" && setFieldValue(field.name, date.toISOString());
            typeof onChange === "function" && onChange({ target: { value: dateString } });
          }}
          {...props}
        />
      );
      break;
    }
    case "Boolean": {
      input = (
        <Checkbox
          name={field.name}
          checked={value}
          onChange={ev => {
            typeof setFieldValue === "function" && setFieldValue(field.name, ev.target.checked);
          }}
          {...props}
        >{field.name}</Checkbox>
      );
      break;
    }
    case "Checkbox": {
      input = (
        <Checkbox.Group
          value={value}
          onChange={selection => typeof setFieldValue === "function" && setFieldValue(field.name, selection)}
          options={field.options}
        />
      );
      break;
    }

  }

  return (
    <>
      {input}
      {error && (<Text type="danger">{error}</Text>)}
    </>
  );
}
export default DynamicInput;