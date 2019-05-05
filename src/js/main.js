var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
import { createHitbox , colision , mapHitboxLeftRight  , shootsPerimeter } from '../js/ckc';

//_____________________________________________________game-level_____________________________________________________//

var level = {
  enemies : [ 
    [ 0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
    [ 0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
    [ 0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
    [ 0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
    [ 0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
  ],
  defenseBlock : [ 0 , 0 , 0 , 0 ]
}


//________________________________________________________________player____________________________________________________________________//
var player = {
  positonX : 100,
  positonY : 550,
  width : 50,
  height: 20,
  speed: 30,
  reloadMunition : false ,
  life : 3 ,
  draw : function ()  {
    if( this.life >= 0) {
      ctx.beginPath();
      ctx.rect( this.positonX , this.positonY, this.width , this.height);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.closePath();
    }
  },
}
// its the player touches 

document.addEventListener('keydown', () => {
  if( event.key === "ArrowRight" ) {
    player.positonX = player.positonX + player.speed ;
  }else if(  event.key === "ArrowLeft" ){
    player.positonX = player.positonX - player.speed ;
  }if( event.key === "a"  && player.life >= 0 ){
    if( player.reloadMunition ) return ;
    shoots.push( new ballShoot( player , 'top' , ctx ) );
    
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

var defenseBlocks = {
  //the defenseBlocks give the position who intialise the blocks
  positonX : 133,
  positonY : 475,
}

function defenseBlock  ( x , y ) {
  this.positonX = x;
  this.positonY = y;
  this.width = 80;
  this.height = 50; 
  this.life = 7 ;
  // when the block is initialize the defenseBlock is drawing
  this.draw();
}


//function who allows of draw the block if its live

defenseBlock.prototype.draw = function () {
  //if the defense block is destroyed then stop draw
  if (this.life < 0) {
    this.width = 0 ;
    this.height = 0 ;
    return;
  }
  //drawing bloc of defense
  ctx.beginPath();
  ctx.rect( this.positonX , this.positonY, this.width , this.height);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

//________________________________________________________________group-enemies____________________________________________________________________//

//the groupEnemies give the position who intialise the ennemy
var groupEnemies = {
  positonX : 118,
  positonY : 80,
  speed : 0.1 ,
  width: null ,
  direction : 'left',
  numberTouchWall : 0 ,
  //its the space between each enemy
  space : 50 ,
  //the jump whene the ennemies touch a wall
  jump : 10,
  move : function () {
    if (this.direction === 'left') {
      this.positonX = this.positonX + this.speed ;
    }else{
      this.positonX = this.positonX - this.speed ;
    };
  },
  changeDirection  : function () {
    this.direction = ( this.direction === 'left' ? 'right' : 'left');
    //when the first time the enemies touch a wall they Don't jump
    if ( this.changeDirection !== 0 ) {
      this.positonY = this.positonY + this.jump ;
    }
    //boost the speed of the enemy 
    this.speed = ( this.speed * 1.1 )
    this.numberTouchWall++ ;
  }
},


// the creator of the enemy 
ennemy = function ( x , y , j , i ){
  this.positonX = x;
  this.positonY = y;
  this.width = 32;
  this.height = 32;
  this.commander = false;
  this.reloadMunition = false ;
  this.positonTab = {
    row : j ,
    column : i ,
  }
}

// draw the enemy
ennemy.prototype.move = function () {
  ctx.beginPath();
  ctx.rect( this.positonX , this.positonY, this.width , this.height);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
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
    if ( level.enemies[j][i] === 0 ) {
       // for create the enmemy if he does not exist. (when the game started)
      if ( !enemies[j][i] ) {
        let enemy = new ennemy( x , y , j  , i  );
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
  this.width = 5;
  this.height = 15;
  this.speed = 8;
  this.direction = direction ;
  this.life = true
} 

ballShoot.prototype.move = function () {
  //collision white outside and destroy the shoot
  if ( this.positonY < 0 || this.positonY > ctx.height ) {
    this.life = false ;
  }
  if ( this.life === false ) {  return }
  //give the direction of the shoot
  if ( this.direction === 'top') {
    this.positonY = this.positonY - this.speed ;
  }else{
    this.positonY = this.positonY + this.speed ;
  }
  // draw the shoot
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
      enemiesShoots.push(new ballShoot( this , 'bottom' , ctx ))     
    }
    // give the waiting time after each time
    this.reloadMunition = true ;
    setTimeout(  () => {
      this.reloadMunition = false;
    } , 1000)
  }
}

setInterval( ()=>{ 

  // check the position of the player if touch the wall befor the drawing
  mapHitboxLeftRight( player , canvas )

    // clears the canvas after drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  
  player.draw();
  groupEnemies.move();
  constructorEnemie() ;
  constructorDefenseBlock();
  
  // colision of shoots enemies and defense block
  for (let i = 0; i < shoots.length; i++) {
    blocks.forEach( block => {
      if ( colision( shoots[i] , block )) {
        if (shoots[i]) {
          block.life--;
          shoots[i].life = false;
        }
      }
    });
    if ( !shoots[i].life ) {
      shoots.splice( i , 1 );
    }if ( shoots[i]) {
      shoots[i].move()
    }
  }

// colision of shoots player and defense block
  enemiesShoots.forEach(element => {
    if ( colision(element , player )) {
      player.life--;
      element.life = false;
    }blocks.forEach( block => {
      if ( colision( element , block )) {
        block.life--;
        element.life = false;
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
            level.enemies[element.positonTab.row][element.positonTab.column] = true ;
          }
        }
      }
    });
  });

     // colision of shoots enemies and player
     for (let i = 0; i < enemiesShoots.length; i++) {
      if ( !enemiesShoots[i].life ) {
        enemiesShoots.splice( i , 1 );
      }
      if (enemiesShoots[i]) {
        enemiesShoots[i].move()
      }
    }
  
  
}, 10);








