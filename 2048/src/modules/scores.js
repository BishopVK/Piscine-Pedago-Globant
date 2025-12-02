export function updateScore(value) {
  const scoreElement = document.getElementById("score-value");
  let currentScore = parseInt(scoreElement.textContent);

  currentScore += value;
  scoreElement.textContent = currentScore;
  updateBestScore(currentScore);
}

export function resetScore() {
  const scoreElement = document.getElementById("score-value");
  let resetScore = 0;
  scoreElement.textContent = resetScore;
}

export function updateBestScore(currentScore) {
  const bestScore = localStorage.getItem("bestScore");

  if (!bestScore)
    localStorage.setItem("bestScore", currentScore);

  if (currentScore > bestScore)
    localStorage.setItem("bestScore", currentScore);

  const bestScoreDOM = document.getElementById("best-score-value");
  if (!bestScoreDOM) {
    console.error("Best Score not found in DOM");
    return;
  }

  bestScoreDOM.textContent = localStorage.getItem("bestScore");
}