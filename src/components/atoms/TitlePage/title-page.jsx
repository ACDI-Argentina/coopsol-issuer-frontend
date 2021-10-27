import React from 'react';
import './_style.scss';

const TitlePage = ({ text, description, content }) => {
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
