import React, { useEffect, useState } from 'react';
import './_style.scss';
import TitlePage from '../../atoms/TitlePage/title-page';
import { Button, Table } from 'antd';
import styled from 'styled-components';
import { Modal } from 'antd';
import { applyFilters } from '../../../utils/filter';
import CoopsolBackend from 'services/api-calls/CoopsolBackend';
import UserActions from './UserActions';
import UserForm from './UserForm';
import { parseDate } from 'utils/dateHelpers';
import { DeleteOutlined, EditTwoTone } from '@ant-design/icons';
import DeleteUserButton from "./DeleteUserButton";

const TableContainer = styled.div`
  margin: 1rem;
  padding: 1rem;
`

const Users = ({ history }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState();

  async function loadUsers() {
    try {
      setLoading(true);
      const allUsers = await CoopsolBackend().users().findAll();
      setAllUsers(allUsers.content);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const [activeFilters, setActiveFilters] = useState({});

  return (
    <div className="Users">
      <TitlePage
        content={
          <UserActions 
            setEditingUser={setEditingUser} 
          />}
        history={history}
        text="Usuarios"
      />
      <TableContainer>
        <Table
          loading={loading}
          rowKey={'_id'}
          dataSource={applyFilters(allUsers, activeFilters)}
          columns={[{
            title: 'Nombre',
            dataIndex: 'email',
            key: 'email',
            width: 200
          },
          {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            render: values => values.join(", "),
            width: 200
          },
          {
            title: 'Fecha de creación',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: value => parseDate(value),
            width: 120
          },
          {
            title: 'Activo',
            dataIndex: 'active',
            key: 'active',
            render: value => value ? "Si" : "No",
            width: 50
          }, {
            title: 'Acciones',
            width: 120,
            render: item => {
              return (
                <>
                  <Button type="text" style={{borderWidth:0}}>
                    <EditTwoTone />
                  </Button>
                  <DeleteUserButton 
                    user={item}
                    onSuccess={() => {
                      const idx = allUsers.findIndex(el => el._id === item._id);
                      if (idx > -1) {
                        const usersClone = allUsers.concat();
                        usersClone.splice(idx, 1);
                        setAllUsers(usersClone);
                      } 
                    }}
                    />
                </>
              )
            },
          },

          ]}
        />
      </TableContainer>

      {editingUser && (
        <Modal
          title={editingUser?._id ? "Editar usuario" : "Nuevo usuario"}
          visible={true}
          footer={null}
          onCancel={() => {
            console.log(`clear`)
            setEditingUser();
          }}
        >
          <UserForm
            producer={editingUser}
            onSuccess={(updated) => {
              const idx = allUsers.findIndex(el => el._id === editingUser._id);

              if (idx > -1) {
                const usersClone = allUsers.concat();
                usersClone.splice(idx, 1, updated);
                setAllUsers(usersClone);
              } else {
                loadUsers();
              }

              setEditingUser();
            }}
          />

        </Modal>
      )}
    </div>
  );
};

export default Users;
