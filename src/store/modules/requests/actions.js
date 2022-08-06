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

    const resData = await res.json();

    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to send request');
      throw error;
    }

    request.id = resData.name;

    context.commit('addRequest', request);
  },
};
