import { ref } from 'vue'

export function useQrCodeAttempts(maxAttempts: number = 10) {
  const attempts = ref(0)
  const hasExceededAttempts = ref(false)

  const incrementAttempt = () => {
    attempts.value++
    if (attempts.value >= maxAttempts) {
      hasExceededAttempts.value = true
    }
  }

  const resetAttempts = () => {
    attempts.value = 0
    hasExceededAttempts.value = false
  }

  return {
    attempts,
    hasExceededAttempts,
    incrementAttempt,
    resetAttempts
  }
}
