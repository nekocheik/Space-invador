import { prototype } from "events";
import { create } from "domain";

//_________________________________________________________ -fuction get position- __________________________________________________________________________//

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
} , 50 )
player.position()

////---- player move  ----////

const Move = {
  x : 1 ,
  speed : 4,
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
var enemy = function (ctx , numberCtx ) {
  var enemy = document.createElement('div');
  enemy.className = 'enemy';
  this.element = enemy ;
  this.direction = 'right';
  ctx.appendChild(enemy);
  this.speed = 0 ;
  
  // call the new position for do the move //
  this.getPosition(numberCtx);
}

///--- Get enemy position ---///
enemy.prototype.getPosition = function ( numberCtx ) {
  this.numberCtx = numberCtx;
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
    bottomLeft : this.element.clientHeight + this.element.offsetLeft ,
    bottomRight : this.element.clientHeight + this.element.clientWidth + this.element.offsetLeft ,
  }
  this.wall()
}


///--- detect if touche the wall ---///

enemy.prototype.wall = function(){
  ////////// ----- console.log( this.numberCtx  , this.body.bottomRight , maps[this.numberCtx].width  , this.body.bottomLeft ) ----- ////////// 
  if (( this.numberCtx< 9 ) && ( this.body.bottomRight <= maps[this.numberCtx].width ) && (this.body.bottomLeft >= 0 ) ) {
    this.moveAuto( )
  }else{
    this.direction = (( this.direction === "right" ) ? "left" : "right" );
    this.numberCtx++;
    maps[this.numberCtx].element.prepend(this.element);
    this.moveAuto( )
  }
}

///--- detect if touche the wall ---///

enemy.prototype.moveAuto = function () {
  if (this.direction === 'right') {
    this.speed++;
    this.element.style.left = `${this.speed}vw`;
  }else{
    this.speed-- ;
    this.element.style.left = `${this.speed}vw`;
  }
  setTimeout( () => {
    this.getPosition(this.numberCtx);
  }, 50)
}
  
  ///---Remove the enemy ---///
  
  enemy.prototype.removeObjet = function (){
    this.life = false ;
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
    if ( this.mapsNumber < 7 ) {
      this.child.push(new enemy( this.element , this.mapsNumber ));
    }
  }
  
  //  add maps .
  
  var mapsElements = document.querySelectorAll('.ctx');
  var maps = [];
  
  for (let i = 0; i < mapsElements.length; i++) {
    maps[i] = new mapsConstructor(mapsElements[i] , i );
    maps[i].mapenemyCreat();
  }
  
  
  //_______________________________________________________________________________________________________________________________________
  //_________________________________________________________ shoot__________________________________________________________________________//
  //__________________________________________________________________________________________________________________________________________
  
  ///--- shoot object ---///
  var shoots = {
    number : 0  , // index of shoot give the id of shoot .
  };
  
  ///--- action shoot ---//
  document.addEventListener('keypress', function(event){
    if (event.keyCode === 13 ) {
      shoots[shoots.number + 1 ] = new shootConstructor();
      shoots[shoots.number].move(); // add action move for element who is comming creat //
    }
  })
  
  var shootConstructor = function () {
    shoots.number++;
    this.numberOf = shoots.number ;
    this.shoot = document.createElement('div') ;
    this.shoot.className = "shoot" ;
    this.y = null;
    this.x = null ;
    this.owner = player ;
    this.life = true ;
  }
  
  shootConstructor.prototype.move = function (element){
    // Get position .
    
    this.y = this.owner.y ;
    this.x = this.owner.x ;
    
    
    // this initial position of shoot .
    
    this.shoot.style.left = `${this.owner.center + ( this.owner.element.clientHeight / 2 ) }px` ;
    maps[9].element.appendChild(this.shoot);
    shootMove( this.shoot , 0 , shoots[this.numberOf] , 9 , this.owner.center )
    
    
  }
  
  ///---shoot move---///
  
  function shootMove(element , y , objet , i , x ) {
    // position Y of shoot
    objet.y = y ;
    if ( maps[i] && ( maps[i].height < y )) {
      i--;
      if ( i === -1 ) { 
        ///---if map is undefined remove---//
        element.remove()
        return
      }
      if (maps[i].child[0]) {
        if ( x < maps[i].child[0].body.bottomRight && x > maps[i].child[0].body.bottomLeft ) {
          maps[i].child[0].removeObjet();
          console.log(element.remove() , maps[i].child[0])
          return
        }
      }
      ///--- move whene the shoot change the map---///
      maps[i].element.appendChild(element);
      let speed = y -  maps[i].height ;
      element.style.bottom = `${speed}px` ;
      shootMove(element , speed , objet , i , x )
    }else{
      setTimeout( ( function(){ 
        // move Classique
        let speed = 20 + y ;
        element.style.bottom = `${speed}px` ;
        shootMove(element , speed , objet , i , x )
      } ),80)
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
      element.element.remove()
    }
  }
  
  
  
  