export default {
  async contactCoach(context, data) {
    const request = {
      coachId: data.coachId,
      email: data.email,
      message: data.message,
    };

    const res = await fetch(
      `https://vue-find-coach-23a5c-default-rtdb.firebaseio.com/requests/${data.coachId}.json`,
      { method: 'POST', body: JSON.stringify(request) }
    );

    context.commit('addRequest', request);
  },
};
