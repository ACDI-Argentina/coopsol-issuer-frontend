import React, { useState, useEffect } from 'react';
import { Row, Col, message } from 'antd';
import apiCalls from '../../../services/api-calls/all';
import TitlePage from '../../atoms/TitlePage/title-page';
import FileUploader from '../../molecules/FileUploader/file-uploader';

const { downloadFile } = apiCalls();

const Reports = () => {
  const [response, setResponse] = useState();

  const onUploaded = res => {
    setResponse(res);
  };

  const getFile = async () => {
    const fileName = response.data.downloadableFileName;
    if (fileName) {
      const res = await downloadFile({ fileName });
      message.success('Reporte generado con éxito!');
      const extension = fileName.split('.').pop(); // will be .zip or .pdf
      const blob = new Blob([res], { type: `application/${extension}` });
      let a = document.createElement('a');
      a.download = fileName;
      a.href = URL.createObjectURL(blob);
      a.click();
    } else {
      message.error('Ocurrió un error al generar el reporte.');
    }
  };

  useEffect(() => {
    if (response) {
      getFile();
    }
  }, [response]);

  return (
    <>
      <TitlePage
        text="Generación de Reportes de Encuestas"
        description="Para generar el Reporte PDF de encuesta Socioeconómica, cargá el archivo excel generado desde Caribú:"
      />
      <Row>
        <Col span={20} offset={2}>
          <FileUploader
            onSuccessRequest={onUploaded}
            source={{ name: 'socioeconomica' }}
            buttonText="Generar Reportes"
            createCredentials={false}
          />
        </Col>
      </Row>
    </>
  );
};

export default Reports;
