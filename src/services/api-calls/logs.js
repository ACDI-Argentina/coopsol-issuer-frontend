import { translateRevocationReason } from "../../utils/table-definitions";
import { CoopsolBackend } from 'services/di';


const getCredentialType = credential => {
  return credential?.data?.cert.find(f => f.name === "CREDENCIAL").value;
}
const getParticipant = credential => {
  return credential.data?.participant[0]
    .filter(f => ["NOMBRE", "APELLIDO"].includes(f.name))
    .sort((a, b) => a.name === "APELLIDO" ? -1 : 1)
    .map(f => f.value).join(", ")
}

const getMetadataStr = (metadata) => {
  const credentialType = getCredentialType(metadata?.credential);
  const participantStr = getParticipant(metadata?.credential);
  return ` [${credentialType}] - ${participantStr}`
}


//Mandar un type y que se encargue de armar el msg
export const logAction = async (type, metadata, message) => {
  let defaultMessage = "";
  if (type === "CREDENTIAL_CREATION") {
    defaultMessage = "Creación de credencial";
    if (metadata?.credential) {
      defaultMessage += getMetadataStr(metadata);
    }
  } else if (type === "CREDENTIAL_ISSUANCE") {
    defaultMessage = "Emisión de credencial";
    if (metadata?.credential) {
      defaultMessage += getMetadataStr(metadata);
    }
  } else if (type === "CREDENTIAL_REVOCATION") { //reason
    defaultMessage = "Revocación de credencial";

    if (metadata?.credential) {
      const reason = `[${translateRevocationReason(metadata?.reason)}]` || "";
      defaultMessage += ` ${reason} ${getMetadataStr(metadata)}`;
    }
  }

  try {
    await CoopsolBackend().activities.create({
      message: defaultMessage || message,
      metadata,
    });
  } catch (err) {
    console.log(err); //Ignore errors 
  }

}
