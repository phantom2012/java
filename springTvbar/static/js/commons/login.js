var loginCfg={loginCallBack:null,logoutCallBack:null,closeLoginCallBack:null};function showLoginBox(){UDB.sdk.PCWeb.popupOpenLgn("/agency/getSdkAuth.action")}function refreshOperate(b,a){if(b=="1"){if(loginCfg.closeLoginCallBack){loginCfg.closeLoginCallBack();return false}}else{UDB.sdk.PCWeb.writeCrossmainCookieWithCallBack(a,function(){$(this).unbind("load");showLoginInfo();if(loginCfg.loginCallBack){loginCfg.loginCallBack()}})}}function showLoginInfo(){initLoginStatus()}function initUserNick(){var a=$.trim($("#loginNick").text());if(a!=null&&a!=""){return}var c=new Date();var d={t:c};var b="/agency/web/getUserNick.action";$.post(b,d,function(f){var e=f;if(e.code=="1"){$("#loginNick").text(e.data)}})}function initLoginStatus(){var a=false;try{var b=isLogin();if(b){initUserNick();$("#no-login").hide();$("#login-ok").show()}else{$("#loginNick").text("");$("#login-ok").hide();$("#no-login").show()}}catch(c){a=true}}function logout(){$.ajax({url:"/agency/logout.action",type:"get",success:function(a){initLoginStatus();UDB.sdk.PCWeb.deleteCrossmainCookieWithCallBack(a.deleteCookieURL,function(){if(loginCfg.logoutCallBack){loginCfg.logoutCallBack()}})}})}function isLogin(){var a=false;var b=$.cookie("yyuid");if(b&&b!=""){a=true}return a}function getLoginUserName(){return $.cookie("username")}function getLoginUid(){return $.cookie("yyuid")};