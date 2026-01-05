<template>
  <div class="card" @click="flip">
    <img v-if="isFlipped" :src="image" />
    <div v-else class="back"></div>
  </div>
</template>
