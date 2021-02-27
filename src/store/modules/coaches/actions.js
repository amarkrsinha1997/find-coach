export default {
  registerCoach(context, payload) {
    context.commit('registerCoach', {
      id: context.rootGetters.userId,
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      hourlyRate: payload.rate,
      areas: payload.areas
    })
  }
}
