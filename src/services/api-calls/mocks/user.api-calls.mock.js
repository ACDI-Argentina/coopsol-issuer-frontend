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

const getCredentialTypes = () => [
  'CredentialCredit',
  'CredentialDwelling',
  'CredentialIdentity',
  'CredentialEntrepreneurship'
];
const getCredentialStates = () => [
  'Pendiente-bondarea',
  'Pendiente-didi',
  'Vigente',
  'Vencida',
  'Caducada',
  'Revocada'
];

export default () => ({
  uploadFile,
  getCredentials,
  revokeCredentials,
  getCredentialTypes,
  getCredentialStates
});
