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
var mapsElements = document.querySelectorAll('.ctx');

var maps = [];

var mapsConstructor = function(element){
  this.element = element ;
  this.width = null ;
  this.height = null ;
  this.child = null ;
}

for (let i = 0; i < mapsElements.length; i++) {
  maps[i] = new mapsConstructor(mapsElements[i]);
}

mapsConstructor.prototype.inner = function(params) {
  this.width = this.element.clientWidth ;
  this.height = this.element.clientHeight;
  this.child = null ;
}


enemiesConstructor.prototype.postion =function () {
  this.topLeft = this.element.offsetLeft;
  this.topRight = this.element.offsetLeft + this.element.clientWidth ;
  this.bottomLeft = this.element.clientHeight + this.element.offsetLeft;
  this.bottomRight = this.element.clientHeight + this.element.clientWidth + this.element.offsetLeft ;
  if (!maps[0].width) {
    for (let i = 0; i < maps.length ; i++) {
      maps[i].inner();
    }
  }
  if ( (this.bottomRight > maps[0].width ) || ( this.topLeft < 0 ) && ( this.ctx < 10) ) {
    mapsElements[this.ctx].appendChild(this.element)
    this.ctx++;
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
    console.log(enemies)
  }
});

console.log(maps , enemies)