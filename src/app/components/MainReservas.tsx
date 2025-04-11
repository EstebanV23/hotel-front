'use client'
import { useReservaStore } from "../store/reservasStore";
import Reserva from "./Reserva";

export default function MainReservas() {
  const { habitacionesReserva } = useReservaStore((store) => store)
  if (!habitacionesReserva || habitacionesReserva.length === 0) return (
    <div className='bg-gray-200 p-3'>
      <p className='text-center'>No hay reservas</p>
    </div>
  )
  return (
    <Reserva habitaciones={habitacionesReserva} />
  )
}