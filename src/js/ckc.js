function createHitbox ( element ) {
  let hitbox = {
    y : element.offsetTop ,
    x : element.offsetLeft ,
    width : element.clientWidth ,
    height  : element.clientHeight ,
  }
  return hitbox
}

function colision ( elementOne , elementTwo ){
  if(elementOne.positonX < elementTwo.positonX + elementTwo.width &&
    elementOne.positonX + elementOne.width > elementTwo.positonX &&
    elementOne.positonY < elementTwo.positonY + elementTwo.height &&
    elementOne.height + elementOne.positonY > elementTwo.positonY ){
      return true
    }  
  }
  
  function mapHitbox ( element , map ){
    if( element.width + element.positonX > map.width || element.positonX <= 0 ){
      if ( element.width + element.positonX > map.width ) {
        element.positonX = element.positonX - ( ( element.positonX + element.width ) - map.width) ;
      }else{
        element.positonX = 0 ;
      }
      return true
    }  
  }
  
  var ballShoot = function ( element , direction , ctx ) {
    this.ctx = ctx ;
    this.shooter = element ;
    this.positonX  = element.positonX + ( element.width / 2 ) ;
    this.positonY = element.positonY; 
    this.width = 5;
    this.height = 5;
    this.speed = 8;
    this.direction = direction ;
    this.life = true
  } 
  
  ballShoot.prototype.move = function () {
    if ( this.life === false ) { 
      
      return }
    this.positonY = this.positonY - this.speed ;
    this.ctx.beginPath();
    this.ctx.rect( this.positonX , this.positonY, this.width , this.height);
    this.ctx.fillStyle = "red";
    this.ctx.fill();
    this.ctx.closePath();
  }
  
  
  export { createHitbox , colision , mapHitbox , ballShoot };