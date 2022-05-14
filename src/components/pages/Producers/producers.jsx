import React, { useEffect, useState } from 'react';
import './_style.scss';
import TitlePage from '../../atoms/TitlePage/title-page';

import ProducerActions from '../../molecules/ProducerActions/producer-actions';
import { Table } from 'antd';
import styled from 'styled-components';
import api from "../../../services/api-calls/all";
import { Modal } from 'antd';
import ProducerForm from '../../molecules/ProducerForm/ProducerForm';
import generateProducersColumns from "./table-columns";

const TableContainer = styled.div`
  margin: 1rem;
  padding: 1rem;
`

const Producers = ({ history }) => {
  const { getProducers } = api();
  const [producers, setProducers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProducer, setEditingProducer] = useState();

  useEffect(() => {
    
    async function loadProducers() {
      try{
        setLoading(true);
        const producers = await getProducers();
        console.log(producers)
        setProducers(producers.content);
        setLoading(false);

      } catch(err){
        console.log(err);
        setLoading(false);
      }
    }
    loadProducers();

  }, []);


  const columns = generateProducersColumns({
    setEditingProducer
  })

  return (
    <div className="Producers">
      <TitlePage
        content={<ProducerActions setEditingProducer={setEditingProducer} history={history} />}
        history={history}
        text="Registro de productores"
      />
      <TableContainer>
        <Table
          loading={loading}
          rowKey={'_id'}
          dataSource={producers}
          columns={columns}
        />
      </TableContainer>
      {editingProducer && (
        <Modal 
          title={editingProducer?._id ?"Editar productor":"Nuevo productor"}
          visible={editingProducer != undefined}
          footer={null}
          onCancel={() => {
            console.log(`clear`)
            setEditingProducer();
          }}
          >
          <ProducerForm 
            producer={editingProducer}
            onSuccess={(updated) => {
              const idx = producers.findIndex(el => el._id === editingProducer._id);
              if(idx > -1){
                const producersClone = producers.concat();
                producersClone.splice(idx,1, updated);
                setProducers(producersClone);
              }
              
              setEditingProducer();
            }}
            />

        </Modal>
      )}
    </div>
  );
};

export default Producers;
