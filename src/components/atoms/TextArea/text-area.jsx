import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const TextAreaComments = () => {
  return <TextArea autoSize={{minRows: 3, maxRows: 3}}/>;
};

export default TextAreaComments;
