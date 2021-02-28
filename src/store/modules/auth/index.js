import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getter.js";

export default {
  state() {
    return {
      token: null,
      userId: null,
    };
  },
  getters,
  mutations,
  actions
};
