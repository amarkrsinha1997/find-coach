export default {
  contactCoach(context, payload) {
    context.commit('addRequest', {
      userEmail: payload.email,
      message: payload.message,
      id: new Date().toISOString(),
      coachId: payload.coachId,
    })
  }
}