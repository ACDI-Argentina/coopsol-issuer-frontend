export const defaultFilters = credentialTypes => ({
  credentialType: {
    type: 'dropdown',
    name: 'Tipo',
    data: credentialTypes
  },
  firstName: {
    type: 'input',
    name: 'Nombre'
  },
  lastName: {
    type: 'input',
    name: 'Apellido'
  },
  lastUpdate: {
    type: 'date',
    name: 'Ult. actualización'
  }
});

export const getPendingCredentialsFilter = credentialTypes => ({
  credentialType: { 
    type: 'dropdown',
    name: 'Tipo',
    data: credentialTypes
  },
  firstName: {
    type: 'input',
    name: 'Nombre'
  },
  lastName: {
    type: 'input',
    name: 'Apellido'
  },
  createdFrom: {
    type: 'date',
    name: 'Desde'
  },
  createdTo: {
    type: 'date',
    name: 'Hasta'
  }
});

export const getActiveCredentialsFilter = credentialTypes => ({
  credentialType: { 
    type: 'dropdown',
    name: 'Tipo',
    data: credentialTypes
  },
  firstName: {
    type: 'input',
    name: 'Nombre'
  },
  lastName: {
    type: 'input',
    name: 'Apellido'
  },
  createdFrom: {
    type: 'date',
    name: 'Desde'
  },
  createdTo: {
    type: 'date',
    name: 'Hasta'
  }
});

export const getRevokedCredentialsFilter = credentialTypes => ({
  credentialType: { 
    type: 'dropdown',
    name: 'Tipo',
    data: credentialTypes
  },
  firstname: {
    type: 'input',
    name: 'Nombre'
  },
  lastname: {
    type: 'input',
    name: 'Apellido'
  },
  createdFrom: {
    type: 'date',
    name: 'Desde'
  },
  createdTo: {
    type: 'date',
    name: 'Hasta'
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


export const producerFilters = {
  lastname: {
    type: 'input',
    name: 'Apellido'
  },
  firstname: {
    type: 'input',
    name: 'Nombre'
  },
  dni: {
    type: 'input',
    name: 'DNI'
  },
  DID: {
    type: 'input',
    name: 'DID'
  },

};