import React, { useEffect, useState } from 'react';
import './_style.scss';
import TitlePage from '../../atoms/TitlePage/title-page';

import ProducerActions from '../../molecules/ProducerActions/producer-actions';
import { message, Table } from 'antd';
import styled from 'styled-components';
import { Modal } from 'antd';
import ProducerForm from '../../molecules/ProducerForm/ProducerForm';
import generateProducersColumns from "./table-columns";
import TableFilters from '../../molecules/TableFilters/table-filters';
import { producerFilters } from '../../../utils/tables/table-filters-definitions';
import { applyFilters } from '../../../utils/filter';
import { CoopsolBackend } from 'services/di';
import { events } from 'services/coopsol/CoopsolBackend';

const TableContainer = styled.div`
  margin: 1rem;
  padding: 1rem;
`

const Producers = ({ history }) => {
  const [producers, setProducers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProducer, setEditingProducer] = useState();

  useEffect(() => {

    async function loadProducers() {
      try {
        setLoading(true);
        const producers = await CoopsolBackend().producers().findAll();
        setProducers(producers?.content);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    loadProducers();

  }, []);


  const columns = generateProducersColumns({
    setEditingProducer
  });


  /* Actualiza o agrega los datos del productor en la lista */
  const updateList = (producer, showMessages = false) => { 
    const idx = producers.findIndex(el => el._id === producer._id);
    if (idx > -1) {
      const producersClone = producers.concat();
      producersClone.splice(idx, 1, producer);
      setProducers(producersClone);
      showMessages && message.success("Productor actualizado exitosamente");
    } else {//push and sort
      const producersClone = producers.concat(producer).sort((p1, p2) => {
        const a = p1.lastname || "";
        const b = p2.lastname || "";
        return a.localeCompare(b);
      });
      setProducers(producersClone);
      showMessages && message.success("Productor creado exitosamente");
    }

    setEditingProducer();
  };


  useEffect(()=> {
    const handler = payload => {
      console.log("update producers list by event");
      updateList(payload);
    };
    events.on("new-producer",handler);
    events.on("updated-producer", handler);

    return () => {
      events.off("new-producer",handler);
      events.off("updated-producer", handler);

    }

  }, [producers])



  const [activeFilters, setActiveFilters] = useState({});

  return (
    <div className="Producers">
      <TitlePage
        content={<ProducerActions setEditingProducer={setEditingProducer} history={history} />}
        history={history}
        text="Registro de productores"
      />
      <TableContainer>
        <TableFilters
          onApplyFilter={setActiveFilters}
          filters={producerFilters}
          defaultFilters={activeFilters}
          onSearch={(x) => { console.log(`onSearch`, x) }}
        />
        <Table
          loading={loading}
          rowKey={'_id'}
          dataSource={applyFilters(producers, activeFilters)}
          columns={columns}
        />
      </TableContainer>
      {editingProducer && (
        <Modal
          title={editingProducer?._id ? "Editar productor" : "Nuevo productor"}
          visible={editingProducer != undefined}
          footer={null}
          onCancel={() => {
            console.log(`clear`)
            setEditingProducer();
          }}
        >
          <ProducerForm
            producer={editingProducer}
            onSuccess={updated => updateList(updated, true)}
          />

        </Modal>
      )}
    </div>
  );
};

export default Producers;
