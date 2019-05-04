var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
import { createHitbox , colision , mapHitboxLeftRight , ballShoot , shootsPerimeter } from '../js/ckc';



var level = [
  [ 0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
  [ 0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
  [ 0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
  [ 0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
  [ 0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
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




var groupEnemies = {
  positonX : 118,
  positonY : 80,
  speed : 0.3 ,
  width: null ,
  direction : 'left',
  numberTouchWall : 0 ,
  space : 50 ,
  jump : 10,
  move : function () {
    if (this.direction === 'left') {
      this.positonX = this.positonX + this.speed ;
    }else{
      this.positonX = this.positonX - this.speed ;
    };
  },
  changeDirection  : function () {
    this.direction = ( this.direction === 'left' ? 'right' : 'left');
    if ( this.changeDirection !== 0 ) {
      this.positonY = this.positonY + this.jump ;
    }
    this.numberTouchWall++ ;
  }
},



createEnemie = function ( x , y , j , i ){
  this.positonX = x;
  this.positonY = y;
  this.width = 32;
  this.height = 32;
  this.commander = false;
  this.reloadMunition = false ;
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
  if (this.commander) {
    this.colision();
    this.shoot();
  }
}


createEnemie.prototype.colision = function (){
  if ( mapHitboxLeftRight ( this , canvas )) {
    groupEnemies.changeDirection();
  }
}

createEnemie.prototype.shoot = function (){
  if( shootsPerimeter( player , this ) && !this.reloadMunition ) {
    this.reloadMunition = true ;
    enemiesShoots.push(new ballShoot( this , 'bottom' , ctx ))
    setTimeout(  () => {
      this.reloadMunition = false;
    } , 500)
  }
}


var enemiesShoots = [];
var shoots = [];

document.addEventListener('keydown', () => {
  if( event.key === "ArrowRight" ) {
    player.positonX = player.positonX + player.speed ;
  }else if(  event.key === "ArrowLeft" ){
    player.positonX = player.positonX - player.speed ;
  }if( event.key === "a" ){
    shoots.push( new ballShoot( player , 'top' , ctx ) );
  }
});





setInterval( ()=>{ 
  
  mapHitboxLeftRight( player , canvas )
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  
  player.draw();
  groupEnemies.move();
  constructorEnemie() ;
  //realodEnemies();
  
  for (let i = 0; i < shoots.length; i++) {
    if ( !shoots[i].life ) {
      shoots.splice( i , 1 );
    }if ( shoots[i]) {
      shoots[i].move()
    }
  }
  
  for (let i = 0; i < enemiesShoots.length; i++) {
    if ( !enemiesShoots[i].life ) {
      enemiesShoots.splice( i , 1 );
    }
    if (enemiesShoots[i]) {
      enemiesShoots[i].move()
    }
  }
  
  enemiesShoots.forEach(element => {
    if ( colision(element , player )) {
      
    }
  });
  
  
  enemies.forEach( tab => {
    tab.forEach(element => {
      for ( let i = 0; i < shoots.length; i++) {
        let shoot = shoots[i];
        if ( element ) {
          if ( colision (  element , shoot ) ) {
            shoots.splice( i , 1 ) ;
            level[element.positonTab.row][element.positonTab.column] = true ;
          }
        }
      }
    });
  });
  
  
}, 10);



var enemies = ['first'];

var constructorEnemie = function () {
  if ( enemies[0] === 'first') {
    enemies = [[],
    [],
    [],
    [],
    []
  ];
}

let tabCommander = []
for (let j = ( level.length - 1  ) ; j > -1 ; j--) {
  let y =  groupEnemies.positonY + ( groupEnemies.space * j ) ;
  for (let i = ( level[j].length  ) ; i > -1 ; i--) {
    let x =  groupEnemies.positonX + (  groupEnemies.space * i ) ;
    if ( level[j][i] === 0 ) {
      if ( !enemies[j][i] ) {
        let enemy = new createEnemie( x , y , j  , i  );
        enemies[j][i] = enemy ;
      }else{
        enemies[j][i].positonX = x ;
        enemies[j][i].positonY = y ;
      }
      if( !tabCommander[i] && tabCommander[i] !== 0 ) {
        tabCommander[i] = i ;
        enemies[j][i].commander = true;
      }
      enemies[j][i].move();
    }
    else{
      enemies[j][i] =  null ;
      if ( level[j][i] === true ){
        level[j][i] = null;
      }
    }
  } 
}
console.log(enemies)
}




