import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../services/providers/user-context';
import apiCalls from '../../../services/api-calls/all';
import AntForm from '../../molecules/ant-form';
import { processedErrorMessage } from '../../../services/api-calls/helpers';
import { useRedirect } from '../../Router/redirect';
import { HOME_URL } from '../../../utils/constants';
import {Progress} from 'reactstrap';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
//import './_style.scss';
//import '../../../css/app.scss';

const { uploadFile } = apiCalls();



const FileUploader = () => {
    const { user, setUser } = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState();

    return(
    <div>
     <AntForm inputs={} handleSubmit={upload} submitText={'Upload'} />
    <FilePond ref={ref => this.pond = ref} />
    </div>
  /* // y tengo que ver una forma de pasarle al AntForm como inputs el "this.pond.getFiles()" */
      );


    const upload = async values => {
      try {
        const response = await uploadFile(values);
        setUser(response.data);
      } catch (error) {
        const errorMessage = processedErrorMessage(error);
        setErrorMessage(errorMessage);
      }
    };
};

export default FileUploader;



