
/* Ver que renderizamos */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProducerForm from "../../molecules/ProducerForm/ProducerForm";
import api from "../../../services/api-calls/all";

const Producer = ({ }) => {
  let { id } = useParams();
  const [producer, setProducer] = useState();
  const { getProducer } = api();

  useEffect(() => {
    async function loadProducer(){
      const producer = await getProducer(id);
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