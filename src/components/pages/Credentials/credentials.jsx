import React from 'react';
import './_style.scss';
import TitlePage from '../../atoms/TitlePage/title-page';
import TabTable from '../../molecules/TabTable/TabTable';
import CredentialActions from '../../molecules/CredentialActions/credential-actions';

const Credentials = ({ history }) => {
  return (
    <div className="Credentials">
      <TitlePage
        content={<CredentialActions history={history} />}
        history={history}
        text="Credenciales"
        description="Acá podés crear credenciales, precredenciales, ver el listados de  las que se encuentran vigentes y las que están pendientes."
      />
      <TabTable />
    </div>
  );
};

export default Credentials;
