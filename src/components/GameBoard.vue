<template>
  <div>
    <h2>Memory {{ size }} x {{ size }}</h2>
    <p>Essais : {{ tries }}</p>

    <div
      class="grid"
      :style="{ gridTemplateColumns: `repeat(${size}, 100px)` }"
    >
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="card"
        @click="flipCard(index)"
      >
        <span v-if="card.flipped || card.matched">{{ card.emoji }}</span>
        <span v-else>❓</span>
      </div>
    </div>

    <p v-if="matchedPairs === totalPairs">
      🎉 Vous avez gagné en {{ tries }} essais !
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

/* ===== PROPS ===== */
const props = defineProps({
  size: {
    type: Number,
    required: true
  }
})

/* ===== EMIT ===== */
const emit = defineEmits(['game-finished'])

/* ===== DONNÉES ===== */
const emojis = [
  '🍎','🍌','🍒','🍇','🍋','🍊','🥝','🍉',
  '🍍','🥥','🍓','🍑','🍐','🥭','🍏','🍈','🍅','🥑'
]

const cards = ref([])
const flippedCards = ref([])
const tries = ref(0)
const matchedPairs = ref(0)

/* ===== CALCULS ===== */
const totalPairs = computed(() => (props.size * props.size) / 2)

/* ===== FONCTIONS ===== */
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5)
}

function initGame() {
  const selectedEmojis = emojis.slice(0, totalPairs.value)
  const deck = shuffle([...selectedEmojis, ...selectedEmojis]).map(e => ({
    emoji: e,
    flipped: false,
    matched: false
  }))

  cards.value = deck
  flippedCards.value = []
  tries.value = 0
  matchedPairs.value = 0
}

function flipCard(index) {
  const card = cards.value[index]
  if (card.flipped || card.matched || flippedCards.value.length === 2) return

  card.flipped = true
  flippedCards.value.push(card)

  if (flippedCards.value.length === 2) {
    tries.value++
    setTimeout(checkMatch, 600)
  }
}

function checkMatch() {
  const [first, second] = flippedCards.value

  if (first.emoji === second.emoji) {
    first.matched = true
    second.matched = true
    matchedPairs.value++

    if (matchedPairs.value === totalPairs.value) {
      emit('game-finished', {
        tries: tries.value
      })
    }
  } else {
    first.flipped = false
    second.flipped = false
  }

  flippedCards.value = []
}

/* ===== LIFECYCLE ===== */
onMounted(initGame)
</script>

<style scoped>
.grid {
  display: grid;
  gap: 10px;
  margin-top: 20px;
}
.card {
  width: 100px;
  height: 100px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  cursor: pointer;
  border-radius: 10px;
  user-select: none;
}
.card:hover {
  background-color: #e0e0e0;
}
</style>
