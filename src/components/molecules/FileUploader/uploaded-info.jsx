import React from 'react';
import { DUPLICATED_CREDENTIAL } from '../../../utils/constants';
import RevokeCredentials from '../RevokeCredentials/revoke-credentials';

const MANUAL_UPDATE = 6;

const UploadedInfo = ({ uploadResponse, onRevoke, revokeOnlyThisCredential = false }) => {
  const renderShouldRevokeCredential = err => {
    return (
      <p>
        Para continuar, debe revocar la Credencial:{' '}
        <span className="bold-text">{err.category}</span> -{' '}
        <span className="bold-text">{err.documentNumber}</span> -{' '}
        <span className="bold-text">{`${err.name} ${err.lastName}`}</span>{' '}
      </p>
    );
  };

  const renderErrors = () => {
    if (!uploadResponse?.errorRows) return;

    return uploadResponse.errorRows.map((err, index) => (
      <li key={index}>
        {err.errorHeader && (
          <span>
            {err.errorType == DUPLICATED_CREDENTIAL ? (
              <>
                <img src="/img/error-soft.svg" alt="" />
                <label className="soft-error" htmlFor="">
                  {err.errorHeader}
                </label>
              </>
            ) : (
              <>
                <img src="/img/error.svg" alt="" />
                <label htmlFor="">{err.errorHeader}</label>
              </>
            )}
          </span>
        )}
        {err.errorType == DUPLICATED_CREDENTIAL ? (
          renderShouldRevokeCredential(err)
        ) : (
          <p>{err.errorBody}</p>
        )}
        <p>
          <RevokeCredentials
            credential={{
              id: err.credentialId,
              name: `${err.name} ${err.lastName}`,
              dniBeneficiary: err.documentNumber,
              credentialType: err.category,
              excelErrorType: err.errorType
            }}
            reasonId={MANUAL_UPDATE}
            onRevoked={onRevoke}
            revokeOnlyThisCredential={revokeOnlyThisCredential}
          />
        </p>
      </li>
    ));
  };

  const hasErrors = uploadResponse?.totalErrorsRows > 0;

  return (
    !!uploadResponse && (
      <div className="result-container">
        <div className="result">
          <label className="process">Lineas procesadas: {uploadResponse.totalReadRows}</label>
          <label className="r-success">
            <img src="/img/check.svg" alt="" />
            {uploadResponse.totalProcessedForms} formulario(s)
          </label>
          <label className="r-success">
            <img src="/img/check.svg" alt="" />
            {uploadResponse.totalValidRows} líneas
          </label>
          <label className="r-error">
            <img src="/img/error.svg" alt="" />
            {uploadResponse.totalErrorsRows} líneas
          </label>
        </div>

        {hasErrors ? (
          <div className="error">
            <h4>Por favor, corregí los errores que se muestran y volvelo a subir</h4>
            <ul>{renderErrors()}</ul>
          </div>
        ) : (
          <div className="success">
            <img src="/img/success-file.svg" alt="" />
            <h4>Tu archivo fue cargado exitosamente!</h4>
          </div>
        )}
      </div>
    )
  );
};

export default UploadedInfo;
