
var lives = document.querySelector('.lives');
var combo = document.querySelector('.combo')
var score = document.querySelector('.score');

function reloadDom() {
  console.log( level )
  if( !level ) return ;
  if (!level.start) {
    if ( buttonRestart.className !== 'restart active') {
      buttonRestart.classList.add('active')
    }
    return;
  }else{
    if ( buttonRestart.className !== 'restart' ) {
      buttonRestart.classList.remove('active')
    }
  }
  
  let live = lives.querySelectorAll('.live')
  live.forEach(element => {
    element.remove()
  });
  
  if(!player.combo){
    player.combo = 0 ;
  }
  combo.innerHTML = `Combo : ${player.combo}`
  
  score.innerHTML = `<p>Score : ${ player.score }</p>`
  for (let i = 0; i < player.live; i++) {
    lives.innerHTML += '<div class="live"></div>';
  }
}


export{ lives , combo , score , reloadDom }