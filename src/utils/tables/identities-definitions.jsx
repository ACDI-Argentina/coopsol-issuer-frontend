
import React from 'react';
import { parseDate } from 'utils/dateHelpers';
import IdentityActions from '../../components/molecules/IdentityActions/identity-actions';
import IdentityRejectActions from '../../components/molecules/IdentityRejectActions/identity-reject-actions';

const baseColumns = [
  {
    title: 'Nombre y Apellido',
    dataIndex: '',
    key: 'name',
    fixed: 'left',
    width: 170,
    render: item => <span>{`${item.firstname} ${item.lastname}`}</span>
  },
  {
    title: 'DNI Declarado',
    dataIndex: 'dni',
    key: 'dni',
    width: 100
  },
  {
    title: 'Número de Celular',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    width: 150
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 170,
  }
];

const reviewedColumns = [
  {
    title: 'Fecha Solicitud',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 120,
    render: item => <div>{parseDate(item)}</div>
  },
  {
    title: 'Fecha Revisión',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 120,
    render: item => <div>{parseDate(item)}</div>
  }
];

export const pendingColumns = getData => [
  ...baseColumns,
  {
    title: 'Fecha',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 120,
    render: item => <div>{parseDate(item)}</div>
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

export const approvedColumns = getData => [
  ...baseColumns,
  ...reviewedColumns,
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

export const rejectColumns = getData => [
  ...baseColumns,
  ...reviewedColumns,
  {
    title: 'Acciones',
    dataIndex: '',
    key: 'state',
    fixed: 'right',
    width: 230,
    render: row => <IdentityRejectActions identity={row} onAction={getData} />
  }
];

export const filters = {
  dni: {
    type: 'input',
    name: 'DNI'
  },
  firstname: {
    type: 'input',
    name: 'Nombre'
  },
  lastname: {
    type: 'input',
    name: 'Apellido'
  },
  requestDate: {
    type: 'date',
    name: 'Fecha',
    format: date => new Date(date.toDate().setHours(0, 0, 0, 0)).toISOString()
  }
};

export const requestStates = {
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE'
};

export const REASONS = [
  {
    value: 'INCONSISTENT_DATA',
    label: 'Datos Inconsistentes'
  },
  {
    value: 'IMPOSSIBLE_TO_COMMUNICATE',
    label: 'No es posible comunicarse'
  },
  {
    value: 'NOT_BENEFICIARY',
    label: 'No es productor de Coopsol'
  }
];

export const collapseLabels = {
  rejectReason: 'Razón',
  rejectionObservations: 'Observación'
};
