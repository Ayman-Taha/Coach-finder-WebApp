<template>
  <base-dialog :show="!!error" title="An error happened!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <h2>Register as a coach</h2>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <coach-form v-else @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
  components: { CoachForm },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async saveData(data) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/registerCoach', data);
      } catch (err) {
        this.error = err.message || 'Something went wrong!!';
      }
      this.isLoading = false;
      this.$router.replace('/coaches');
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>
