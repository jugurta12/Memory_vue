<template>
  <div>
    <GameTimer />
    <GameBoard :size="size" @game-finished="saveGame"/>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import GameBoard from '../components/GameBoard.vue'
import GameTimer from '../components/GameTimer.vue'
import { saveScore } from '../services/storage'

const route = useRoute()
const size = Number(route.params.size)

function saveGame(data) {
  const pseudo = prompt("Votre pseudo ?")
  saveScore({ ...data, pseudo, size })
}
</script>
