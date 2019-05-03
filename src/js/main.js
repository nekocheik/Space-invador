var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
import { createHitbox , colision , mapHitbox } from '../js/ckc';

var player = {
  positonX : 100,
  positonY : 550,
  width : 50,
  height: 50,
  speed: 50,
  
  draw : function ()  {
    ctx.beginPath();
    ctx.rect( this.positonX , this.positonY, this.width , this.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  },
}

document.addEventListener('keydown', () => {
  if( event.key === "ArrowRight" ) {
    player.positonX = player.positonX + player.speed ;
  }else if(  event.key === "ArrowLeft" ){
    player.positonX = player.positonX - player.speed ;
  }
});




setInterval( ()=>{ 
   if( mapHitbox( player , canvas ) ){

  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw()} 
  , 10);


  var level = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
  ]