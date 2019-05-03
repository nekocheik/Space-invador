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
exports.mapHitbox = mapHitbox;
exports.ballShoot = void 0;

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

function mapHitbox(element, map) {
  if (element.width + element.positonX > map.width || element.positonX <= 0) {
    if (element.width + element.positonX > map.width) {
      element.positonX = element.positonX - (element.positonX + element.width - map.width);
    } else {
      element.positonX = 0;
    }

    return true;
  }
}

var ballShoot = function ballShoot(element, direction, ctx) {
  this.ctx = ctx;
  this.shooter = element;
  this.positonX = element.positonX + element.width / 2;
  this.positonY = element.positonY;
  this.width = 5;
  this.height = 5;
  this.speed = 5;
  this.direction = direction;
};

exports.ballShoot = ballShoot;

ballShoot.prototype.move = function () {
  this.positonY = this.positonY - this.speed;
  this.ctx.beginPath();
  this.ctx.rect(this.positonX, this.positonY, this.width, this.height);
  this.ctx.fillStyle = "red";
  this.ctx.fill();
  this.ctx.closePath();
};
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

var _ckc = require("../js/ckc");

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var level = [['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']];
var player = {
  positonX: 100,
  positonY: 550,
  width: 50,
  height: 20,
  speed: 30,
  draw: function draw() {
    ctx.beginPath();
    ctx.rect(this.positonX, this.positonY, this.width, this.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
};

var enemies = {
  positonX: 118,
  positonY: 80,
  speed: 0.4,
  width: null,
  direction: 'left',
  changeDirection: false,
  move: function move() {
    if (this.direction === 'left') {
      this.positonX = this.positonX + this.speed;
    } else {
      this.positonX = this.positonX - this.speed;
    }

    ;
  }
},
    createEnemie = function createEnemie(x, y, j, i) {
  this.positonX = x;
  this.positonY = y;
  this.width = 32;
  this.height = 32;
  this.positonTab = {
    row: j,
    column: i
  };
};

createEnemie.prototype.move = function () {
  ctx.beginPath();
  ctx.rect(this.positonX, this.positonY, this.width, this.height);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
};

var shoots = [];
document.addEventListener('keydown', function () {
  if (event.key === "ArrowRight") {
    player.positonX = player.positonX + player.speed;
  } else if (event.key === "ArrowLeft") {
    player.positonX = player.positonX - player.speed;
  }

  if (event.key === "a") {
    shoots.push(new _ckc.ballShoot(player, '      ', ctx));
  }
});
setInterval(function () {
  (0, _ckc.mapHitbox)(player, canvas);

  if ((0, _ckc.mapHitbox)(enemies, canvas)) {
    enemies.direction = enemies.direction === 'left' ? 'right' : 'left';

    if (enemies.changeDirection === true) {
      enemies.positonY = enemies.positonY + 20;
    }

    enemies.changeDirection = true;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  constructorEnemie();
  player.draw();
  enemies.move();

  for (var i = 0; i < shoots.length; i++) {
    shoots[i].move();
  }

  ok.forEach(function (element) {
    shoots.forEach(function (shoot) {
      if ((0, _ckc.colision)(shoot, element)) {
        level[element.positonTab.row][element.positonTab.column] = null;
      }
    });
  });
}, 10);
var ok = [];

var constructorEnemie = function constructorEnemie() {
  ok = [];

  for (var j = 0; j < level.length; j++) {
    var y = enemies.positonY + 50 * j;

    for (var i = 0; i < level[j].length; i++) {
      var x = enemies.positonX + 50 * i;

      if (level[j][i] === '0') {
        var enemy = new createEnemie(x, y, j, i);
        ok.push(enemy);
        enemy.move();
        var enemiesWidth = i * 50 + enemy.width;
      }
    }
  }

  enemies.width = enemiesWidth;
};
},{"../js/ckc":"js/ckc.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58579" + '/');

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