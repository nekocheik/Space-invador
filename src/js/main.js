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
  speed : 2,
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
    playeur.element.style.left = `${Move[event.key](playeur)}vw` ;
  }
});

// Fonction create Move

var enemies = [] ;

var enemiesConstructor = function (ctx) {
  var enemy = document.createElement('div');
  enemy.className = 'enemy';
  this.element = enemy ;
  this.direction = 'right';
  ctx.appendChild(enemy);
}

enemiesConstructor.prototype.postion = function ( numberCtx ) {
  this.body = {
    topLeft : this.element.offsetLeft ,
    topRight : this.element.offsetLeft + this.element.clientWidth ,
    bottomLeft : this.element.clientHeight + this.element.offsetLeft,
    bottomRight : this.element.clientHeight + this.element.clientWidth + this.element.offsetLeft ,
  }
  if (( numberCtx < 9 ) && (this.body.bottomRight >= maps[numberCtx].width ) || (this.body.bottomLeft <= 0 ) ) {
    console.log(this.element.style.left ,this.body.bottomRight, maps[numberCtx].width )
    numberCtx++ ;
    maps[numberCtx].element.appendChild(this.element)
    this.direction = (( this.direction === "right" ) ? "left" : "right" );
    return numberCtx
  }else{
    return numberCtx
  }
}

var moveEnemies = function( objetChild , numberCtx , ctx , speed ){
  numberCtx = objetChild.postion( numberCtx );
  setTimeout( function(){
    speed = changeDirection(objetChild.direction , objetChild.element , speed ) ;
    moveEnemies( objetChild , numberCtx , ctx , speed )
  }
  , 50 )
}

function changeDirection(direction , element , speed ) {
  if (direction === 'right') {
    speed++ ;
    element.style.left = `${speed}vw`;
  }else{
    speed-- ;
    element.style.left = `${speed}vw`;
  }
  return speed;
}
/////

var mapsElements = document.querySelectorAll('.ctx');
var maps = [];

var mapsConstructor = function( element ){
  this.element = element ;
  this.width = null ;
  this.height = null ;
  this.child = [] ;
  this.child.push(new enemiesConstructor(element));
}

mapsConstructor.prototype.Mapping = function(i) {
  this.mapsNumber = i ;
  this.width = this.element.clientWidth ;
  this.height = this.element.clientHeight;
  moveEnemies( this.child[0] , i , this.element , 0)
}

for (let i = 0; i < mapsElements.length; i++) {
  maps[i] = new mapsConstructor(mapsElements[i]);
  maps[i].Mapping(i)
}


// creat shoot
var shoots = [
  {number : 0 } ,
];

document.addEventListener('keypress', function(event){
  if (event.keyCode === 13 ) {
    shoots.push(new shootConstructor());
    shoots[shoots[0].number].move();
  }
})

var shootConstructor = function () {
  shoots[0].number++;
  this.numberOf = shoots[0].number ;
  this.shoot = document.createElement('div') ;
  this.shoot.className = "shoot" ;
  this.y = null;
  this.x = null ;
  this.owner = playeur ;
  this.life = true ;
}

shootConstructor.prototype.move = function (element){
  this.y = this.owner.postion.y ;
  this.x = this.owner.postion.x ;
  this.shoot.style.left = `${this.owner.element.offsetLeft}px` ;
  maps[9].element.appendChild(this.shoot);
  shootMove( this.shoot , 0 , shoots[shoots[0].number] , 9)
}

function shootMove(element , y , objet , i ) {
  objet.y = y ;
  if ( maps[i] && ( maps[i].height < y )) {
    i--;
    if ( i === -1 ) {
      element.remove()
      return
    }
    maps[i].element.appendChild(element);
    let speed = y -  maps[i].height ;
    element.style.bottom = `${speed}px` ;
    shootMove(element , speed , objet , i  )
  }else{
    setTimeout( ( function(){ 
      let speed = 20 + y ;
      element.style.bottom = `${speed}px` ;
      shootMove(element , speed , objet , i  )
    } ),100)
  }
}

