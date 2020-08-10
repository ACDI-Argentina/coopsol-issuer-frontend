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
  relationWithCreditHolder: 'Relación con titular',
  startActivity: 'Inicio de actividad',
  totalCycles: 'Cuotas totales'
};

export default fields => {
  let result = [];
  for (const prop in fields) {
    const value = fields[prop];
    if (value !== null && !blacklist.includes(prop)) {
      result.push({
        value,
        label: labels[prop]
      });
    }
  }
  return result;
};
