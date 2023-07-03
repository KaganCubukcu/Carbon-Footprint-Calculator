import { createStore } from "vuex";
import { State, Mutations, Actions } from "./types";

// Create the store
export default createStore<State>({
  state: {
    results: 0,
    co2HouseFootprint: null,
    co2TransportFootprint: null,
    co2VehicleFootprint: null,
  },
  // Define the mutations
  mutations: {
    // Update the results by adding the co2Footprint values
    updateResults(state: State) {
      state.results =
        (state.co2HouseFootprint || 0) +
        (state.co2TransportFootprint || 0) +
        (state.co2VehicleFootprint || 0);
    },

    // Set the CO2 footprint for the house category
    setCo2HouseFootprint(state, co2HouseFootprint) {
      state.co2HouseFootprint = co2HouseFootprint;
    },
    // Set the CO2 footprint for the transport category
    setCo2TransportFootprint(state, co2TransportFootprint) {
      state.co2TransportFootprint = co2TransportFootprint;
    },
    // Set the CO2 footprint for the vehicle category
    setCo2VehicleFootprint(state, co2VehicleFootprint) {
      state.co2VehicleFootprint = co2VehicleFootprint;
    },
  } as Mutations,

  // Define the actions
  actions: {
    // Update the results by commiting the updateResults mutation
    updateResults({ commit }, results) {
      commit("setResults", results);
    },
    // Update the CO2 footprint for the categories and updated the results
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
