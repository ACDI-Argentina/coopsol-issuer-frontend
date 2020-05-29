import React from 'react';
import moment from 'moment';
import { DEFAULT_DATETIME_FORMAT } from './constants';
import RevokeCredentials from '../components/molecules/RevokeCredentials/revoke-credentials';

export const getCredentialsColumns = (fetchCredentials, revocationReasons) => [
  {
    title: 'Tipo de credencial',
    dataIndex: 'credentialType',
    key: 'credentialType'
  },
  { title: 'Nombre y Apellido', dataIndex: 'name', key: 'name' },
  { title: 'DNI', dataIndex: 'dniBeneficiary', key: 'dniBeneficiary' },
  { title: 'DID', dataIndex: 'idDidiCredential', key: 'idDidiCredential' },
  { title: 'Estado', dataIndex: 'credentialState', key: 'credentialState' },
  {
    title: 'Ult. actualización',
    dataIndex: 'lastUpdate',
    key: 'lastUpdate',
    render: value => <div>{value ? moment(value).format(DEFAULT_DATETIME_FORMAT) : ''}</div>
  },
  {
    title: 'Acciones',
    dataIndex: '',
    key: 'action',
    render: item => {
      return item.revocable ? <RevokeCredentials credential={item} onRevoked={fetchCredentials} /> : '-';
    }
  }
];

export const getRevokedCredentialsColumns = () => {
  let cols = getCredentialsColumns();
  cols.splice(cols.length - 1, 1);
  return cols;
};

export const getDidColumns = (fetchCredentials, revocationReasons) => {
  let columns = getCredentialsColumns(fetchCredentials, revocationReasons);

  let didColumn = columns.findIndex(e => e.key === 'idDidiCredential');
  columns.splice(didColumn, 1);
  return columns;
};
