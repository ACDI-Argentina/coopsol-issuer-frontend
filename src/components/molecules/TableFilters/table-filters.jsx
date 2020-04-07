import React from 'react';
import './_style.scss';
import { Menu, Dropdown, Button, Input, DatePicker, message } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { DEFAULT_DATE_FORMAT } from '../../../utils/constants';
import { useEffect } from 'react';
import { useApi } from '../../../services/useApi';
import api from '../../../services/api-calls/all';

const { getCredentialTypes, getCredentialStates } = api();

const TableFilters = ({ onApplyFilter }) => {
  const filters = {
    credentialType: 'Tipo',
    name: 'Nombre y Apellido',
    dniBeneficiary: 'DNI',
    idDidiCredential: 'DID',
    dateOfIssue: 'Generada',
    dateOfExpiry: 'Caduca',
    credentialState: 'Estado'
  };

  const credentialCall = useApi();

  const [activeFilters, setActiveFilters] = useState({});
  const [credentialTypes, setCredentialTypes] = useState(['t,', 'a', 'as']);
  const [credentialStates, setCredentialStates] = useState([]);

  useEffect(() => {
    credentialCall(getCredentialTypes, null, onTypesSuccess, onError);
    credentialCall(getCredentialStates, null, onStatesSuccess, onError);
  }, []);

  const onTypesSuccess = data => {
    setCredentialTypes(data);
  };

  const onStatesSuccess = data => {
    setCredentialStates(data);
  };

  const onError = () => {
    message.error('No se pudieron obtener los tipos de filtro, intente nuevamente.');
  };

  const onInputChange = ev => {
    let key = ev.target.id;
    let newFilter = { ...activeFilters, [key]: ev.target.value };

    clearEmptyFilter(key, newFilter);
    filter(newFilter);
  };

  const clearEmptyFilter = (key, obj) => {
    if (!obj[key]) {
      delete obj[key];
    }
  };

  const onDateChange = (date, key) => {
    let newFilter = { ...activeFilters };

    if (!date) {
      delete newFilter[key];
    } else {
      newFilter[key] = date.format(DEFAULT_DATE_FORMAT);
    }

    filter(newFilter);
  };

  const onDropdownChange = value => {
    let key = value.item.props.id;
    let newFilter = { ...activeFilters, [key]: value.key };
    clearEmptyFilter(key, newFilter);
    filter(newFilter);
  };

  const filter = filter => {
    setActiveFilters(filter);
    onApplyFilter(filter);
  };

  const renderInput = key => {
    return (
      <Input
        onChange={onInputChange}
        id={key}
        placeholder={filters[key]}
        suffix={<UserOutlined />}
      />
    );
  };

  const renderDate = key => {
    return (
      <DatePicker
        locale="es"
        format={DEFAULT_DATE_FORMAT}
        onChange={date => onDateChange(date, key)}
        placeholder={filters[key]}
      />
    );
  };

  const renderDropdown = (key, values) => {
    const menu = (
      <Menu onClick={onDropdownChange}>
        {values.map(v => (
          <Menu.Item id={key} key={v}>
            {v}
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <Dropdown overlay={menu}>
        <Button>
          {filters[key]} <DownOutlined />
        </Button>
      </Dropdown>
    );
  };

  return (
    <div className="TableFilters">
      {renderDropdown('credentialType', credentialTypes)}
      {renderInput('name')}
      {renderInput('dniBeneficiary')}
      {renderInput('idDidiCredential')}
      {renderDate('dateOfIssue')}
      {renderDate('dateOfExpiry')}
      {renderDropdown('credentialState', credentialStates)}
    </div>
  );
};

export default TableFilters;
