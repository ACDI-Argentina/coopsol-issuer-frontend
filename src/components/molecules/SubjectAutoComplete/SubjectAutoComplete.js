import React, { useState } from 'react';
import { AutoComplete } from 'antd';
import { SafetyCertificateFilled } from '@ant-design/icons'
import api from "../../../services/api-calls/all";
import styled from 'styled-components';
import CoopsolBackend from 'services/api-calls/CoopsolBackend';

const { Option } = AutoComplete;

const DidIndicator = styled.div`
  position: absolute;
  top:5px;
  right:5px;
`

const SubjectAutoComplete = ({ onSubjectSelect }) => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const onSearch = async (searchText) => {
    
    const lSearchText = searchText.toLowerCase();
    if (!lSearchText) return setOptions([]);

    //usar un timer para el throtle
    const results = await CoopsolBackend().producers().search(searchText);
    if (results) {
      setOptions(results);
    }
  };
  const onSelect = (subjectId) => {
    const subject = options.filter(s => s._id === subjectId)[0];
    if (!subject) return;
    const data = subject;

    typeof onSubjectSelect === "function" && onSubjectSelect(data);
    setValue(`${subject.lastname}, ${subject.firstname}`);
  };
  const onChange = (data) => {
    if (data === "") {
      typeof onSubjectSelect === "function" && onSubjectSelect(undefined);
    }
    setValue(data);
  };

  return (
    <AutoComplete
      value={value}
      style={{ width: 264 }}
      onSelect={onSelect}
      onSearch={onSearch}
      onChange={onChange}
      placeholder="DNI o nombre"
    >
      {options.map(subject => (
        <Option key={subject._id} value={subject._id}>
          <div>{`${subject.lastname}, ${subject.firstname}`}</div>
          <div>DNI: {subject.dni}</div>
          {subject.cuit && <div>CUIT: {subject.cuit}</div>}
          {subject.did && (
            <DidIndicator title={subject.did}>
              <SafetyCertificateFilled />
            </DidIndicator>
          )}

        </Option>
      ))}
    </AutoComplete>
  )
}
export default SubjectAutoComplete;
