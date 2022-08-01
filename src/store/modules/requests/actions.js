export default {
  contactCoach(context, data) {
    const request = {
      requestId: new Date().toISOString,
      coachId: data.coachId,
      email: data.email,
      message: data.message,
    };
    context.commit('addRequest', request);
  },
};
