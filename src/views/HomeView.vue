<template>
  <div>
    <h1 class="Title">Memory Game</h1>
    <GameMenu />
  </div>
</template>

<script setup>
import GameMenu from '../components/GameMenu.vue'
</script>

<style scoped>
  .Title{
    color: aliceblue;
    font-size: 100px;
    display: flex;
    justify-content: center;
  }
</style>
