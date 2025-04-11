'use client'
import { useState } from "react";
import Filtros from "./Filtros";
import Habitaciones from "./Habitaciones";
import { ResponseHabitaciones } from "../models/Habitacion";
import { DateValue, RangeValue } from "@nextui-org/react";

export default function HabitacionesContent() {
  const [habitaciones, setHabitaciones] = useState<ResponseHabitaciones>()
  const [dateRange, setDateRange] = useState<RangeValue<DateValue> | null>(null)

  return (
    <>
      <Filtros
        setHabitaciones={setHabitaciones}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <Habitaciones
        habitaciones={habitaciones}
        fecInicio={dateRange?.start.toDate('America/Bogota')}
        fecFin={dateRange?.end.toDate('America/Bogota')}
      />
    </>
  )
}