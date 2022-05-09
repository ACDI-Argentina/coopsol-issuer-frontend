import React from 'react';
import './_style.scss';
import TitlePage from '../../atoms/TitlePage/title-page';
import TabTable from '../../molecules/TabTable/TabTable';
import CredentialActions from '../../molecules/CredentialActions/credential-actions';
import CredentialsProvider from '../../../context/CredentialsContext';

const Credentials = ({ history }) => {
  return (
    <CredentialsProvider>
      <div className="Credentials">
        <TitlePage
          content={<CredentialActions history={history} />}
          history={history}
          text="Credenciales"
        />
        <TabTable />
      </div>
    </CredentialsProvider>
  );
};

export default Credentials;
