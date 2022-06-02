import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import DidiBackend from '../../../services/didi/DidiBackend';
import TemplateForm from "./TemplateForm";

const CreateTemplate = ({ }) => {
  const { id } = useParams();
  const history = useHistory();
  const [template, setTemplate] = useState();
  //Get template and pass to template form

  useEffect(() => {
    async function loadTemplate(){
      const template = await new DidiBackend().templates().get(id)
      setTemplate(template)
    }
    if(id){
      loadTemplate();
    }
  },[id])

  if(!id||!template){
    return null; //Return error message or skeleton?
  }

  return (
    <TemplateForm
      template={template}
      onSuccess={() => {
        history.push("/templates");
      }}

    />
  )
}
export default CreateTemplate;