import React from 'react';
import { DEFAULT_DATETIME_FORMAT, DEFAULT_TIME_ZONE } from './constants';
import RevokeCredentials from '../components/molecules/RevokeCredentials/revoke-credentials';
import { parseDate } from './dateHelpers';
import IdentityActions from '../components/molecules/IdentityActions/identity-actions';

export const getCredentialsColumns = fetchCredentials => [
  {
    title: 'Tipo de credencial',
    dataIndex: 'credentialType',
    key: 'credentialType'
  },
  { title: 'Nombre y Apellido', dataIndex: 'name', key: 'name' },
  { title: 'DNI', dataIndex: 'dniBeneficiary', key: 'dniBeneficiary' },
  { title: 'DNI Titular', dataIndex: 'creditHolderDni', key: 'creditHolderDni' },
  { title: 'DID', dataIndex: 'idDidiCredential', key: 'idDidiCredential' },
  {
    title: 'Ult. actualización',
    dataIndex: 'lastUpdate',
    key: 'lastUpdate',
    render: value => <div>{parseDate(value)}</div>
  },
  {
    title: 'Acciones',
    dataIndex: '',
    key: 'action',
    render: item => {
      return item.isRevocable ? (
        <RevokeCredentials credential={item} onRevoked={fetchCredentials} />
      ) : (
        '-'
      );
    }
  }
];

export const getRevokedCredentialsColumns = () => {
  let cols = getCredentialsColumns();
  cols.splice(cols.length - 1, 1);

  const revocationReason = {
    title: 'Razón de revocación',
    dataIndex: 'revocationReason',
    key: 'revocationReason'
  };
  cols.splice(cols.length - 1, 0, revocationReason);

  return cols;
};

export const getDidColumns = fetchCredentials => {
  let columns = getCredentialsColumns(fetchCredentials);

  let didColumn = columns.findIndex(e => e.key === 'idDidiCredential');
  columns.splice(didColumn, 1);
  return columns;
};

export const getActivitiesColumns = [
  {
    title: 'Fecha de ejecución',
    dataIndex: 'executionDateTime',
    key: 'executionDateTime',
    render: value => <div>{parseDate(value)}</div>
  },
  {
    title: 'Acción',
    dataIndex: 'actionType',
    key: 'actionType'
  },
  { title: 'Nivel', dataIndex: 'level', key: 'level' },
  { title: 'Mensaje', dataIndex: 'message', key: 'message' },
  { title: 'Usuario', dataIndex: 'user', key: 'user' }
];

export const providerColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: 'WhatsApp',
    dataIndex: 'whatsappNumber',
    key: 'whatsappNumber'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Benefit',
    dataIndex: 'benefit',
    key: 'benefit'
  },
  {
    title: 'Speciality',
    dataIndex: 'speciality',
    key: 'speciality'
  },
  {
    title: 'Category',
    dataIndex: 'categoryName',
    key: 'categoryName'
  },
  {
    title: 'Active',
    dataIndex: 'activeLabel',
    key: 'activeLabel'
  }
];
