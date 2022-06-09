import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoopsolBackend from "services/coopsol/CoopsolBackend";
import ProducerForm from "../../molecules/ProducerForm/ProducerForm";


const Producer = ({ }) => {
  let { id } = useParams();
  const [producer, setProducer] = useState();
  

  useEffect(() => {
    async function loadProducer(){
      const producer = await CoopsolBackend().producers().get(id);
      setProducer(producer)
    }
    loadProducer();

  }, [])

  return (
    <div>
      <ProducerForm producer={producer} />
    </div>
  )
}
export default Producer;