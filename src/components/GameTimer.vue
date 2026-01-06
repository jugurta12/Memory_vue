<template>
  <p>Temps : {{ time }} s</p>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineExpose } from 'vue'

const time = ref(0)
let interval = null

function start() {
  interval = setInterval(() => {
    time.value++
  }, 1000)
}

function stop() {
  clearInterval(interval)
}

function reset() {
  stop()
  time.value = 0
  start()
}

defineExpose({
  stop,
  reset,
  time
})

onMounted(start)
onUnmounted(stop)
</script>
