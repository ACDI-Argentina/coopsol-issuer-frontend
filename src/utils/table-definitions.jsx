import React from 'react';
import moment from 'moment-timezone';
import { DEFAULT_DATETIME_FORMAT, DEFAULT_TIME_ZONE } from './constants';
import RevokeCredentials from '../components/molecules/RevokeCredentials/revoke-credentials';

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
    render: value => (
      <div>
        {value
          ? moment
              .utc(value)
              .tz(DEFAULT_TIME_ZONE)
              .format(DEFAULT_DATETIME_FORMAT)
          : ''}
      </div>
    )
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
