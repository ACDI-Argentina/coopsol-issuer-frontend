//https://www.w3.org/TR/did-core/

export const validateDid = did => {
  const parts = did.split(":");
  if(parts.length != 3 ){
    return false;
  } else {
    const [prefix, method, idd] = did.split(":")

    if(prefix !== "did" || !method.trim() || !idd.trim()){      
      return false;
    }                

    if(method === "ethr" && idd.length != 42){
      return false; 
    }
  }

  return true;

}
