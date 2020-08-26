import React from 'react';
import { Link } from 'react-router-dom';
import { PROVIDERS_URL } from '../constants';

export const providerColumns = () => [
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Teléfono',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: 'WhatsApp',
    dataIndex: 'whatsappNumber',
    key: 'whatsappNumber'
  },
  {
    title: 'Categoría',
    dataIndex: 'providerCategory',
    key: 'categoryName',
    render: providerCategory => <span>{providerCategory.name}</span>
  },
  {
    title: 'Especialidad',
    dataIndex: 'speciality',
    key: 'speciality'
  },
  {
    title: 'Beneficio',
    dataIndex: 'benefit',
    key: 'benefit',
    render: value => <span>{value ? `${value}%` : ''}</span>
  },
  {
    title: 'Activo',
    dataIndex: 'active',
    key: 'active',
    render: value => <span>{value ? 'Si' : 'No'}</span>
  },
  {
    title: 'Acciones',
    dataIndex: '',
    key: 'actions',
    render: ({ id }) => <Link to={`${PROVIDERS_URL}/${id}`}>Editar</Link>
  }
];
