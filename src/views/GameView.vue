<template>
  <div>
    <div class="top-actions">
      <button @click="quit">Quitter</button>
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

  let pseudo = ''

  while (!pseudo || !pseudo.trim()) {
    pseudo = prompt('Entrez un pseudo valide')

    if (pseudo === null) {
      alert('Le pseudo est obligatoire')
      pseudo = ''
    }
  }

  saveScore({
    pseudo: pseudo.trim(),
    size,
    tries: data.tries,
    time: timer.value.time
  })
}
</script>

<style scoped>
.top-actions {
  display: flex;
  position: relative;
  margin-left: 20px;
  margin-top: 20px;
  z-index: 3;
}
</style>
