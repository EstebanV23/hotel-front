import { EstadosReservaEnum } from "@/app/enums/EstadosReservaEnum";
import { FinalizadoState } from "./FinalizadoState";
import { State } from "./State";

export class EnCursoState extends State {
  protected codState = EstadosReservaEnum.EN_CURSO
  
  public continuarReserva = (): void => {
    // Logic to continue reservation, e.g., move to next state, cambia mensaje
    console.log("Continuando reserva a finalizado...")
    this.context?.transitionTo(new FinalizadoState());
  }

  public cancelarReserva = (): void => {
    // Logic to cancel reservation, e.g., reset context or move to cancelled state
  }

  public finalizarReserva = (): void => {
    // Logic to finalize reservation, e.g., mark as completed
    console.log("Reserva finalizada.");
    this.context?.transitionTo(new FinalizadoState());
    // Example: this.context.setState(new FinalizadoState(this.context));
  }
}