/* eslint-disable max-len */

const uploadFile = () => ({});

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
export default () => ({
  uploadFile,
  getCredentials,
  revokeCredentials,
  getCredentialTypes,
  getCredentialStatus,
  getCredentialStates
});
