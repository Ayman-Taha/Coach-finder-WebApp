<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstname.isValid }">
      <label for="firstname">First Name</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstname.value"
        @blur="clearFieldWarning('firstname')"
      />
      <p v-if="!firstname.isValid">First name is required</p>
    </div>

    <div class="form-control" :class="{ invalid: !lastname.isValid }">
      <label for="lastname">Last Name</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastname.value"
        @blur="clearFieldWarning('lastname')"
      />
      <p v-if="!lastname.isValid">Last name is required</p>
    </div>

    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <input
        type="text"
        id="description"
        v-model.trim="description.value"
        @blur="clearFieldWarning('description')"
      />
      <p v-if="!description.isValid">Description is required</p>
    </div>

    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        id="rate"
        v-model.number="rate.value"
        @blur="clearFieldWarning('rate')"
      />
      <p v-if="!rate.isValid">A positive hourly rate is required</p>
    </div>

    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Area of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.value"
          @blur="clearFieldWarning('areas')"
        />
        <label for="frontend">Front End</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.value"
          @blur="clearFieldWarning('areas')"
        />
        <label for="backend">Back End</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.value"
          @blur="clearFieldWarning('areas')"
        />
        <label for="career">Career</label>
      </div>
      <p v-if="!areas.isValid">At least one area of expertise is required</p>
    </div>
    <p v-if="!formIsValid">Please make sure the form is filled correctly</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstname: {
        value: '',
        isValid: true,
      },
      lastname: {
        value: '',
        isValid: true,
      },
      description: {
        value: '',
        isValid: true,
      },
      rate: {
        value: null,
        isValid: true,
      },
      areas: {
        value: [],
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
      if (this.firstname.value === '') {
        this.firstname.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastname.value === '') {
        this.lastname.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.value === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.rate.value || this.rate.value < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.value.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) return;

      const formData = {
        first: this.firstname.value,
        last: this.lastname.value,
        description: this.description.value,
        rate: this.rate.value,
        areas: this.areas.value,
      };

      this.$emit('save-data', formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
