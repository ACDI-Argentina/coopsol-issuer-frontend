import styled from 'styled-components';

export const Section = styled.div`
  margin: 25px 0px 20px 0px;
`
export const Title = styled.div`
  font-size: 1.25rem;
  margin: 5px 0px;
`

export const AddField = styled.button`
  cursor: pointer;
  border: 1px solid steelblue;
  background-color: #4F86F7;
  color: white;

  border-radius: 3px;

  padding: 5px 10px;
  margin: 5px 0px;

`

export const TemplateFormWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const TemplateFormContainer = styled.div`
min-width: 30vw;
`
export const FieldWrapper = styled.div`
  /* border: 2px solid #4F86F7; */
  margin: 15px 0px;
`
export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  .ant-checkbox-wrapper {
    margin-left: 0px;
  }
`

export const ActionsContainer = styled.div`
  /* border: 2px solid red; */
  margin-top: 5px;
`

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0px;

`

export const Label = styled.div`
  font-size:1.04rem;
`
export const AddFieldContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

/*<div style={{ border: "2px solid #4F86F7", wordBreak: "break-all", position: "absolute", zIndex: 2, backgroundColor: 'white', right: 0, padding: "20px" }}>
  <pre>
    {JSON.stringify(credentialData, null, 3)}
  </pre>
</div>

*/