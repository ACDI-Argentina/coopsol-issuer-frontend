import React, { useEffect, useState } from 'react';
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Checkbox, Select, message } from 'antd';
import DynamicInput from '../../molecules/DynamicInput/DynamicInput';
import AddFieldModal from './AddFieldModal';
import {
  Section,
  Title,
  AddField,
  TemplateFormWrapper,
  TemplateFormContainer,
  FieldWrapper,
  FieldContainer,
  ActionsContainer,
  ButtonsContainer,
  Label,
  AddFieldContainer,
} from "./styled";

import DidiBackend from '../../../services/didi/DidiBackend';
import { useHistory } from 'react-router-dom';
import ButtonAntd from '../../atoms/ButtonAntd/ButtonAntd';

const { Option } = Select;


const normalizeField = field => {
  return {
    name: field.name,
    type: field.type,
    defaultValue: field?.defaultValue || '',
    mandatory: field?.mandatory || false,
    required: field?.required || false,
    options: field?.options || []
  }
}


const Field = ({ field, deleteField, onToggleRequired, mandatory, ...props }) => {
  return (

    <FieldWrapper key={field.name}>
      <Label>
        {field?.label || field.name}
      </Label>
      <FieldContainer>
        <DynamicInput
          field={{ ...field }}
          {...props}
          {...field?.extraProps}
        />
      </FieldContainer>
      <ActionsContainer>
        <Checkbox
          checked={mandatory || field?.required}
          onChange={ev => {
            if (mandatory) return;
            typeof onToggleRequired === "function" && onToggleRequired(ev.target.checked)
          }}
        >Requerido</Checkbox>
        {!mandatory && (
          <Button
            danger
            type="text"
            onClick={(ev) => {
              typeof deleteField === "function" && deleteField(field);
            }}>
            <DeleteOutlined />
          </Button>
        )}
      </ActionsContainer>

    </FieldWrapper>

  )
}



const updateFieldState = (prev, fieldName, prop, value) => {
  const clone = prev.concat();
  const fieldIdx = prev.findIndex(f => f.name === fieldName);

  if (fieldIdx > -1) {
    const prevField = prev[fieldIdx];
    const newField = {
      ...prevField,
      [prop]: value,
    }
    clone.splice(fieldIdx, 1, newField);
  }

  return clone;
};


const TemplateForm = ({ template, onSuccess }) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [addToSection, setAddToSection] = useState();
  const [submitting, setSubmitting] = useState(false);

  const openAddFieldModal = (section) => {
    setAddToSection(section);
    setShowModal(true)
  }

  const closeAddFieldModal = () => {
    setAddToSection("");
    setShowModal(false)
  }

  const [credentialFields, setCredentialFields] = useState(template?.data?.cert || []);
  const [participantFields, setParticipantFields] = useState(template?.data?.participant || []);
  const [otherFields, setOtherFields] = useState(template?.data?.others || []);

  useEffect(() => {
    console.log(`Template`, template);
    if (template?.data) {
      setCredentialFields(template.data.cert);
      setParticipantFields(template.data.participant);
      setOtherFields(template.data.others);
    } else {
      //Set loading...
    }
  }, [template])



  const setRequiredValue = (section, fieldName, required) => {
    if (section === "credential") {
      setCredentialFields(prev => updateFieldState(prev, fieldName, "required", required));
    } else if (section === "participant") {
      setParticipantFields(prev => updateFieldState(prev, fieldName, "required", required));
    } else if (section === "other") {
      setOtherFields(prev => updateFieldState(prev, fieldName, "required", required));
    }
  }

  const addFieldToSection = (section, value) => {
    if (section === "credential") {
      setCredentialFields(prev => prev.concat(value))
    } else if (section === "participant") {
      setParticipantFields(prev => prev.concat(value))
    } else if (section === "other") {
      setOtherFields(prev => prev.concat(value))
    }
  }

  const deleteFieldFromSection = (section, field) => {
    if (section === "credential") {
      setCredentialFields(prev => prev.filter(f => f.name !== field.name))
    } else if (section === "participant") {
      setParticipantFields(prev => prev.filter(f => f.name !== field.name))
    } else if (section === "other") {
      setOtherFields(prev => prev.filter(f => f.name !== field.name))
    }
  }

  const credentialData = {
    cert: credentialFields?.map(normalizeField),
    participant: participantFields?.map(normalizeField),
    others: otherFields?.map(normalizeField),
  };

  const [credentialCategory, setCredentialCategory] = useState(template.category);

  const [previewType, setPreviewType] = useState(template.previewType);
  const [previewFields, setPreviewFields] = useState(template.previewData);

  console.log(`previewType ${previewType} ${typeof previewType}` )

  //como mostramos los campos de la crendecial

  console.log(
    []
    .concat(credentialData.cert)
    .concat(credentialData.participant)
    .concat(credentialData.others)
  )
  const fields = []
    .concat(credentialData.cert)
    .concat(credentialData.participant)
    .concat(credentialData.others)
    .filter(f => f.name !== "CREDENCIAL")
    .filter(f => f.required)
    .map(f => f.name);

  return (
    <TemplateFormWrapper>
      <TemplateFormContainer>

        {/* Read from ctx */}
        <Section>
          <Title>
            Categoria de la credencial
          </Title>
          <Select
            defaultValue={credentialCategory}
            style={{ width: "100%" }}
            onChange={setCredentialCategory}
          >
            <Option value="EDUCACIÓN">EDUCACIÓN</Option>
            <Option value="FINANZAS">FINANZAS</Option>
            <Option value="VIVIENDA">VIVIENDA</Option>
            <Option value="IDENTIDAD">IDENTIDAD</Option>
            <Option value="BENEFICIOS">BENEFICIOS</Option>
            <Option value="LABORAL">LABORAL</Option>
          </Select>
        </Section>

        <Section>
          <Title>
            Datos de la credencial
          </Title>

          {credentialFields.map(field => {
            return (
              <Field
                key={field.name}
                mandatory={field?.mandatory}
                field={field}
                value={field.defaultValue}
                onChange={(ev) => {
                  const nValue = ev.target.value;
                  setCredentialFields(prev => updateFieldState(prev, field.name, "defaultValue", nValue));
                }}
                deleteField={field => deleteFieldFromSection("credential", field)}
                onToggleRequired={value => setRequiredValue("credential", field.name, value)}
              />
            );
          })}
          <AddFieldContainer>
            <AddField
              onClick={() => openAddFieldModal("credential")}
            >+ Nuevo Campo</AddField>
          </AddFieldContainer>
        </Section>
        <Section>
          <Title>
            Datos del Participante
          </Title>
          {participantFields.map(field => {
            return (
              <Field
                key={field.name}
                mandatory={field?.mandatory}
                field={field}
                value={field.defaultValue}
                onChange={(ev) => {
                  const nValue = ev.target.value;
                  setParticipantFields(prev => updateFieldState(prev, field.name, "defaultValue", nValue));
                }}
                deleteField={field => deleteFieldFromSection("participant", field)}
                onToggleRequired={value => setRequiredValue("participant", field.name, value)}
              />
            );
          })}

          <AddFieldContainer>
            <AddField
              onClick={() => openAddFieldModal("participant")}
            >+ Nuevo Campo</AddField>
          </AddFieldContainer>
        </Section>
        <Section>
          <Title>
            Otros Datos
          </Title>
          {otherFields.map(field => {
            return (
              <Field
                key={field.name}
                mandatory={field?.mandatory}
                field={field}
                value={field.defaultValue}
                onChange={(ev) => {
                  const nValue = ev.target.value;
                  console.log(`Field ${field.name} has changed `, ev.target.value)
                  setOtherFields(prev => updateFieldState(prev, field.name, "defaultValue", nValue));
                  console.log(otherFields)
                }}
                deleteField={field => deleteFieldFromSection("other", field)}
                onToggleRequired={value => setRequiredValue("other", field.name, value)}
              />
            );
          })}

          <AddFieldContainer>
            <AddField
              onClick={() => openAddFieldModal("other")}
            >+ Nuevo Campo</AddField>
          </AddFieldContainer>
        </Section>

        {addToSection}

        {showModal && (
          <AddFieldModal
            visible={true}
            onCancel={closeAddFieldModal}
            closeModal={closeAddFieldModal}
            onOk={
              (value) => { //name, type, required, 
                addFieldToSection(addToSection, value);
                closeAddFieldModal();
              }
            }
          />
        )}

        <Section>
          <Title>
            Campos a Previsualizar
          </Title>

          <div>
            <Select
              defaultValue={previewType}
              onChange={setPreviewType}>
              <Option value="1">2</Option>
              <Option value="2">4</Option>
              <Option value="3">6</Option>
            </Select>
          </div>
          <div>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%', maxWidth: "554px" }}
              placeholder="Seleccionar campos"
              defaultValue={previewFields}
              onChange={setPreviewFields}
            >
              {fields.map((field, idx) => <Option key={idx} value={field} >{field}</Option>)}
            </Select>
          </div>

        </Section>


        <ButtonsContainer>
          <Button
            type="text"
            onClick={() => history.goBack()}
          >Volver</Button>

          <ButtonAntd
            type="primary"
            size="large"
            icon={<SaveOutlined />}
            loading={submitting}
            onClick={async () => {
              try {
                setSubmitting(true);
                const response = await new DidiBackend().templates().update(template._id, {
                  data: JSON.stringify(credentialData),
                  category: credentialCategory,
                  preview: previewFields,
                  registerId: template.registerId,
                  type: previewType,
                });

                console.log(response.data);
                setSubmitting(false);

                message.success("Template actualizado exitosamente");
                typeof onSuccess === "function" && onSuccess();

              } catch (err) {
                setSubmitting(false);
                message.error(`Ha ocurrido un error al actualizar el template: ${err.message}`); //name
                console.log(err);
              }


            }}

          > Guardar </ButtonAntd>
        </ButtonsContainer>

      </TemplateFormContainer>
    </TemplateFormWrapper >



  )
};

export default TemplateForm;
