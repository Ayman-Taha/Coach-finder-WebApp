<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !email.isValid }">
      <label for="email">Enter your email:</label>
      <input
        type="email"
        id="email"
        v-model.trim="email.value"
        @blur="clearFieldWarning('email')"
      />
      <p v-if="!email.isValid">Please enter a valid email</p>
    </div>
    <div class="form-control" :class="{ invalid: !message.isValid }">
      <label for="message">Enter your message:</label>
      <textarea
        rows="6"
        id="message"
        v-model.trim="message.value"
        @blur="clearFieldWarning('message')"
      ></textarea>
      <p v-if="!message.isValid" class="errors">Please enter a valid message</p>
    </div>
    <p v-if="!formIsValid">Please make sure the form is filled correctly</p>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: {
        value: '',
        isValid: true,
      },
      message: {
        value: '',
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearFieldWarning(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (
        !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
          this.email.value
        )
      ) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.message.value === '') {
        this.message.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) return;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
