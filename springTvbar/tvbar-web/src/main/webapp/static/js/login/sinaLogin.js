$(document).ready(function() {
	var source = 'weibo';
    var rcode= $.url.param("rcode") || "";
    var lgflag= $.url.param("lgflag") || "";//1登录，其它未登录
    var code= $.url.param("code") || "";//from qq
	var udb43login="https://thirdlogin.yy.com/open/xtokenlogin.do";//udb提供的和第三方合作认证接口
	var oauth_url="https://api.weibo.com/oauth2/access_token";
	var udbCallBackUrl = "http://idol.yy.com/login/sina-login.html";
    if(rcode !=  null && rcode != "")
    {
        //登陆
        if(rcode==1) {
		 $.cookie('nick', $.cookie('sina_nickname'), {path: '/', domain: 'yy.com'});
		try{
            //window.opener.location.reload();
			}catch(e){

			}
			window.opener = null;
            window.close();
        } else {
        	alert("rcode:"+rcode);
        }
    }
    if(code != null && code != ""){
		if($.cookie("yyuid")!=null&&$.cookie("yyuid")!=""){
			return;
		}
    	var oauth_url = encodeURIComponent(window.location.href);
    	turnurl = udb43login+"?source=sina&tokenid="+encodeURIComponent(code)+"&callback_url="+encodeURIComponent(udbCallBackUrl)+"&third_sub_sys=weibo&udb_appid=5434&ticket_flag=1&third_appkey=558094381&oauth_type=0&oauth_url="+oauth_url;
    	window.location.href=turnurl;
	}else{
		alert("登录失败:"+rcode);
	}

});

//清所有cookie
function cleanAllCookie() {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; "); // 将多cookie切割为多个名/值对
    for (var i = 0; i < arrCookie.length; i++) { // 遍历cookie数组，处理每个cookie对
        var arr = arrCookie[i].split("=");
        if (arr != null && arr.length > 0) {
            if (arr[0] == "hiido_ui") {
                continue;
            }
            delCookie(arr[0]);
        }
    }
}

//删除cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - (1000 * 60 * 60 * 24 * 30));
    var cval = $.cookie(name);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString() + "; path=/;domain=.yy.com";
}