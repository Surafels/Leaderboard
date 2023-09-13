const scores = [
  { id: 1, name: 'Name', score: 100 },
  { id: 2, name: 'Name', score: 20 },
  { id: 3, name: 'Name', score: 50 },
  { id: 4, name: 'Name', score: 78 },
  { id: 5, name: 'Name', score: 128 },

];

const scoreList = document.getElementById('score-List');
const saveList = () => {
  scoreList.innerHTML = scores.map((score) => `<li>${score.name}:${score.score}</li>`).join('\n');
};

export default saveList;