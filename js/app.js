(function (app) {
  var onerror = function () {
    alert('网络异常，请稍后再试。');
  };
  var ajax = function (cfg) {
    var type = cfg.type;
    var url = cfg.url;
    var data = cfg.data;
    var success = cfg.success;

    var xhr = new XMLHttpRequest();
    xhr.onloadend = function () {
      if (XMLHttpRequest.DONE == this.readyState && this.status == 200) {
        var data = JSON.parse(xhr.responseText);
        if (data.errorCode != 200) {
          alert(data.errorMsg);
        } else {
          success(data);
        }
      } else {
        onerror();
      }
    };
    xhr.ontimeout = onerror;
    xhr.open(type, url, true);
    xhr.setRequestHeader('accept', 'application/json');
    if (type.toUpperCase() == 'POST') {
      xhr.setRequestHeader('contentType', 'application/json;charset=utf-8');
      xhr.send(data);
    } else {
      xhr.send(null);
    }
  };
  app.onSubmit = function (score, success) {
    var data = {
      'entity' : {
        'model' : {
          'score' : score
        }
      }
    };
    ajax({
      type: 'POST',
      url: 'api/users',
      data: JSON.stringify(data),
      success: function (data) {
        played = true;
        app.score = score;
        app.credit = data.entity.model.credit;
        success();
      }
    });
  };
})(window.app = window.app || {});
