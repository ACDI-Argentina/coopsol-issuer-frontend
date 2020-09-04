import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const TextAreaComments = ({ onChange }) => {
  return <TextArea autoSize={{ minRows: 3, maxRows: 3 }} onChange={onChange} />;
};

export default TextAreaComments;
