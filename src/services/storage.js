const STORAGE_KEY = 'memory-scores'

export function getScores() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
}

export function saveScore(score) {
  const scores = getScores()
  scores.push({
    id: Date.now(),
    ...score
  })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
}

export function deleteScore(id) {
  const scores = getScores().filter(s => s.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
}

export function resetScores() {
  localStorage.removeItem(STORAGE_KEY)
}
