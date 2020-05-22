import React from 'react';
import './_style.scss';

import TitlePage from '../../atoms/TitlePage/TitlePage';
import TabTable from '../../molecules/TabTable/TabTable';

const Credentials = ({ history, location }) => {

  const defaultActiveName = location.state && location.state.defaultActiveName;
  
  return (
    <div className="Credentials">
      <TitlePage history={history} text="Credenciales" description="Acá podés crear credenciales, precredenciales, ver el listados de  las que se encuentran vigentes y las que están pendientes."/>
      <TabTable defaultActiveName={defaultActiveName}/>
    </div>
  );
};

export default Credentials;
