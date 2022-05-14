import { DeleteOutlined, EditTwoTone } from '@ant-design/icons';
import { Button } from 'antd';
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
    render: ({ _id }) => {
      return (
        <>
          <Link title="Editar" to={`${TEMPLATES_URL}/${_id}`}>
            <EditTwoTone />
          </Link>
          <Button
            title="Eliminar"
            type='link'
            style={{ border: "0px" }}
            onClick={() => console.log(`Confirm deletion of template ${_id}`)}
          >
            <DeleteOutlined />
          </Button>
        </>

      )
    }
  }
];
