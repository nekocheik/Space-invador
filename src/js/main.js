import { prototype } from "events";
import { create } from "domain";


// Playeur 
var playeur = {
  element :  document.querySelector('.ctx .playeur') ,
  postion : {
    x : 0 ,
    y : 0 
  },
}



// Fonction create Move


var enemy = document.querySelectorAll('.ctx .enemy');

var enemiesConstructor = function (element) {
  this.element = element ;
  this.topLeft = null ;
  this.topRight = null ;
  this.bottomLeft = null ;
  this.bottomRight = null ;
  this.ctx = 1 ;
}

let map = document.querySelectorAll('.ctx'); 

enemiesConstructor.prototype.postion =function () {
  this.topLeft = this.element.offsetLeft;
  this.topRight = this.element.offsetLeft + this.element.clientWidth ;
  this.bottomLeft = this.element.clientHeight + this.element.offsetLeft;
  this.bottomRight = this.element.clientHeight + this.element.clientWidth + this.element.offsetLeft ;
  if ( this.ctx < 5 ) {
    map[this.ctx].appendChild(this.element)
    this.ctx++;
  }else{
    this.ctx = 0 ;
    map[this.ctx].appendChild(this.element)
  }
}

var enemies = [] ;

for (let i = 0; i < enemy.length; i++) {
  enemies[i] = new enemiesConstructor(enemy[i]);

}



const Move = {
  x : 1 ,
  speed : 20,
  ArrowRight : function(){ this.x = this.x + this.speed ;
    playeur.postion.x = this.x ;
    return playeur.postion.x = this.x ;
  } ,
  ArrowLeft : function(){ this.x = this.x - this.speed ;
    playeur.x = this.x ;
    return playeur.postion.x = this.x;
  } ,
};


// Event whene for move

document.addEventListener('keydown', () => {
  if( event.key === "ArrowRight" || event.key === "ArrowLeft" ) {
    playeur.element.style.left = `${Move[event.key](playeur)}px` ;
    enemies[0].element.style.left = `${Move[event.key](playeur)}px` ;
    enemies[0].postion()
  }
});
