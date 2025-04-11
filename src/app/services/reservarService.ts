import config from "../config/config"

export interface RequestReservar {
  idHabitacion: number
  fecInicio: string
  fecFinal: string
  canPersonas: number
  cosTotal: number,
}

const URL_BACKEND = config.backendUrl

export default async function reservarService({
  habitaciones,
  token
}: {
  habitaciones: RequestReservar[],
  token: string
}): Promise<any> {
  try {
    const res = await fetch(`${URL_BACKEND}/habitacion/reservar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        habitaciones
      })
    })
    const data = await res.json()
    return data
  } catch (error) {
    return null
  }
}