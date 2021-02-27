import { createStore } from "vuex";
import coachesModule from "./modules/coaches";
import requestsModule from "./modules/requests";

export default createStore({
  modules: { coaches: coachesModule, requests: requestsModule },
  state() {
    return {
      userId: "c3"
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    }
  }
  // mutations: {},
  // actions: {},
  // modules: {}
});
