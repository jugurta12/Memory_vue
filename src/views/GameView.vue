<template>
  <div>
    <div class="top-actions">
      <button @click="quit">🚪 Quitter</button>
    </div>

    <GameTimer ref="timer" />
    <GameBoard
      :size="size"
      @game-finished="saveGame"
      @restart="restart"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import GameBoard from '../components/GameBoard.vue'
import GameTimer from '../components/GameTimer.vue'
import { saveScore } from '../services/storage'

const route = useRoute()
const router = useRouter()
const size = Number(route.params.size)

const timer = ref(null)

function restart() {
  timer.value.reset()
}

function quit() {
  if (confirm('Quitter la partie ?')) {
    router.push('/')
  }
}

function saveGame(data) {
  timer.value.stop()

  const pseudo = prompt("Votre pseudo ?")
  if (!pseudo) return

  saveScore({
    pseudo,
    size,
    tries: data.tries,
    time: timer.value.time
  })
}
</script>

<style scoped>
.top-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
</style>
