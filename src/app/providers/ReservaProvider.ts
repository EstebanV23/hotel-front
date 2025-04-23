'use client'
import { useEffect } from "react"
import { HabitacionReserva, useReservaStore } from "../store/reservasStore"

export default function ReservaProvider({ children }: { children: React.ReactNode }) {
  const { setHabitacionesReserva, habitacionesReserva } = useReservaStore(store => store)
  useEffect(() => {
    const habitacionesReservaStorage = localStorage.getItem('habitacionesReserva') as string | null

    if (!habitacionesReservaStorage || habitacionesReservaStorage.length === 0) {
      setHabitacionesReserva({ habitacionesReserva: [] })
      return
    }

    const parsedHabitacionesReserva = JSON.parse(habitacionesReservaStorage) as HabitacionReserva[]
    setHabitacionesReserva({ habitacionesReserva: parsedHabitacionesReserva })
  }, [])

  useEffect(() => {
    if (!habitacionesReserva) return
    localStorage.setItem('habitacionesReserva', JSON.stringify(habitacionesReserva))
  }, [habitacionesReserva])
  
  return children
}