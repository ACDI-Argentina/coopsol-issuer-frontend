import React from 'react';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';

const UserActions = ({setEditingUser}) => {
  return (
    <>
      <ButtonPrimary
        onClick={() => setEditingUser({})}
        text="+ Nuevo Usuario"
        theme="primary"
      />
    </>
  );
};

export default UserActions;
