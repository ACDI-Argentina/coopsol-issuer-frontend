import React from 'react';
import { Link } from 'react-router-dom';
import { PROVIDERS_URL } from '../constants';

export const templatesColumns = () => [
  {
    title: 'Modelo de credencial',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 200
  },

  {
    title: 'Categoría',
    dataIndex: 'providerCategory',
    key: 'categoryName',
    width: 115,
    render: providerCategory => <span>{providerCategory.name}</span>
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
    width: 120,
    render: ({ id }) => <Link to={`${PROVIDERS_URL}/${id}`}>Editar</Link>
  }
];
