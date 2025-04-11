import config from "../config/config";
import { ResponseData } from "../models/ResponseData";

const BACKEND_URL = config.backendUrl

export default async function getHabitaciones({
  fecInicio,
  fecFinal,
  cantPersonas,
  servicios
} : {
  fecInicio: Date
  fecFinal: Date
  cantPersonas: number
  servicios: number[]
}) : Promise<ResponseData>{
  return await fetch(`${BACKEND_URL}/habitacion/tipohabitacion`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fecInicio,
      fecFinal,
      cantPersonas,
      servicios
    })
  })
  .then(response => response.json())
  .then(data => {
    return data
  })
  .catch(error => {
    console.error(error)
  })
}