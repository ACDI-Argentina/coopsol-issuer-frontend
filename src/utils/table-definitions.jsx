import React from 'react';
import styled from 'styled-components';
import { Button } from "antd"
import RevokeCredentials from '../components/molecules/RevokeCredentials/revoke-credentials';
import { parseDate } from './dateHelpers';
import { formatDNI } from "../components/pages/Producers/table-columns";
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

const translateRevocationReason = reason => {
  switch(reason){
    case "UNLINKING": return "Desvinculación";
    case "EXPIRATION": return "Expiración";
    case "DATA_MODIFICATION": return "Modificación de datos";
    case "REPLACEMENT": return "Reemplazo";
    case "OTHER": return "Otro";
  }
}

export const getPendingCredentialColumns = (fetchCredentials) => { //Leer las acciones desde el ctx
  return [{
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
  /* {
    Si no guardamos el subject no podemos acceder a esto, salvo que sea a traves de los datos de la credencial cert.data.subject.dni
    title: 'DNI',
    dataIndex: 'dniBeneficiary',
    key: 'dniBeneficiary',
    width: 130,
    render: formatDNI
  }, */

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
          <RevokeCredentials credential={item} onRevoked={fetchCredentials} />
        </ActionsContainer>
      )
    }
  }



  ];


};

export const getActiveCredentialsColumns = (actions) => { /* ACtive credentials? */
  const { fetchCredentials, emitCredential } = actions || {};

  return [
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
      width: 180
    },

    {
      title: 'Fecha Creación',
      dataIndex: 'createdOn',
      width: 180,
      render: item => <div>{parseDate(item)}</div>
    },
    {
      title: 'Fecha Emisión',
      dataIndex: 'emmitedOn',
      width: 180,
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
          <RevokeCredentials credential={item} onRevoked={fetchCredentials} />
        )
      }
    }



  ];
}


export const getRevokedCredentialsColumns = () => {
  return [
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
      width: 180
    },

    {
      title: 'Fecha Creación',
      dataIndex: 'createdOn',
      width: 180,
      render: item => <div>{parseDate(item)}</div>
    },
    {
      title: 'Fecha Revocación',
      key: 'revocation',
      width: 180,
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
