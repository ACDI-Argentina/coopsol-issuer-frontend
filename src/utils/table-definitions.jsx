import React from 'react';
import moment from 'moment';
import { DEFAULT_DATE_FORMAT } from './constants';
import RevokeCredentials from '../components/molecules/RevokeCredentials/revoke-credentials';

export const getCredentialsColumns = fetchCredentials => [
  {
    title: 'Tipo de credencial',
    dataIndex: 'credentialType',
    key: 'credentialType'
  },
  { title: 'Nombre y Apellido', dataIndex: 'name', key: 'name' },
  { title: 'DNI', dataIndex: 'dniBeneficiary', key: 'dniBeneficiary' },
  { title: 'DID', dataIndex: 'idDidiCredential', key: 'idDidiCredential' },
  {
    title: 'Generada',
    dataIndex: 'dateOfIssue',
    key: 'dateOfIssue',
    render: value => <div>{moment(value).format(DEFAULT_DATE_FORMAT)}</div>
  },
  {
    title: 'Caduca',
    dataIndex: 'dateOfExpiry',
    key: 'dateOfExpiry',
    render: value => <div>{moment(value).format(DEFAULT_DATE_FORMAT)}</div>
  },
  { title: 'Estado', dataIndex: 'credentialState', key: 'credentialState' },
  {
    title: 'Ult. actualización',
    dataIndex: 'lastUpdate',
    key: 'lastUpdate',
    render: value => <div>{value ? moment(value).format(DEFAULT_DATE_FORMAT) : ''}</div>
  },
  {
    title: 'Acciones',
    dataIndex: '',
    key: 'action',
    render: item => {
      return <RevokeCredentials credential={item} onRevoked={fetchCredentials} />;
    }
  }
];

export let defaultFilters = (credentialTypes, credentialStates) => ({
  credentialType: {
    type: 'dropdown',
    name: 'Tipo',
    data: credentialTypes
  },
  name: {
    type: 'input',
    name: 'Nombre y Apellido'
  },
  dniBeneficiary: {
    type: 'input',
    name: 'DNI'
  },
  idDidiCredential: {
    type: 'input',
    name: 'DID'
  },
  dateOfIssue: {
    type: 'date',
    name: 'Generada'
  },
  dateOfExpiry: {
    type: 'date',
    name: 'Caduca'
  },
  credentialState: {
    type: 'dropdown',
    name: 'Estado',
    data: credentialStates
  }
});
