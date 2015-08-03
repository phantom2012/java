<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>机构服务平台</title>
<meta content="机构服务平台" name="Keywords">
<meta content="机构服务平台" name="Description">
<link rel="icon" href="http://res.idol.yystatic.com/agency/images/favicon.ico" type="image/x-icon" />
<style>
html {
	overflow-y: scroll;
	-webkit-text-size-adjust: 100%;
	-ms-text-size-adjust: 100%;
	font-size: 100%;
}

body {
	margin: 0;
	word-wrap: break-word;
}

:active {
	outline: 0;
}

:visited {
	outline: 0;
}

:link, :visited, ins {
	text-decoration: none
}

:focus {
	outline: 0
}

:active {
	outline: 0;
}

:visited {
	outline: 0;
}

div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, input, textarea, p, th, td {
	margin: 0;
	padding: 0;
}

iframe {
	border: 0 none;
}

img {
	border: 0 none;
	-ms-interpolation-mode: bicubic;
	vertical-align: middle;
}

ul, ol, li {
	list-style: none;
}

input, button, select {
	color: #000;
	font: 100% arial;
	vertical-align: middle;
	overflow: visible;
}

select {
	height: 20px;
	line-height: 20px;
}

em, strong, th, i {
	font-style: normal;
	font-weight: normal;
}

h1, h2, h3, h4, h5, h6, code, kbd, samp, tt, sup, sub, small, input, button, textarea, select {
	font-size: 100%;
}

textarea {
	overflow: auto;
	vertical-align: top;
	resize: vertical;
}

del {
	text-decoration: line-through;
}

button {
	width: auto;
	cursor: pointer;
	overflow: visible;
}

input[type=reset], input[type=button], input[type=submit] {
	cursor: pointer;
	overflow: visible;
}

input[type=checkbox], input[type=radio] {
	box-sizing: border-box;
}

.orange {
	color: #ff6c00;
}

body {
	font: 12px/1.5 微 软 雅 黑, tahoma, sans-serif;
	background: url("http://res.1931.yystatic.com/dream/images/error/page-bg.jpg");
}

.error {
	margin: auto;
	width: 315px;
	padding-top: 120px;
	text-align: center;
}

.error p {
	height: 50px;
	line-height: 50px;
	font-size: 18px;
}

.error b, .error a {
	margin: 0 6px;
}

.error b {
	color: #789c50;
}

.error a {
	color: #4e99cc;
}
</style>
</head>

<body>

	<div class="error">
		<img src="http://res1.1931.yystatic.com/dream/images/error/500.png">

		<p id="login" style="display: none">
			<a href="javascript:showLoginBox()">登录</a>
		</p>
		<p>
			<b id="timer">点击</b><a href="http://idol.yy.com/agency/index.html">返回</a>地球
		</p>
		<p id="msg" style="color:#789c50">
		</p>

		<script type="text/javascript" src="http://res0.idol.yystatic.com/agency/js/??jquery/jquery.min.js,commons/common-util.js,commons/date-util.js,commons/live.js,commons/hiido_click.js,login/login.js"></script>
		<script type="text/javascript" src="http://res0.idol.yystatic.com/agency/js/??jquery/jquery.min.js,jquery/jquery.cookie.min.js,jquery/jquery.url.min.js,jquery/jquery.jplayer.min.js,commons/jquery-ext.js,commons/jquery.ext.select.js"></script>
		<script type="text/javascript" src="http://res0.idol.yystatic.com/agency/js/??commons/aysnAddFile.js,stat/initState.js,stat/hiido.js,uiwidget/uiwidget-messagebox.min.js,uiwidget/uiwidget-popup.min.js"></script>
		<script type="text/javascript" src="http://res.udb.duowan.com/lgn/js/oauth/udbsdk/pcweb/udb.sdk.pcweb.popup.min.js"></script>
		<script type="text/javascript">
			var result =<%=response.getHeader("Server-Exception")%>;
			$('#msg').html(result.msg);
			if (result.type == "NOLOGIN") {
				document.getElementById('login').style.display = 'block';
				//showLoginBox();
				setTimeout(showLoginBox, 100);
			}

			//登录成功回调
			loginCfg.loginCallBack = function() {
				location.reload();
			};

			aysnAddUdbFile();
			aysnAddDuowanJs();
		</script>
	</div>

</body>
</html>