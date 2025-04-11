import { Habitacion } from "../models/Habitacion"

export function getAmountHabitacion({
  habitacion,
  fecInicio = new Date(),
  fecFin = new Date()
}: {
  habitacion: Habitacion
  fecInicio?: Date
  fecFin?: Date
}): number {
  const diffTime = Math.abs(fecFin.getTime() - fecInicio.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1
  return habitacion.servicio_habitacion.reduce((acc, servicio) => {
    return acc + servicio.servicio_tbl.pre_servicio * servicio.servicio_tbl.can_per_servicio * diffDays
  }, 0)
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount)
}

export function getAmountHabitacionFormat({
  habitacion,
  fecInicio = new Date(),
  fecFin = new Date()
}: {
  habitacion: Habitacion
  fecInicio?: Date
  fecFin?: Date
}): string {
  return formatCurrency(getAmountHabitacion({ habitacion, fecInicio, fecFin }))
}