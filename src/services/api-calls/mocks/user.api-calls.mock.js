/* eslint-disable max-len */

const uploadFile = () => ({
  data: {
    totalRows: 1966,
    validRows: 1960,
    totalInsertedRows: 1960,
    totalErrorsRows: 6,
    totalDeletedRows: 0,
    totalProcessedForms: 2,
    errorRows: ['[Q34]:Respuesta: String to Date conversion failed from null to dd/MM/yy'],
    fileError: null,
    fileValid: true
  }
});

const getCredentials = () => [
  {
    key: 1,
    credentialType: 'Algun tipo',
    idDidiCredential: 1,
    dateOfIssue: '20-04-2020',
    dateOfExpiry: '20-04-2020',
    name: 'Juan',
    dniBeneficiary: 42587423,
    credentialState: 'Vigente'
  },
  {
    credentialType: 'Credencial',
    key: 2,
    idDidiCredential: 2,
    dateOfIssue: '20-04-2020',
    dateOfExpiry: '20-04-2020',
    name: 'Pablo',
    dniBeneficiary: 34845328,
    credentialState: 'Vigente'
  },
  {
    credentialType: 'Master',
    key: 3,
    idDidiCredential: 3,
    dateOfIssue: '24-04-2020',
    dateOfExpiry: '24-04-2020',
    name: 'Ruben',
    dniBeneficiary: 19545024,
    credentialState: 'Vencida'
  }
];

const revokeCredentials = () => ({});

const getCredentialStates = () => ({
  CREDENTIAL_ACTIVE: 'Vigente',
  CREDENTIAL_REVOKED: 'Revocada'
});

const getCredentialStatus = () => ({
  CREDENTIAL_PENDING_DIDI: 'Pendiente-didi',
  CREDENTIAL_PENDING_BONDAREA: 'Pendiente-bondarea'
});

const getCredentialTypes = () => [
  'CredentialCredit',
  'CredentialDwelling',
  'CredentialIdentity',
  'CredentialEntrepreneurship'
];

const getActivityLog = () => ({
  content: [
    {
      executionDateTime: '07/07/2020 10:16:04',
      user: 'admin',
      level: 'ERROR',
      actionType: 'DIDI',
      message: 'Error de conexión con Didi'
    },
    {
      executionDateTime: '07/07/2020 10:16:04',
      user: 'admin',
      level: 'INFO',
      actionType: 'DIDI',
      message: 'Sincronización DIDI OK'
    }
  ],
  totalElements: 2,
  totalPages: 1,
  number: 0,
  size: 20,
  numberOfElements: 2
});

const getLogTypes = () => [
  { id: 0, description: 'ENCUESTA' },
  { id: 1, description: 'BONDAREA' },
  { id: 2, description: 'DIDI' },
  { id: 3, description: 'CREDENCIAL' },
  { id: 4, description: 'SOLICITUD CREDENCIAL' }
];

const getLogLevels = () => [
  { id: 0, description: 'INFO' },
  { id: 1, description: 'WARN' },
  { id: 2, description: 'ERROR' }
];

export default () => ({
  uploadFile,
  getCredentials,
  revokeCredentials,
  getCredentialTypes,
  getCredentialStatus,
  getCredentialStates,
  getActivityLog,
  getLogTypes,
  getLogLevels
});
