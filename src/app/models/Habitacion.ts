export type ResponseHabitaciones = Habitacion[]

export interface Habitacion {
  id_habitacion: number
  des_habitacion: string
  id_tipo_alojamiento_habitacion: number
  tipo_alojamiento_tbl: TipoAlojamientoTbl
  images_tbl: ImagesTbl[]
  servicio_habitacion: ServicioHabitacion[]
  reserva_habitacion_tbl: ReservaHabitacionTbl[]
}

export interface TipoAlojamientoTbl {
  id_tipo_alojamiento: number
  nom_tipo_alojamiento: string
  des_tipo_alojamiento: string
  ico_tipo_alojamiento: any
}

export interface ImagesTbl {
  id_image: number
  url_image: string
  ind_pri_image: number
  id_habitacion: number
}

export interface ServicioHabitacion {
  id_habitacion_servicio_habitacion: number
  id_servicio_servicio_habitacion: number
  can_servicio_habitacion: number
  servicio_tbl: ServicioTbl
}

export interface ServicioTbl {
  id_servicio: number
  nom_servicio: string
  des_servicio: string
  pre_servicio: number
  ind_hab_servicio: number
  can_per_servicio: number
  id_tipo_servicio: number
  tipo_servicio_tbl: TipoServicioTbl
}

export interface TipoServicioTbl {
  id_tipo_servicio: number
  nom_tipo_servicio: string
  cod_tipo_servicio: string
  des_tipo_servicio: string
  ico_tipo_servicio: string
}

export interface ReservaHabitacionTbl {
  id_reserva_reserva_habitacion: number
  id_habitacion_reserva_habitacion: number
  id_estado_reserva_habitacion: number
  reserva_tbl: ReservaTbl
  estados_tbl: EstadosTbl
}

export interface ReservaTbl {
  id_reserva: number
  fec_ent_reserva: string
  fec_sal_reserva: string
  des_reserva: string
  can_per_reserva: number
  cos_tot_reserva: number
  fec_reg_reserva: string
  id_estado_reserva: number
  id_usuario_reserva: number
}

export interface EstadosTbl {
  id_estado: number
  nom_estados: string
  cod_estados: string
  ind_hab_estados: number
  grupo_estados_tbl_id_grupo_estado: number
}
