<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Enter your email:</label>
      <input type="email" id="email" />
    </div>
    <div class="form-control">
      <label for="message">Enter your message:</label>
      <textarea rows="6" id="message"></textarea>
    </div>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>
