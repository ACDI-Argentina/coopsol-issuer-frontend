import React from 'react';
import IdentityActions from '../../components/molecules/IdentityActions/identity-actions';
import IdentityRejectActions from '../../components/molecules/IdentityRejectActions/identity-reject-actions';

const baseIdentityColumns = [
  {
    title: 'Nombre y Apellido',
    dataIndex: '',
    key: 'name',
    fixed: 'left',
    render: item => <span>{`${item.name} ${item.lastname}`}</span>
  },
  {
    title: 'DNI Declarado',
    dataIndex: 'dni',
    key: 'dni',
    width: 100
  },
  {
    title: 'Número de Celular',
    dataIndex: 'phone',
    key: 'phone',
    width: 160
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  }
];

const reviewedIdentityColumns = [
  {
    title: 'Fecha Solicitud',
    dataIndex: 'requestDate',
    key: 'requestDate',
    width: 100
  },
  {
    title: 'Fecha Revisión',
    dataIndex: 'reviewDate',
    key: 'reviewDate',
    width: 100
  }
];

export const identityPendingColumns = getData => [
  ...baseIdentityColumns,
  {
    title: 'Fecha',
    dataIndex: 'requestDate',
    key: 'requestDate',
    width: 100
  },
  {
    title: 'Acciones',
    dataIndex: '',
    key: 'action',
    fixed: 'right',
    width: 230,
    render: row => <IdentityActions identity={row} onAction={getData} />
  }
];

export const identityApprovedColumns = getData => [
  ...baseIdentityColumns,
  ...reviewedIdentityColumns,
  {
    title: 'Estado',
    dataIndex: '',
    key: 'state',
    width: 140,
    render: row => (
      <span className="text-success">
        <img src="/img/check.svg" alt="check" width="12" className="mr-1" />
        Identidad Validada
      </span>
    )
  }
];

export const identityRejectColumns = getData => [
  ...baseIdentityColumns,
  ...reviewedIdentityColumns,
  {
    title: 'Estado',
    dataIndex: '',
    key: 'state',
    fixed: 'right',
    width: 230,
    render: row => <IdentityRejectActions identity={row} onAction={getData} />
  }
];
