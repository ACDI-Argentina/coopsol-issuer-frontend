const blacklist = [
    "credentialState",
    "credentialType",
    "dniBeneficiary",
    "id",
    "idDidiCredential",
    "lastUpdate",
    "name",
    "revocable"
];

const labels = { 
    amountExpiredCycles: "Cantidad de cuotas vencidas",
    beneficiaryBirthDate: "Fecha de nacimiento del beneficiario",
    beneficiaryGender: "Género del beneficiario",
    beneficiaryType: "Tipo de beneficiario",
    creationDate: "Fecha de creación",
    creditHolderDni: "DNI Titular de Crédito",
    currentCycle: "Cuota actual",
    creditState: "Estado del Crédito",
    creditType: "Tipo de Crédito",
    dateOfIssue: "Fecha de emisión",
    dateOfRevocation: "Fecha de revocación",
    dwellingAddress: "Domicilio de Vivienda",
    dwellingType: "Tipo de Vivienda",
    endActivity: "Fin de actividad",
    entrepreneurshipAddress: "Dirección de emprendimiento",
    entrepreneurshipName: "Nombre de emprendimiento",
    entrepreneurshipType: "Tipo de emprendimiento",
    expiredAmount: "Saldo vencido",
    finishDate: "Fecha de finalización",
    holderName: "Nombre del titular",
    idBondareaCredit: "ID Crédito Bondarea",
    idDidiCredential: "ID credencial DIDI",
    idGroup: "ID Grupo",
    mainActivity: "Actividad principal",
    possessionType: "Tipo de tenencia",
    relationWithCreditHolder: "Relación con titular",
    startActivity: "Inicio de actividad",
    totalCycles: "Cuotas totales"
};

export default (fields) => {
    let result = [];
    for (const k in fields) {
      const value = fields[k];
      if ((value !== null) && !blacklist.includes(k)) {
        result.push({ label: labels[k], value });
      }
    }
    return result;
}