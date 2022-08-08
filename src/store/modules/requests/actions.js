export default {
  async contactCoach(context, data) {
    const request = {
      email: data.email.value,
      message: data.message.value,
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

    request.coachId = data.coachId;

    context.commit('addRequest', request);
  },

  async loadRequests(context) {
    const coachId = context.rootGetters.userId;

    const res = await fetch(
      `https://vue-find-coach-23a5c-default-rtdb.firebaseio.com/requests/${coachId}.json`
    );

    const resData = await res.json();

    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to load requests');
      throw error;
    }

    const requests = [];

    for (const key in resData) {
      const request = {
        id: key,
        coachId: coachId,
        email: resData[key].email,
        message: resData[key].message,
      };
      requests.push(request);
    }
    context.commit('setRequests', requests);
  },
};
