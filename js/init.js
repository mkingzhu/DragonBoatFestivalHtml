(function () {
  function GameLoadingText() {
    this.BaseContainer_constructor();
    var self = this;

    var first = new createjs.Bitmap(initQueue.getResult("init0"));
    first.regX = first.image.width / 2;
    first.x = 24;
    this.addChild(first);

    var second = new createjs.Bitmap(initQueue.getResult("init0"));
    second.regX = second.image.width / 2;
    second.x = 60;
    this.addChild(second);

    var percent = new createjs.Bitmap(initQueue.getResult("initPer"));
    percent.regX = percent.image.width / 2;
    percent.x = 96;
    this.addChild(percent);

    this.setPercent = function (progress) {
      progress = Math.floor(progress * 100);
      if (100 == progress) {
        self.hide();
      } else {
        first.image = initQueue.getResult("init" + Math.floor(progress / 10));
        first.regX = first.image.width / 2;
        second.image = initQueue.getResult("init" + (progress % 10));
        second.regX = second.image.width / 2;
      }
    }
  }
  createjs.extend(GameLoadingText, basejs.BaseContainer);
  basejs.GameLoadingText = createjs.promote(GameLoadingText, "BaseContainer");
} ());
(function () {
  function GameInit() {
    this.BaseContainer_constructor();
    var self = this;

    var bg = new createjs.Bitmap(initQueue.getResult("initBg"));
    this.addChild(bg);

    var gameLoadingText = new basejs.GameLoadingText();
    gameLoadingText.x = (W - gameLoadingText.getBounds().width) / 2;
    gameLoadingText.y = 700;
    this.addChild(gameLoadingText);

    var loading = new createjs.Bitmap(initQueue.getResult("initLoading"));
    loading.x = (W - loading.getBounds().width) / 2;
    loading.y = 800;
    this.addChild(loading);

    loadMain(function () {
      self.parent.removeChild(self), gameMain();
    }, function (progress) {
      gameLoadingText.setPercent(progress);
    });
  }
  createjs.extend(GameInit, basejs.BaseContainer);
  basejs.GameInit = createjs.promote(GameInit, "BaseContainer");
} ());
var gameInit = function () {
  var gameinit = new basejs.GameInit();
  stage.addChild(gameinit);
};
