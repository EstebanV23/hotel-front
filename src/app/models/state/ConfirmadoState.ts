import { EstadosReservaEnum } from "@/app/enums/EstadosReservaEnum";
import { CanceladoState } from "./CanceladoState";
import { EnCursoState } from "./EnCursoState";
import { FinalizadoState } from "./FinalizadoState";
import { State } from "./State";

export class ConfirmadoState extends State {
  protected codState = EstadosReservaEnum.CONFIRMADO
  
  public continuarReserva = (): void => {
    // Logic to continue reservation, e.g., move to next state, cambia mensaje
    console.log("Continuando reserva a en curso...")
    this.context?.transitionTo(new EnCursoState());
  }

  public cancelarReserva = (): void => {
    console.log("Reserva cancelada desde confirmado.");
    this.context?.transitionTo(new CanceladoState());
  }

  public finalizarReserva = (): void => {
    console.log("Reserva finalizada desde confirmado.");
    this.context?.transitionTo(new FinalizadoState());
  }
}