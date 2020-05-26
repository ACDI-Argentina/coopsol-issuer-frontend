export const defaultFilters = credentialTypes => ({
  credentialType: {
    type: 'dropdown',
    name: 'Tipo',
    data: credentialTypes
  },
  name: {
    type: 'input',
    name: 'Nombre y Apellido'
  },
  dniBeneficiary: {
    type: 'input',
    name: 'DNI'
  },
  idDidiCredential: {
    type: 'input',
    name: 'DID'
  },
  lastUpdate: {
    type: 'date',
    name: 'Ult. actualización'
  },
});

export const didCredentialsFilter = credentialTypes => ({
  credentialType: {
    type: 'dropdown',
    name: 'Tipo',
    data: credentialTypes
  },
  name: {
    type: 'input',
    name: 'Nombre y Apellido'
  },
  dniBeneficiary: {
    type: 'input',
    name: 'DNI'
  },
  lastUpdate: {
    type: 'date',
    name: 'Ult. actualización'
  },
});
