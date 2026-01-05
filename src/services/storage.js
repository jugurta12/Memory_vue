export function saveScore(score) {
  const scores = JSON.parse(localStorage.getItem('scores')) || []
  scores.push(score)
  localStorage.setItem('scores', JSON.stringify(scores))
}

export function getScores() {
  return JSON.parse(localStorage.getItem('scores')) || []
}
