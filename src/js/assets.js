var audio = {
  shoot: function () {
    let sound = new Audio();
    sound.src =  require('../audio/shoot.wav');
    sound.play();
  },
  kill: function () {
    let sound = new Audio();
    sound.src =  require('../audio/invaderkilled.wav');
    sound.play();
  }, explosion : function(){
    let sound = new Audio();
    sound.src =  require('../audio/explosion.wav');
    sound.play();
  }
  
}

var assets = {
  'player' : {
    live : new Image ,
    deathOne : new Image,
    deathTwo : new Image,
  }, 
  '10' : {
    '1'  : new Image ,
    '2'  : new Image ,
  },
  '20' :  {
    '1'  : new Image ,
    '2'  : new Image ,
  },
  '40' :{
    '1'  : new Image ,
    '2'  : new Image ,
  }
}

export { audio , assets  };