import config from "../config/config";
import { ReservaResponse } from "../models/Reserva";

const URL_BACKEND = config.backendUrl

export default async function misReservas({
  token
}: {
  token: string
}){
  try {
    const response = await fetch(`${URL_BACKEND}/reserva/misreservas`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()
    return data as ReservaResponse
  } catch (error) {
    console.error(error)
    return null
  }
}