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
  creditHolderDni: {
    type: 'input',
    name: 'DNI Titular'
  },
  idDidiCredential: {
    type: 'input',
    name: 'DID'
  },
  lastUpdate: {
    type: 'date',
    name: 'Ult. actualización'
  }
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
  creditHolderDni: {
    type: 'input',
    name: 'DNI Titular'
  },
  lastUpdate: {
    type: 'date',
    name: 'Ult. actualización'
  }
});

export const defaultActivityFilters = (logTypes, logLevels) => ({
  actionType: {
    type: 'dropdown',
    name: 'Tipo',
    data: logTypes
  },
  level: {
    type: 'dropdown',
    name: 'Nivel',
    data: logLevels
  },
  message: {
    type: 'input',
    name: 'Descripción'
  },
  username: {
    type: 'input',
    name: 'Usuario'
  },
  dateFrom: {
    type: 'date',
    name: 'Desde'
  },
  dateTo: {
    type: 'date',
    name: 'Hasta'
  }
});
