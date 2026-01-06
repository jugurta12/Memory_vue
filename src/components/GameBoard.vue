<template>
  <div>
    <div class="title2">
      <h2>Memory {{ size }} x {{ size }}</h2>
    </div>

    <div class="Essais">
      <p>Essais : {{ tries }}</p>
    </div>

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

    <div class="bravo" v-if="gameWon">
      Bravo, vous avez gagné en {{ tries }} essais !
    </div>

    <div class="restart">
      <button @click="restartGame">Recommencer</button>
    </div>
  </div>

  <div class="fin"></div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  size: { type: Number, required: true }
})

const emit = defineEmits(['game-finished', 'restart'])

// TIMER 
const time = ref(0)
let timerInterval = null

function startTimer() {
  stopTimer()
  time.value = 0
  timerInterval = setInterval(() => time.value++, 1000)
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

// CARTES
const emojis = [
  '🍎','🍌','🍒','🍇','🍋','🍊','🥝','🍉',
  '🍍','🥥','🍓','🍑','🍐','🥭','🍏','🍈','🍅','🥑'
]

// JEU 
const cards = ref([])
const flippedCards = ref([])
const tries = ref(0)
const matchedPairs = ref(0)
const hasFinished = ref(false)

// total de paires (grilles impaires OK)
const totalPairs = computed(() =>
  Math.floor((props.size * props.size) / 2)
)

const gameWon = computed(() =>
  matchedPairs.value === totalPairs.value
)

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
  hasFinished.value = false
  startTimer()
}

function flipCard(index) {
  const card = cards.value[index]
  if (
    card.flipped ||
    card.matched ||
    flippedCards.value.length === 2 ||
    gameWon.value
  ) return

  card.flipped = true
  flippedCards.value.push(card)

  if (flippedCards.value.length === 2) {
    tries.value++
    setTimeout(checkMatch, 600)
  }
}

function checkMatch() {
  const [first, second] = flippedCards.value
  if (!first || !second) return

  if (first.emoji === second.emoji) {
    first.matched = true
    second.matched = true
    matchedPairs.value++
  } else {
    first.flipped = false
    second.flipped = false
  }

  flippedCards.value = []

  // FIN DE PARTIE
  if (gameWon.value && !hasFinished.value) {
    hasFinished.value = true
    stopTimer()

      emit('game-finished', {
        tries: tries.value,
        time: time.value
})
  }

}

function restartGame() {
  stopTimer()
  initGame()
  emit('restart')
}

onMounted(initGame)
onUnmounted(stopTimer)
</script>

<style scoped>

.grid {
  display: grid;
  gap: 10px;
  margin-top: 20px;
  justify-content: center;
  margin-top: -300px;
}

.Essais{
  font-size: 30px;
}

.title2{
  position: relative;
  top: -250px;
  font-size: 50px;
  display: flex;
  justify-content: center;
}

.Essais{
  position: relative;
  top: -300px;
  margin-left: 20px;
}

.restart{
  position: relative;
  z-index: 4;
  display: flex;
  justify-content: center;
  margin-top: 60px;
}

.bravo{
  display: flex;
  justify-content: center;
  z-index: -1;
  font-size: large;
  color: aquamarine;
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

.fin{
  height: 50px;
}
</style>
