var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
import { createHitbox , colision , mapHitboxLeftRight  , shootsPerimeter } from './lib';
import {  audio , assets } from '../js/assets';
//import { bestScore , pushTheScore , giveScore  } from '../js/giveScore';
import { drawImage } from '../js/drawImage';

//_____________________________________________________game-level_____________________________________________________//

var Level = function () {
  this.enemies = [ 
    [ 40, 40 , 40 , 40 , 40 , 40 , 40 , 40 , 40 , 40 , 40 ],
    [ 20 , 20 , 20 , 20 , 20 , 20 , 20 , 20 , 20 , 20 , 20],
    [ 10 , 10 , 10 , 10 , 10 , 10 , 10 , 10 , 10 , 10 , 10 ],
    [ 20 , 20 , 20 , 20 , 20 , 20 , 20 , 20 , 20 , 20 , 20],
    [ 10 , 10 , 10 , 10 , 10 , 10 , 10 , 10 , 10 , 10 , 10 ],
  ],
  this.defenseBlock = [ 0 , 0 , 0 , 0 ];
  this.start = true ;
}


var level = new Level();

//________________________________________________________________player____________________________________________________________________//

var gamePlayer = function () {
  this.positonX = 150 ;
  this.positonY = 550 ;
  this.width = 50 ;
  this.height = 20 ;
  this.speed = 20 ;
  this.score = 0 ;
  this.state = 'live' ;
  this.reloadMunition = false ;
  this.combo = 0 ;
  this.comboMemo = 0 ;
  this.live = 3 ;
  this.spirts = {
    live : require('../assets/Ship.png'),
    deathOne : require('../assets/ShipCrushedLeft.png'),
    deathTwo : require('../assets/ShipCrushedRight.png'),
  } ;
}

gamePlayer.prototype.draw = function () {
  if( this.live >= 0) {
    drawImage( ctx , this.state , 'player', this.positonX  , this.positonY , this.width , this.height , this.spirts[this.state] );
  }else{
    level.start = false ;
    giveScore(true)
    clearInterval( drawing)
  }
},


// its the player touches 

document.addEventListener('keydown', () => {
  if( event.key === "ArrowRight" ) {
    player.positonX = player.positonX + player.speed ;
  }else if(  event.key === "ArrowLeft" ){
    player.positonX = player.positonX - player.speed ;
  }if( event.key === "a"  && player.live >= 0 && player.state === 'live' ){
    if( player.reloadMunition ) return ;
    shoots.push( new ballShoot( player , 'top' , ctx ) );
    audio.shoot()
    
    // when the player shoot it create the wait time for restart
    player.reloadMunition = true ;
    setTimeout( () => {
      player.reloadMunition = false
    } , 200 )
  }
});
// shoot of player
var shoots = [];


//________________________________________________________________defense-Blocks____________________________________________________________________//
/*
The defense of blocks is the block who allows the player in of hiding behind
*/

// the block allows the to put the elements blocks in for the manipulated
var blocks = [];

var constructorDefenseBlock = function () {
  for (let i = 0; i < level.defenseBlock.length; i++) {
    // for create the block if he does not exist. ( when the game started )
    if ( !blocks[i] ) {
      let x = ( defenseBlocks.positonX + ( 150 * i )) ;
      blocks[i] = new defenseBlock( x , defenseBlocks.positonY )
    }else{
      // draw the rest of time
      blocks[i].draw()
    }
  }
}

var DefenseBlocks = function () {
  //the defenseBlocks give the position who intialise the blocks
  this.positonX = 133
  this.positonY = 475
}

function defenseBlock  ( x , y ) {
  this.positonX = x;
  this.positonY = y;
  this.width = 80;
  this.height = 50; 
  this.live = 7 ;
  // when the block is initialize the defenseBlock is drawing
  this.draw();
}


//function who allows of draw the block if its live

defenseBlock.prototype.draw = function () {
  //if the defense block is destroyed then stop draw
  if (this.live < 0) {
    this.width = 0 ;
    this.height = 0 ;
    return;
  }
  //drawing bloc of defense
  ctx.beginPath();
  ctx.rect( this.positonX , this.positonY, this.width , this.height);
  ctx.fillStyle = `#09${this.live}228`;
  ctx.fill();
  ctx.closePath();
}

//________________________________________________________________group-enemies____________________________________________________________________//

//the groupEnemies give the position who intialise the ennemy
var GroupEnemies = function () {
  this.positonX = 118
  this.positonY = 80
  this.speed = 0.2 
  this.width = null 
  this.direction = 'left'
  this.numberTouchWall = 0 ,
  //its the space between each enemy
  this.space = 50 ,
  //the jump whene the ennemies touch a wall
  this.jump = 10;
  
};

GroupEnemies.prototype.move = function (){
  if (this.direction === 'left') {
    this.positonX = this.positonX + this.speed ;
  }else{
    this.positonX = this.positonX - this.speed ;
  };
}

GroupEnemies.prototype.changeDirection = function () {
  this.direction = ( this.direction === 'left' ? 'right' : 'left');
  //when the first time the enemies touch a wall they Don't jump
  if ( this.changeDirection !== 0 ) {
    this.positonY = this.positonY + this.jump ;
  }if ( this.speed > 3 ) {
    this.speed = ( this.speed * 1.3 )
  }
  //boost the speed of the enemy 
  this.numberTouchWall++ ;
}


// the creator of the enemy 
var ennemy = function ( x , y , j , i , point ){
  this.positonX = x;
  this.positonY = y;
  this.width = 38;
  this.height = 32;
  this.commander = false;
  this.reloadMunition = false ;
  this.state = '1' ;
  this.point = point ;
  this.spirts = {
    '10' : {
      '1' : require('../assets/InvaderA1.png'),
      '2' : require('../assets/InvaderA2.png'),
    },
    '20' :  {
      '1' : require('../assets/InvaderB1.png'),
      '2' : require('../assets/InvaderB2.png'),
    },
    '40' :{
      '1' : require('../assets/InvaderA1.png'),
      '2' : require('../assets/InvaderA2.png'),
    }
  } ;
  this.positonTab = {
    row : j ,
    column : i ,
  }
}

// draw the enemy
ennemy.prototype.move = function () {
  drawImage( ctx , this.state , this.point  , this.positonX  , this.positonY , this.width , this.height , this.spirts[this.point][this.state] )
  // commander is the enemy who can change the direction of the group of enemies and shoot
  if (this.commander) {
    this.colision();
    this.shoot();
  }
}

// commander is the enemy who can change the direction and shoot
ennemy.prototype.colision = function (){
  // if touch the wall change the direction
  if ( mapHitboxLeftRight ( this , canvas )) {
    groupEnemies.changeDirection();
  }
}

//for initialize the enemy
var enemies = ['first'];

//________________________________________________________________create-enemies____________________________________________________________________//
var constructorEnemie = function () {
  if ( enemies[0] === 'first') {
    enemies = [[],
    [],
    [],
    [],
    []
  ];
}
//tab who give the title of commander
let tabCommander = []
for (let j = ( level.enemies.length - 1  ) ; j > -1 ; j--) {
  let y =  groupEnemies.positonY + ( groupEnemies.space * j ) ;
  for (let i = ( level.enemies[j].length  ) ; i > -1 ; i--) {
    let x =  groupEnemies.positonX + (  groupEnemies.space * i ) ;
    if ( typeof level.enemies[j][i] === 'number' ) {
      // for create the enmemy if he does not exist. (when the game started)
      if ( !enemies[j][i] ) {
        let point = level.enemies[j][i] ;
        let enemy = new ennemy( x , y , j  , i , point );
        enemies[j][i] = enemy ;
      }else{
        //if the enemy exist him give the new position
        enemies[j][i].positonX = x ;
        enemies[j][i].positonY = y ;
      }
      //give the title of commander at enemy if is the first of the column
      if( !tabCommander[i] && tabCommander[i] !== 0 ) {
        tabCommander[i] = i ;
        enemies[j][i].commander = true;
      }
      //did move enemy
      enemies[j][i].move();
    }
    else{
      enemies[j][i] =  null ;
      if ( level.enemies[j][i] === true ){
        // destroy the enemy
        level.enemies[j][i] = null;
      }
    }
  } 
}
}


//________________________________________________________________ball-shots____________________________________________________________________//

// Array where all shoot of enemies 
var enemiesShoots = [];

//initializes the shoot
var ballShoot = function ( element , direction , ctx ) {
  this.ctx = ctx ;
  this.shooter = element ;
  this.positonX  = element.positonX + ( element.width / 2 ) ;
  this.positonY = element.positonY; 
  this.width = 4;
  this.height = 25;
  this.speed = 8;
  this.direction = direction ;
  this.live = true
} 

ballShoot.prototype.move = function () {
  //collision white outside and destroy the shoot
  if ( this.positonY < 0 || this.positonY > ctx.height ) {
    this.live = false ;
  }
  if ( this.live === false ) {  return }
  //give the direction of the shoot
  if ( this.direction === 'top') {
    this.positonY = this.positonY - this.speed ;
  }else{
    this.positonY = this.positonY + this.speed ;
  }
  // draw the shoots
  this.ctx.beginPath();
  this.ctx.rect( this.positonX , this.positonY, this.width , this.height);
  this.ctx.fillStyle = "white";
  this.ctx.fill();
  this.ctx.closePath();
}


ennemy.prototype.shoot = function (){
  // if the player is the perimetre of the enemy he shoot
  if( shootsPerimeter( player , this ) && !this.reloadMunition ) {
    // the random number give the percentage of luke to shoot
    if ( Math.floor(Math.random() * 10) > 7 ) {
      enemiesShoots.push(new ballShoot( this , 'bottom' , ctx ));
      audio.shoot();
    }
    // give the waiting time after each time
    this.reloadMunition = true ;
    setTimeout(  () => {
      this.reloadMunition = false;
    } , 1000)
  }
}



var player = new gamePlayer ();   
var defenseBlocks = new DefenseBlocks();
var groupEnemies = new GroupEnemies();


////_____________________________________________________________________canvas_______________________________________________________________________________________

function draw() {
  
  if ( !level.start ) { 
    return
  }
  
  // clears the canvas after drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  
  
  mapHitboxLeftRight( player , canvas )
  groupEnemies.move();
  constructorEnemie() ;
  constructorDefenseBlock();
  
  // colision of shoots enemies and defense block
  for (let i = 0; i < shoots.length; i++) {
    blocks.forEach( block => {
      if ( colision( shoots[i] , block )) {
        if (shoots[i]) {
          block.live--;
          shoots[i].live = false;
        }
      }
    });
    if ( !shoots[i].live ) {
      shoots.splice( i , 1 );
    }if ( shoots[i]) {
      shoots[i].move()
    }
  }
  
  // colision of shoots player and defense block
  enemiesShoots.forEach(element => {
    if ( colision(element , player ) && player.state === 'live' ) {
      player.live--;
      element.live = false;
      player.combo = 0 ; 
      playerTouchByShoot();
      audio.explosion();
      
    }blocks.forEach( block => {
      if ( colision( element , block )) {
        block.live--;
        element.live = false;
      }
    });
  });
  
  // colision of shoots player and ennemies
  enemies.forEach( tab => {
    tab.forEach(element => {
      for ( let i = 0; i < shoots.length; i++) {
        let shoot = shoots[i];
        if ( element ) {
          if ( colision (  element , shoot ) ) {
            shoots.splice( i , 1 ) ;
            audio.kill();
            timeCombot()
            player.score += level.enemies[element.positonTab.row][element.positonTab.column] * player.combo ;
            level.enemies[element.positonTab.row][element.positonTab.column] = true ;
          }
        }
      }
    });
  });
  
  // colision of shoots enemies and player
  for (let i = 0; i < enemiesShoots.length; i++) {
    if ( !enemiesShoots[i].live ) {
      enemiesShoots.splice( i , 1 );
    }
    if (enemiesShoots[i]) {
      enemiesShoots[i].move()
    }
  }
  
}

var drawing = setInterval( ()=>{ 
  draw()
}, 10);



var lives = document.querySelector('.lives');
var combo = document.querySelector('.combo')
var score = document.querySelector('.score');



function reloadDom() {
  if( !level ) return
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
setInterval( () =>{
  reloadDom()
}, 100 )


setTimeout(() => {
  setInterval(() => {
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].forEach(enemy => { 
        if (enemy) {
          enemy.state = enemy.state === '1' ? '2' : '1';
        }
      })
    };
  }, 300);
}, 1000);


function playerTouchByShoot() {
  var intevalblink = setInterval(() => { blinkColision()}, 90 )
  setTimeout(() => {
    clearInterval(intevalblink)
    player.state = 'live'
  }, 1200);
}

function timeCombot() { 
  player.combo++;
  combo.classList.remove('blink')
  setTimeout(() => {
    if ( player.comboMemo <= player.combo ) {
      combo.classList.add('blink')
    }
  }, 1500);
  
  setTimeout(() => {
    player.comboMemo++;
    if ( player.comboMemo >= player.combo ) {
      player.combo = 0 ; 
      player.comboMemo = 0 ;
      combo.classList.remove('blink')
    }
  }, 2500);
}

function blinkColision() {
  if (player.state !== 'deathOne' ) {
    player.state = 'deathOne'
  }else{ player.state = 'deathTwo' }
}

var buttonRestart = document.querySelector('.restart');
buttonRestart.addEventListener('click', function(){
  restart()
})


function restart() {
  if (!level.start) {
    blocks = [];
    enemies = ['first'] ; 
    shoots = [];
    enemiesShoots = [];
    
    level = new Level();
    defenseBlocks = new DefenseBlocks();
    groupEnemies = new GroupEnemies();
    player = new gamePlayer ();   
    
    drawing = setInterval( ()=>{ 
      draw()
    }, 10);
  }
}

var bestScore = document.querySelector('.bestScore');

function pushTheScore(scores) {
  scores.sort();
  scores.reverse();
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
  console.log(player)
  let score = localStorage.getItem('scores');
  let local = JSON.parse(score) ;
  if( add && player.score >1000 ){
    local.push(player.score);
  }
  pushTheScore(local)
  local.toString();
  local = `[`+ local+`]`
  localStorage.setItem('scores', local )
}


// give-score function export 
giveScore()

