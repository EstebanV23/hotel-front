import { EstadosReservaEnum } from "@/app/enums/EstadosReservaEnum";
import { State } from "./State";

export class CanceladoState extends State {
  protected codState = EstadosReservaEnum.CANCELADO
  
  public continuarReserva = (): void => {
    // No se puede continuar una reserva que ya está cancelada
  }

  public cancelarReserva = (): void => {
    // No se puede cancelar una reserva que ya está cancelada
  }

  public finalizarReserva = (): void => {
    // No se puede finalizar una reserva que ya está cancelada
  }
}