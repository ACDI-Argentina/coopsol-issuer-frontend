import React from 'react';
import './_style.scss';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import api from '../../../services/api-calls/all';
import CredentialTable from '../../molecules/CredentialTable/credential-table';

// const { endpoint } = api();

const Activities = () => {
  return (
    <div className="Activities">
      <TitlePage
        text="Listado de actividades"
        description="Acá podés ver un listado con las actividades de los usuarios."
      />
      <div className="ActivitiesContent">
        <h4>
          <img src="img/table-list.svg" /> Listado de actividades
        </h4>
        <CredentialTable/>
      </div>
    </div>
  );
};

export default Activities;
