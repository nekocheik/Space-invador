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
  if(elementOne.x < elementTwo.x + elementTwo.width &&
    elementOne.x + elementOne.width > elementTwo.x &&
    elementOne.y < elementTwo.y + elementTwo.height &&
    elementOne.height + elementOne.y > elementTwo.y ){
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
  var ballShoot = {
    positonX : 100,
    positonY : 550,
    width : 50,
    height: 50,
    speed: 50,

  } 

  function shoot( element , direction ) {
      ctx.beginPath();
      ctx.rect( this.positonX , this.positonY, this.width , this.height);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
    
    
    export { createHitbox , colision , mapHitbox };