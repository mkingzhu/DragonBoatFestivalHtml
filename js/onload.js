var W = 640, H = 1020;
var IS_TOUCH = createjs.Touch.isSupported();
window.onload = function () {
  stage = new createjs.Stage("stage");

  if (IS_TOUCH) {
    createjs.Touch.enable(stage, true);
    stage.mouseEnabled = false;
  }
  createjs.Ticker.setFPS(60);
  createjs.Ticker.on("tick", stage);

  loadInit(function () {
    gameInit();
  }, function(){});

  setTimeout(window.onresize, 100);
};
window.onresize = function () {
  var canvas = stage.canvas,
    k = window.innerWidth,
    b = window.innerHeight;
  canvas.style.marginTop = 0;
  canvas.width = W;
  canvas.height = H;
  canvas.style.width = k + "px";
  canvas.style.height = b + "px";
};

var stage = {};
var mainQueue = {};
var initQueue = {};
var loadMain = function (completeFunc, progressFunc) {
  mainQueue = new createjs.LoadQueue(false);
  mainQueue.setMaxConnections(30);
  basejs.loadAndStart(mainQueue, [mainJss, mainImgs], completeFunc, progressFunc);
};
var loadInit = function (completeFunc, progressFunc) {
  initQueue = new createjs.LoadQueue(false);
  initQueue.setMaxConnections(30);
  basejs.loadAndStart(initQueue, [initJss, initImgs], completeFunc, progressFunc);
};
var mainJss = {
  path: "js/",
  manifest: [
    {
      src: "main.js",
      id: "main"
    }
  ]
};
var initJss = {
  path: "js/",
  manifest: [
    {
      src: "init.js",
      id: "init"
    }
  ]
};
var mainImgs = {
  path: "img/",
  manifest: [
    {
      src: "bg.jpg",
      id: "bg"
    },
    {
      src: "main_bg.jpg",
      id: "mainBg"
    },
    {
      src: "main_start.png",
      id: "mainStart"
    },
    {
      src: "intro_board.png",
      id: "introBoard"
    },
    {
      src: "intro_start.png",
      id: "introStart"
    },
    {
      src: "intro_try.png",
      id: "introTry"
    },
    {
      src: "play_0.png",
      id: "play0"
    },
    {
      src: "play_1.png",
      id: "play1"
    },
    {
      src: "play_2.png",
      id: "play2"
    },
    {
      src: "play_3.png",
      id: "play3"
    },
    {
      src: "play_4.png",
      id: "play4"
    },
    {
      src: "play_5.png",
      id: "play5"
    },
    {
      src: "play_6.png",
      id: "play6"
    },
    {
      src: "play_7.png",
      id: "play7"
    },
    {
      src: "play_8.png",
      id: "play8"
    },
    {
      src: "play_9.png",
      id: "play9"
    },
    {
      src: "play_timer.png",
      id: "playTimer"
    },
    {
      src: "play_fall0.png",
      id: "playFall0"
    },
    {
      src: "play_fall1.png",
      id: "playFall1"
    },
    {
      src: "play_fall2.png",
      id: "playFall2"
    },
    {
      src: "play_fall3.png",
      id: "playFall3"
    },
    {
      src: "play_fall4.png",
      id: "playFall4"
    },
    {
      src: "play_fall5.png",
      id: "playFall5"
    },
    {
      src: "play_fall6.png",
      id: "playFall6"
    },
    {
      src: "play_fall7.png",
      id: "playFall7"
    },
    {
      src: "play_fall8.png",
      id: "playFall8"
    },
    {
      src: "play_fall9.png",
      id: "playFall9"
    },
    {
      src: "play_fall10.png",
      id: "playFall10"
    },
    {
      src: "play_fall11.png",
      id: "playFall11"
    },
    {
      src: "play_boat.png",
      id: "playBoat"
    },
    {
      src: "retry_board.png",
      id: "retryBoard"
    },
    {
      src: "retry_0.png",
      id: "retry0"
    },
    {
      src: "retry_1.png",
      id: "retry1"
    },
    {
      src: "retry_2.png",
      id: "retry2"
    },
    {
      src: "retry_3.png",
      id: "retry3"
    },
    {
      src: "retry_4.png",
      id: "retry4"
    },
    {
      src: "retry_5.png",
      id: "retry5"
    },
    {
      src: "retry_6.png",
      id: "retry6"
    },
    {
      src: "retry_7.png",
      id: "retry7"
    },
    {
      src: "retry_8.png",
      id: "retry8"
    },
    {
      src: "retry_9.png",
      id: "retry9"
    },
    {
      src: "retry_try.png",
      id: "retryTry"
    },
    {
      src: "over_board.png",
      id: "overBoard"
    },
    {
      src: "over_ok.png",
      id: "overOk"
    }
  ]
};
var initImgs = {
  path: "img/",
  manifest: [
    {
      src: "init_bg.jpg",
      id: "initBg"
    },
    {
      src: "init_0.png",
      id: "init0"
    },
    {
      src: "init_1.png",
      id: "init1"
    },
    {
      src: "init_2.png",
      id: "init2"
    },
    {
      src: "init_3.png",
      id: "init3"
    },
    {
      src: "init_4.png",
      id: "init4"
    },
    {
      src: "init_5.png",
      id: "init5"
    },
    {
      src: "init_6.png",
      id: "init6"
    },
    {
      src: "init_7.png",
      id: "init7"
    },
    {
      src: "init_8.png",
      id: "init8"
    },
    {
      src: "init_9.png",
      id: "init9"
    },
    {
      src: "init_per.png",
      id: "initPer"
    },
    {
      src: "init_loading.png",
      id: "initLoading"
    }
  ]
};
