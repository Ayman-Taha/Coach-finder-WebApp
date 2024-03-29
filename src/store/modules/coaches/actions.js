export default {
  async registerCoach(context, data) {
    const coachData = {
      id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const res = await fetch(
      `https://vue-find-coach-23a5c-default-rtdb.firebaseio.com/coaches/${coachData.id}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );

    const resData = await res.json();

    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to register coach');
      throw error;
    }
    context.commit('registerCoach', coachData);
  },

  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const res = await fetch(
      `https://vue-find-coach-23a5c-default-rtdb.firebaseio.com/coaches.json`
    );

    const resData = await res.json();

    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to load coaches');
      throw error;
    }

    const coaches = [];

    for (const key in resData) {
      const coach = {
        id: key,
        firstName: resData[key].firstName,
        lastName: resData[key].lastName,
        description: resData[key].description,
        hourlyRate: resData[key].hourlyRate,
        areas: resData[key].areas,
      };
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimeStamp');
  },
};
