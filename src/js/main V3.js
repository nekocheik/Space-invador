import { prototype } from "events";
import { create } from "domain";

//_________________________________________________________ -fuction get position- ________________________________________________________//

var getPosition = function (element , position ){
  if (!element) {
    console.error(' ---- getPosition ---- as not a element on the function');
    return
  }
  let positionX =  element.offsetLeft + (element.clientWidth / 2 );
  let positionY =  element.clientTop + (element.clientHeight / 2 );
  let center =  ( element.offsetLeft + (element.clientWidth / 2 ) ) - (element.clientTop + (element.clientHeight / 2 ) ) ;
  if(position === 'x' ){
    return positionX ;
  }else if( position === 'y'){
    return positionY ;
  }else{
    return center ;
  }
}

////---Remove objet---//// 

let check = document.createElement('div');

function destrutor(element) {
  if (!element) {
    console.error('----- destrutor ---- add a element your are forget ?')
    return
  }
  if ( typeof element === 'object' ) {
    element.element.remove();
  }
}


//_______________________________________________________________________________________________________________________________________
//_________________________________________________________ Player__________________________________________________________________________//
//__________________________________________________________________________________________________________________________________________

var creatPlayer = function() {
  this.element = document.querySelector('.ctx .player') ;
}

creatPlayer.prototype.position= function () {
  this.x =  getPosition(this.element , 'x');
  this.y = getPosition(this.element , 'y');
  this.center = getPosition(this.element , 'center');
  //console.log('get the position is true' , this.center , this.y , this.x )
}
///--- create a player ---///
var player = new creatPlayer() ;

///--- interval for get the position of the player ---///

setInterval( function(){
  player.position()
} , 20 )
player.position()

////---- player move  ----////

const Move = {
  x : 1 ,
  speed : 10,
  ArrowRight : function(){
    return this.x+= this.speed ;
  } ,
  ArrowLeft : function(){ 
    return this.x -= this.speed ;
  } ,
};

// Event for player move .

document.addEventListener('keydown', () => {
  if( event.key === "ArrowRight" || event.key === "ArrowLeft" ) {
    player.element.style.left = `${Move[event.key](player) / 3 }vw` ;
  }
});

//_______________________________________________________________________________________________________________________________________
/////_________________________________________________________ enemies __________________________________________________________________________/
//__________________________________________________________________________________________________________________________________________

///--- Array where the enemy will go --- -/ Array enemies /- ///
var enemies = [] ;

///--- Constructor for enemy ---///
var enemy = function ( ctx , numberCtx , left ) {
  var enemy = document.createElement('div');
  enemy.className = 'enemy';
  this.element = enemy ;
  this.direction = 'right';
  ctx.appendChild(enemy);
  this.speed = left ;
  this.numberCtx = numberCtx;
  this.life = true;
  // call the new position for do the move //
  this.moveAuto() 
}

///--- Get enemy position ---///
enemy.prototype.getPosition = function () {
  this.positions = {
    x :  getPosition(this.element , 'x'),
    y : getPosition(this.element , 'y'),
    center : getPosition(this.element , 'center'),
  }
  this.hitbox();
}

///--- Create hitbox ---///

enemy.prototype.hitbox = function () {
  this.body = {
    topLeft : this.element.offsetLeft ,
    topRight : this.element.offsetLeft + this.element.clientWidth ,
    bottomLeft : this.element.offsetLeft ,
    bottomRight : this.element.clientWidth + this.element.offsetLeft ,
  };
  this.wall();
}


///--- detect if touch the wall ---///
enemy.prototype.wall = function(){
  if ( !this.life ) {  
    return}
    this.moveAuto();
    if (( this.numberCtx < 9 ) && ( this.body.bottomRight < ( maps[this.numberCtx].width ) ) && (this.body.bottomLeft >= 10 ) ) {
    }else{
      changeMap();
    }
  }
  
  
  enemy.prototype.changeDirection = function () {
    this.direction = (( this.direction === "right" ) ? "left" : "right" );
  }
  
  ///--- detect if touch the wall ---///
  enemy.prototype.moveAuto = function () {
    if (this.direction === 'right') {
      this.speed += 10 ;
      this.element.style.left = `${this.speed}px`;
    }else{
      this.speed -= 10 ;
      this.element.style.left = `${this.speed}px`;
    }
    setTimeout( () => {
      this.getPosition()
    }, 100)
  }
  
  ///---Remove the enemy ---///
  enemy.prototype.removeObjet = function (){
    this.life = false ;
    destrutor(this)
    this.remove();
  }
  
  //_______________________________________________________________________________________________________________________________________
  //_________________________________________________________ Map __________________________________________________________________________//
  //________________________________________________________________________________________________________________________________________
  
  
  var mapsConstructor = function( element , i ){
    this.element = element ;
    this.width = null ;
    this.height = null ;
    this.child = [] ;
    this.mapsNumber = i;
    this.Mapping();
  }
  
  mapsConstructor.prototype.Mapping = function(i) {
    this.width = this.element.clientWidth ;
    this.height = this.element.clientHeight;
  }
  
  mapsConstructor.prototype.mapenemyCreat = function() {
    if ( this.mapsNumber < 10 ) {
      for (let i = 0; i < 10 ; i++) {
        let left =  50 * i ;
        this.child.push(new enemy( this.element , this.mapsNumber , left ));  
      }
    }
  }
  var map = true ;
  
  mapsConstructor.prototype.changeChild = function (params) {
    map = false
    this.mapsNumber += 1 ;
    for (let i = 0; i < this.child.length; i++) {
      if (this.child[i] !== undefined ) {
        maps[this.mapsNumber].element.appendChild(this.child[i].element)
        this.child[i].changeDirection()
        setTimeout( () => {
          map = true
        }, 100 )
      }
    }
  } 
  
  
  //  add maps .
  
  var mapsElements = document.querySelectorAll('.ctx');
  var maps = [];
  
  for (let i = 0; i < mapsElements.length; i++) {
    maps[i] = new mapsConstructor(mapsElements[i] , i );
    maps[i].mapenemyCreat();
  }
  
  function changeMap() {
    if (!map) {return};
    for (let i = 0; i < maps.length; i++) {
      maps[i].changeChild()
    }
  }
  
  //_______________________________________________________________________________________________________________________________________
  ////_________________________________________________________ shoot__________________________________________________________________________//
  //__________________________________________________________________________________________________________________________________________
  
  ///--- shoot object ---///
  var shoots = {
    number : 0  , // index of shoot give the id of shoot .
  };
  
  ///--- action shoot ---//
  document.addEventListener('keypress', function(event){
    if (event.keyCode === 32 ) {
      shoots[shoots.number + 1 ] = new shoot();
    }
  })
  
  var shoot = function () {
    shoots.number++;
    this.numberOf = shoots.number ;
    this.shoot = document.createElement('div') ;
    this.shoot.className = "shoot" ;
    
    ///
    this.owner = player ;
    this.life = true ;
    this.speed = 0 ;
    this.ctxNumber = 9;
    this.initialisation() ;
  }
  
  ///--- appendChild the element ---///
  shoot.prototype.initialisation = function (){
    this.shoot.style.left = `${this.owner.center + ( this.owner.element.clientHeight / 2 ) }px` ;
    maps[9].element.appendChild(this.shoot);
    this.position();
  }
  
  ///--- this is initial position of shoot ---///
  shoot.prototype.position = function (element){
    // Get position .
    this.y = this.owner.y ;
    this.x = this.owner.x ;
    this.shootMove();
  }
  //   shootMove( this.shoot , 0 , shoots[this.numberOf] , 9 , this.owner.center )
  
  
  shoot.prototype.mapping =  function () { 
    //-- move whene the shoot change the map --//
    if ( maps[this.ctxNumber].height <= this.speed ) {
      this.ctxNumber--;
      if (this.ctxNumber === -1){ return  this.shoot.remove()}
      this.speed = 0 ;
      maps[this.ctxNumber].element.appendChild(this.shoot);
      
      if (maps[this.ctxNumber].child[0])
      console.log( maps[this.ctxNumber].child[0].body.topLeft , this.shoot.offsetLeft , maps[this.ctxNumber].child[0].body.topRight );
      for (let i = 0; i < maps[this.ctxNumber].child.length; i++) {
        if (maps[this.ctxNumber].child[i] && ( ( this.shoot.offsetLeft < maps[this.ctxNumber].child[i].body.topRight ) && ( this.shoot.offsetLeft  > maps[this.ctxNumber].child[i].body.topLeft) )){
          maps[this.ctxNumber].child[i].element.remove()
          maps[this.ctxNumber].child[i].life = false;
          maps[this.ctxNumber].child[i] = undefined ;
          this.shoot.remove()
          return;     
        }
      } 
    }
    this.shootMove()
  }
  
  ///---shoot move---///
  shoot.prototype.shootMove =  function () {
    this.speed = this.speed + 10;
    this.shoot.style.bottom = `${this.speed}px` ;
    setTimeout( () => { 
      this.mapping();
    } ,10)
  }
  