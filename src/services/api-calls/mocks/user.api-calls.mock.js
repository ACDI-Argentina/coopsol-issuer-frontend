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
    creditState: 'Vigente'
  },
  {
    credentialType: 'Credencial',
    key: 2,
    idDidiCredential: 2,
    dateOfIssue: '20-04-2020',
    dateOfExpiry: '20-04-2020',
    name: 'Pablo',
    dniBeneficiary: 34845328,
    creditState: 'Vigente'
  },
  {
    credentialType: 'Master',
    key: 3,
    idDidiCredential: 3,
    dateOfIssue: '24-04-2020',
    dateOfExpiry: '24-04-2020',
    name: 'Ruben',
    dniBeneficiary: 19545024,
    creditState: 'Vencida'
  }
];

const revokeCredentials = () => ({});

export default () => ({
  uploadFile,
  getCredentials,
  revokeCredentials
});
