import React from 'react';
import { Link } from 'react-router-dom';
import { TEMPLATES_URL } from '../constants';


export const templatesColumns = () => [
  {
    title: 'Modelo de credencial',
    dataIndex: 'name',
    key: 'name',
    width: 200
  },
  {
    title: 'Ult. Actualización',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 90,
    render: dateStr => <span>{dateStr}</span>
  },
  {
    title: 'Activo',
    dataIndex: 'active',
    key: 'active',
    width: 90,
    render: value => <span>{value ? 'Si' : 'No'}</span>
  },
  {
    title: 'Acciones',
    dataIndex: '',
    key: 'actions',
    fixed: 'right',
    width: 50,
    render: ({ _id }) => <Link to={`${TEMPLATES_URL}/${_id}`}>Editar</Link>
  }
];
