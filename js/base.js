var basejs = {};
basejs.isString = function (v) {
  return (typeof v == 'string' || v instanceof String);
};
basejs.isArray = function (v) {
  return toString.apply(v) === '[object Array]';
};
basejs.isFunction = function (v) {
  return typeof v == 'function' || toString.call(v) === '[object Function]';
};
basejs.loadAndStart = function (queue, manifests, completeFunc, progressFunc) {
  if (basejs.isArray(manifests)) {
    for (var i = 0, l = manifests.length; i < l; i++) {
      queue.loadManifest(manifests[i], false);
    }
  } else {
    queue.loadManifest(manifests, false);
  }
  queue.on("complete", function () {
    completeFunc();
  }, this);
  queue.on("progress", function (evt) {
    progressFunc(evt.progress);
  });

  queue.load();
};
(function () {
  function BaseContainer() {
    this.Container_constructor();
  };

  var p = createjs.extend(BaseContainer, createjs.Container);
  p.show = function () {
    this.visible || (this.visible = true);
  };
  p.hide = function () {
    this.visible && (this.visible = false);
  };
  basejs.BaseContainer = createjs.promote(BaseContainer, "Container");
} ());
