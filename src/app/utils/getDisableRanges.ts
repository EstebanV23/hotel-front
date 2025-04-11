import { DateValue } from "@nextui-org/react";
import { Habitacion } from "../models/Habitacion";
import { CalendarDate, today } from "@internationalized/date";

export default function getDisableRanges({
  habitacion
}: {
  habitacion: Habitacion
}): [CalendarDate, CalendarDate][] {
  const disableRanges: [CalendarDate, CalendarDate][] = []
  disableRanges.push(...habitacion.reserva_habitacion_tbl.map(reserva => {
    const initDate = new Date(reserva.reserva_tbl.fec_ent_reserva)
    const endDate = new Date(reserva.reserva_tbl.fec_sal_reserva)

    const yearInit = initDate.getFullYear()
    const monthInit = initDate.getMonth() + 1
    const dayInit = initDate.getDate()

    const yearEnd = endDate.getFullYear()
    const monthEnd = endDate.getMonth() + 1
    const dayEnd = endDate.getDate()

    const fechaInicial = new CalendarDate(yearInit, monthInit, dayInit)
    const fechaFinal = new CalendarDate(yearEnd, monthEnd, dayEnd)

    return [
      fechaInicial,
      fechaFinal
    ]
  }) as [CalendarDate, CalendarDate][])
  return disableRanges
}