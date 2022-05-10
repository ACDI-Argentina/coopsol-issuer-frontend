import React, { useEffect, useState } from 'react';
import './_style.scss';
import TitlePage from '../../atoms/TitlePage/title-page';
import TabTable from '../../molecules/TabTable/TabTable';
import ProducerActions from '../../molecules/ProducerActions/producer-actions';
import { Table } from 'antd';
import styled from 'styled-components';
import api from "../../../services/api-calls/all";

const TableContainer = styled.div`
  margin: 1rem;
  padding: 1rem;
`


const formatDNI = value => {
  if(value.length === 8){
    return `${value.substring(0,2)}.${value.substring(2,5)}.${value.substring(5,8)}`
  } else if(value.length === 7){
    return `${value.substring(0,1)}.${value.substring(1,4)}.${value.substring(4,7)}`
  } else {
    return value;
  }
}

const formatCUIT = value => {
  if(value?.length === 11){
    return `${value.substring(0,2)}-${value.substring(2, 10)}-${value.substring(10, 11)}`
  } else {
    return value;
  }
};

const Producers = ({ history }) => {
  const { getProducers } = api();
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    /* Load producers */
    async function load() {
      const producers = await getProducers();
      console.log(producers)
      setDataSource(producers.content);
    }
    load();

  }, []);


  const columns = [
    {
      title: 'Apellido',
      dataIndex: 'lastname',
      key: 'lastname',
      width: 200

    },
    {
      title: 'Nombre',
      dataIndex: 'firstname',
      key: 'firstname',
      width: 200,
    },
    {
      title: 'DNI',
      dataIndex: 'dni',
      key: 'dni',
      width: 200,
      render: formatDNI
    },
    {
      title: 'CUIT',
      dataIndex: 'cuit',
      key: 'cuit',
      width: 240,
      render: formatCUIT
    },
    {
      title: 'DID',
      width: 240,
    },
    {
      title: 'Acciones',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: row => (
        <div>
          
        </div>
      )
    },


  ];


  return (
    <div className="Producers">
      <TitlePage
        content={<ProducerActions history={history} />}
        history={history}
        text="Registro de productores"
      />
      <TableContainer>
        <Table
          rowKey={'_id'}
          dataSource={dataSource}
          columns={columns}
        />
      </TableContainer>
    </div>
  );
};

export default Producers;
