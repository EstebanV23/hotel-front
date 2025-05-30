import config from "../config/config"
import { EstadosReservaEnum } from "../enums/EstadosReservaEnum"
import { Estado } from "../models/Estado"

export async function getEstadosReserva({
  codeEstado
}: {
  codeEstado: EstadosReservaEnum
}): Promise<Estado | null> {
  try {
    const response = await fetch(`${config.backendUrl}/estados/${codeEstado}`)
    const data = await response.json()
    return data.data as Estado
  } catch (error) {
    console.error("Error fetching estados reserva:", error)
    return null
  }
}