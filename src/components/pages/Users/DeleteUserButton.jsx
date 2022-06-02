import React, { useState } from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import UserDeletionModal from './UserDeletionModal';

const DeleteUserButton = ({ user, onSuccess }) => {

  const [showModal, setShowModal] = useState(); 
  const closeModal = () => setShowModal(false); 

  return (
    <>
      <Button
        title="Eliminar"
        type='link'
        danger
        style={{margin: "0px 12px", padding: "0px 10px", border:"0px", backgroundColor:"#f9f9f9"}}
        onClick={() => setShowModal(true)}
      >
        <DeleteOutlined />
      </Button>

      <UserDeletionModal
        id={user._id}
        email={user.email}
        showModal={showModal}
        closeModal={closeModal}
        onSuccess={onSuccess}
      />
    </>
  )
}
export default DeleteUserButton;