'use client'
import { create } from "zustand"
import { Habitacion } from "../models/Habitacion"

export interface HabitacionReserva extends Habitacion {
  fecInicio: Date
  fecFin: Date
  canPersonas: number
}

interface ReservaStore {
  habitacionesReserva: HabitacionReserva[] | null
  addHabitacion: ({ habitacion }: { habitacion: HabitacionReserva }) => void
  removeHabitacion: ({ idHabitacion }: { idHabitacion: number }) => void
  setHabitacionesReserva: ({ habitacionesReserva }: { habitacionesReserva: HabitacionReserva[] }) => void
}

export const useReservaStore = create<ReservaStore>((set) => ({
  habitacionesReserva: null,
  addHabitacion: ({ habitacion }) => set((oldSet) =>{ 
    const newHabitacion = {
      habitacionesReserva: oldSet.habitacionesReserva ? [...oldSet.habitacionesReserva, habitacion] : [habitacion]
    }
    return newHabitacion
  }),
  removeHabitacion: ({ idHabitacion }) => set((oldSet) => {
    const newHabitaciones = {
      habitacionesReserva: oldSet.habitacionesReserva?.filter(habitacion => habitacion.id_habitacion !== idHabitacion)
    }
    return newHabitaciones
  }),
  setHabitacionesReserva: ({ habitacionesReserva }) => set({ habitacionesReserva })
}))