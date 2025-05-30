import { Dispatch, SetStateAction } from "react";
import { EmailNotifySubscriber } from "../observer/EmailNotifySubscriber";
import { Publisher } from "../observer/Publisher";
import { WhatsappNotifySubscriber } from "../observer/WhatsappNotifySubscriber";
import { State } from "./State";

export class Context {
  private state: State | undefined;
  private _idReserva: number;
  private _token: string;
  private publisher: Publisher
  private updateNomEstado: () => void;

  constructor(state: State, idReserva: number, publisher: Publisher, token: string, updateNomEstado: () => void) {
    this._idReserva = idReserva;
    this._token = token;
    this.publisher = publisher;
    this.updateNomEstado = updateNomEstado;
    publisher.subscribe(new WhatsappNotifySubscriber())
    publisher.subscribe(new EmailNotifySubscriber())
    this.transitionTo(state);
  }

  public transitionTo(state: State) {
    this.state = state;
    // this.setNomEstado(undefined)
    this.state.setContext(this); // Update the context reference in the new state
    this.state.updateDatabase(); // Call the update method to reflect the state change
    this.publisher.setState(this.state); // Notify subscribers about the state change
  }

  public continuarReserva() {
    this.state?.continuarReserva();
  }

  public cancelarReserva() {
    this.state?.cancelarReserva();
  }

  public finalizarReserva() {
    this.state?.finalizarReserva();
  }

  public setNomEstado() {
    this.updateNomEstado();
  }

  get idReserva(): number {
    return this._idReserva;
  }

  get currentState(): State | undefined {
    return this.state;
  }

  get token(): string {
    return this._token;
  }

}