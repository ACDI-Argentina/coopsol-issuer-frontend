import React, { useEffect, useState } from 'react';
import { Modal, Input, Select, Checkbox, Button } from 'antd';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';
import styled from 'styled-components';
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons'

const { Option } = Select;


const ButtonsContainer = styled.div`
   width: 100%;
   display: flex;
   justify-content: flex-end;
   align-items: center;
   margin-top: 25px;

   button{
     margin-left: 10px;
   }
`

const ModalContent = styled.div`
  width: 100%;
  input{
    margin: 10px 0px;
  }
  .ant-select-selector{
    margin: 10px 0px;
  }
  .ant-checkbox-wrapper{
    margin-top: 15px;
  }
`

const AddOption = styled.div`
  display: flex;
  align-items: center;
  
`

const Row = styled.div`
  
  display: flex;
  align-items: center;
  margin: 2px 0px 0px 5px ;
`




const AddFieldModal = ({ closeModal, onOk, ...props }) => {
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("Text");
  const [fieldRequired, setFieldRequired] = useState(false);
  const [options, setOptions] = useState([]);

  const addOption = option => {
    setOptions(prev => prev.concat(option))
    setOptionName("");
  }

  const deleteOption = option => {
    setOptions(prev => prev.filter(opt => opt.name !== option.name))
  }
  const buttonDisabled = !fieldName || fieldName?.length === 0;

  const [optionName, setOptionName] = useState("");
  const addOptionDisabled = !fieldName || fieldName?.length === 0;

  return (
    <Modal
      title="Agregar campo"
      destroyOnClose={true}
      {...props}
    >
      <ModalContent>
        <div>Nombre</div>
        <Input
          type="text"
          name="name"
          placeholder="Nombre"
          autoComplete="off"
          autoFocus={true}
          value={fieldName}
          onChange={ev => setFieldName(ev.target.value)}
        />
        <div>Tipo</div>

        <Select
          value={fieldType}
          onChange={setFieldType}
          defaultValue="Text"
          style={{ width: "100%" }}
        >
          <Option value="Text">Text</Option>
          <Option value="Paragraph">Paragraph</Option>
          <Option value="Date">Date</Option>
          <Option value="Number">Number</Option>
          <Option value="Boolean">Boolean</Option>
          <Option value="Checkbox">Checkbox</Option>
        </Select>


        {fieldType === "Checkbox" && (
          <>
            <div>Opciones</div>
            <AddOption>
              <Input
                type="text"
                onChange={ev => setOptionName(ev.target.value)}
                value={optionName}
                onPressEnter={() => addOption({ name: optionName, label: optionName })}
              />
              <Button
                style={{border: "0px"}}
                disabled={optionName?.length === 0}
                type="text"
                onClick={() => addOption({ name: optionName, label: optionName })}
              >
                <PlusCircleOutlined />
              </Button>
            </AddOption>
            {options.map(option => (
              <Row key={option.name}>
                <div style={{flex:1}}>
                  {option.name}
                </div>
                <Button danger type="text" onClick={() => deleteOption(option)}>
                  <DeleteOutlined />
                </Button>

              </Row>
            ))}

          </>
        )}



        <Checkbox
          checked={fieldRequired}
          style={{ alignSelf: "flex-start" }}
          onChange={(ev) => { setFieldRequired(ev.target.checked) }}>Requerido</Checkbox>

        <ButtonsContainer>
          <ButtonPrimary
            theme={`error`}
            text={`Cerrar`}
            onClick={closeModal}
          />
          <ButtonPrimary
            disabled={buttonDisabled}
            text={`Crear`}
            theme={`ThemePrimary ${buttonDisabled ? "disabled" : ""}`}
            onClick={() => onOk({
              name: fieldName,
              type: fieldType,
              required: fieldRequired,
              options: options
            })}
          />
        </ButtonsContainer>
      </ModalContent>


    </Modal>


  )
}
export default AddFieldModal;