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
  speed: 15,
  
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
  speed : 50, 
},


createEnemie = function ( x , y ){
  this.positonX = x;
  this.positonY = y;
  this.width = 32;
  this.height = 32;
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
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  player.draw()
  for (let i = 0; i < shoots.length; i++) {
    shoots[i].move()
  }

  for (let j = 0; j < level.length; j++) {
    let y = enemies.positonY + ( 50 * j ) ;
    for (let i = 0; i < level[j].length; i++) {
      let x = enemies.positonX + ( 50 * i ) ;
      let enemy = new createEnemie( x , y )
      enemy.move()
    } 
  }   


},10);


  

