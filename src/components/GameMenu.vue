<template>
  <div class="menu">
      <div class="dif">
        <button @click="start(4)">4 x 4</button>
        <button @click="start(5)">5 x 5</button>
        <button @click="start(6)">6 x 6</button>
      </div>
      
      <div class="fruit">
        <p>
          🍎 🍌 🍒 🍇 🍋 🍊 🥝 🍉 🍍 🥥 🍓 🍑 🍐 🥭 🍏 🍈 🍅 🥑 🍎 🍌 🍒 🍇 🍋 🍊
        </p>
      </div>

    <div class="scores">
    <router-link to="/scores">Voir les scores</router-link>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function start(size) {
  router.push(`/game/${size}`)
}
</script>

<style scoped>
  .dif{
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 200px;
  }

  .fruit{
    font-size: 50px;
    position: relative;
    top: 100px;
  }

  .scores{
    position: relative;
    font-size: 50px;
    display: flex;
    justify-content: center;
    width: 330px;
    top: 200px;
    left: 600px;
  }

  .scores a{
    background-color: rgb(196, 232, 193);
    color: rgb(0, 0, 0);
  }

  .scores a:hover{
    background-color: rgb(70, 83, 69);
    color: rgb(223, 223, 223);
  }
</style>