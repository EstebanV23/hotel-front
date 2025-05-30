import Image from "next/image";
import { Publisher } from "../models/observer/Publisher";
import { Reserva, ReservaHabitacionTbl } from "../models/Reserva";
import { Context } from "../models/state/Context";
import getInitState from "../utils/getInitState";
import { Button, Chip } from "@nextui-org/react";
import { IconBusinessplan, IconCalendarEvent, IconLoader, IconNotification, IconUsers } from "@tabler/icons-react";
import { format } from "@formkit/tempo";
import { formatCurrency } from "../utils/getAmountHabitacion";
import { useCallback, useEffect, useRef, useState } from "react";

export default function MisReservasDetail({
  reserva,
  reservaHabitacion,
  token
}: {
  reserva: Reserva
  reservaHabitacion: ReservaHabitacionTbl
  token: string
}) {
  const [, setTick] = useState(0)
  const forceUpdate = useCallback(() => setTick(t => t + 1), [])
  const startDate = new Date(reserva.fec_ent_reserva)
  const endDate = new Date(reserva.fec_sal_reserva)
  const myPublisher = new Publisher()
  const ctxRef = useRef<Context>()
  if (!ctxRef.current) {
    ctxRef.current = new Context(
      getInitState({ codeState: reserva.estados_tbl.cod_estados }),
      reserva.id_reserva,
      myPublisher,
      token,
      forceUpdate
    )
  }

  useEffect(() => {
    console.log("Montando el componente MisReservasDetail")
  }, [])

  return (
    <section className="flex md:flex-row flex-col gap-4 bg-blue-50 p-3 rounded-md">
      <Image
        alt="Imagen de la habitacion"
        src={reservaHabitacion.habitacion_tbl.images_tbl?.find(image => image.ind_pri_image === 1)?.url_image ?? reservaHabitacion.habitacion_tbl.images_tbl[0].url_image}
        width={250}
        height={250}
        className="object-cover object-center"
      />
      <aside className="flex flex-col gap-4">
        <div className="w-full flex justify-between">
          <h3>{reservaHabitacion.habitacion_tbl.des_habitacion}</h3>
          <Chip
            endContent={<IconNotification size={18} />}
            variant="flat"
            color="secondary"
          >
            {ctxRef.current?.currentState?.descripcion ?? <IconLoader size={18} className="animate-spinner-ease-spin" />}
          </Chip>
        </div>
        <section>
          <p>Desea continuar con la reserva?</p>
          <div className="flex gap-2">
            <Button
              onClick={() => ctxRef.current?.currentState?.continuarReserva()}
            >
              Continuar
            </Button>
            <Button
              color="danger"
              onClick={() => ctxRef.current?.currentState?.cancelarReserva()}
            >
              Cancelar
            </Button>
            <Button
              color="success"
              onClick={() => ctxRef.current?.currentState?.finalizarReserva()}
            >
              Finalizar
            </Button>
          </div>
        </section>
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-1"><IconCalendarEvent /> Fecha de ingreso: {format(startDate, 'full')}</p>
          <p className="flex items-center gap-1"><IconCalendarEvent /> Fecha de salida {format(endDate, 'full')}</p>
          <p className="flex items-center gap-1"><IconUsers /> Cantidad de personas reservadas: {reserva.can_per_reserva}</p>
          <p className="flex items-center gap-1 font-bold"><IconBusinessplan /> Costo total de la reserva: {formatCurrency(reserva.cos_tot_reserva)}</p>
          <small className="text-gray-500">El cobro de la reserva se realizará el mismo día de ingreso, se le llamará para confirmar</small>
        </div>
      </aside>
    </section>
  )
}