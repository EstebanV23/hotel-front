'use client'
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import Container from "./Container";
import { Reserva } from "../models/Reserva";
import misReservas from "../services/misReservasService";
import { toast } from "sonner";
import MisReservasSkeleton from "./MisReservasSkeleton";
import MisReservasCard from "./MisReservasCard";

export default function MainMisReservas() {
  const { idUsuario, nomUsuario, emaUsuario, token } = useAuthStore((store) => store)
  const [reservas, setReservas] = useState<Reserva[] | null>(null)

  useEffect(() => {
    if (idUsuario && token) {
      misReservas({
        token
      })
        .then(data => {
          if (data === null) throw new Error("Error al obtener reservas")
          toast.success("Reservas obtenidas")
          setReservas(data.data)
        })
        .catch(error => {
          console.error(error)
          toast.error("Error al obtener reservas")
        })
    }
  }, [])

  return (
    <Container>
      <h1 className="text-3xl font-bold">Mis reservas</h1>
      <div className="flex flex-col gap-1">
        <p>{nomUsuario}</p>
        <small className="text-gray-400">{emaUsuario}</small>
      </div>
      <div className="flex flex-col gap-10">
        {
          reservas === null ? (
            <MisReservasSkeleton />
          ) : reservas.length === 0 ? (
            <p className=" p-5 rounded-lg bg-gray-300">No tiene reservas aún</p>
          ) : (
            <MisReservasCard reservas={reservas} />
          )
        }
      </div>
    </Container>
  )
}