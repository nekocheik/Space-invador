var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
import { createHitbox , colision , mapHitbox , ballShoot } from '../js/ckc';



var level = [
  [ '0', '0' , '0' , '0' , '0' , '0' , '0' , '0' , '0' , '0' , '0' ],
  [ '0' , '0' , '0' , '0' , '0' , '0' , '0' , '0' , '0' , '0' , '0' ],
  [ '0' , '0' , '0' , '0' , '0' , '0' , '0' , '0' , '0' , '0' , '0' ],
  [ '0' , '0' , '0' , '0' , '0' , '0' , '0' , '0' , '0' , '0' , '0' ],
  [ '0' , '0' , '0' , '0' , '0' , '0' , '0' , '0' , '0' , '0' , '0' ],
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




var enemies = {
  positonX : 118,
  positonY : 80,
  speed : 0.4,
  width: null ,
  direction : 'left',
  changeDirection : false ,
  move : function () {
    if (this.direction === 'left') {
      this.positonX = this.positonX + this.speed ;
    }else{
      this.positonX = this.positonX - this.speed ;
    };
  } 
},


createEnemie = function ( x , y , j , i ){
  this.positonX = x;
  this.positonY = y;
  this.width = 32;
  this.height = 32;
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
}


var shoots = [];

document.addEventListener('keydown', () => {
  if( event.key === "ArrowRight" ) {
    player.positonX = player.positonX + player.speed ;
  }else if(  event.key === "ArrowLeft" ){
    player.positonX = player.positonX - player.speed ;
  }if( event.key === "a" ){
    shoots.push( new ballShoot( player , '      ' , ctx ) )
  }
});




setInterval( ()=>{ 
  
  mapHitbox( player , canvas )
  if ( mapHitbox( enemies , canvas ) ) {
    enemies.direction = ( enemies.direction === 'left' ? 'right' : 'left');
    if ( enemies.changeDirection === true ) {
      enemies.positonY = enemies.positonY + 20 ;
    }
    enemies.changeDirection = true ;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  constructorEnemie();
  player.draw();
  enemies.move();
  
  for (let i = 0; i < shoots.length; i++) {
    shoots[i].move()
  }
  ok.forEach(element => {
    shoots.forEach( shoot => {
      if (colision ( shoot , element )) {
        level[element.positonTab.row][element.positonTab.column] = null;
      }
    })
  });
}, 10);



var ok = [];

var constructorEnemie = function () {
  ok = [] ;
  for (let j = 0; j < level.length; j++) {
    let y = enemies.positonY + ( 50 * j ) ;
    for (let i = 0; i < level[j].length; i++) {
      let x = enemies.positonX + ( 50 * i ) ;
      if ( level[j][i] === '0' ) {
        let enemy = new createEnemie( x , y , j , i)
        ok.push(enemy);
        enemy.move();
        var enemiesWidth = i * 50 + enemy.width ;
      }
    } 
  }
  enemies.width = enemiesWidth ;
}


