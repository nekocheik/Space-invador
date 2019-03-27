// créer un élément qui est mon playeur 

var playeur = {
  element :  document.querySelector('.ctx .playeur') ,
  postion : {
    x : 0 ,
    y : 0 
  }
}

console.log(playeur)

const Move = {
  x : 1 ,
  speed : 20,
  ArrowRight : function(){ this.x = this.x + this.speed ;
    playeur.x = this.x ;
    return this.x;
  } ,
  ArrowLeft : function(){ this.x = this.x - this.speed ;
    playeur.x = this.x ;
    return this.x;
  } ,
}

document.addEventListener('keydown', function(){
  if( event.key === "ArrowRight" || event.key === "ArrowLeft" ) {
    playeur.element.style.transform = `translateX(${Move[event.key](playeur)}px)`
  }
})

/* 

*/