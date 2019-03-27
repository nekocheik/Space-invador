// créer un élément qui est mon playeur 

var playeur = {
  element :  document.querySelector('.ctx .playeur') ,
  postion : {
    x : 0 ,
    y : 0 
  }
}

var enemys = {
  enemyArray : [],
  move : function() {
    let elementEnemys = document.querySelectorAll('.ctx .enemy') ;
    for (let i = 0; i < elementEnemys.length; i++) {
      this.enemyArray[i] = {
        topLeft :  elementEnemys[i].offsetLeft + elementEnemys[i].clientHeight,
      }
      this.enemyArray[i] = {
        topLeft :  elementEnemys[i].offsetLeft + elementEnemys[i].clientHeight,
        topRight: this.enemyArray[i].topLeft + elementEnemys[i].offsetLeft + elementEnemys[i].clientWidth ,
        element: elementEnemys[i],
      }
    }
  },  
  ArrowRight : function(){ this.x = this.x + this.speed ;
    enemys.postion.x = this.x ;
    console.log(enemyArray)
    return this.x;
  } ,
  ArrowLeft : function(){ this.x = this.x - this.speed ;
    playeur.x = this.x ;
    console.log(enemyArray)
    return this.x;
  } 
}


enemys.move();
console.log(enemys.enemyArray )

//.offsetLeft
const Move = {
  x : 1 ,
  speed : 20,
  ArrowRight : function(){ this.x = this.x + this.speed ;
    playeur.postion.x = this.x ;
    console.log(playeur)
    return this.x;
  } ,
  ArrowLeft : function(){ this.x = this.x - this.speed ;
    playeur.x = this.x ;
    console.log(playeur)
    return this.x;
  } ,
}

document.addEventListener('keydown', function(){
  if( event.key === "ArrowRight" || event.key === "ArrowLeft" ) {
    playeur.element.style.transform = `translateX(${Move[event.key](playeur)}px)`
    for (let i = 0; i < enemys.enemyArray.length; i++) {
      enemys.enemyArray[i].element.style.transform = `translateX(${Move[event.key](playeur)}px)`
    }
  }
})

/* 

*/