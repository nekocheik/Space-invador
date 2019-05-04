var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
import { createHitbox , colision , mapHitbox , ballShoot } from '../js/ckc';



var level = [
  [ 0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
  [ 0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
  [ 0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
  [ 0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
  [ 0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
]



var player = {
  positonX : 100,
  positonY : 550,
  width : 50,
  height: 20,
  speed: 30,
  
  draw : function ()  {
    ctx.beginPath();
    ctx.rect( this.positonX , this.positonY, this.width , this.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  },
}




var groupEnemies = {
  positonX : 118,
  positonY : 80,
  speed : 0.3 ,
  width: null ,
  direction : 'left',
  numberTouchWall : 0 ,
  space : 50 ,
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
    if ( this.changeDirection !== 0 ) {
      this.positonY = this.positonY + this.jump ;
      //console.log(this.positonY)
    }
    this.numberTouchWall++ ;
  }
},



createEnemie = function ( x , y , j , i ){
  this.positonX = x;
  this.positonY = y;
  this.width = 32;
  this.height = 32;
  this.commander = false;
  this.positonTab = {
    row : j ,
    column : i ,
  }
}

createEnemie.prototype.move = function () {
  ctx.beginPath();
  ctx.rect( this.positonX , this.positonY, this.width , this.height);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
  if (this.commander) {
    this.colision()
  }
}


createEnemie.prototype.colision = function (){
  if ( mapHitbox ( this , canvas )) {
    groupEnemies.changeDirection();
    console.log( this.positonTab )  
  }
}

createEnemie.prototype.shoot = function (){
  
}



var shoots = [];

document.addEventListener('keydown', () => {
  if( event.key === "ArrowRight" ) {
    player.positonX = player.positonX + player.speed ;
  }else if(  event.key === "ArrowLeft" ){
    player.positonX = player.positonX - player.speed ;
  }if( event.key === "a" ){
    shoots.push( new ballShoot( player , '      ' , ctx ) );
  }
});




setInterval( ()=>{ 
  
  mapHitbox( player , canvas )
  
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  constructorEnemie();
  player.draw();
  groupEnemies.move();
  
  for (let i = 0; i < shoots.length; i++) {
    shoots[i].move()
  }
  
  enemies.forEach( tab => {
    tab.forEach(element => {
      for ( let i = 0; i < shoots.length; i++) {
        let shoot = shoots[i];
        if ( element ) {
          if ( colision (  element , shoot ) ) {
            shoots.splice( i , 1 ) ;
            level[element.positonTab.row][element.positonTab.column] = true ;
          }
        }
      }
    });
  });
  
}, 10);



var enemies = [];

var constructorEnemie = function () {
  enemies =  [[],
              [],
              [],
              [],
              []
             ];
             let tabCommander = []
  for (let j = 0; j < level.length; j++) {
    let y =  groupEnemies.positonY + ( groupEnemies.space * j ) ;
    for (let i = 0; i < level[j].length; i++) {
      let x =  groupEnemies.positonX + (  groupEnemies.space * i ) ;
      if ( level[j][i] === 0 ) {
        let enemy = new createEnemie( x , y , j , i );
        enemies[j].push(enemy) 
        if ( !tabCommander[i] && tabCommander[i] !== 0 ) {
          tabCommander[i] = i ;
          enemy.commander = true;
        }
        enemy.move();
        var enemieWidth = i * groupEnemies.space + enemy.width ;
      }else{
        enemies[j].push( null );
        if ( level[j][i] === true ){
          level[j][i] = null;
        }
      }
    } 
  }
  groupEnemies.width = enemieWidth ;
}

