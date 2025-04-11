'use client'
import { Habitacion, ResponseHabitaciones } from '../models/Habitacion'
import CardHabitacion from './CardHabitacion'
import SkeletonCard from './SkeletonCard'
import { useReservaStore } from '../store/reservasStore'
import { useAuthStore } from '../store/authStore'
import ModalLogin from './ModalLogin'
import { useDisclosure } from '@nextui-org/react'

const CARD_SKELETON = [0,0,0,0,0,0,0]

export default function Habitaciones({
  habitaciones,
  fecInicio = new Date(),
  fecFin = new Date()
}: {
  habitaciones?: ResponseHabitaciones
  fecInicio?: Date
  fecFin?: Date
}) {
  const { addHabitacion, removeHabitacion } = useReservaStore(store => store)
  const { token, idUsuario } = useAuthStore(store => store)
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  function agregarReserva (habitacionFound: Habitacion) {
    if (!token || !idUsuario) {
      onOpen()
      return
    }
    addHabitacion({
      habitacion: {
        ...habitacionFound,
        fecInicio,
        fecFin,
        canPersonas: 1
      }
    })
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-3 my-3 items-stretch'>
      {
        habitaciones ? habitaciones.map(habitacion => (
          <CardHabitacion
            fnAdd={() => {
              agregarReserva(habitacion)
            }}
            fnRemove={() => {
              removeHabitacion({ idHabitacion: habitacion.id_habitacion })
            }}
            key={habitacion.id_habitacion+'habitacionmain'}
            habitacion={habitacion}
          />
        )) : CARD_SKELETON.map((_, index) => (
          <SkeletonCard key={index} />
        ))
      }
      <ModalLogin
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  )
}