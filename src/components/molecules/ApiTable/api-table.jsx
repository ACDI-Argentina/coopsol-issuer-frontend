import React, { useEffect, useState, useContext } from 'react';
import TableFilters from '../TableFilters/table-filters';
import { Table, message } from 'antd';
import { useApi } from '../../../services/useApi';
import ApiDetail from '../ApiDetail/api-detail';
import CoopsolBackend, { events } from 'services/coopsol/CoopsolBackend';

/* Esta api table ahora solo se utiliza para identitiesValidationRequests */
const ApiTable = ({ data, path, columns, filters, defaultFilters, dataField = 'content', filteredFields, noExpand }) => {
  const call = useApi();
  const [loading, setLoading] = useState(false);
  const [localData, setLocalData] = useState(data);
  const [activeFilters, setActiveFilters] = useState(defaultFilters);
  const [pagination, setPagination] = useState({ page: 0 });
  const [paged, setPaged] = useState(0);

  const makeGet = async (page = 0) => { //makeGet = fetchCredentials
    setLoading(true);
    try{
      const result = await CoopsolBackend().identityValidationRequest.find({...defaultFilters});
      console.log(result); 
      const totalElements = result.length;
      setLocalData(result);
  
      setPagination({
        ...pagination,
        total: totalElements,
        pageSize: 15  
      });
      
    } catch(err){
      message.error('Ocurrió un error al obtener las solicitudes.');
    }
    setLoading(false);
  };

  const localColumns = columns(makeGet);


  useEffect(() => {
    const handler = payload => {
      if (defaultFilters.requestState === "IN_PROGRESS") {

        setLocalData(local => {
          const updatedList = local.concat(payload);
          
          setPagination({
            ...pagination,
            total: updatedList.length,
            pageSize: 15,
          });

          return updatedList;
        }); //TODO: SORT
      }

    };
    events.on("identity-validation-request", handler);

    return () => {
      events.off("identity-validation-request", handler);
    }
  }, [localData])

  const handleTableChange = pagination => {
    setPagination(pagination);
    setPaged(pagination.current - 1);
  };

  const handleSuccess = res => {

  
  };

  const onSearch = () => {
    setPagination({ ...pagination, current: 1 });
    setPaged(0);
    makeGet();
  };

  const handleError = res => {
    message.error('Ocurrió un error al obtener las solicitudes.');
    setLoading(false);
  };

  const onApplyFilter = filter => {
    setActiveFilters({ ...filter });
  };

  useEffect(() => {
    makeGet(paged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paged]);

  return (
    <>
      {/*       <TableFilters
        onApplyFilter={onApplyFilter}
        filters={filters}
        defaultFilters={activeFilters}
        onSearch={onSearch}
      /> */}
      <Table
        rowKey={'_id'}
        columns={localColumns}
        dataSource={localData}
        scroll={{ x: 'auto' }}
        loading={loading}
        onChange={handleTableChange}
        pagination={pagination}
        expandable={
          !noExpand && {
            expandedRowRender: record => <ApiDetail fields={record} filteredFields={filteredFields} />
          }
        }
      />
    </>
  );
};

export default ApiTable;
