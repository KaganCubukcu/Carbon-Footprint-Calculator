import { Commit } from "vuex";

export interface State {
  results: number | null;
  co2HouseFootprint: number | null;
  co2TransportFootprint: number | null;
  co2VehicleFootprint: number | null;
}

export interface Mutations {
  updateResults(state: State): void;
  setCo2HouseFootprint(state: State, co2HouseFootprint: number | null): void;
  setCo2TransportFootprint(
    state: State,
    co2TransportFootprint: number | null
  ): void;
  setCo2VehicleFootprint(
    state: State,
    co2VehicleFootprint: number | null
  ): void;
}

export interface ActionContext {
  commit: Commit;
  state: State;
}

export type Actions = {
  updateResults(context: ActionContext, results: any[]): void;
  updateCo2HouseFootprint(
    context: ActionContext,
    co2Footprint: number | null
  ): void;
  updateCo2TransportFootprint(
    context: ActionContext,
    co2Footprint: number | null
  ): void;
  updateCo2VehicleFootprint(
    context: ActionContext,
    co2Footprint: number | null
  ): void;
};
