import React from 'react';
import { Button } from "antd"
import RevokeCredentials from '../components/molecules/RevokeCredentials/revoke-credentials';
import { parseDate } from './dateHelpers';
import { formatDNI } from "../components/pages/Producers/table-columns";

const translateStatus = (str) => {
  switch (str) {
    case "PENDING": return "PENDIENTE";
    case "ACTIVE": return "VIGENTE";
    case "REVOKED": return "REVOCADA";
  }
}




export const getCredentialsColumns = (actions) => {
  const { fetchCredentials, emitCredential } = actions || {};

  return [
    { title: 'DID', dataIndex: 'idDidiCredential', key: 'idDidiCredential', fixed: 'left', width: 360 },
    { title: 'Nombre y Apellido', dataIndex: 'name', key: 'name', fixed: 'left', width: 180 },
    {
      title: 'Tipo de credencial',
      dataIndex: 'credentialType',
      key: 'credentialType',
      width: 180
    },
    {
      title: 'DNI',
      dataIndex: 'dniBeneficiary',
      key: 'dniBeneficiary',
      width: 130,

      render: formatDNI
    },
    {
      title: 'Estado', dataIndex: 'status', key: 'status', width: 130,
      render: value => <div>{translateStatus(value)}</div>
    },
    {
      title: 'Ult. actualización',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 180,
      render: value => <div>{value}</div>
    },

    {
      title: 'Acciones',
      dataIndex: '',
      key: 'action',
      fixed: 'right',
      width: 130,
      render: item => {
        if (item.status === "PENDING") {
          return (
            <Button
              type="link"
              onClick={() => typeof emitCredential === "function" && emitCredential(item)}>

              Emitir
            </Button>
          )

        }
        return item.isRevocable ? (
          <RevokeCredentials credential={item} onRevoked={fetchCredentials} />
        ) : (
          '-'
        );
      }
    }



  ];
}

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




export const getPendingCredentialColumns = (fetchCredentials, emitCredential) => {
  let columns = getCredentialsColumns({ fetchCredentials, emitCredential });
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
