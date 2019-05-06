
import {  audio , assets } from '../js/assets';

function drawImage( ctx , state , name , x  , y , width , height , autres ) {
  ctx.beginPath();
  let test = assets[name][state] ;
  test.src = autres ;
  ctx.drawImage( test , x , y , width , height);
  ctx.closePath();
}

export { drawImage  };
