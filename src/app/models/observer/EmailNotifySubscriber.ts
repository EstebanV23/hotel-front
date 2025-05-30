import { EnCursoState } from "../state/EnCursoState";
import { State } from "../state/State";
import { Subscriber } from "./Subscriber";

export class EmailNotifySubscriber implements Subscriber {
  notify(state: State | undefined): void {
    if (state instanceof EnCursoState) return // Omitir notifiaciones si el estado es EnCursoState
    // Simulate sending an email notification
    console.log({
      changedState: state
    })
    console.log(`Enviando notificación por correo electrónico: El estado ha cambiado a cambiado y no es un estado en curso.`);
  }
}