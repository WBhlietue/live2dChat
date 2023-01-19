
var userAgent = window.navigator.userAgent.toLowerCase();
var norunAI = [
  "android",
  "iphone",
  "ipod",
  "ipad",
  "windows phone",
  "mqqbrowser",
  "msie",
  "trident/7.0",
];
var norunFlag = false;

var urlpar = new URLSearchParams(window.location.search);
let num;
if (urlpar.get("modelName") == null) {
  num = 1;
} else {
  num = urlpar.get("modelName");
}
var modelPath = "../model/" + num + "/";



if (!norunFlag) {
  var hitFlag = false;
  var AIFadeFlag = false;
  var liveTlakTimer = null;
  var sleepTimer_ = null;
  var AITalkFlag = false;
  var talkNum = 0;

  function showHitokoto() {}

  function checkSleep() {}

  function showMessage(text, timeout) {}
  function talkValTimer() {}

  function hideMessage(timeout) {}

  function initLive2d() {
    {
      var bgmPlayNow = parseInt($("#live2d_bgm").attr("data-bgm"));
      var bgmPlayTime = 0;
      var live2dBGM_Num = sessionStorage.getItem("live2dBGM_Num");
      var live2dBGM_PlayTime = sessionStorage.getItem("live2dBGM_PlayTime");
      if (live2dBGM_Num) {
        if (live2dBGM_Num <= $("input[name=live2dBGM]").length - 1) {
          bgmPlayNow = parseInt(live2dBGM_Num);
        }
      }
      if (live2dBGM_PlayTime) {
        bgmPlayTime = parseInt(live2dBGM_PlayTime);
      }
      var live2dBGMSrc = bgmListInfo.eq(bgmPlayNow).val();
      $("#live2d_bgm").attr("data-bgm", bgmPlayNow);
      $("#live2d_bgm").attr("src", live2dBGMSrc);
      $("#live2d_bgm")[0].currentTime = bgmPlayTime;
      $("#live2d_bgm")[0].volume = 0.5;
      var live2dBGM_IsPlay = sessionStorage.getItem("live2dBGM_IsPlay");
      var live2dBGM_WindowClose = sessionStorage.getItem(
        "live2dBGM_WindowClose"
      );
      if (live2dBGM_IsPlay == "0" && live2dBGM_WindowClose == "0") {
        $("#live2d_bgm")[0].play();
        $("#musicButton").addClass("play");
      }
      sessionStorage.setItem("live2dBGM_WindowClose", "1");
      $("#musicButton").on("click", function () {
        if ($("#musicButton").hasClass("play")) {
          $("#live2d_bgm")[0].pause();
          $("#musicButton").removeClass("play");
          sessionStorage.setItem("live2dBGM_IsPlay", "1");
        } else {
          $("#live2d_bgm")[0].play();
          $("#musicButton").addClass("play");
          sessionStorage.setItem("live2dBGM_IsPlay", "0");
        }
      });
      window.onbeforeunload = function () {
        sessionStorage.setItem("live2dBGM_WindowClose", "0");
        if ($("#musicButton").hasClass("play")) {
          sessionStorage.setItem("live2dBGM_IsPlay", "0");
        }
      };
      document
        .getElementById("live2d_bgm")
        .addEventListener("timeupdate", function () {
          var live2dBgmPlayTimeNow =
            document.getElementById("live2d_bgm").currentTime;
          sessionStorage.setItem("live2dBGM_PlayTime", live2dBgmPlayTimeNow);
        });
      document
        .getElementById("live2d_bgm")
        .addEventListener("ended", function () {
          var listNow = parseInt($("#live2d_bgm").attr("data-bgm"));
          listNow++;
          if (listNow > $("input[name=live2dBGM]").length - 1) {
            listNow = 0;
          }
          var listNewSrc = $("input[name=live2dBGM]").eq(listNow).val();
          sessionStorage.setItem("live2dBGM_Num", listNow);
          $("#live2d_bgm").attr("src", listNewSrc);
          $("#live2d_bgm")[0].play();
          $("#live2d_bgm").attr("data-bgm", listNow);
        });
      document
        .getElementById("live2d_bgm")
        .addEventListener("error", function () {
          $("#live2d_bgm")[0].pause();
          $("#musicButton").removeClass("play");
          showMessage("éŸ³ä¹ä¼¼ä¹ŽåŠ è½½ä¸å‡ºæ¥äº†å‘¢ï¼", 0);
        });
    }
    //èŽ·å–ç”¨æˆ·å
    var live2dUser = sessionStorage.getItem("live2duser");
    if (live2dUser !== null) {
      $("#AIuserName").val(live2dUser);
    }
    //èŽ·å–ä½ç½®
    var landL = sessionStorage.getItem("historywidth");
    var landB = sessionStorage.getItem("historyheight");
    if (landL == null || landB == null) {
      landL = "5px";
      landB = "0px";
    }
    $("#landlord").css("left", landL + "px");
    $("#landlord").css("bottom", landB + "px");
    //ç§»åŠ¨
    function getEvent() {
      return window.event || arguments.callee.caller.arguments[0];
    }
    var smcc = document.getElementById("landlord");
    var moveX = 0;
    var moveY = 0;
    var moveBottom = 0;
    var moveLeft = 0;
    var moveable = false;
    var docMouseMoveEvent = document.onmousemove;
    var docMouseUpEvent = document.onmouseup;
    smcc.onmousedown = function () {
      var ent = getEvent();
      moveable = true;
      moveX = ent.clientX;
      moveY = ent.clientY;
      var obj = smcc;
      moveBottom = parseInt(obj.style.bottom);
      moveLeft = parseInt(obj.style.left);
      if ((isFirefox = navigator.userAgent.indexOf("Firefox") > 0)) {
        window.getSelection().removeAllRanges();
      }
      document.onmousemove = function () {
        if (moveable) {
          var ent = getEvent();
          var x = moveLeft + ent.clientX - moveX;
          var y = moveBottom + (moveY - ent.clientY);
          obj.style.left = x + "px";
          obj.style.bottom = y + "px";
        }
      };
      document.onmouseup = function () {
        if (moveable) {
          var historywidth = obj.style.left;
          var historyheight = obj.style.bottom;
          historywidth = historywidth.replace("px", "");
          historyheight = historyheight.replace("px", "");
          sessionStorage.setItem("historywidth", historywidth);
          sessionStorage.setItem("historyheight", historyheight);
          document.onmousemove = docMouseMoveEvent;
          document.onmouseup = docMouseUpEvent;
          moveable = false;
          moveX = 0;
          moveY = 0;
          moveBottom = 0;
          moveLeft = 0;
        }
      };
    };
  }
  $(document).ready(function () {
    var AIimgSrc = [
      message_Path + modelPath + "model.1024/texture_00.png", //æ­¤å¤„éœ€ä¿®æ”¹
    ];
    var images = [];
    var imgLength = AIimgSrc.length;
    var loadingNum = 0;
    for (var i = 0; i < imgLength; i++) {
      images[i] = new Image();
      images[i].src = AIimgSrc[i];
      images[i].onload = function () {
        loadingNum++;
        if (loadingNum === imgLength) {
          var live2dhidden = localStorage.getItem("live2dhidden");
          if (live2dhidden === "0") {
            setTimeout(function () {
              $("#open_live2d").fadeIn(200);
            }, 1300);
          } else {
            setTimeout(function () {
              $("#landlord").fadeIn(200);
            }, 1300);
          }
          setTimeout(function () {
            loadlive2d("live2d", message_Path + modelPath + "model.json"); //æ­¤å¤„éœ€ä¿®æ”¹
          }, 1000);
          initLive2d();
          images = null;
        }
      };
    }
  });
}
