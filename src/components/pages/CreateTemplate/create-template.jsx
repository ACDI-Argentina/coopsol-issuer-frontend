import React from 'react';
import { useParams } from 'react-router-dom';

const CreateTemplate = ({ }) => {

  const { id } = useParams();
  return <div>
    Edit Template {id}
  </div>
};

export default CreateTemplate;
