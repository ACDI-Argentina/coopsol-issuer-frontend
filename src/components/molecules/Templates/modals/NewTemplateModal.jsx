
import React, { useEffect, useState } from 'react';
import { Typography, Button, Input, message, Modal} from 'antd';
import styled from 'styled-components';
import DidiBackend from '../../../../services/didi/DidiBackend';
import { useTemplates } from '../../../../context/TemplatesContext';
const { Text } = Typography;


const InputContainer = styled.div`
  width: 100%;
  margin: 0px 0px 10px 0px;

  .ant-input {
    margin: 5px 0px;
  }
`

const NewTemplateModal = ({showModal , closeModal }) => {
  const [templateName, setTemplateName] = useState("");
  const { loadTemplates } = useTemplates();


  useEffect(() => {
    if(!showModal){
     setTemplateName("");
    }
  },[showModal])

  return (
    <Modal 
      title={"Nuevo template"}
      visible={showModal}
      centered={false}
      destroyOnClose={true}
      bodyStyle={{
        alignItems: "flex-start"
      }}
      onOk={async () => {

        const result = await new DidiBackend().templates().create({
          name: `Coopsol - ${templateName}`,
          registerId: "61ae3327ab3a470038a029dc"
        })

        if (result.status === "success") {
          message.success("Template creado exitosamente");
          closeModal();
          loadTemplates();
        } else {
          message.error("Ha ocurrido un error al intentar crear el template")
          closeModal();
        }
        console.log(result)

        //if success.. close modal


      }}
      onCancel={closeModal}
      okButtonProps={{
        disabled: templateName?.length === 0
      }}

    >
      <InputContainer>
        <Text>Nombre</Text>
        <Input
          type="Text"
          value={templateName}
          onChange={(ev) => setTemplateName(ev.target.value)}

        />
      </InputContainer>

      <InputContainer>
        <Text>Emisor</Text>
        <Input type="Text" value="Lacchain" readOnly />
      </InputContainer>

    </Modal>
  )
}
export default NewTemplateModal;