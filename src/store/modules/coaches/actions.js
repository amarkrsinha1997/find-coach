import httpService from "../../../utils/httpService";

export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const data = {
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      hourlyRate: payload.rate,
      areas: payload.areas
    };

    await httpService.put({
      payload: data,
      path: `/coaches/${userId}.json?auth=${context.rootGetters.token}`
    });
    context.commit("registerCoach", { ...data, id: userId });
  },
  async fetchCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const response = await httpService.get({
      path: `/coaches.json`,
      errorMessage: 'Failed to Fetch',
    });
    const coaches = Object.keys(response).map(coachId => ({ ...response[coachId], id: coachId }));

    context.commit("setCoaches", coaches);
    context.commit("setLastFetch")
  }
};
