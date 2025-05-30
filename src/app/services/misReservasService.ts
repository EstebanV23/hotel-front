import config from "../config/config";
import { EstadosReservaEnum } from "../enums/EstadosReservaEnum";
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

export async function actualizarReserva({
  token,
  idReserva,
  estado
}: {
  token: string,
  idReserva: number,
  estado: string
}) {
  return fetch(`${URL_BACKEND}/reserva/actualizar`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      idReserva,
      codEstado: estado
    })
  })
}