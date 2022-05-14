import React, { useState } from 'react';
import { DeleteOutlined, EditTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import DeleteTemplateButton from '../../components/molecules/Templates/buttons/DeleteTemplateButton';
import TemplateDeletionModal from '../../components/molecules/Templates/modals/TemplateDeletionModal';
import { TEMPLATES_URL } from '../constants';


export const templatesColumns = () => [
  {
    title: 'Modelo de credencial',
    dataIndex: 'name',
    key: 'name',
    width: 200
  },
  {
    title: 'Blockchain',
    dataIndex: 'blockchain',
    key: 'blockchain',
    width: 200
  },
  {
    title: 'Acciones',
    dataIndex: '',
    key: 'actions',
    fixed: 'right',
    width: 50,
    render: (template) => {

      return (
        <>
          <Link title="Editar" to={`${TEMPLATES_URL}/${template._id}`}>
            <EditTwoTone />
          </Link>
          <DeleteTemplateButton template={template}/>
          

        
        </>

      )
    }
  }
];
