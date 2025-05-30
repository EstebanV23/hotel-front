import { State } from "../state/State";
import { Subscriber } from "./Subscriber";


export class Publisher {
  private _subscribers: Set<Subscriber> = new Set();
  private _currentState: State | undefined;

  public subscribe(subscriber: Subscriber): void {
    this._subscribers.add(subscriber);
  }

  public unsubscribe(subscriber: Subscriber): void {
    this._subscribers.delete(subscriber);
  }

  public notify(): void {
    this._subscribers.forEach((subscriber) => subscriber.notify(this._currentState));
  }

  public setState(state: State): void {
    this._currentState = state;
    this.notify();
  }
}