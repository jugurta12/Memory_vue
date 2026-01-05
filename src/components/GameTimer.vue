<template>
  <div>
    <h2>Timer</h2>
    <p>Temps : {{ time }} s</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const time = ref(0)
let timerInterval = null

onMounted(() => {
  timerInterval = setInterval(() => time.value++, 1000)
})

onUnmounted(() => {
  clearInterval(timerInterval)
})
</script>
