import React, { useState } from 'react';
import { AutoComplete } from 'antd';
import subjects from './subjects';

const { Option } = AutoComplete;

const SubjectAutoComplete = ({ onSubjectSelect }) => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const onSearch = (searchText) => {
    const lSearchText = searchText.toLowerCase();
    setOptions(
      !searchText ? [] : subjects.filter(subject => {
        const matchName = subject.firstname.toLowerCase().includes(lSearchText);
        const matchSurname = subject.lastname.toLowerCase().includes(lSearchText);
        const matchDni = subject.dni.toLowerCase().includes(lSearchText);
        return matchName || matchSurname || matchDni;

      }),
    );
  };
  const onSelect = (subjectId) => {
    const subject = subjects.filter(s => s._id === subjectId)[0];
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
      style={{ width: 225 }}
      onSelect={onSelect}
      onSearch={onSearch}
      onChange={onChange}
      placeholder="DNI o nombre"
    >
      {options.map(subject => (
        <Option key={subject.firstname} value={subject._id} text={`${subject.lastname}, ${subject.firstname}`}>
          <div>{`${subject.lastname}, ${subject.firstname}`}</div>
          <div>{subject.dni}</div>
        </Option>
      ))}
    </AutoComplete>
  )
}
export default SubjectAutoComplete;
