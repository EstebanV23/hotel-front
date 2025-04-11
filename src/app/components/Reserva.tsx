import { HabitacionReserva } from "../store/reservasStore";
import ReservaDetail from "./ReservaDetail";

export default function Reserva({
  habitaciones
}: {
  habitaciones: HabitacionReserva[]
}) {
  return (
    <div className="flex flex-col gap-10">
      {
        habitaciones.map(habitacion => (
          <ReservaDetail key={habitacion.id_habitacion+habitacion.des_habitacion+'habitacion'} habitacion={habitacion} />
        ))
      }
    </div>
  )
}