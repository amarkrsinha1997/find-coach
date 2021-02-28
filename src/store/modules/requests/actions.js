import httpService from '../../../utils/httpService';
export default {
  async contactCoach(context, payload) {
    const data = {
      userEmail: payload.email,
      message: payload.message,
    };
    const response = await httpService.post({
      path: `/requests/${payload.coachId}.json`,
      payload: data,
      errorMessage: "Failed to send request."
    })
    data.id = response.name;
    data.coachId = payload.coachId,

    context.commit('addRequest', data)
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const response = await httpService.get({
      path: `/requests/${coachId}.json?auth=${context.rootGetters.token}`,
      errorMessage: "Failed to fetch requests"
    })
    const requests = Object.keys(response).map((requestId) => ({
      ...response[requestId],
      coachId,
      id: requestId,
    }))
    context.commit('setRequests', requests)
  }
}