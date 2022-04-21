import React, { useState, useContext, useEffect } from 'react';
import { Input, DatePicker, Checkbox } from 'antd';


const DynamicInput = ({ field, ...props }) => {

  let input = null; /* De alguna forma vamos a necesitar un ref y los valores ingresados*/
  switch (field.type) {
    case "String": {
      input = (
        <Input
          name={field.name}
          type="text"
          placeholder={field.description}
          {...props}
        />
      );
      break;
    }
    case "Date": {
      input = (
        <DatePicker
          name={field.name}
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
          {...props}
        />
      );
      break;
    }
    case "Boolean": {
      input = (
        <Checkbox
          name={field.name}
          onChange={e => console.log(e)}
          {...props}
        >{field.label}</Checkbox>
      );
      break;
    }
    case "Checkbox": {
      input = (
        <>
          {field.options.map(opt => (
            <Checkbox
              key={opt.name}
              name={`${field.name}-${opt.name}`}
              onChange={e => console.log(e)}
            >{opt.label}</Checkbox>
          ))}
        </>
      );
      break;
    }
    case "Paragraph": {
      input = (
        <Input.TextArea
          name={field.name}
          type=""
          placeholder={field.description}
          {...props}
        />
      );
      break;
    }
  }

  return input;
}
export default DynamicInput;