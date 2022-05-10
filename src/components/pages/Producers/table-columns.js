import { Button } from "antd";
import { EditTwoTone } from '@ant-design/icons';


export const formatDNI = value => {
  if (value.length === 8) {
    return `${value.substring(0, 2)}.${value.substring(2, 5)}.${value.substring(5, 8)}`
  } else if (value.length === 7) {
    return `${value.substring(0, 1)}.${value.substring(1, 4)}.${value.substring(4, 7)}`
  } else {
    return value;
  }
}

export const formatCUIT = value => {
  if (value?.length === 11) {
    return `${value.substring(0, 2)}-${value.substring(2, 10)}-${value.substring(10, 11)}`
  } else {
    return value;
  }
};


const generateProducersColumns = ({setEditingProducer}) => {
  return [
    {
      title: 'Apellido',
      dataIndex: 'lastname',
      key: 'lastname',
      width: 120

    },
    {
      title: 'Nombre',
      dataIndex: 'firstname',
      key: 'firstname',
      width: 120,
    },
    {
      title: 'DNI',
      dataIndex: 'dni',
      key: 'dni',
      width: 120,
      render: formatDNI
    },
    {
      title: 'CUIT',
      dataIndex: 'cuit',
      key: 'cuit',
      width: 120,
      render: formatCUIT
    },
    {
      title: 'DID',
      dataIndex: 'did',
      width: 300,
    },
    {
      title: 'Acciones',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: producer => (
        <div>
          <Button
            type="link"
            title="Editar"
            style={{border: "none"}}
            onClick={() => setEditingProducer(producer)}
          >  {/* to={`/producers/${producer._id}`}  */}
            <EditTwoTone />
          </Button>
        </div>
      )
    },
  ];

}

export default generateProducersColumns;