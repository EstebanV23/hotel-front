import { CanceladoState } from "../state/CanceladoState";
import { State } from "../state/State";
import { Subscriber } from "./Subscriber";

export class WhatsappNotifySubscriber implements Subscriber {
  notify(state: State | undefined): void {
    if (!(state instanceof CanceladoState)) return // Omitir notificaciones si el estado no es CanceladoState
    console.log(`WhatsApp notification sent: enviando mensaje de cancelación al usuario.`);
  }
}