import React, { useState } from 'react';
import { AutoComplete } from 'antd';
import api from "../../../services/api-calls/all";

const { Option } = AutoComplete;

const SubjectAutoComplete = ({ onSubjectSelect }) => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const onSearch = async (searchText) => {
    const { searchSubject } = api();

    const lSearchText = searchText.toLowerCase();
    if(!lSearchText) return setOptions([]);

    //usar un timer para el throtle
    const results = await searchSubject(searchText);
    if(results){
      setOptions(results);
    }
  };
  const onSelect = (subjectId) => {
    const subject = options.filter(s => s._id === subjectId)[0];
    if(!subject) return;
    const data = subject;
    
    typeof onSubjectSelect === "function" && onSubjectSelect(data);
    setValue(`${subject.lastname}, ${subject.firstname}`);
  };
  const onChange = (data) => {
    if(data === ""){
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
          
        </Option>
      ))}
    </AutoComplete>
  )
}
export default SubjectAutoComplete;
