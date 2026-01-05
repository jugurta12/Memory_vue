<template>
  <div class="scores">
    <h2>Historique des parties</h2>

    <div class="actions">
      <select v-model="sortKey">
        <option value="pseudo">Pseudo</option>
        <option value="size">Difficulté</option>
        <option value="time">Temps</option>
        <option value="tries">Essais</option>
      </select>

      <button @click="resetScores">Tout supprimer</button>
    </div>

    <table v-if="sortedScores.length">
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
        <tr v-for="(score, index) in sortedScores" :key="index">
          <td>
            <input
              v-if="editingIndex === index"
              v-model="editedPseudo"
            />
            <span v-else>{{ score.pseudo }}</span>
          </td>

          <td>{{ score.size }} x {{ score.size }}</td>
          <td>{{ score.time }}</td>
          <td>{{ score.tries }}</td>

          <td>
            <button v-if="editingIndex !== index" @click="edit(index)">
              ✏️
            </button>
            <button v-else @click="save(index)">
              💾
            </button>

            <button @click="remove(index)">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Aucune partie enregistrée.</p>

    <router-link to="/">⬅ Retour au menu</router-link>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const scores = ref(JSON.parse(localStorage.getItem('scores')) || [])
const sortKey = ref('pseudo')

const editingIndex = ref(null)
const editedPseudo = ref('')

const sortedScores = computed(() => {
  return [...scores.value].sort((a, b) => {
    if (a[sortKey.value] > b[sortKey.value]) return 1
    if (a[sortKey.value] < b[sortKey.value]) return -1
    return 0
  })
})

function saveToStorage() {
  localStorage.setItem('scores', JSON.stringify(scores.value))
}

function edit(index) {
  editingIndex.value = index
  editedPseudo.value = scores.value[index].pseudo
}

function save(index) {
  scores.value[index].pseudo = editedPseudo.value
  editingIndex.value = null
  saveToStorage()
}

function remove(index) {
  scores.value.splice(index, 1)
  saveToStorage()
}

function resetScores() {
  if (confirm("Supprimer toutes les parties ?")) {
    scores.value = []
    saveToStorage()
  }
}
</script>

<style scoped>
.scores {
  max-width: 800px;
  margin: auto;
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

.actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

button {
  cursor: pointer;
}
</style>
