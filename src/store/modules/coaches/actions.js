export default {
  registerCoach(context, data) {
    const coachData = {
      id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    fetch(
      'https://console.firebase.google.com/project/vue-find-coach-23a5c/database/vue-find-coach-23a5c-default-rtdb/data/~2F'
    );
    context.commit('registerCoach', coachData);
  },
};
