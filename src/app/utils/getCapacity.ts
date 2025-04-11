import { TipoServicio } from "../enums/TipoServicioEnum"
import { Habitacion } from "../models/Habitacion"

export default function getCapacity({
  habitacion
}: {
  habitacion: Habitacion
}) {
  return habitacion.servicio_habitacion.reduce((acc, servicio) => {
    if (servicio.servicio_tbl.tipo_servicio_tbl.cod_tipo_servicio === TipoServicio.COD_CAMA) {
      return acc + servicio.can_servicio_habitacion * servicio.servicio_tbl.can_per_servicio
    }
    return acc
  }, 0)
}