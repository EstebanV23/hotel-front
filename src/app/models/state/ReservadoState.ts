import { EstadosReservaEnum } from "@/app/enums/EstadosReservaEnum";
import { CanceladoState } from "./CanceladoState";
import { ConfirmadoState } from "./ConfirmadoState";
import { FinalizadoState } from "./FinalizadoState";
import { State } from "./State";

export class ReservadoState extends State {
  protected codState = EstadosReservaEnum.RESERVA

  public continuarReserva = (): void => {
    // Logic to continue reservation, e.g., move to next state, cambia mensaje
    console.log("Continuando reserva a confirmado...")
    this.context?.transitionTo(new ConfirmadoState());
  }

  public cancelarReserva = (): void => {
    // Logic to cancel reservation, e.g., reset context or move to cancelled state
    console.log("Reserva cancelada desde reservado.");
    this.context?.transitionTo(new CanceladoState());
    // Example: this.context.setState(new CanceladoState(this.context));
  }

  public finalizarReserva = (): void => {
    // Logic to finalize reservation, e.g., mark as completed
    console.log("Reserva finalizada desde reservado.");
    this.context?.transitionTo(new FinalizadoState());
  }
}