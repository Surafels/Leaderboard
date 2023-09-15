const refreshButton = document.getElementById('refresh');
const submitButton = document.getElementById('submit-btn');
const playerNameInput = document.querySelector('#your-name');
const scoreInput = document.querySelector('#your-score');
const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/NIRId4TfhEE56XcSHFTP/scores/';

const renderScores = (scores) => {
  const scoreList = document.getElementById('score-List');
  if (Array.isArray(scores)) {
    scoreList.innerHTML = scores
      .map((score) => `<li>${score.user}: ${score.score}</li>`)
      .join('');
  } else {
    scoreList.innerHTML = 'No scores found';
  }
};

const refreshScores = async () => {
  try {
    const response = await fetch(baseURL);
    if (response.ok) {
      const scoresData = await response.json();
      renderScores(scoresData.result);
    } else {
      throw new Error('Error fetching scores');
    }
  } catch (error) {
    /* eslint-disable no-console */
    console.error('Error fetching scores:', error);
  }
};

const submitScore = async () => {
  const playerName = playerNameInput.value;
  const score = scoreInput.value;
  const data = { user: playerName, score };

  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      playerNameInput.value = '';
      scoreInput.value = '';
      refreshScores();
    } else {
      throw new Error('Error submitting score');
    }
  } catch (error) {
    /* eslint-disable no-console */
    console.error('Error submitting score:', error);
  }
};

refreshButton.addEventListener('click', refreshScores);
submitButton.addEventListener('click', submitScore);

(async () => {
  await refreshScores();
})();
export { renderScores, refreshScores, submitScore };