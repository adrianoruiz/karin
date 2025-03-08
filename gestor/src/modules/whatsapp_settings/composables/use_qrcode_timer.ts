import { onUnmounted, ref } from 'vue'

export function useQrCodeTimer(onComplete: () => void) {
  const TOTAL_TIME = 20
  const timeLeft = ref(TOTAL_TIME)
  const progress = ref(100)
  let timer: ReturnType<typeof setInterval> | null = null

  const startTimer = () => {
    timeLeft.value = TOTAL_TIME
    progress.value = 100

    timer = setInterval(() => {
      timeLeft.value--
      progress.value = (timeLeft.value / TOTAL_TIME) * 100

      if (timeLeft.value <= 0) {
        if (timer) {
          clearInterval(timer)
        }
        onComplete()
        startTimer()
      }
    }, 1000)
  }

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  onUnmounted(() => {
    stopTimer()
  })

  return {
    timeLeft,
    progress,
    startTimer,
    stopTimer
  }
}
