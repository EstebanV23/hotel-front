import { EstadosReservaEnum } from "../enums/EstadosReservaEnum"
import { TipoServicio } from "../enums/TipoServicioEnum"
import { CanceladoState } from "../models/state/CanceladoState"
import { ConfirmadoState } from "../models/state/ConfirmadoState"
import { EnCursoState } from "../models/state/EnCursoState"
import { FinalizadoState } from "../models/state/FinalizadoState"
import { ReservadoState } from "../models/state/ReservadoState"
import { State } from "../models/state/State"

const states: Record<EstadosReservaEnum, State> = {
  [EstadosReservaEnum.RESERVA]: new ReservadoState(),
  [EstadosReservaEnum.CONFIRMADO]: new ConfirmadoState(),
  [EstadosReservaEnum.CANCELADO]: new CanceladoState(),
  [EstadosReservaEnum.EN_CURSO]: new EnCursoState(),
  [EstadosReservaEnum.FINALIZADO]: new FinalizadoState()
}

export default function getInitState({
  codeState
}: {
  codeState: string
}): State {
  return states[codeState as EstadosReservaEnum] ?? states[EstadosReservaEnum.RESERVA]
}