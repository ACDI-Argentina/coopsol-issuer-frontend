import React from 'react';
import './_style.scss';
//import '../../../css/app.scss';
import { HOME_URL } from '../../../utils/constants';

const Error404 = () => (
  <div>
    <div className="Error404">
      <div className="textSection">
        <h1>404</h1>
        <div className="text">
          <h2>We sincerely apologize.</h2>
          <p>
            Please, go back to the previous page or go to the main page.
            <br />
            if you are searching for information about an event, a exhibition, an artwork or
            something else, please try searching for this.
          </p>
          <a href={HOME_URL}>> Go Home</a>
        </div>
      </div>
      <div className="errorImage">
        <img src="img/error404.png" alt="error404" />
      </div>
    </div>
  </div>
);

export default Error404;
