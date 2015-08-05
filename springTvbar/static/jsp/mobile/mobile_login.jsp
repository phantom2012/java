<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>agency</title>
    <meta name="robots" content="none">
    <meta name="format-detection" content="telephone=no" />
    <meta name="description" content="手机特权">
    <meta name="HandheldFriendly" content="True">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1, maximum-scale=1, user-scalable=no" />
    <style>
    .emstyle {
        text-align:center;
        margin:0 auto;
        overflow: hidden;
        width:100%;
        z-index:3;
        height:320px;
    }
    /*.emstyle iframe{width:320px;height: 300px;}*/
    #udbsdk_login_content .udbsdk_frm {
        padding-top: 30px; 
        width: 100%;
        height: 320px;
        background:transparent;
    }
    html {
        background:-webkit-gradient(linear, 0 0, 0 100%, from(#A0D3FA), to(#fff));
        background-repeat: no-repeat;
        position:relative;
    }
    html, body {
        /*background-color: #eff3f5;*/
        padding: 0;
        margin: 0;
        width:100%;
        height:100%;
        overflow:hidden;
    }
    .wrapper {
        height: 100%;
        width: 100%;
    }
    .logo-ctn {
        text-align: center;
        margin-top:40px;
        z-index:2;
    }
    .logo {
        width:75px;
        height:75px;
    }
    .bottom-bg {
        width:100%;
        position:absolute;
        bottom:0;
        left:0;
        z-index:-1;
        text-align:center;
        height:86px;
        background-image: url(http://tq.dwstatic.com/front/tequan/touch/images/hill.png?max_age=31104000&v=201401020);
        background-size: contain;
    }
    .bottom-bg img {
        height:86px;
        width:auto;
    }
    </style>
    <script type="text/javascript">
    var SITEURL = window.location.href.substring(0, window.location.href.indexOf("/", 8) + 1);
    </script>
</head>

<body>
    <div class="wrapper" style="padding-left: 0px;">
        <div class="logo-ctn">
            <img class="logo" src="http://tq.dwstatic.com/front/tequan/touch/images/yy.png?max_age=31104000&v=201401020"></img>
        </div>
        <div id="udbsdk_login_content" class="emstyle"></div>
    </div>
    <div class="bottom-bg">
       	<div>&nbsp;</div>
    </div>
    <script type="text/javascript" src="http://res.udb.duowan.com/js/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="http://res.udb.duowan.com/lgn/js/oauth/udbsdk/mweb/udb.sdk.mweb.embed.min.js"></script>
    <script src="http://res2.idol.yystatic.com/mobile/js/login.js"></script>
    <script type="text/javascript">
    	UDB.sdk.MWeb.docReady(bbsLogin.init);
    </script>
</body>
<style>
    .emstyle,#udbsdk_login_content .udbsdk_frm{
        height: 500px;
    }
    html, body{
    	overflow:visible;
    }
</style>
</html>