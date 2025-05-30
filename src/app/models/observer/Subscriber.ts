import { State } from "../state/State";

export interface Subscriber {
  notify(state: State | undefined): void;
}