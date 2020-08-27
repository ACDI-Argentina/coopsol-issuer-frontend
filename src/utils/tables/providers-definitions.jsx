import React from 'react';
import { Link } from 'react-router-dom';
import { PROVIDERS_URL } from '../constants';

export const providerColumns = () => [
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 180
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Teléfono',
    dataIndex: 'phone',
    key: 'phone',
    width: 140
  },
  {
    title: 'WhatsApp',
    dataIndex: 'whatsappNumber',
    key: 'whatsappNumber',
    width: 140
  },
  {
    title: 'Categoría',
    dataIndex: 'providerCategory',
    key: 'categoryName',
    width: 115,
    render: providerCategory => <span>{providerCategory.name}</span>
  },
  {
    title: 'Especialidad',
    dataIndex: 'speciality',
    key: 'speciality',
    width: 170
  },
  {
    title: 'Beneficio',
    dataIndex: 'benefit',
    key: 'benefit',
    width: 90,
    render: value => <span>{value ? `${value}%` : ''}</span>
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
