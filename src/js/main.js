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

// Fonction create Move
var enemy = document.querySelectorAll('.ctx .enemy');
var enemiesConstructor = function (element) {
  this.element = element ;
  this.body = null
  this.ctx = 1 ;
}

enemiesConstructor.prototype.postion =function () {
  this.body = {
    topLeft : this.element.offsetLeft ,
    topRight : this.element.offsetLeft + this.element.clientWidth ,
    bottomLeft : this.element.clientHeight + this.element.offsetLeft,
    bottomRight : this.element.clientHeight + this.element.clientWidth + this.element.offsetLeft ,
  }
  if (!maps[0].width) {
    for (let i = 0; i < maps.length ; i++) {
      maps[i].inner();
    }
  }
  if ( (this.body.bottomRight > maps[0].width ) || ( this.body.topLeft < 0 ) && ( this.ctx < 10) ) {
    mapsElements[this.ctx].appendChild(this.element)
    this.ctx++;
  }
}

var enemies = [] ;

for (let i = 0; i < enemy.length; i++) {
  enemies[i] = new enemiesConstructor(enemy[i]);
  
}


var mapsElements = document.querySelectorAll('.ctx');
var maps = [];

var mapsConstructor = function(element){
  this.element = element ;
  this.width = null ;
  this.height = null ;
  this.child = null ;
  this.Mapping();
}

mapsConstructor.prototype.Mapping = function() {
  this.width = this.element.clientWidth ;
  this.height = this.element.clientHeight;
  this.child = null ;
}

for (let i = 0; i < mapsElements.length; i++) {
  maps[i] = new mapsConstructor(mapsElements[i]);
}
// Event whene for move

document.addEventListener('keydown', () => {
  if( event.key === "ArrowRight" || event.key === "ArrowLeft" ) {
    playeur.element.style.left = `${Move[event.key](playeur)}px` ;
    enemies[0].element.style.left = `${Move[event.key](playeur)}px` ;
    enemies[0].postion();
    console.log(enemies)
  }
});


// creat shoot
var shoots = [
  {number : 0 } ,
];

document.addEventListener('keypress', function(event){
  if (event.keyCode === 13 ) {
      shoots.push(new shootConstructor())
      console.log(shoots)
      console.log(maps)
      console.log(playeur)
  }
})

var shootConstructor = function () {
  shoots[0].number++;
  this.numberOf = shoots[0].number ;
  this.shoot = document.createElement('div') ;
  this.shoot.className = "shoot" ;
  maps[9].element.appendChild(this.shoot);
  this.y = null;
  this.x = null ;
  this.owner = playeur ;
  this.move();
  this.life = true ;
}

//   this.shoot.style.top = `${100}px` ; for move
shootConstructor.prototype.move = function (){
  console.log(playeur)
  this.y = this.owner.postion.y ;
  this.x = this.owner.postion.x ;
  this.shoot.style.left = `${this.owner.postion.x}px` ;
  shootMove( this.shoot , this.owner.postion.x , this.numberOf )
}

function shootMove(element , x , number ) {
  setTimeout( ( function(){ 
   let speed = 10 + x ;
   element.style.bottom = `${speed}px` ;
   shootMove(element , speed )
    } ),50)
  }
