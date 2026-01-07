<template>
  <div class="time">
  <p>Temps : {{ time }} s</p>
  </div>
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

<style scoped>

.time{
  font-size: 30px;
  position: relative;
  top: -75px;
  left: 1300px;
  width: 100px;
  text-align: center;
  color: aliceblue;
}

</style>
