<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <input
      type="email"
      v-model="email"
      :disabled="loading"
      placeholder="example@email.com"
      :class="{ 'error': error }"
    >
    <button 
      type="submit" 
      class="submit-button"
      :disabled="loading"
    >
      {{ loading ? 'Subscribing...' : 'Submit Now' }}
    </button>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-if="success" class="success-message">
      Thanks for subscribing!
    </div>
  </form>
</template>

<script setup>
import { useNewsletter } from '../composables/useNewsletter'

const {
  email,
  loading,
  error,
  success,
  subscribe
} = useNewsletter()

const handleSubmit = () => {
  subscribe()
}
</script>

<style scoped>
.error-message {
  color: #ff4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: left;
}

.success-message {
  color: #00ff00;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: left;
}

input.error {
  border: 1px solid #ff4444;
}
</style>