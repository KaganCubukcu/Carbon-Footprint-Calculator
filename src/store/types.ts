import { Commit } from "vuex";

// Define the state interface
export interface State {
  results: number | null;
  co2HouseFootprint: number | null;
  co2TransportFootprint: number | null;
  co2VehicleFootprint: number | null;
}

// Define the mutations interface
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

// Define the actions interface
export interface ActionContext {
  commit: Commit;
  state: State;
}

// Define the actions type
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
