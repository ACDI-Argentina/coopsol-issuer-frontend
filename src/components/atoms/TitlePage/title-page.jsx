import React from 'react';
import './_style.scss';
import ButtonPrimary from '../ButtonPrimary/button-primary';
import SyncModal from '../../molecules/SyncModal/sync-modal';

const TitlePage = ({ history, text, description, content }) => {
  return (
    <div className="TitlePage">
      <div className="title">
        <h1>{text}</h1>
        <div>{content}</div>
      </div>
      <p className="subtitle">{description}</p>
    </div>
  );
};

export default TitlePage;
