import { Chip, Image } from "@nextui-org/react";
import { Reserva } from "../models/Reserva";
import { IconBusinessplan, IconCalendarEvent, IconNotification, IconUsers } from "@tabler/icons-react";
import { format } from "@formkit/tempo";
import { formatCurrency } from "../utils/getAmountHabitacion";

export default function MisReservasCard({
  reservas
}: {
  reservas: Reserva[]
}) {
  return reservas.map((reserva) => {
    return reserva.reserva_habitacion_tbl.map((reservaHabitacion) => {
      const startDate = new Date(reserva.fec_ent_reserva)
      const endDate = new Date(reserva.fec_sal_reserva)
      return (
        <section className="flex md:flex-row flex-col gap-4" key={reservaHabitacion.id_habitacion_reserva_habitacion+reservaHabitacion.id_reserva_reserva_habitacion+'reservahabitacion'}>
          <Image
            src={reservaHabitacion.habitacion_tbl.images_tbl?.find(image => image.ind_pri_image === 1)?.url_image ?? reservaHabitacion.habitacion_tbl.images_tbl[0].url_image}
            width={250}
            height={250}
            radius="none"
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
                {reserva.estados_tbl.nom_estados}
              </Chip>
            </div>
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
    })
  })
}