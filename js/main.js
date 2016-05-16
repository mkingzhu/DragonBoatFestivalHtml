(function () {
  function TextTime(stop, handler) {
    this.BaseContainer_constructor();
    this.stop = stop || function () {};
    this.handler = handler || function () {};

    var timeInSec = 30, timePassesInMilSec = 0, timeRemainInSec = timeInSec;

    var time = new createjs.Bitmap(mainQueue.getResult('playTimer'));
    this.addChild(time);

    var first = new createjs.Bitmap(mainQueue.getResult("play3"));
    first.regX = first.image.width / 2;
    first.x = 140;
    first.y = 12;
    this.addChild(first);

    var second = new createjs.Bitmap(mainQueue.getResult("play0"));
    second.regX = second.image.width / 2;
    second.x = 168;
    second.y = 12;
    this.addChild(second);

    var setTime = function (time) {
      first.image = mainQueue.getResult("play" + Math.floor(time / 10));
      first.regX = first.image.width / 2;
      second.image = mainQueue.getResult("play" + (time % 10));
      second.regX = second.image.width / 2;
    };
    var self = this;
    var tick = function (interval) {
      self.handler();
      timePassesInMilSec += interval.delta;
      var timeRemain = timeInSec - Math.floor(timePassesInMilSec / 1E3);
      if (timeRemain == timeRemainInSec)
        return;
      timeRemainInSec = timeRemain;
      setTime(timeRemainInSec);
      if (timeRemainInSec <= 0) {
        createjs.Ticker.removeEventListener("tick", tick);
        self.stop();
      }
    };

    this.start = function () {
      timePassesInMilSec = 0, timeRemainInSec = timeInSec;
      createjs.Ticker.addEventListener("tick", tick);
    };
    this.getTimeRemainInSec = function () {
      return timeRemainInSec;
    }
  };
  createjs.extend(TextTime, basejs.BaseContainer);
  basejs.TextTime = createjs.promote(TextTime, "BaseContainer");
} ());
(function () {
  function TextScore() {
    this.BaseContainer_constructor();

    var first = new createjs.Bitmap(mainQueue.getResult("retry0"));
    first.scaleX = 0.75;
    first.scaleY = 0.75;
    first.regX = first.image.width / 2;
    first.x = 140;
    this.addChild(first);

    var second = new createjs.Bitmap(mainQueue.getResult("retry0"));
    second.scaleX = 0.75;
    second.scaleY = 0.75;
    second.regX = second.image.width / 2;
    second.x = 190;
    this.addChild(second);

    this.setScore = function (score) {
      first.image = mainQueue.getResult("retry" + Math.floor(score / 10));
      first.regX = first.image.width / 2;
      second.image = mainQueue.getResult("retry" + (score % 10));
      second.regX = second.image.width / 2;
    };
  };
  createjs.extend(TextScore, basejs.BaseContainer);
  basejs.TextScore = createjs.promote(TextScore, "BaseContainer");
} ());
(function () {
  function GameOver(score, isPlay, play) {
    this.BaseContainer_constructor();
    this.play = play || function () {};
    var self = this;

    var bg = new createjs.Bitmap(mainQueue.getResult("bg"));
    this.addChild(bg);

    if (isPlay) {
      var board  = new createjs.Bitmap(mainQueue.getResult("overBoard"));
      board.regX = board.image.width / 2;
      board.x = W / 2;
      board.y = 110;
      this.addChild(board);

      var ok  = new createjs.Bitmap(mainQueue.getResult("overOk"));
      ok.regX = ok.image.width / 2;
      ok.x = W / 2;
      ok.y = 710;
      this.addChild(ok);
    } else {
      var board  = new createjs.Bitmap(mainQueue.getResult("retryBoard"));
      board.regX = board.image.width / 2;
      board.x = W / 2;
      board.y = 110;
      this.addChild(board);

      var first = Math.floor(score / 100);
      var second = Math.floor((score % 100) / 10);
      var third = Math.floor(score % 10);
      if (first > 0) {
        var first1 = new createjs.Bitmap(mainQueue.getResult("retry" + first));
        first1.regX = first1.image.width / 2;
        first1.x = 160;
        first1.y = 440;
        this.addChild(first1);
      }
      if (second > 0 || first > 0) {
        var second1 = new createjs.Bitmap(mainQueue.getResult("retry" + second));
        second1.regX = second1.image.width / 2;
        second1.x = 220;
        second1.y = 440;
        this.addChild(second1);
      }
      var third1 = new createjs.Bitmap(mainQueue.getResult("retry" + third));
      third1.regX = third1.image.width / 2;
      third1.x = 280;
      third1.y = 440;
      this.addChild(third1);

      var introStart = new createjs.Bitmap(mainQueue.getResult("introStart"));
      introStart.regX = introStart.image.width / 2;
      introStart.x = W / 2;
      introStart.y = 710;
      introStart.on('click', function (a) {
        self.parent.removeChild(self), self.play(true);
      });
      this.addChild(introStart);

      var retryTry = new createjs.Bitmap(mainQueue.getResult("retryTry"));
      retryTry.regX = retryTry.image.width / 2;
      retryTry.x = W / 2;
      retryTry.y = 850;
      retryTry.on('click', function (a) {
        self.parent.removeChild(self), self.play(false);
      });
      this.addChild(retryTry);
    }
  }
  createjs.extend(GameOver, basejs.BaseContainer);
  basejs.GameOver = createjs.promote(GameOver, "BaseContainer");
} ());
(function () {
  function GamePlay(isPlay, over) {
    this.BaseContainer_constructor();
    this.over = over || function () {};
    var self = this;

    var hitArea = new createjs.Shape;
    hitArea.graphics.beginFill("white").rect(0, 700, W, H - 700);
    var bg = new createjs.Bitmap(mainQueue.getResult("bg"));
    bg.hitArea = hitArea;
    this.addChild(bg);

    var lastX = 0, x = 0;
    bg.on("mousedown", function (a) {
      lastX = a.localX;
      x = boat.x;
    });
    bg.on("pressmove", function (a) {
      boat.x = x + (a.localX - lastX);
      if (boat.x < 0)
        boat.x = 0;
      else if (boat.x > W)
        boat.x = W;
    });

    var genRandom = function (i) {
      return Math.floor(Math.random() * i);
    };
    var numFalls = 4;
    var numMoneyEachFall = 6;

    var moneys = [];
    for (var i = 0; i < numFalls; i++) {
      moneys[i] = [];
      for (var j = 0; j < numMoneyEachFall; j++) {
        var num = genRandom(12);
        var money = new createjs.Bitmap(mainQueue.getResult("playFall" + num));
        money.regX = money.image.width / 2;
        money.regY = money.image.height / 2;
        money.x = W / 16 + genRandom(0.9375 * W);
        money.y = -genRandom(H);
        money.visible = false;
        money.magic = num < 6 ? true : false;
        moneys[i].push(money);
        this.addChild(money);
      }
    }

    var currentFall = 0;
    var fall = function () {
      var needFast = texttime.getTimeRemainInSec() < 15 ? true : false;
      moneys[currentFall].forEach(function (element, index, array) {
        createjs.Tween.get(element).wait(currentFall == 0 ? 10 : genRandom(1500)).to({
          x: W / 16 + genRandom(0.9375 * W),
          y: -genRandom(H),
          visible: true
        }, 10).to({
          y: H
        }, needFast ? 2500 : 3500).to({
          visible: false
        }, 10);
      });
      if (currentFall < numFalls - 1)
        currentFall++;
      else
        currentFall = 0;
    };
    var handler = setInterval(fall, 2E3);

    var score = 0;
    var texttime = new basejs.TextTime(function () {
      clearInterval(handler);
      self.parent.removeChild(self), self.over(score, isPlay);
    }, function () {
      for (var i = 0; i < numFalls; i++) {
        for (var j = 0; j < numMoneyEachFall; j++) {
          var money = moneys[i][j];
          if (!money.magic || !money.visible)
            continue;
          if (money.y > H - boat.image.height + 30 && money.y < H) {
            if (money.x > boat.x - 100 && money.x < boat.x + 200) {
              createjs.Tween.removeTweens(money);
              money.visible = false;
              score += 1;
              textscore.setScore(score);
              return;
            }
          }
        }
      }
    });
    texttime.x = 30;
    texttime.y = 40;
    this.addChild(texttime);
    texttime.start();

    var textscore = new basejs.TextScore();
    textscore.x = 400;
    textscore.y = 40;
    this.addChild(textscore);

    var boat = new createjs.Bitmap(mainQueue.getResult("playBoat"));
    boat.regX = boat.image.width / 2;
    boat.x = W / 2;
    boat.y = H - boat.image.height;
    this.addChild(boat);

    fall();
  }
  createjs.extend(GamePlay, basejs.BaseContainer);
  basejs.GamePlay = createjs.promote(GamePlay, "BaseContainer");
} ());
(function () {
  function GameIntro(play) {
    this.BaseContainer_constructor();
    this.play = play || function () {};
    var self = this;

    var bg = new createjs.Bitmap(mainQueue.getResult("bg"));
    this.addChild(bg);

    var board  = new createjs.Bitmap(mainQueue.getResult("introBoard"));
    board.regX = board.image.width / 2;
    board.x = W / 2;
    board.y = 110;
    this.addChild(board);

    var introTry = new createjs.Bitmap(mainQueue.getResult("introTry"));
    introTry.regX = introTry.image.width / 2;
    introTry.x = W / 2;
    introTry.y = 710;
    introTry.on('click', function (a) {
      self.parent.removeChild(self), self.play(false);
    });
    this.addChild(introTry);

    var introStart = new createjs.Bitmap(mainQueue.getResult("introStart"));
    introStart.regX = introStart.image.width / 2;
    introStart.x = W / 2;
    introStart.y = 850;
    introStart.on('click', function (a) {
      self.parent.removeChild(self), self.play(true);
    });
    this.addChild(introStart);
  }
  createjs.extend(GameIntro, basejs.BaseContainer);
  basejs.GameIntro = createjs.promote(GameIntro, "BaseContainer");
} ());
(function () {
  function GameMain(intro) {
    this.BaseContainer_constructor();
    this.intro = intro || function () {};
    var self = this;

    var bg = new createjs.Bitmap(mainQueue.getResult("mainBg"));
    this.addChild(bg);

    var start = new createjs.Bitmap(mainQueue.getResult("mainStart"));
    start.regX = start.image.width / 2;
    start.x = W / 2;
    start.y = 550;
    start.on('click', function (a) {
      self.parent.removeChild(self), self.intro();
    });
    this.addChild(start);
  }
  createjs.extend(GameMain, basejs.BaseContainer);
  basejs.GameMain = createjs.promote(GameMain, "BaseContainer");
} ());
var gameOver = function (score, isPlay) {
  var gameover = new basejs.GameOver(score, isPlay, gamePlay);
  stage.addChild(gameover);
}
var gamePlay = function (isPlay) {
  var gameplay = new basejs.GamePlay(isPlay, gameOver);
  stage.addChild(gameplay);
}
var gameIntro = function () {
  var gameintro = new basejs.GameIntro(gamePlay);
  stage.addChild(gameintro);
}
var gameMain = function () {
  var gamemain = new basejs.GameMain(gameIntro);
  stage.addChild(gamemain);
};
