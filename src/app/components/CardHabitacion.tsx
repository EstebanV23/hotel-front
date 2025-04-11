import { Habitacion } from "../models/Habitacion";
import { Button } from "@nextui-org/button";
import { Image, Tooltip } from "@nextui-org/react";
import { IconDeviceFloppy, IconSquarePlus, IconSquareRoundedMinus, IconUsers } from "@tabler/icons-react";
import { getAmountHabitacionFormat } from "../utils/getAmountHabitacion";
import { useReservaStore } from "../store/reservasStore";
import Iconos from "./Iconos";
import getCapacity from "../utils/getCapacity";

export default function CardHabitacion({
  habitacion,
  fnAdd,
  fnRemove
} : {
  habitacion: Habitacion,
  fnAdd: () => void,
  fnRemove: () => void
}) {
  const { habitacionesReserva } = useReservaStore((store) => store)
  return (
    <section className="w-full flex flex-col h-full gap-8 justify-between">
      <aside className="flex flex-col gap-1">
        <Image
          src={habitacion.images_tbl.find(image => image.ind_pri_image === 1)?.url_image ?? habitacion.images_tbl[0].url_image}
          alt={habitacion.des_habitacion}
          width={400}
          height={300}
          radius="none"
          className="w-full object-cover object-center"
        />
        <section>
          <h2 className="text-lg font-bold">{habitacion.des_habitacion}</h2>
          <p className="text-sm text-gray-500">{habitacion.tipo_alojamiento_tbl.des_tipo_alojamiento}</p>
        </section>
        <div className="flex flex-col gap-2">
          {
            habitacion.servicio_habitacion.map((servicioHabitacion) => {
              return (
                <div className="flex gap-3 items-center">
                  <Iconos iconString={servicioHabitacion.servicio_tbl.tipo_servicio_tbl.ico_tipo_servicio} />
                  <p>{servicioHabitacion.can_servicio_habitacion} {servicioHabitacion.servicio_tbl.nom_servicio}</p>
                </div>
              )
            })
          }
          <div className="flex gap-3 items-center">
            <IconUsers />
            <p>{getCapacity({habitacion})} Personas</p>
          </div>
        </div>
        <section className="flex flex-col gap-0 justify-end">
          <p>{getAmountHabitacionFormat({ habitacion })}</p>
          <small className="text-gray-400">Por noche/día</small>
        </section>
      </aside>
      <div className="flex gap-3">
        {habitacionesReserva && habitacionesReserva.find(habReserva => habReserva.id_habitacion === habitacion.id_habitacion) ?
          <Button
            startContent={<IconSquareRoundedMinus />}
            onClick={fnRemove}
            className="hover:bg-danger-50 transition-colors bg-transparent text-danger-500 border-2 border-danger-500"
          >
            Remover de la reserva
          </Button>
          : <>
            <Button
              startContent={<IconSquarePlus />}
              onClick={fnAdd}
              color="secondary"
              variant="flat"
            >
              Agregar a reserva
            </Button>
          </>
        }
        <Tooltip content="Reservar ahora">
          <Button
            isIconOnly
            color="success"
            variant="flat"
          >
            <IconDeviceFloppy />
          </Button>
        </Tooltip>
      </div>
    </section>
  )
}