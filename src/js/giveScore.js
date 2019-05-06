var bestScore = document.querySelector('.bestScore');

function pushTheScore(scores) {
  scores.sort().reverse();
  bestScore.innerHTML = '<h2>Best Score</h2>';
  for (let i = 0; i < scores.length; i++) {
    let div = document.createElement('p')
    div.innerHTML = `${scores[i]} : points`
    bestScore.appendChild(div);
  }
}

// function for convert the score

function giveScore(add) {
  if( localStorage.length === 0 ) {
    localStorage.setItem('scores', '[]' );
  }
  let score = localStorage.getItem('scores');
  let local = JSON.parse(score) ;
  if(add && player.score >1000 ){
    local.push(player.score);
  }
  pushTheScore(local)
  local.toString();
  local = `[`+ local+`]`
  localStorage.setItem('scores', local )
}


export { bestScore , pushTheScore , giveScore  };