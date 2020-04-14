import React from 'react';
import './_style.scss';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import api from '../../../services/api-calls/all';
import CredentialTable from '../../molecules/CredentialTable/credential-table';

// const { endpoint } = api();

const Requests = () => {
  return (
    <div className="Requests">
      <TitlePage
        text="Solicitud de credenciales"
        description="Acá podés ver un listado con las solicitudes de credenciales."
      />
      <div className="RequestsContent">
        <h4>
          <img src="img/table-list.svg" /> Listado de solicitudes
        </h4>
        <CredentialTable
          columns={() => {}}
          dataSource={() => {}}
          filters={{}}
          defaultFilters={{}}
        />
      </div>
    </div>
  );
};

export default Requests;
