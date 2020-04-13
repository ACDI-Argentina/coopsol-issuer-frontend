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
  dateOfIssue: {
    type: 'date',
    name: 'Generada'
  },
  dateOfExpiry: {
    type: 'date',
    name: 'Caduca'
  }
});

export const pendingCredentialsFilter = {
  name: {
    type: 'input',
    name: 'Nombre y Apellido'
  },
  dniBeneficiary: {
    type: 'input',
    name: 'DNI'
  }
};

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
  dateOfIssue: {
    type: 'date',
    name: 'Generada'
  },
  dateOfExpiry: {
    type: 'date',
    name: 'Caduca'
  }
});
