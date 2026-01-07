<template>
  <div class="scores">
    <h2> Historique des parties</h2> 

    <div class="actions">
      <select v-model="sortKey">
        <option value="pseudo">Pseudo</option>
        <option value="size">Difficulté</option>
        <option value="time">Temps</option>
        <option value="tries">Essais</option>
      </select>
      <button @click="resetScoresConfirm">Tout supprimer</button>
    </div>

    <table v-if="scores.length">
      <thead>
        <tr>
          <th>Pseudo</th>
          <th>Difficulté</th>
          <th>Temps (s)</th>
          <th>Essais</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(score, index) in sortedScores" :key="score.id">
          <td>
            <input v-if="editingIndex === index" v-model="editedPseudo" />
            <span v-else>{{ score.pseudo }}</span>
          </td>
          <td>{{ score.size }} x {{ score.size }}</td>
          <td>{{ score.time }}</td>
          <td>{{ score.tries }}</td>
          <td>
            <button v-if="editingIndex !== index" @click="edit(index)">edit</button>
            <button v-else @click="save(index)">save</button>
            <button @click="remove(index)">delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Aucune partie enregistrée.</p>

    <router-link to="/">⬅ Retour au menu</router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// clé unique pour le stockage local
const STORAGE_KEY = 'memory-scores'

const scores = ref([])
const sortKey = ref('pseudo')

const editingIndex = ref(null)
const editedPseudo = ref('')

// Trier les scores
const sortedScores = computed(() => {
  return [...scores.value].sort((a, b) => {
    if (a[sortKey.value] > b[sortKey.value]) return 1
    if (a[sortKey.value] < b[sortKey.value]) return -1
    return 0
  })
})

// Charger les scores depuis le localStorage
function loadScores() {
  scores.value = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
}

// Sauvegarder dans le localStorage
function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores.value))
}

// Éditer pseudo
function edit(index) {
  editingIndex.value = index
  editedPseudo.value = scores.value[index].pseudo
}

function save(index) {
  scores.value[index].pseudo = editedPseudo.value
  editingIndex.value = null
  saveToStorage()
}

// Supprimer un score
function remove(index) {
  scores.value.splice(index, 1)
  saveToStorage()
}

// Supprimer tous les scores
function resetScoresConfirm() {
  if (confirm('Supprimer toutes les parties ?')) {
    scores.value = []
    localStorage.removeItem(STORAGE_KEY)
  }
}

onMounted(() => {
  loadScores()
})
</script>

<style scoped>
.scores {
  max-width: 800px;
  margin: auto;
  text-align: center;
  color: white;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

button {
  cursor: pointer;
}
</style>
