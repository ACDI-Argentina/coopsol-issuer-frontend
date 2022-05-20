import React from 'react';
import { Table } from 'antd';
import styled from 'styled-components';
import RevokeCredentials from '../components/molecules/RevokeCredentials/revoke-credentials';
import { parseDate } from './dateHelpers';
import EmitCredentialButton from '../components/molecules/Credentials/Actions/EmitCredentialButton';


const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  button {
    margin: 0px 15px;
    border: 0px;
    background-color: #f9f9f9;
  }
  .ant-btn{
    border: 0px;
    background-color: #f9f9f9;
  }
`

const translateStatus = (str) => {
  switch (str) {
    case "PENDING": return "PENDIENTE";
    case "ACTIVE": return "VIGENTE";
    case "REVOKED": return "REVOCADA";
  }
}

export const translateRevocationReason = reason => {
  switch (reason) {
    case "UNLINKING": return "Desvinculación";
    case "EXPIRATION": return "Expiración";
    case "DATA_MODIFICATION": return "Modificación de datos";
    case "REPLACEMENT": return "Reemplazo";
    case "OTHER": return "Otro";
  }
}

export const getPendingCredentialColumns = () => {
  return [
    Table.SELECTION_COLUMN,
    Table.EXPAND_COLUMN,
    {
      title: 'Nombre y Apellido',
      fixed: 'left',
      width: 180,
      render: item => `${item?.firstName} ${item.lastName}`
    },
    {
      title: 'Tipo de credencial',
      dataIndex: 'name',
      width: 180
    },
    {
      title: 'Fecha Creación',
      dataIndex: 'createdOn',
      width: 180,
      render: item => <div>{parseDate(item)}</div>
    },
    {
      title: 'Acciones',
      dataIndex: '',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: item => {

        return (
          <ActionsContainer>
            <EmitCredentialButton credential={item} />
            <RevokeCredentials credential={item} status="PENDING" />
          </ActionsContainer>
        )
      }
    }



  ];


};

export const getActiveCredentialsColumns = (actions) => {

  return [
    Table.SELECTION_COLUMN,
    Table.EXPAND_COLUMN,
    /* { title: 'DID', dataIndex: 'did', fixed: 'left', width: 360 }, */
    {
      title: 'Nombre y Apellido',

      fixed: 'left',
      width: 180,
      render: item => `${item?.firstName} ${item.lastName}`
    },
    {
      title: 'Tipo de credencial',
      dataIndex: 'name',
      width: 180
    },

    {
      title: 'Fecha Creación',
      dataIndex: 'createdOn',
      width: 140,
      render: item => <div>{parseDate(item)}</div>
    },
    {
      title: 'Fecha Emisión',
      dataIndex: 'emmitedOn',
      width: 140,
      render: item => <div>{parseDate(item)}</div>
    },

    {
      title: 'Acciones',
      dataIndex: '',
      key: 'action',
      fixed: 'right',
      width: 130,
      render: item => {
        return (
          <RevokeCredentials credential={item} status="ACTIVE" />
        )
      }
    }



  ];
}


export const getRevokedCredentialsColumns = () => {
  return [
    Table.EXPAND_COLUMN,
    { title: 'DID', dataIndex: 'did', fixed: 'left', width: 360 },
    {
      title: 'Nombre y Apellido',

      fixed: 'left',
      width: 180,
      render: item => `${item?.firstName} ${item.lastName}`
    },
    {
      title: 'Tipo de credencial',
      dataIndex: 'name',
      width: 150
    },
    {
      title: 'Fecha Creación',
      dataIndex: 'createdOn',
      width: 140,
      render: item => <div>{parseDate(item)}</div>
    },
    {
      title: 'Fecha Revocación',
      key: 'revocation',
      width: 140,
      render: item => {
        return <div>{parseDate(item?.revocation.date)}</div>
      }
    },
    {
      title: 'Razón',
      key: 'revocation.reason',
      width: 180,
      render: item => {
        return <div>{translateRevocationReason(item?.revocation.reason)}</div>
      }
    },




  ];
};



export const activitiesColumns = [
  {
    title: 'Fecha de ejecución',
    dataIndex: 'executionDateTime',
    key: 'executionDateTime',
    width: 200,
    render: value => <div>{parseDate(value)}</div>
  },
  { 
    title: 'Nivel', 
    dataIndex: 'level', 
    key: 'level',
    width: 100,
  
  },
  { title: 'Mensaje', dataIndex: 'message', key: 'message' },
  { title: 'Usuario', dataIndex: 'user', key: 'user' }
];
