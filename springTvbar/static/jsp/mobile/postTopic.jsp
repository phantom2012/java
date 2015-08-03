<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta content="telephone=no" name="format-detection" />
    <meta content="email=no" name="format-detection" />
	<title>发表话题</title>
    <link rel="stylesheet" href="http://static.tvbar.yy.com/mobile/css/main.css">
	<link rel="stylesheet" href="http://static.tvbar.yy.com/mobile/css/post.css"> 
</head>
<body>
	<header id="header">
		<a class="cancel-btn"></a>
		<div class="title">发布话题</div>
		<div class="right-btn">发布</div>

	</header><!-- /header -->
	<section id="topic-post">
		<div class="item-con">
			<input type="text" class="topic-title"  placeholder="请输入话题标题，名称尽量含有剧名、角色名或演员名" maxlength="28">
		</div>
		<div class="item-con upload">
			<textarea class="topic-desc" placeholder="输入简短的话题描述" maxlength="70"></textarea>
			<div class="upload-img">
				<div class="img"></div>
				<form><input type="file" name="pic" class="upload-btn" accept="image/*"></form>
				<div class="imgUrl" hidden="true" ></div>
				<div class="url" hidden="true" ></div>
			</div>
			<div class ="delete-img">删除图片</div>
		</div>
		<%--<div class="item-con">--%>
			<%--<input type="text" class="teleplay-name"  placeholder="输入话题来源的电视剧名">--%>
		<%--</div>--%>
	</section>
	<div id="uploadLoading"><span class="loadingicon"></span></div>
</body>
<script type="text/javascript" src="http://static.tvbar.yy.com/mobile/js/zepto.min.js"></script>
<script type="text/javascript" src="http://static.tvbar.yy.com/mobile/js/main.js"></script>
<script type="text/javascript" src="http://static.tvbar.yy.com/mobile/js/post.js"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="http://static.tvbar.yy.com/mobile/js/wxShare.js" type="text/javascript"></script>
<script src="http://res.tvbar.yystatic.com/js/stat/hiido.js"></script>
<script type="text/javascript">
	//海度统计上报
	var uid = "${uid}"
	hiidoApi.addUVToHiido('tvbar');
	hiidoApi.reportEvent('tvbar','postTopic',{uid:uid});
</script>
<script>
	var groupId="${groupId}"
	var userId="${uid}"
</script>
</html>
