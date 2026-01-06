<template>
  <div class="card" @click="$emit('flip')">
    <span v-if="flipped || matched">{{ emoji }}</span>
    <span v-else>❓</span>
  </div>
</template>

<script setup>
defineProps({
  emoji: String,
  flipped: Boolean,
  matched: Boolean
})
</script>

<style scoped>
.card {
  width: 100px;
  height: 100px;
  font-size: 2rem;
  background: #f2f2f2;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
