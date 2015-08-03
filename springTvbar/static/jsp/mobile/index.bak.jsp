<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<%@ include file="../commons/taglibs.jsp"%>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta content="telephone=no" name="format-detection" />
    <meta content="email=no" name="format-detection" />
	<title>首页</title>
	<link rel="stylesheet" href="http://res0.tvbar.static.com/mobile/css/main.css">
	<link rel="stylesheet" href="http://res0.tvbar.static.com/mobile/css/sy.css">
</head>
<body>
	<header id="header">
		<div class="title">剧吧</div>
		<div class="right-pic"><img src="http://art.yypm.com/60x60" alt=""></div>
	</header><!-- /header -->
	<nav class="navA">
		<c:forEach var="hisGroupInfo" items="${historyGroups}">
			<a href=""><span>${hisGroupInfo.title}</span></a>
		</c:forEach>
	</nav>
	<section class="carousel-box" id="JcarouselBox">
		<div id="carousel">
			<c:forEach var="recGroupInfo" items="${recommendGroups}">
				<div class="card"><img src="${recGroupInfo.headIconUrl}" alt="" data-name="${recGroupInfo.title}"></div>
			</c:forEach>
		</div>
		<div class="bg-img" src=""></div>
		<p class="card-name"></p>
		<em class="u-triangle"></em>
		<div class="mask-layer">
			<div class="mask-1"></div>
			<div class="mask-2"></div>
			<div class="mask-3"></div>
			<div class="mask-4"></div>
			<div class="mask-5"></div>
		</div>
	</section>
	<div id="JtopicAll">
		<c:forEach var="recGroupInfo" items="${recommendGroups}" varStatus="index">
			<section class="topic-list topicList-${index.count}" data-recGroupId="${recGroupInfo.groupId}">
			<!-- <p class="topic-count">话题（113）</p> -->
				<c:if test="${!empty recGroupInfo.topics}">
				
					<c:forEach var="topicInfo" items="${recGroupInfo.topics}">
						<div class="item">
							<div class="reply-topic"><span class="th">话题：</span>${recGroupInfo.title}<em class="triangle"></em></div>
							<div class="thead">
								<div class="pic"><img src="http://art.yypm.com/90x90" alt=""></div>
								<p>
									<span class="name">${topicInfo.creatorName}</span>
									<c:choose>
										<c:when test="${recGroupInfo.creatorId eq topicInfo.creatorId}">
											<span class="action">发布了新话题</span>
										</c:when>
										<c:otherwise>
											<span class="action">回复了话题</span>
										</c:otherwise>
									</c:choose>
								</p>
								<p class="date">${topicInfo.createTime}</p>
							</div>
							<!-- 观点 -->
							<c:choose>
								<c:when test="${!empty topicInfo.viewPoints}">
									<c:forEach var="viewPointInfo" items="${topicInfo.viewPoints}">
										<div class="tbody">
											<p><span class="icon s-viewport">观点</span>${viewPointInfo.title}</p>
											<div class="pic-list">
												<a href="">
													<c:if test="${!empty viewPointInfo.evidences}">
														<c:forEach var="evidenceInfo" items="${viewPointInfo.evidences}">
															<img src="${evidenceInfo.handlePic}" alt="">
														</c:forEach>
														<span class="tip">共${fn:length(viewPointInfo.evidences)}张图</span>
													</c:if>
												</a>
											</div>
										</div>
									</c:forEach>
								</c:when>
								<c:otherwise>
									<div class="tbody">
										<p>${topicInfo.title}</p>
									</div>
								</c:otherwise>
							</c:choose>
						
							<div class="tfoot"><span class="support-num">支持<i>0</i></span><span class="tag">#${topicInfo.souName}#</span></div>
						</div>
					</c:forEach>
					
				</c:if>
			</section>
			
		</c:forEach>
	</div>
	<a class="btn-publish" href="">发布</a>	
</body>
<script src="http://res1.tvbar.static.com/mobile/js/zepto.min.js" type="text/javascript" charset="utf-8"></script>
<script src="http://res1.tvbar.static.com/mobile/js/picCarousel.js" type="text/javascript" charset="utf-8"></script>
<script>
	$(function(){ 
		//设置旋转木马图片大小
		var $windowW=$(window).width(),
			$cardW=$windowW*0.385
			$cardH=$cardW*170/123,
			$yR=$cardH*0.17;
		$("#JcarouselBox").height($cardH+48);
		$("#carousel .card").width($cardW).height($cardH);
		//旋转木马
		var $carousel=$("#carousel").picCarousel( {
			itemClass:"card",
			farScale:0.5,
			speed:500,
			yOrigin:$cardH*0.5+10,
			onLoaded:function(){
				var $nowElement=this.container.eq(this.nowIndex),
					topicnum=this.nowIndex+1;
				$("#JcarouselBox .bg-img").css("background-image","url("+$nowElement.find('img').attr('src')+")");
				$("#JcarouselBox .card-name").html($nowElement.find("img").attr("data-name"));
				$("#JtopicAll .topic-list").hide();
				$("#JtopicAll .topicList-"+topicnum).show();
			},
			onSlideStart:function($nowElement,nowIndex) {
				var topicnum=nowIndex+1;
				$("#JcarouselBox .bg-img").css("background-image","url("+$nowElement.find('img').attr('src')+")");
				setTimeout(function(){
					$("#JcarouselBox .card-name").html($nowElement.find("img").attr("data-name"));
					$("#JtopicAll .topic-list").hide();
					$("#JtopicAll .topicList-"+topicnum).show();
				},500)
			},
		} );
		//遮罩层
		function setMask(){
			var $obj=$('#carousel .card').eq(0),
				$maskLayer=$('#JcarouselBox .mask-layer'),
				$mask1=$maskLayer.find('.mask-1'),
				$mask2=$maskLayer.find('.mask-2'),
				$mask3=$maskLayer.find('.mask-3'),
				$mask4=$maskLayer.find('.mask-4'),
				$mask5=$maskLayer.find('.mask-5');
			var	boxW=$('#carousel').width(),
				boxH=$('#carousel').height(),
				oTopH=$obj.position().top,
				oBottomH=boxH-$obj.position().top-$obj.height(),
				oLeftW=$obj.position().left,
				oRightW=boxW-$obj.position().left-$obj.width(),
				oLandRH=boxH-oTopH-oBottomH;
			$mask1.width($obj.width()).height($obj.height()).css({
				'top':oTopH+'px',
				'left':oLeftW+'px'
			})
			$mask2.width(boxW).height(oTopH);
			$mask3.width(oLeftW).height(oLandRH).css('top',oTopH+'px');
			$mask4.width(boxW).height(oBottomH);
			$mask5.width(oRightW).height(oLandRH).css('top',oTopH+'px');
			$('#JcarouselBox').swipeLeft(function(){
				$maskLayer.css('z-index','700');
				$mask1.css('opacity','1');
				$carousel.go(+1);
				setTimeout(function(){
					$maskLayer.css('z-index','500');
				$mask1.css('opacity','0');
				},500)
			}).swipeRight(function(){
				$maskLayer.css('z-index','700');
				$mask1.css('opacity','1');
				$carousel.go(-1);
				setTimeout(function(){
					$maskLayer.css('z-index','500');
				$mask1.css('opacity','0');
				},500)
			})
		}
		setMask();
	})
</script>
</html>