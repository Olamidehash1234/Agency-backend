import { ref } from 'vue'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export function useNewsletter() {
  const email = ref('')
  const loading = ref(false)
  const error = ref('')
  const success = ref(false)

  async function subscribe() {
    if (!email.value) {
      error.value = 'Please enter your email'
      return
    }

    loading.value = true
    error.value = ''
    success.value = false

    try {
      const response = await fetch(`${API_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.value }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      success.value = true
      email.value = ''
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    email,
    loading,
    error,
    success,
    subscribe
  }
}