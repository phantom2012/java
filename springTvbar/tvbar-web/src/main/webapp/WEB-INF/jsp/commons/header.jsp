<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/commons/taglibs.jsp" %>
<!doctype html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta content="" name="Keywords">
	<meta content="" name="Description">
	<title>机构服务平台</title>
	<link rel="stylesheet" href="http://res.idol.yystatic.com/agency/html/editor/themes/default/default.css?20150429" />
	<link rel="stylesheet" href="http://res.idol.yystatic.com/agency/??css/agency/index.css?v=201506051133,css/agency/video-photo.css,css/commons/jquery.ext.select.css?20150429" />
	<!-- <link rel="icon" href="http://res.m.yystatic.com/live/images/favicon.ico" type="image/x-icon" /> -->
<script type="text/javascript"	src="http://res0.idol.yystatic.com/agency/js/??jquery/jquery.min.js,jquery/jquery.cookie.min.js,jquery/jquery.url.min.js,jquery/jquery.jplayer.min.js,commons/jquery-ext.js,commons/jquery.ext.select.js?201506081713"></script>
	<script type="text/javascript"	src="http://res0.idol.yystatic.com/agency/js/??commons/aysnAddFile.js,stat/initState.js,stat/hiido.js,uiwidget/uiwidget-messagebox.min.js,uiwidget/uiwidget-popup.min.js?20150429"></script>
	<script src="http://idol.yy.com/agency/html/editor/kindeditor-min.js?20150429"></script>
	<script src="http://res1.idol.yystatic.com/agency/html/editor/lang/zh_CN.js?20150429"></script>
	<script type="text/javascript" src="http://res2.idol.yystatic.com/agency/js/My97DatePicker/WdatePicker.js?20150429"></script>
<link rel="stylesheet" type="text/css"
	href="http://res1.idol.yystatic.com/agency/css/??/uiwidget/uiwidget-popup.css,/uiwidget/uiwidget-messagebox.css,jplayer.css?20150429" />
<!--[if lt IE 9]>
	    <!--<script type="text/javascript" src="http://res.m.yystatic.com/act/js/meng/ventor/html5shiv.js"></script>-->
<script type="text/javascript"
	src="http://res0.idol.yystatic.com/agency/js/??commons/html5shiv.js,commons/arttemplate.js?20150429"></script>
<![endif]-->
<script type="text/javascript">
	var zoneDomain="${domain}";
	var serverTime = ${serverTime};
	var domain ="idol.yy.com";
</script>
</head>
<div class="header">
	<div class="header-con">
		<div class="header-logo" onclick="location.href='http://idol.yy.com'" style="cursor:pointer;">&nbsp;</div>	
		<div style="float:left;cursor:pointer;margin-left:40px" onclick="location.href='/agency/index.html'" >服务平台首页</div>	
		<div class="no-login" style="display:none;" id="loginBox">
			<a style="display:none" href="javascript:$.alert('todo')" class="line-r jia-meng">机构加盟</a><a href="/agency/admin/adminIndex.action" class="line-lr jia-meng" style="display:none" id="agencyAdmin">后台管理</a><a href="/agency/queryServiceOrderList.action" class="line-lr jia-meng" style="display:none" id="agencyOrder">我的订单</a><span class="line-lr user-name" id="login_user_nick"></span><a href="javascript:;" onclick="logout();" class="line-lr login-out">退出</a>
		</div>
		<div class="login" id="noLoginBox">
			<a href="javascript:;" class="line-r sign-in" id="loginId">登录</a><a target="_blank" href="https://aq.yy.com/p/reg/account.do" class="line-lr register">注册</a>
		</div>
	</div>
</div> 


