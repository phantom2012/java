var thirdLoginWin = null;
function toThirdLogin(type) {
	switch (type) {
	case "qq":
		if (thirdLoginWin != null)
			thirdLoginWin.close();
		var state = new Date().getTime();
		thirdLoginWin = window
				.open(
						"https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101189554&redirect_uri="
								+ encodeURIComponent("http://idol.yy.com/login/qq-login.html")
								+ "&state=" + state,
						"TencentLogin",
						"width=640,height=480,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
		break;
	case "sina":
		if (thirdLoginWin != null)
			thirdLoginWin.close();
		var state = new Date().getTime();
		thirdLoginWin = window
				.open(
						"https://api.weibo.com/oauth2/authorize?client_id=558094381&response_type=code&redirect_uri="
								+ encodeURIComponent("http://idol.yy.com/login/sina-login.html")
								+ "&state=" + state,
						"TencentLogin",
						"width=640,height=480,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
		break;
	case "yy":
		$.uiwidget.popupHide({
			id : 'thirdLogin'
		});
		UDB.sdk.PCWeb.popupOpenLgn('/agency/getSdkAuth.action');
		break;
	}
	reloadPage();
}
function reloadPage(){
	if(window.loginSuccessTimer){
		clearInterval(window.loginSuccessTimer);
	}
	window.loginSuccessTimer = setInterval(function() {
        try {
        	if (isLogin()) {
				clearInterval(window.loginSuccessTimer);
				 window.location.reload();
				 if (thirdLoginWin != null)
					    thirdLoginWin.opener=null;
					    thirdLoginWin.open("","_self");
						thirdLoginWin.close();
			}
        }catch (error) {
        }
    }, 300);
}
// 调用第三方登录
function thirdLogin() {
	$.uiwidget.popupShow({
		id : 'thirdLogin'
	});
	try{
		recordThisWithLoginState("注册登录页面-弹出");
        recordThisWithoutSource("注册登陆-自动弹出弹出");
	}catch(e){
	}
}
function gotoRegister() {

}
function onLoginClick(type) {
	$.uiwidget.popupHide({
		id : 'thirdLogin'
	});
	$.uiwidget.popupHide({
		id : 'thirdRegister'
	});
	toThirdLogin(type);

}
function onRegisterClick(type) {
	$.uiwidget.popupHide({
		id : 'thirdLogin'
	});
	$.uiwidget.popupHide({
		id : 'thirdRegister'
	});
	daoHangZhanZhuCe(type);
}
function goThirdRegister(){
	$.uiwidget.popupShow({
		id : 'thirdRegister'
	});
	$.uiwidget.popupHide({
		id : 'thirdLogin'
	});
	try{
		recordThisWithLoginState("注册登录页面-弹出");
	}catch(e){
	}
}
$(function() {
	$("body").delegate("#yyLogin", "click", function() {
		onLoginClick("yy");
	});
	$("body").delegate("#qqLogin", "click", function() {
		onLoginClick("qq");
	});
	$("body").delegate("#sinaLogin", "click", function() {
		onLoginClick("sina");
	});
	$("body").delegate("#qqLoginFR", "click", function() {
		onLoginClick("qq");
	});
	$("body").delegate("#sinaLoginFR", "click", function() {
		onLoginClick("sina");
	});
	$("body").delegate("#quickRegister", "click", function() {
		onRegisterClick("yy");
	});
	$("body").delegate("#quickLogin", "click", function() {
		onLoginClick("yy");
	});
	$("body").delegate("#yyRegister", "click", function() {
		onRegisterClick("yy");
	});
	$("body").delegate(".login-quick-close", "click", function() {
		$.uiwidget.popupHide({
			id : 'thirdLogin'
		});
		$.uiwidget.popupHide({
			id : 'thirdRegister'
		});
		try{
			recordThisWithLoginState("注册登录页面-关闭");
            recordThisWithoutSource("注册登陆-自动弹出关闭");
		}catch(e){
		}
	});
});