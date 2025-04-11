export interface Servicio {
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