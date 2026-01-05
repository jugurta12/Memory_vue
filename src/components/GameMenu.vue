<template>
  <div class="menu">
    <button @click="start(4)">4 x 4</button>
    <button @click="start(5)">5 x 5</button>
    <button @click="start(6)">6 x 6</button>

    <router-link to="/scores">Voir les scores</router-link>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function start(size) {
  router.push(`/game/${size}`)
}
</script>
