export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },
  setCoaches(state, payload) {
    state.coaches = payload;
  },
  setLastFetch(state, payload) {
    state.lastFetch = new Date().getTime()
  }
}