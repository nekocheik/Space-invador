import { prototype } from "events";
import { create } from "domain";
// Player .

var player = {
  element :  document.querySelector('.ctx .player') ,
  postion : {
    x : 0 ,
    y : 0 
  },
}

//that the player move .

const Move = {
  x : 1 ,
  speed : 2,
  ArrowRight : function(){ this.x = this.x + this.speed ;
    player.postion.x = this.x ;
    return player.postion.x = this.x ;
  } ,
  ArrowLeft : function(){ this.x = this.x - this.speed ;
    player.x = this.x ;
    return player.postion.x = this.x;
  } ,
};

// Event for player move .

document.addEventListener('keydown', () => {
  if( event.key === "ArrowRight" || event.key === "ArrowLeft" ) {
    player.element.style.left = `${Move[event.key](player)}vw` ;
  }
});



// Create enemies .

var enemies = [] ;

// Constructor enemies .

var enemiesConstructor = function (ctx) {
  var enemy = document.createElement('div');
  enemy.className = 'enemy';
  this.element = enemy ;
  this.direction = 'right';
  this.jump = true ;
  ctx.appendChild(enemy);
}

enemiesConstructor.prototype.postion = function ( numberCtx ) {
  // the hitbox of en player .
  
  this.body = {
    topLeft : this.element.offsetLeft ,
    topRight : this.element.offsetLeft + this.element.clientWidth ,
    bottomLeft : this.element.clientHeight + this.element.offsetLeft,
    bottomRight : this.element.clientHeight + this.element.clientWidth + this.element.offsetLeft ,
  }
  // for ennemies to change direction .
  if (( numberCtx < 9 ) && (this.body.bottomRight >= maps[numberCtx].width ) || (this.body.bottomLeft <= 0 ) ) {
    numberCtx++ ;
    if (numberCtx === 8) {
      this.element.remove()
      return
    };
    maps[numberCtx].element.prepend(this.element);
    this.direction = (( this.direction === "right" ) ? "left" : "right" );
  }
  return numberCtx
}

// setTimeout récursif for créat move enemy .

var moveEnemies = function( objetChild , numberCtx , ctx , speed ){
  numberCtx = objetChild.postion( numberCtx );
  if (!numberCtx && (numberCtx !== 0 ) ) {
    return;
  }
  setTimeout( function(){
    speed = changeDirection(objetChild.direction , objetChild.element , speed , objetChild  ) ;
    moveEnemies( objetChild , numberCtx , ctx , speed )
  } , 50 )
}

// Move and change direction for enemy .

function changeDirection(direction , element , speed , objetChild) {
  if (direction === 'right') {
    speed++ 
    element.style.left = `${speed}vw`;
  }else{
    speed-- ;
    element.style.left = `${speed}vw`;
  }
  return speed;
}

// map constructor .

var mapsConstructor = function( element ){
  this.element = element ;
  this.width = null ;
  this.height = null ;
  this.child = [] ;
  this.childElement = element ;
}

mapsConstructor.prototype.Mapping = function(i) {
  this.mapsNumber = i ;
  this.width = this.element.clientWidth ;
  this.height = this.element.clientHeight;
  if ( i < 7 ) {
    this.child.push(new enemiesConstructor(this.childElement ));
    moveEnemies( this.child[0] , i , this.element , 0)
  }
}
//  add maps .

var mapsElements = document.querySelectorAll('.ctx');
var maps = [];

for (let i = 0; i < mapsElements.length; i++) {
  maps[i] = new mapsConstructor(mapsElements[i]);
  maps[i].Mapping(i)
}


// creat shoot

var shoots = {
  number : 0  , // index of shoot give the id of shoot .
};

// action shoot
document.addEventListener('keypress', function(event){
  if (event.keyCode === 13 ) {
    shoots[shoots.number + 1 ] = new shootConstructor();
    shoots[shoots.number].move();
  }
})

var shootConstructor = function () {
  // Créate element .
  shoots.number++;
  this.numberOf = shoots.number ;
  this.shoot = document.createElement('div') ;
  this.shoot.className = "shoot" ;
  // Get position .
  this.y = null;
  this.x = null ;
  this.owner = player ;
  this.life = true ;
}

shootConstructor.prototype.move = function (element){
  // Get position .
  this.y = this.owner.postion.y ;
  this.x = this.owner.postion.x ;
  // this initial position of shoot .
  this.shoot.style.left = `${this.owner.element.offsetLeft}px` ;
  maps[9].element.appendChild(this.shoot);
  shootMove( this.shoot , 0 , shoots[this.numberOf] , 9)
}

// shoot move 

function shootMove(element , y , objet , i ) {
  // position Y of shoot
  objet.y = y ;
  if ( maps[i] && ( maps[i].height < y )) {
    i--;
    if ( i === -1 ) { 
      // if map is undefined remove
      element.remove()
      return
    }
    // move whene the shoot change the map
    maps[i].element.appendChild(element);
    let speed = y -  maps[i].height ;
    element.style.bottom = `${speed}px` ;
    shootMove(element , speed , objet , i  )
  }else{
    setTimeout( ( function(){ 
      // move Classique
      let speed = 20 + y ;
      element.style.bottom = `${speed}px` ;
      shootMove(element , speed , objet , i  )
    } ),100)
  }
}

