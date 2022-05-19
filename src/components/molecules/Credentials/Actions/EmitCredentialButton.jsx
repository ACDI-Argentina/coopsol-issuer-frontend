import { Button } from "antd";
import { useCredentials } from "../../../../context/CredentialsContext";

const EmitCredentialButton = ({ credential }) => {
  const { emitSingleCredential, loading } = useCredentials(); 
  const credentialLoading = loading[credential._id];

  return (
    <Button
      loading={credentialLoading}
      type="link"
      onClick={() => {
        console.log(`Emitting!, `, credential)
        typeof emitSingleCredential === "function" && emitSingleCredential(credential)
      }}>

      {credentialLoading? `Emitiendo`:`Emitir`}
    </Button>
  )
}
export default EmitCredentialButton;