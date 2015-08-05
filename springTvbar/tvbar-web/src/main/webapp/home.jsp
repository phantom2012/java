<!doctype html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>偶像众筹-${anchorNick}</title>
	<meta content="" name="Keywords">
	<meta content="" name="Description">
	
	<link rel="icon" href="http://res.tvbar.yystatic.com/images/favicon.ico" type="image/x-icon" />
	<link rel="stylesheet" type="text/css" href="http://res.tvbar.yystatic.com/css/??/uiwidget/uiwidget-popup.css,/uiwidget/uiwidget-jscrollpane.css,/uiwidget/uiwidget-messagebox.css,jplayer.css" />
	<!--
	<link rel="icon" href="../static/temp/static/images/favicon.ico" type="image/x-icon" />
	<link rel="stylesheet" type="text/css" href="../static/temp/static/css/uiwidget/uiwidget-messagebox.css" />	
	<link rel="stylesheet" type="text/css" href="../static/temp/static/css/jplayer.css" />	
	-->	
	<link rel="stylesheet" type="text/css"  href="http://res.tvbar.yystatic.com/css/??zc/main.css?v=1.5" />
	<link rel="stylesheet" type="text/css" href="http://res.tvbar.yystatic.com/css/login/thirdLogin.css"/>
    <link type="text/css" rel="stylesheet" href="http://res.duowan.com/pay/auth/web/style.css" />   
    <!--[if lt IE 9]>
        <!--<script type="text/javascript" src="http://res.m.yystatic.com/act/js/meng/ventor/html5shiv.js"></script>-->
        <script type="text/javascript" src="http://res.tvbar.yystatic.com/tvbar/js/commons/html5shiv.js"></script>
    <![endif]-->
</head>

<body>
<div class="ie6Hint">
	您的浏览器版本过低，为了不影响您的浏览，请将您的IE浏览升级到 IE7 以上版本
</div>
    <section id="doc">
<header>
    <div id="head" class="conbox">
    	<div class="login-status">
    		<div id="noLoginBox">
	    		<a href="javascript:void(0);" id="loginId">登录</a> / <a target="_blank" href="https://aq.yy.com/p/reg/account.do">注册</a>
    		</div>
    		<div id="loginBox" style="display: none;">
    		<span id="login_user_nick"></span> / <a onclick="logout();" href="javascript:void(0);">注销</a>
    		</div>
    	</div>
    	
    	<div class="logo"></div>    	
    </div>
</header>
<!-- 这里的图片需要动态写入  -->
<section id="topBanner" _bgimg="${background}" style="background: url(${background}) no-repeat center top;">
    <div class="transparent"></div>
    <div class="conbox">
        <div class="clearfix">
            <div class="share-box">
                分享：
                <a class="share-weixin" id="share-weixin-top" href="javascript:void(0);">
                    <div class="codeof2d">
                        <!-- 二维码图片 -->
                        <img src=""/>
                    </div>
                </a>
                <a class="share-weibo" href="javascript:void(0);"></a>
            </div>
        </div>

        <div class="top-video">
            <!-- 顶部视频播放按钮及参数 -->
            <div id="top-video-play" class="btn-play" _url="${videoUrl}" videoId="${videoId}"></div>
            <div class="top-video-box">
                <a id="top_video_close" class="top-video-close" href="javascript:void(0);"></a>
                <div id="top_video_warp" class="top-video-warp"></div>
            </div>
        </div>
    </div>
</section>

<div id="mainbox" class="conbox mt-10 clearfix">
    <div class="subscribe-view">
        <div class="title">
            <h1>${title}</h1>
            <h2>${describe}</h2>
        </div>

        <div class="subscribe-box">
            <!-- 己订阅状态 增加 class btn-sub-o -->
            <a class="btn-sub" id="btn-sub-id" href="javascript:void(0);">
                <strong>订阅直播</strong>
                <p>己有<span id="fansCount"></span>人订阅</p>
            </a>
            <p class="count">直播已筹礼物数：<span id="curGiftNum"></span> / <span id="targetGiftNum">${targetGiftNum}万</span> </p>
        </div>

        <a class="btn-liveing" style="display: none;" href="javascript:void(0);"></a>
    </div>

    <div class="vote-view">
        <div class="rule-view">
            <a id="rule_btn" class="rule-btn" href="javascript:void(0);">&nbsp;</a>
            <div id="rule_content" class="rule-content">
                <a id="rule_colse" href="javascript:void(0);" class="rule-colse"></a>
                <div>
                    <dl>
                        <dt>任务说明</dt>
                        <dd>1.初级目标是：新歌单曲，任务是：投票数累计${firstTargetVotes}万+“支持你”礼物数累计${firstTargetGiftNum}万。</dd>
                        <dd>2.终极目标是：EP制作，任务是：投票数累计${finalTargetVotes}万+“支持你”礼物数累计${finalTargetGiftNum}万。</dd>
                    </dl>
                </div>

                <div>
                    <dl>
                        <dt>投票说明</dt>
                        <dd>1.每天登录该艺人活动主页可获得1张免费票。</dd>
                        <dd>2.第一次分享该艺人活动即可获得1张免费票，若有用户通过你分享的链接进入活动主页并为艺人投票，那你还可以获得更多免费票，上限是50票。（友情提醒，先登录再分享才可以获得更多免费票哦~）</dd>
                        <dd>3.每连续观看艺人直播5分钟可获得1张免费票，每天的上限是10票。</dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="vote-line">
            <div class="line-box">
                <div id="line_part_1" class="line-part-1"></div>
                <div id="line_part_2" class="line-part-2"></div>
                <div id="line_part_3" class="line-part-3"></div>
                <!-- 进度比例 计算百分比 -->
                <div id="line_sub" class="line-sub"></div>
            </div>

            <div class="part-hint">
                <div class="part-1">
                    <strong>众筹开启</strong>
                </div>

                <div class="part-2">
                    <p id="part-2-time">还剩3天</p>
                    <strong>初级目标：${firstTargetVotes}万票</strong>
                    <span>获得新歌单曲资格</span>
                </div>

                <div class="part-3">
                    <p id="part-3-time">还剩6天</p>
                    <strong>终极目标：${finalTargetVotes}万票</strong>
                    <span>获得EP制作资格</span>
                </div>
            </div>
        </div>

        <div class="vote-box">
            <a class="btn-vote btn-sub-o" id="voteBtnId" href="javascript:void(0);">
                <div id="tickets">1</div>
                <strong>为TA投票</strong>
                <p>我己投<span id="voteTickets">0</span>票</p>
            </a>
            <p class="count">当前获得票数：<span id="anchorTotalTickets"></span></p>
        </div>
    </div>

    <div class="layout mt-10 clearfix">
        <div class="layout-left">
            <c:choose>
                <c:when test="${!empty anchorUid}">
                    <jsp:include page="articles/article_${anchorUid}.jsp"/>
                </c:when>
                <c:otherwise>
                </c:otherwise>
            </c:choose>

            <div class="share-box">
                分享：
                <a class="share-weixin" id="share-weixin-bottom" href="javascript:void(0);">
                    <div class="codeof2d">
                        <!-- 二维码图片 -->
                        <img src=""/>
                    </div>
                </a>
                <a class="share-weibo" href="javascript:void(0);"></a>
            </div>

        </div>
        <div class="layout-right">
            <div id="music_view" class="box">
                <div class="hd">
                    <div class="title-img"></div>
                </div>
                <div class="bd">
                    <ul class="music-list" id="music-list">
                    </ul>
                </div>
            </div>

            <div id="fans_star_view" class="box mt-10">
                <div class="hd">
                    <div class="title-img"></div>
                    <div class="right-txt">
                        <p>参与粉丝:</p>
                        <p>${voteFansCount}</p>
                    </div>
                </div>
                <div class="bd">
                    <div class="fans-star">
                        <a href="javascript:void(0);" title="用户名"><img src="http://live1.yystatic.com/live/images/index/285x215.gif" onerror="javascript:this.src='http://live1.yystatic.com/live/images/index/285x215.gif'"></a>
                        <a href="javascript:void(0);" title="用户名"><img src="http://live1.yystatic.com/live/images/index/285x215.gif" onerror="javascript:this.src='http://live1.yystatic.com/live/images/index/285x215.gif'"></a>
                        <a href="javascript:void(0);" title="用户名"><img src="http://live1.yystatic.com/live/images/index/285x215.gif" onerror="javascript:this.src='http://live1.yystatic.com/live/images/index/285x215.gif'"></a>
                    </div>
                </div>
            </div>

            <div id="video_view" class="box mt-10">
                <div class="hd">
                    <div class="title-img"></div>
                    <div class="right-txt"></div>
                </div>
                <div class="bd">
                    <div class="video-list">
                        <ul id="video_list">
                        </ul>
                    </div>
                    <span id="show_all_video">更多视频</span>
                </div>
            </div>

            <div  class="box mt-10">
                <div class="bd" id="weiboIframe">
                    <!-- 微博 iframe -->
                </div>
            </div>
        </div>
    </div>
</div>

<footer>
    <div class="conbox">
        <div id="footbox">
            <div id="foottext">
				<script type="text/javascript" src="http://res.tvbar.yystatic.com/js/zc2/hdFooter.js"></script>
            	<script type="text/javascript">addFooter();</script>
            </div>
        </div>
    </div>
</footer>
</section>
<div id="rightFloat">
    <a id="toTop" href="javascript:void(0);"></a>
</div>
<div class="letter-tip" id="letter-tip" style="display:none">
    <span style="display:inline-block;text-align:center;width: 117px;height: 69px;line-height:69px">未读</span>
		    <a id="closeLetterTip" href="javascript:void(0);"></a>
</div>
<script type="text/javascript" src="http://res.tvbar.yystatic.com/js/??jquery/jquery.min.js,jquery/jquery.cookie.min.js,jquery/jquery.url.min.js,jquery/jquery.jplayer.min.js,commons/jquery-ext.js,commons/aysnAddFile.js,stat/initState.js,stat/hiido.js,uiwidget/uiwidget-messagebox.min.js,uiwidget/uiwidget-popup.min.js"></script>
<script type="text/javascript" src="http://res.udb.duowan.com/lgn/js/oauth/udbsdk/pcweb/udb.sdk.pcweb.popup.min.js"></script>
<script type="text/javascript" src="http://res.tvbar.yystatic.com/js/??commons/common-util.js,commons/date-util.js,commons/live.js,commons/hiido_click.js,login/login.js,zc2/forwar.letter.js?v=20150515"></script>

<!--
<script type="text/javascript" src="http://res.tvbar.yystatic.com/js/??commons/common-util.js,commons/date-util.js,commons/live.js,login/login.js,zc/main.js,zc/countdownUI.js,zc/home.js"></script>

<script type="text/javascript" src="../static/temp/static/js/jquery/jquery.min.js"></script>
<script type="text/javascript" src="../static/temp/static/js/jquery/jquery.cookie.min.js"></script>
<script type="text/javascript" src="../static/temp/static/js/commons/jquery-ext.js"></script>
<script type="text/javascript" src="../static/temp/static/js/commons/aysnAddFile.js"></script>
<script type="text/javascript" src="../static/temp/static/js/commons/login.js"></script>
<script type="text/javascript" src="../static/temp/static/js/stat/initState.js"></script>
<script type="text/javascript" src="../static/temp/static/js/stat/hiido.js"></script>
<script type="text/javascript" src="../static/temp/static/js/uiwidget/uiwidget-messagebox.min.js"></script>
<script type="text/javascript" src="../static/temp/static/js/jquery/jquery.jplayer.min.js"></script>

<script type="text/javascript" src="http://res.tvbar.yystatic.com/js/commons/common-util.js"></script>
<script type="text/javascript" src="http://res.tvbar.yystatic.com/js/commons/date-util.js"></script>
<script type="text/javascript" src="http://res.tvbar.yystatic.com/js/commons/live.js"></script>
<script type="text/javascript" src="http://res.tvbar.yystatic.com/js/login/login.js"></script>
-->
<script type="text/javascript" src="http://res.tvbar.yystatic.com/js/zc/main.js?v=2015042801"></script>
<script type="text/javascript" src="http://res.tvbar.yystatic.com/js/zc/countdownUI.js?v=2015042801"></script>
<script type="text/javascript" src="http://res.tvbar.yystatic.com/js/zc/home.js?v=2015050902"></script>
<script type="text/javascript" src="http://res.tvbar.yystatic.com/js/pay/payCrowdFund.js?v=2012032604"></script>
<script type="text/javascript" src="http://res.tvbar.yystatic.com/js/pay/error_code.js?v=2012032602"></script>
<script type="text/javascript" src="http://res.duowan.com/pay/auth/js/auth.js"></script>
<script type="text/javascript">
    var projectId = "${projectId}";
    var isLiving = "0";  // 默认是不开播，之后初始化
    var anchorUid = "${anchorUid}";
    var anchorNick = "${anchorNick}";
    var anchorYYNum = "${anchorYYNum}";
    var totalVotes = "0";   // 默认为0，之后初始化
    var firstTargetVotes = "${firstTargetVotes}";
    var finalTargetVotes = "${finalTargetVotes}";
    var orgFinalTargetVotes = "${orgFinalTargetVotes}";
    var projectStatus = "${projectStatus}";
    var task1LeftTime = "${task1LeftTime}";
    var task2LeftTime = "${task2LeftTime}";
    var weiboUid = "${weiboUid}";
    var verifier = "${verifier}";
    var chId = "${chId}";
    var subChid = "${subChid}";
    var actCnt = "${actCnt}";
    if(finalTargetVotes && !isNaN(finalTargetVotes)) {
        finalTargetVotes = parseInt(finalTargetVotes) * 10000;
    }
    if(!projectId) {
        projectId = "1";//对应上面的个人故事
    }
    $(document).ready(function(){
        homeInit.init(projectId);
        // 客户端等跳转过来后校验ticket并写cookie等
		authenticationTicket(function(){
//			alert("login success!");//TODO change login area
            showLoginInfo();
		});

        //登录成功回调
        loginCfg.loginCallBack = function() {
            homeInit.initSubscribe();
            voteCon.loginAddTicket();
            voteCon.initUserVoteInfo();
            leterHandler.initLetterStatus();
        };
    });
    var post_url = "http://tvbar.yy.com/tvbar/" ;
    var leterHandler = new com.yy.ent.IdolLetter() ;
    leterHandler.init();
    aysnAddUdbFile();
    aysnAddDuowanJs();  
</script>
</body>
</html>

