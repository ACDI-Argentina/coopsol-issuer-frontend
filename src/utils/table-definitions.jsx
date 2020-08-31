import React from 'react';
import { DEFAULT_DATETIME_FORMAT, DEFAULT_TIME_ZONE } from './constants';
import RevokeCredentials from '../components/molecules/RevokeCredentials/revoke-credentials';
import { parseDate } from './dateHelpers';

export const getCredentialsColumns = fetchCredentials => [
  { title: 'Nombre y Apellido', dataIndex: 'name', key: 'name', fixed: 'left', width: 180 },
  {
    title: 'Tipo de credencial',
    dataIndex: 'credentialType',
    key: 'credentialType',
    width: 240
  },
  { title: 'DNI', dataIndex: 'dniBeneficiary', key: 'dniBeneficiary', width: 130 },
  { title: 'DNI Titular', dataIndex: 'creditHolderDni', key: 'creditHolderDni', width: 130 },
  { title: 'DID', dataIndex: 'idDidiCredential', key: 'idDidiCredential', width: 460 },
  {
    title: 'Ult. actualización',
    dataIndex: 'lastUpdate',
    key: 'lastUpdate',
    width: 180,
    render: value => <div>{parseDate(value)}</div>
  },
  {
    title: 'Acciones',
    dataIndex: '',
    key: 'action',
    fixed: 'right',
    width: 130,
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
    key: 'revocationReason',
    width: 180
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
