import { EstadosReservaEnum } from "@/app/enums/EstadosReservaEnum";
import { State } from "./State";

export class FinalizadoState extends State {
  protected codState = EstadosReservaEnum.FINALIZADO
  
  public continuarReserva = (): void => {
    // Logic to continue reservation, e.g., move to next state, cambia mensaje
    console.log("Se ha finalizado la reserva. No se puede continuar.");
  }

  public cancelarReserva = (): void => {
    // No se puede cancelar una reserva finalizada
  }

  public finalizarReserva = (): void => {
    // TODO: Mostrar resumen de la reserva
  }
}