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

const revokeCredentials = () => ({});

const getCredentialStates = () => ({
  CREDENTIAL_ACTIVE: 'Vigente',
  CREDENTIAL_REVOKED: 'Revocada',
});

const getCredentialStatus = () => ({
  CREDENTIAL_PENDING_DIDI: 'Pendiente-didi',
});

const getCredentialTypes = () => [
  'Identitaria',
  'Resiliencia Climática',
  'Financiera',
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


const credentials = [
  {
    key: 1,
    credentialType: 'Financiera',
    idDidiCredential: "did:ethr:0x97b289b9aeb8e4def0aec06caa7cb163ee579f25",
    dateOfIssue: '18-04-2022',
    lastUpdate: new Date('2022-04-18T15:00:00'),
    dateOfExpiry: '20-04-2023',
    name: 'Juan Carbonell',
    dniBeneficiary: "42.587.423",
    credentialState: getCredentialStates()["CREDENTIAL_ACTIVE"]
  },
  {
    credentialType: 'Resiliencia Climática',
    key: 2,
    idDidiCredential: "did:ethr:0x4d1d81748e01a93081f0135b711efb82da7de491",
    dateOfIssue: '18-04-2022',
    lastUpdate: new Date('2022-04-18T15:00:00'),
    dateOfExpiry: '20-04-2023',
    name: 'Pablo Contreras',
    dniBeneficiary: "34.845.328",
    credentialState: getCredentialStates()["CREDENTIAL_ACTIVE"],
    isRevocable: true,
  },
  {
    credentialType: 'Identitaria',
    key: 3,
    idDidiCredential: "did:ethr:0x26a879e5e9b8998d40ea1780e9b8a61bbb088eb4",
    dateOfIssue: '24-04-2022',
    lastUpdate: new Date('2022-04-24T15:00:00'),
    dateOfExpiry: '24-04-2022',
    name: 'Ruben Ramos',
    dniBeneficiary: "19.545.024",
    credentialState: getCredentialStates()["CREDENTIAL_REVOKED"]
  }, 
  {
    credentialType: 'Financiera',
    key: 4,
    idDidiCredential: "did:ethr:0x37bda81ffaeb48bc6f4970ffdd4a2fc111b08475",
    dateOfIssue: '24-04-2022',
    lastUpdate: new Date('2022-04-18T15:00:00'),
    dateOfExpiry: '24-04-2022',
    name: 'Ruben Ramos',
    dniBeneficiary: "19.545.024", 
    credentialState: getCredentialStates()["CREDENTIAL_REVOKED"]
  },
  {
    credentialType: 'Financiera',
    key: 5,
    idDidiCredential: "did:ethr:0x0",
    dateOfIssue: '24-04-2022',
    lastUpdate: new Date('2022-04-18T15:00:00'),
    dateOfExpiry: '24-04-2022',
    name: 'Ruben Ramos',
    dniBeneficiary: "19.545.024", 
    credentialStatus: getCredentialStatus()["CREDENTIAL_PENDING_DIDI"]
  },
  {
    credentialType: 'Financiera',
    key: 6,
    idDidiCredential: "did:ethr:0x0",
    dateOfIssue: '24-04-2022',
    lastUpdate: new Date('2022-04-18T15:00:00'),
    dateOfExpiry: '24-04-2022',
    name: 'Ruben Ramos',
    dniBeneficiary: "19.545.024", 
    credentialStatus: getCredentialStatus()["CREDENTIAL_PENDING_DIDI"]
  },
  {
    credentialType: 'Identitaria',
    key: 7,
    idDidiCredential: "did:ethr:0xb86cdbffabec4ef993ce4c22827609964d2da490",
    dateOfIssue: '24-04-2022',
    lastUpdate: new Date('2022-04-18T15:00:00'),
    dateOfExpiry: '24-04-2022',
    name: 'Iryna Camino',
    dniBeneficiary: "22.853.665", 
    credentialState: getCredentialStates()["CREDENTIAL_ACTIVE"],
  }
  
];

const getCredentials = (filter) => {

  const fCredentials = credentials.filter(c => {
    if(filter.credentialState){
      return c.credentialState === filter.credentialState;
    } else {
      return true;
    }
  }).filter(c => {
    if(filter.credentialStatus){
      return c.credentialStatus === filter.credentialStatus;
    } else {
      return true;
    }
  }).filter(c => {
    if(filter.credentialType){
      return c.credentialType === filter.credentialType;
    } else {
      return true;
    }
  });

  
  return {
    content: fCredentials, 
    totalElements: fCredentials.length,
    size: fCredentials.length
  }
};

const getRevocationReasons = () => {
  return [];
}


const userMock = () => ({
  uploadFile,
  getCredentials,
  revokeCredentials,
  getCredentialTypes,
  getCredentialStatus,
  getCredentialStates,
  getActivityLog,
  getLogTypes,
  getLogLevels,
  getRevocationReasons
});

export default userMock;