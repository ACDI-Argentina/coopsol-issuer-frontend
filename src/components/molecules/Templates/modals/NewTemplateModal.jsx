
import React, { useEffect, useState } from 'react';
import { Typography, Button, Input, message, Modal } from 'antd';
import styled, { keyframes } from 'styled-components';
import DidiBackend from '../../../../services/didi/DidiBackend';
import { useTemplates } from '../../../../context/TemplatesContext';
import { Select } from 'antd';

const { Text } = Typography;
const { Option } = Select;


const InputContainer = styled.div`
  width: 100%;
  margin: 0px 0px 10px 0px;

  .ant-input {
    margin: 5px 0px;
  }
`

const NewTemplateModal = ({ showModal, closeModal }) => {
  const [templateName, setTemplateName] = useState("");
  const [register, setRegister] = useState();
  const { registers, loadTemplates, loadRegisters } = useTemplates();

  useEffect(() => {
    if (!registers || registers.length === 0) {
      loadRegisters();
    }
  }, [])


  useEffect(() => {
    if (!showModal) {
      setTemplateName("");
      setRegister(undefined);
    }
  }, [showModal])

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

        try{
          const result = await new DidiBackend().templates().create({
            name: templateName,
            registerId: register
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

        } catch(err){
          console.log(err.message);
          message.error(err.message);  
        }
      }}
      onCancel={closeModal}
      okButtonProps={{
        disabled: templateName?.length === 0 || !register
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
        {/* <Input type="Text" value="Lacchain" readOnly /> */}
        <div>
          <Select 
            value={register}
            style={{width: "100%"}}
            onChange={registerId => setRegister(registerId)}
            >
            {registers.map(register => (
              <Option key={register._id} value={register._id}>{register.name}</Option>
            ))}

          </Select>
        </div>
      </InputContainer>

    </Modal>
  )
}
export default NewTemplateModal;
