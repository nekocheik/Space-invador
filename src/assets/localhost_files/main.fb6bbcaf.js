// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/ckc.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHitbox = createHitbox;
exports.colision = colision;
exports.mapHitboxLeftRight = mapHitboxLeftRight;
exports.shootsPerimeter = void 0;

function createHitbox(element) {
  var hitbox = {
    y: element.offsetTop,
    x: element.offsetLeft,
    width: element.clientWidth,
    height: element.clientHeight
  };
  return hitbox;
}

function colision(elementOne, elementTwo) {
  if (elementOne.positonX < elementTwo.positonX + elementTwo.width && elementOne.positonX + elementOne.width > elementTwo.positonX && elementOne.positonY < elementTwo.positonY + elementTwo.height && elementOne.height + elementOne.positonY > elementTwo.positonY) {
    return true;
  }
}

function mapHitboxLeftRight(element, map) {
  if (element.width + element.positonX > map.width || element.positonX <= 0) {
    if (element.width + element.positonX > map.width) {
      element.positonX = element.positonX - (element.positonX + element.width - map.width);
    } else {
      element.positonX = 0;
    }

    return true;
  }
}

var shootsPerimeter = function shootsPerimeter(player, enemy) {
  if (player.positonX < enemy.positonX + 50 && player.positonX > enemy.positonX - 50) {
    return true;
  }
};

exports.shootsPerimeter = shootsPerimeter;
},{}],"assets/InvaderA1.png":[function(require,module,exports) {
module.exports = "/InvaderA1.5257e2bc.png";
},{}],"assets/InvaderA2.png":[function(require,module,exports) {
module.exports = "/InvaderA2.d5d482be.png";
},{}],"assets/Ship.png":[function(require,module,exports) {
module.exports = "/Ship.d066e527.png";
},{}],"assets/ShipCrushedLeft.png":[function(require,module,exports) {
module.exports = "/ShipCrushedLeft.3975b342.png";
},{}],"assets/ShipCrushedRight.png":[function(require,module,exports) {
module.exports = "/ShipCrushedRight.a900e9f6.png";
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

var _ckc = require("../js/ckc");

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var image = new Image();
var assets = {
  '10': {
    '1': require('../assets/InvaderA1.png'),
    '2': require('../assets/InvaderA2.png')
  },
  '20': {
    '1': require('../assets/InvaderA1.png'),
    '2': require('../assets/InvaderA2.png')
  },
  '30': {
    '1': require('../assets/InvaderA1.png'),
    '2': require('../assets/InvaderA2.png')
  },
  '40': {
    '1': require('../assets/InvaderA1.png'),
    '2': require('../assets/InvaderA2.png')
  },
  player: {
    life: require('../assets/Ship.png'),
    deathOne: require('../assets/ShipCrushedLeft.png'),
    deathTwo: require('../assets/ShipCrushedRight.png')
  }
};

function drawImage(ctx, state, name, img, x, y, width, height) {
  ctx.beginPath();
  ctx.drawImage(img, x, y, width, height);
  ctx.closePath();

  if (assets[name][state]) {
    img.src = assets[name][state];
  }

  return assets[name][state];
} //_____________________________________________________game-level_____________________________________________________//


var level = {
  enemies: [[40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40], [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40], [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30], [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20], [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]],
  defenseBlock: [0, 0, 0, 0] //________________________________________________________________player____________________________________________________________________//

};

function convertImg(sprite) {
  var img = new Image();
  return img.src = sprite;
}

var player = {
  positonX: 150,
  positonY: 550,
  width: 50,
  height: 20,
  speed: 20,
  score: 0,
  state: 'life',
  reloadMunition: false,
  sprite: require('../assets/Ship.png'),
  life: 3,
  draw: function draw() {
    if (this.life >= 0) {
      drawImage(ctx, this.state, 'player', image, this.positonX, this.positonY, this.width, this.height);
    }
  } // its the player touches 

};
document.addEventListener('keydown', function () {
  if (event.key === "ArrowRight") {
    player.positonX = player.positonX + player.speed;
  } else if (event.key === "ArrowLeft") {
    player.positonX = player.positonX - player.speed;
  }

  if (event.key === "a" && player.life >= 0 && player.state === 'life') {
    if (player.reloadMunition) return;
    shoots.push(new ballShoot(player, 'top', ctx)); // when the player shoot it create the wait time for restart

    player.reloadMunition = true;
    setTimeout(function () {
      player.reloadMunition = false;
    }, 200);
  }
}); // shoot of player

var shoots = []; //________________________________________________________________defense-Blocks____________________________________________________________________//

/*
The defense of blocks is the block who allows the player in of hiding behind
*/
// the block allows the to put the elements blocks in for the manipulated

var blocks = [];

var constructorDefenseBlock = function constructorDefenseBlock() {
  for (var i = 0; i < level.defenseBlock.length; i++) {
    // for create the block if he does not exist. ( when the game started )
    if (!blocks[i]) {
      var x = defenseBlocks.positonX + 150 * i;
      blocks[i] = new defenseBlock(x, defenseBlocks.positonY);
    } else {
      // draw the rest of time
      blocks[i].draw();
    }
  }
};

var defenseBlocks = {
  //the defenseBlocks give the position who intialise the blocks
  positonX: 133,
  positonY: 475
};

function defenseBlock(x, y) {
  this.positonX = x;
  this.positonY = y;
  this.width = 80;
  this.height = 50;
  this.life = 7; // when the block is initialize the defenseBlock is drawing

  this.draw();
} //function who allows of draw the block if its live


defenseBlock.prototype.draw = function () {
  //if the defense block is destroyed then stop draw
  if (this.life < 0) {
    this.width = 0;
    this.height = 0;
    return;
  } //drawing bloc of defense


  ctx.beginPath();
  ctx.rect(this.positonX, this.positonY, this.width, this.height);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}; //________________________________________________________________group-enemies____________________________________________________________________//
//the groupEnemies give the position who intialise the ennemy


var groupEnemies = {
  positonX: 118,
  positonY: 80,
  speed: 0.2,
  width: null,
  direction: 'left',
  numberTouchWall: 0,
  //its the space between each enemy
  space: 50,
  //the jump whene the ennemies touch a wall
  jump: 10,
  move: function move() {
    if (this.direction === 'left') {
      this.positonX = this.positonX + this.speed;
    } else {
      this.positonX = this.positonX - this.speed;
    }

    ;
  },
  changeDirection: function changeDirection() {
    this.direction = this.direction === 'left' ? 'right' : 'left'; //when the first time the enemies touch a wall they Don't jump

    if (this.changeDirection !== 0) {
      this.positonY = this.positonY + this.jump;
      this.speed = this.speed * 1.2;
    } //boost the speed of the enemy 


    this.numberTouchWall++;
  }
},
    // the creator of the enemy 
ennemy = function ennemy(x, y, j, i) {
  this.positonX = x;
  this.positonY = y;
  this.width = 32;
  this.height = 32;
  this.commander = false;
  this.reloadMunition = false;
  this.state = '1';
  this.positonTab = {
    row: j,
    column: i
  };
}; // draw the enemy


ennemy.prototype.move = function () {
  if (!this.row) {
    this.name = (this.positonTab.row + 1) * 10;
  } //console.log(( this.positonTab.row  * 10).toString())


  drawImage(ctx, this.state, '10', image, this.positonX, this.positonY, this.width, this.height); // commander is the enemy who can change the direction of the group of enemies and shoot

  if (this.commander) {
    this.colision();
    this.shoot();
  }
}; // commander is the enemy who can change the direction and shoot


ennemy.prototype.colision = function () {
  // if touch the wall change the direction
  if ((0, _ckc.mapHitboxLeftRight)(this, canvas)) {
    groupEnemies.changeDirection();
  }
}; //for initialize the enemy


var enemies = ['first']; //________________________________________________________________create-enemies____________________________________________________________________//

var constructorEnemie = function constructorEnemie() {
  if (enemies[0] === 'first') {
    enemies = [[], [], [], [], []];
  } //tab who give the title of commander


  var tabCommander = [];

  for (var j = level.enemies.length - 1; j > -1; j--) {
    var y = groupEnemies.positonY + groupEnemies.space * j;

    for (var i = level.enemies[j].length; i > -1; i--) {
      var x = groupEnemies.positonX + groupEnemies.space * i;

      if (typeof level.enemies[j][i] === 'number') {
        // for create the enmemy if he does not exist. (when the game started)
        if (!enemies[j][i]) {
          var enemy = new ennemy(x, y, j, i);
          enemies[j][i] = enemy;
        } else {
          //if the enemy exist him give the new position
          enemies[j][i].positonX = x;
          enemies[j][i].positonY = y;
        } //give the title of commander at enemy if is the first of the column


        if (!tabCommander[i] && tabCommander[i] !== 0) {
          tabCommander[i] = i;
          enemies[j][i].commander = true;
        } //did move enemy


        enemies[j][i].move();
      } else {
        enemies[j][i] = null;

        if (level.enemies[j][i] === true) {
          // destroy the enemy
          level.enemies[j][i] = null;
        }
      }
    }
  }
}; //________________________________________________________________ball-shots____________________________________________________________________//
// Array where all shoot of enemies 


var enemiesShoots = []; //initializes the shoot

var ballShoot = function ballShoot(element, direction, ctx) {
  this.ctx = ctx;
  this.shooter = element;
  this.positonX = element.positonX + element.width / 2;
  this.positonY = element.positonY;
  this.width = 4;
  this.height = 25;
  this.speed = 8;
  this.direction = direction;
  this.life = true;
};

ballShoot.prototype.move = function () {
  //collision white outside and destroy the shoot
  if (this.positonY < 0 || this.positonY > ctx.height) {
    this.life = false;
  }

  if (this.life === false) {
    return;
  } //give the direction of the shoot


  if (this.direction === 'top') {
    this.positonY = this.positonY - this.speed;
  } else {
    this.positonY = this.positonY + this.speed;
  } // draw the shoots


  this.ctx.beginPath();
  this.ctx.rect(this.positonX, this.positonY, this.width, this.height);
  this.ctx.fillStyle = "white";
  this.ctx.fill();
  this.ctx.closePath();
};

ennemy.prototype.shoot = function () {
  var _this = this;

  // if the player is the perimetre of the enemy he shoot
  if ((0, _ckc.shootsPerimeter)(player, this) && !this.reloadMunition) {
    // the random number give the percentage of luke to shoot
    if (Math.floor(Math.random() * 10) > 7) {
      enemiesShoots.push(new ballShoot(this, 'bottom', ctx));
    } // give the waiting time after each time


    this.reloadMunition = true;
    setTimeout(function () {
      _this.reloadMunition = false;
    }, 1000);
  }
};

setInterval(function () {
  // check the position of the player if touch the wall befor the drawing
  (0, _ckc.mapHitboxLeftRight)(player, canvas); // clears the canvas after drawing

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  groupEnemies.move();
  constructorEnemie();
  constructorDefenseBlock(); // colision of shoots enemies and defense block

  var _loop = function _loop(i) {
    blocks.forEach(function (block) {
      if ((0, _ckc.colision)(shoots[i], block)) {
        if (shoots[i]) {
          block.life--;
          shoots[i].life = false;
        }
      }
    });

    if (!shoots[i].life) {
      shoots.splice(i, 1);
    }

    if (shoots[i]) {
      shoots[i].move();
    }
  };

  for (var i = 0; i < shoots.length; i++) {
    _loop(i);
  } // colision of shoots player and defense block


  enemiesShoots.forEach(function (element) {
    if ((0, _ckc.colision)(element, player) && player.state === 'life') {
      player.life--;
      element.life = false;
      var intevalblink = setInterval(function () {
        blinkColision();
      }, 80);
      setTimeout(function () {
        clearInterval(intevalblink);
        player.state = 'life';
      }, 1000);
    }

    blocks.forEach(function (block) {
      if ((0, _ckc.colision)(element, block)) {
        block.life--;
        element.life = false;
      }
    });
  }); // colision of shoots player and ennemies

  enemies.forEach(function (tab) {
    tab.forEach(function (element) {
      for (var i = 0; i < shoots.length; i++) {
        var shoot = shoots[i];

        if (element) {
          if ((0, _ckc.colision)(element, shoot)) {
            shoots.splice(i, 1);
            player.score += level.enemies[element.positonTab.row][element.positonTab.column];
            level.enemies[element.positonTab.row][element.positonTab.column] = true;
          }
        }
      }
    });
  }); // colision of shoots enemies and player

  for (var i = 0; i < enemiesShoots.length; i++) {
    if (!enemiesShoots[i].life) {
      enemiesShoots.splice(i, 1);
    }

    if (enemiesShoots[i]) {
      enemiesShoots[i].move();
    }
  }
}, 10);
setInterval(function () {
  reloadDom();
}, 100);
var lives = document.querySelector('.lives');
var score = document.querySelector('.score');

function reloadDom(params) {
  var live = lives.querySelectorAll('.live');
  live.forEach(function (element) {
    element.remove();
  });
  score.innerHTML = "<p>Score : ".concat(player.score, "</p>");

  for (var i = 0; i < player.life; i++) {
    lives.innerHTML += '<div class="live"></div>';
  }
}

function blinkColision() {
  if (player.state !== 'deathOne') {
    player.state = 'deathOne';
  } else {
    player.state = 'deathTwo';
  }
}
},{"../js/ckc":"js/ckc.js","../assets/InvaderA1.png":"assets/InvaderA1.png","../assets/InvaderA2.png":"assets/InvaderA2.png","../assets/Ship.png":"assets/Ship.png","../assets/ShipCrushedLeft.png":"assets/ShipCrushedLeft.png","../assets/ShipCrushedRight.png":"assets/ShipCrushedRight.png"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64359" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map