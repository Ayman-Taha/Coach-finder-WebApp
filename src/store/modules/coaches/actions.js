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

    const response = await fetch(
      `https://vue-find-coach-23a5c-default-rtdb.firebaseio.com/coaches/${coachData.id}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );

    if (!response.ok) {
      console.log('error!!');
    }
    context.commit('registerCoach', coachData);
  },
};
