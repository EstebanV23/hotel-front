'use client'
import { Reserva } from "../models/Reserva";
import { useAuthStore } from "../store/authStore";
import MisReservasDetail from "./MisReservasDetail";

export default function MisReservasCard({
  reservas
}: {
  reservas: Reserva[]
}) {
  const token = useAuthStore(state => state.token)
  
  if (!token) return null

  return reservas.map((reserva) => {
    return reserva.reserva_habitacion_tbl.map((reservaHabitacion) => (
      <MisReservasDetail
        key={`${reservaHabitacion.id_habitacion_reserva_habitacion}-${reservaHabitacion.id_reserva_reserva_habitacion}-${reserva.id_reserva}`}
        reserva={reserva}
        reservaHabitacion={reservaHabitacion}
        token={token}
      />
    ))
  })
}