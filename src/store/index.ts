import { createStore } from "vuex";
import { State, Mutations, Actions } from "./types";

export default createStore<State>({
  state: {
    results: 0,
    co2HouseFootprint: null,
    co2TransportFootprint: null,
    co2VehicleFootprint: null,
  },
  mutations: {
    updateResults(state: State) {
      state.results =
        (state.co2HouseFootprint || 0) +
        (state.co2TransportFootprint || 0) +
        (state.co2VehicleFootprint || 0);
    },
    setCo2HouseFootprint(state, co2HouseFootprint) {
      state.co2HouseFootprint = co2HouseFootprint;
    },
    setCo2TransportFootprint(state, co2TransportFootprint) {
      state.co2TransportFootprint = co2TransportFootprint;
    },
    setCo2VehicleFootprint(state, co2VehicleFootprint) {
      state.co2VehicleFootprint = co2VehicleFootprint;
    },
  } as Mutations,
  actions: {
    updateResults({ commit }, results) {
      commit("setResults", results);
    },
    updateCo2HouseFootprint({ commit }, co2HouseFootprint) {
      commit("setCo2HouseFootprint", co2HouseFootprint);
      commit("updateResults");
    },
    updateCo2TransportFootprint({ commit }, co2TransportFootprint) {
      commit("setCo2TransportFootprint", co2TransportFootprint);
      commit("updateResults");
    },
    updateCo2VehicleFootprint({ commit }, co2VehicleFootprint) {
      commit("setCo2VehicleFootprint", co2VehicleFootprint);
      commit("updateResults");
    },
  } as Actions,
  modules: {},
});
