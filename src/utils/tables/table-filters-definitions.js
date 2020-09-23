export const defaultFilters = credentialTypes => ({
  credentialType: {
    type: 'dropdown',
    name: 'Tipo',
    data: credentialTypes
  },
  name: {
    type: 'input',
    name: 'Nombre'
  },
  surname: {
    type: 'input',
    name: 'Apellido'
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

export const didCredentialsFilter = credentialTypes => ({
  credentialType: {
    type: 'dropdown',
    name: 'Tipo',
    data: credentialTypes
  },
  name: {
    type: 'input',
    name: 'Nombre'
  },
  surname: {
    type: 'input',
    name: 'Apellido'
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
  username: {
    type: 'input',
    name: 'Usuario'
  },
  message: {
    type: 'input',
    name: 'Descripción'
  },
  dateFrom: {
    type: 'date',
    name: 'Desde',
    format: date => new Date(date.toDate().setHours(0, 0, 0, 0)).toISOString()
  },
  dateTo: {
    type: 'date',
    name: 'Hasta',
    format: date => new Date(date.toDate().setHours(0, 0, 0, 0)).toISOString()
  }
});

export const defaultProviderFilters = categories => ({
  criteriaQuery: {
    type: 'input',
    name: 'Buscar'
  },
  categoryId: {
    type: 'dropdown',
    name: 'Categoria',
    data: categories
  },
  activesOnly: {
    type: 'dropdown',
    name: 'Activo',
    data: [{id: 0, description: 'No'}, {id: 1, description:'Si'}]
  }
});
