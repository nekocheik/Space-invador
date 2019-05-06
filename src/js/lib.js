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
  
  function mapHitboxLeftRight ( element , map ){
    if( element.width + element.positonX > map.width || element.positonX <= 0 ){
      if ( element.width + element.positonX > map.width ) {
        element.positonX = element.positonX - ( ( element.positonX + element.width ) - map.width) ;
      }else{
        element.positonX = 0 ;
      }
      return true
    }  
  }
  
  
  var shootsPerimeter = function ( player , enemy ) {
    if ( player.positonX < ( enemy.positonX + 50 ) && player.positonX > ( enemy.positonX - 50) ){
      return true
    }

  }
  
  export { createHitbox , colision , mapHitboxLeftRight ,  shootsPerimeter  };