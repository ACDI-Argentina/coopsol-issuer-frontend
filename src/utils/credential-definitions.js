const blacklist = [
  'credentialState',
  'credentialType',
  'currentCycle',
  'dniBeneficiary',
  'id',
  'lastUpdate',
  'name',
  'isRevocable'
];

const labels = {
  amountExpiredCycles: 'Cantidad de cuotas vencidas',
  beneficiaryBirthDate: 'Fecha de nacimiento del beneficiario',
  beneficiaryGender: 'Género del beneficiario',
  beneficiaryType: 'Tipo de beneficiario',
  certificateNumber: 'Cert',
  creationDate: 'Fecha de creación',
  creditHolderDni: 'DNI Titular de Crédito',
  creditState: 'Estado del Crédito',
  creditType: 'Tipo de Crédito',
  currentCycle: 'Ciclo',
  currentCycleNumber: 'Cuota actual',
  dateOfIssue: 'Fecha de emisión',
  dateOfRevocation: 'Fecha de revocación',
  dwellingAddress: 'Domicilio de Vivienda',
  dwellingType: 'Tipo de Vivienda',
  endActivity: 'Fin de actividad',
  entrepreneurshipAddress: 'Dirección de emprendimiento',
  entrepreneurshipName: 'Nombre de emprendimiento',
  entrepreneurshipType: 'Tipo de emprendimiento',
  expiredAmount: 'Saldo vencido',
  finishDate: 'Fecha de finalización',
  holderName: 'Nombre del titular',
  idBondareaCredit: 'ID Crédito Bondarea',
  idDidiCredential: 'ID credencial DIDI',
  idGroup: 'ID Grupo',
  mainActivity: 'Actividad principal',
  policyNumber: 'Póliza',
  possessionType: 'Tipo de tenencia',
  ref: 'Ref',
  relationWithCreditHolder: 'Carácter',
  startActivity: 'Inicio de actividad',
  totalCycles: 'Cuotas totales',
  generalConditions: 'Condiciones generales',
  lightInstallation: 'Instalacion de luz',
  neighborhoodType: 'Tipo de barrio',
  gas: 'Red de gas',
  carafe: 'Garrafa',
  water: 'Red de agua',
  waterWell: 'Pozo/Bomba',
  address: 'Dirección',
  location: 'Localidad',
  neighborhood: 'Barrio',
  expirationDate: 'Fecha de vencimiento de Cuota',
  amount: 'Monto total del Credito [$]',
  startDate: 'Fecha de inicio del crédito'
};

const credential = fields => {
  let result = [];
  for (const prop in fields) {
    const value = wording(fields[prop]);
    if (value !== null && !blacklist.includes(prop)) {
      result.push({
        value,
        label: labels[prop]
      });
    }
  }
  return result;
};

export default credential;

const wording = value => {
  switch (value) {
    case true:
      return 'Si';
    case false:
      return 'No';
    default:
      return value;
  }
};

export const CREDENTIALS_SOURCES = [
  {
    name: 'socioeconomica',
    label: 'Encuesta Socioeconómica',
    showValidate: false
  },
  {
    name: 'sancor',
    label: 'Sancor Salud',
    showValidate: true
  }
];


export const CREDENTIAL_CATEGORIES = {
  identity: 'Identidad',
  identityHolder: 'Identidad - Titular',
  identityFamily: 'Identidad - Familiar'
};

/* 
export const CREDENTIAL_FIELDS = {
  "identitaria": [
    {
      name: "nombre",
      label: "Nombre",
      description: "Nombre completo",
      type: "String",
    },
    {
      name: "dni",
      label: "DNI",
      description: "",
      type: "String",
    },
    {
      name: "fechanacimiento",
      label: "Fecha de nacimiento",
      description: "",
      type: "Date",
    },
    {
      name: "ubicacion",
      label: "Ubicación",
      description: "",
      type: "String", // Geo zona  - vamos a necesitar geo reverse quizas
    },
  ],
  "financiera": [
    {
      name: "nombre",
      label: "Nombre",
      description: "Nombre completo",
      type: "String",
    },
    {
      name: "scoring",
      label: "Scoring",
      description: "",
      type: "Number",
    },
    {
      name: "historialCrediticio",
      label: "Historial crediticio con COOPSOL",
      description: "",
      type: "Boolean",
    },
    {
      name: "colmenasActivas",
      label: "Registro de colmenas activas y crecimiento productivo",
      description: "",
      type: "Boolean",
    },
    {
      name: "socioApona",
      label: "Socio de APONA",
      description: "",
      type: "Boolean",
    },
    {
      name: "pagos",
      label: "Historial de pagos a término",
      description: "",
      type: "Boolean",
    },
    
  ],
  "socioeconomica": [
    {
      name: "nombre",
      label: "Nombre",
      description: "Nombre completo",
      type: "String",
    },
    {
      name: "grupoFamiliar",
      label: "Integrantes grupo familiar",
      description: "",
      type: "Number",
    },
    {
      name: "ingresosPrincipal",
      label: "Fuente de ingresos principal",
      description: "",
      type: "String",
    },
    {
      name: "ingresosSecundarios",
      label: "Fuente de ingresos por fuera de su actividad:",
      description: "",
      type: "String",
    },
    {
      name: "ingresosMensual",
      label: "Ingreso mensual estimado de su grupo familiar:",
      description: "",
      type: "String",
    },
    
  ],
  "productiva": [
    {
      name: "nombre",
      label: "Nombre",
      description: "Nombre completo",
      type: "String",
    },
    {
      name: "inicioActividades",
      label: "Inicio de actividades",
      description: "",
      type: "Date",
    },
    {
      name: "cantidadColmenas",
      label: "Cantidad de colmenas",
      description: "",
      type: "Number",
    },
    {
      name: "esProductorOrganico",
      label: "Es productor orgánico",
      description: "",
      type: "Boolean",
    },
    {
      name: "otrasactividades",
      label: "Otras actividades",
      description: "",
      type: "Checkbox",
      options: [
        { name: "agropecuario", label: "Produccion Agropecuaria" },
        { name: "agricola", label: "Produccion Agricola" },
        { name: "ganadera", label: "Produccion Ganadera" },
        { name: "caprina", label: "Produccion Caprina" },
        { name: "maderero", label: "Produccion Maderera" },
        { name: "forestal", label: "Produccion Forestal" },
      ]
    },
  ], 
}

 */