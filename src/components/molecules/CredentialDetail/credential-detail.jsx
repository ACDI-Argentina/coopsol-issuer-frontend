import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './_style.scss';
import { Descriptions, Spin } from 'antd';
import DidiBackend from 'services/didi/DidiBackend';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 118px;

`

const CredentialDetail = ({ credential }) => {
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState([]);
  
  async function loadCredential() { 
    try {
      setLoading(true);
      const credentialDetails = await new DidiBackend().credentials().get(credential._id);

      const { cert, participant, others } = credentialDetails?.data;
      const fields = [].concat(cert, participant[0], others).sort((a, b) => { //Mandamos al did al final para que se vea mejor. TODO: Definir un orden de acuerdo a los tipos
        if (a.name === "DID") {
          return 1;
        } else if (b.name === "DID") {
          return -1;
        }
      });
      setFields(fields);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCredential();
  }, [])

  return (
    <div className="CredentialDetail">
      {loading &&
        <SpinnerContainer>
          <Spin/>
        </SpinnerContainer>
      }
      {!loading && (
        <Descriptions size="small" bordered>
          {fields?.map((field, idx) => {
            let value = field.value;
            if(field.type === "Boolean"){
              value = field.value? "Sí":"No"
            }
            
            return (
              <Descriptions.Item key={idx} label={field.name}>
                {value}
              </Descriptions.Item>
            )
          })}
        </Descriptions>

      )}
    </div>
  );
};

export default CredentialDetail;
