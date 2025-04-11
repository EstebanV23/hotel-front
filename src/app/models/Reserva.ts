export interface ReservaResponse {
  status: number
  message: string
  data: Reserva[]
}

export interface Reserva {
  id_reserva: number
  fec_ent_reserva: string
  fec_sal_reserva: string
  des_reserva: string
  can_per_reserva: number
  cos_tot_reserva: number
  fec_reg_reserva: string
  id_estado_reserva: number
  id_usuario_reserva: number
  reserva_habitacion_tbl: ReservaHabitacionTbl[]
  estados_tbl: EstadosTbl
}

export interface ReservaHabitacionTbl {
  id_reserva_reserva_habitacion: number
  id_habitacion_reserva_habitacion: number
  id_estado_reserva_habitacion: number
  habitacion_tbl: HabitacionTbl
}

export interface HabitacionTbl {
  id_habitacion: number
  des_habitacion: string
  id_tipo_alojamiento_habitacion: number
  images_tbl: ImagesTbl[]
}

export interface ImagesTbl {
  id_image: number
  url_image: string
  ind_pri_image: number
  id_habitacion: number
}

export interface EstadosTbl {
  id_estado: number
  nom_estados: string
  cod_estados: string
  ind_hab_estados: number
  grupo_estados_tbl_id_grupo_estado: number
}