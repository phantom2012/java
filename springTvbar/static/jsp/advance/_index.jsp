<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/commons/header.jsp" %>	
	<link rel="icon" href="http://res.idol.yystatic.com/agency/images/favicon.ico" type="image/x-icon" />
	<link rel="stylesheet" type="text/css" href="http://res1.idol.yystatic.com/agency/css/agency/merge.css?20150428">
	<link rel="stylesheet" type="text/css"  href="http://res0.idol.yystatic.com/agency/css/advance/advance.css" />
	<link rel="stylesheet" type="text/css"  href="http://res1.idol.yystatic.com/agency/css/advance/header-footer.css" />
	<script type="text/javascript" src="http://res.m.yystatic.com/act/js/meng/ventor/html5shiv.js"></script>
		<div id="doc">
		<!-- 	<header>
    <div id="head" class="conbox">
    
        <a href="http://idol.yy.com" class="logo"></a>
    	<div class="login-status">
    		<a onclick="showLoginBox();" href="javascript:void(0);">登录</a> / <a target="_blank" href="https://aq.yy.com/p/reg/account.do">注册</a>
    		
    		
    		这里是用户名 / <a onclick="logout();" href="javascript:void(0);">注销</a>
    		
    	</div>
        <a href="#" class="baoming-btn">艺人报名</a>
    	    	
    </div>
</header>  -->
			<header style="display:none;">
			    <div class="conbox">
			        <div class="theme-title">
					    <strong>关于梦想我从不认输<i>众筹中</i></strong>
						<p>YY独家赞助</p>
					</div>
					<a href="javascript:void(0);"  class="support-btn">支持他</a> 
			    </div>
			</header>
			<!-- 这里的图片需要动态写入  -->
			<section id="topBanner">
				<div class="transparent"></div>
				<div class="conbox">
					<div class="clearfix">
						<div class="theme-title">
						    <strong>关于梦想我从不认输<i>
						       <c:choose>
					              <c:when test="${info.leftDays == 0}">
					                                                众筹完
					              </c:when>
					              <c:otherwise>
					                                               众筹中
					              </c:otherwise>
				               </c:choose> 						    
						   </i></strong>
							<p>YY独家赞助</p>
							<div class="share-box">
								分享：
								<a class="share-weixin" href="javascript:void(0);">
									<div class="codeof2d">
										<!-- 二维码图片 -->
										<img src="http://res0.1931.yystatic.com/dream/images/pk/not-tarted_42e28f5.png"/>
									</div>
								</a>
								<a class="share-weibo" href="javascript:void(0);"></a>
							</div>
						</div>
						
					</div>
					
					<div class="top-video" id="videoBox" _url="${info.agencyProject.attachment}" _tid="65383587" _cid="65383587" _live="false">
						<img src="${info.agencyProject.coverImg}" width="600px"  alt="">
						<!-- 顶部视频播放按钮及参数 -->
						<div id="top-video-play" class="btn-play"></div>
						<div class="video-show-box" id="videoShowBox"></div>
					</div>
					<div class="data-box">
						<div class="con">
						    <div class="data-info">
						        <span>已筹金额</span>
						        <p><span>${info.gotMoney}</span>元</p>
						    </div>
						</div>
						<div class="con">
							<div class="data-info">
								<span>支持者</span>
								<p><span>${info.supportNum}</span>人</p>
							</div>
						</div>
						<div class="con">
						    <div class="data-info">
						    	<span>剩余天数</span>
						        <p><span>${info.leftDays}</span></p>
						        <span>此项目将在 ${info.agencyProject.endTimeStr} 结束</span>
						    </div>
						</div>
					</div>
					<a href="javascript:void(0);" id="supportHim" class="support-btn">支持他</a>
				</div>
			</section>
			<section class="sale-main">
				<div class="left-main">
					<div class="nav-box">
						<div class="nav-bar">
							<a href="javascript:void(0);" id="projectIndexTabBnt" class="on">项目主页<i></i></a>
							<a href="javascript:void(0);" id="supportTabBnt">支持者 (<span>${info.supportNum}</span>)<i></i></a>
						</div>
						<!-- 项目主页 -->
						<div class="nav-body" id="projectIndexTab">
						    <div class="title">项目动态</div>
							<div class="mission">
								<ul id="agencyReportUl">
								<!-- 默认先放五条，超过五条的就出现更多 -->
								<c:forEach items="${info.agencyReports}" var="item" begin="0" varStatus="status">
								   <li id="agencyReportLi${status.index}" <c:if test="${status.index > 4}">style="display:none"</c:if> >
							    		<div class="line"><i></i></div>
							    		<div class="bottom-mis">
							    			<p class="time">${item.timeStr}</p>
							    			<p>${item.content}</p>
							    		</div>
							    	</li>
								</c:forEach>							    					    
							    </ul>							   
							    <c:if test="${info.agencyReports != null and fn:length(info.agencyReports) > 5}">
							         <!-- 收起来 -->
							        <a href="javascript:void(0);" class="more-btn" id="removeMore" style="display:none">收起更多<i class=""></i></a>
							        <!-- 暂开 -->
							        <a href="javascript:void(0);" id="moreBnt" class="more-btn">更多动态<i class="on"></i></a>
							    </c:if>							   
						    </div>
						    <div class="article-con">
							<div class="title">项目介绍</div>
								<p>我是风小筝，一个古琴爱好者，师从虞山吴派第二代传人、现年九十二岁的古琴名家胡维礼老先生，现跟随著名的古琴演奏家乔珊老师学琴。</p>
								<p>古琴是我的至爱，每天早晨起来，我做的第一件事情就是抚琴，晚上临睡前的最后一件事情，还是抚琴。古琴能使人平心静气，放松身心，让生活减少烦恼，增添喜悦。有时忙里偷闲，只是拨弄几个悠然的散音，也能让心顿然安静下来。</p>
								<p>三年前，友人借给我一张她收藏的古琴，使我开始真正接触古琴，至今仍深深感恩，如果没有那张借来的古琴，当时我真的很难下决心花费数万元购琴学习，因为对于一名初学者而言，谁都无法确信自己是否可以坚持学好古琴。</p>
								<img src="http://img.dwstatic.com/1931/1501/284496699431/1420541512624.jpg">
							</div>
						</div>

						<!-- 支持者 -->
						<div class="nav-body" id="supportTab" style="display:none">
						    <div class="top-tip">
						    	<span class="name">支持者</span>
						    	<span class="repay">回报</span>
						    	<span class="num">数量</span>
						    	<span class="money">支持金额</span>
						    	<span class="time">支持时间</span>
						    </div>
							<div class="support">
								<ul>
							    	<c:forEach items="${info.agencyOrderWrappers}" var="item" begin="0" varStatus="status">							    	
								    	 <li <c:if test="${status.index % 2 == 1}">class="f5"</c:if>>
								    		<span class="name">${item.nick}</span>
									    	<span class="repay">
									    		${item.benifitDesc}
									    	</span>
									    	<span class="num">${item.agencyOrder.num}</span>
									    	<span class="money">${item.agencyOrder.num*item.agencyOrder.price}元</span>
									    	<span class="time">${item.agencyOrder.timeStr}</span>
								    	</li>
							    	</c:forEach>							    						    	
							    </ul>
						    </div>
						</div>
					</div>
				</div>
				<div class="right-main">
				  <c:forEach items="${info.agencyBenefits}" var="item" begin="0" varStatus="status">	
				     <div class="item-box">
						<div class="item-top">
							<p class="money"><span>${item.price}</span>元</p>
							<a href="http://idol.yy.com/agency/ticket/preorder.action?bid=${item.id}" target="_blank">支持</a>
							<div class="clearfix"></div>
							<p class="info" id="supporter${item.id}">已<span></span>人支持，剩余<span></span>位</p>
						</div>
						<div class="item-bottom">
							<p class="info">${item.content}</p>
							<p class="logistics">配送费用：免运费</p>
							<p class="logistics-time">预计汇报发送时间：项目成功后15天内</p>
						</div>
					</div>
				  </c:forEach>					
				<!-- 	<div class="item-box">
						<div class="item-top">
							<p class="money"><span>10</span>元</p>
							<a href="javascript:void(0);" class="un">支持</a>
							<div class="clearfix"></div>
							<p class="info">已<span>370</span>人支持，剩余<span>30</span>位</p>
						</div>
						<div class="item-bottom">
							<p class="info">您将以抢鲜价得到1931演唱会《逆流而上》门票1张</p>
							<p class="logistics">配送费用：免运费</p>
							<p class="logistics-time">预计汇报发送时间：项目成功后15天内</p>
						</div>
					</div> -->
					<div class="item-box">
						<div class="item-title">风险提示</div>
						<div class="item-bottom">
							<p class="tip">
								项目须规定时间内达成目标才算成功，否则已经支持的订单将取消；<br/>订单取消时已支持的金额系统将会自动退换到您的YY个人账户中；
							</p>
						</div>
					</div>
				</div>
			</section>		
</div>			
<script type="text/javascript" src="http://res0.idol.yystatic.com/agency/js/??jquery/jquery.min.js,jquery/jquery.jplayer.min.js,advance/main.player.js,jquery/jquery.cookie.min.js,advance/index.js"></script>		
<script type="text/javascript">
var post_url = "http://idol.yy.com/agency/" ;
var projectId = "${info.agencyProject.id}" ;
var ticketIndex = new com.yy.ent.TicketIndex() ;
ticketIndex.setContext(ticketIndex) ;
ticketIndex.init() ;
</script>
<<script type="text/html" id="supporterTemplate">
      已<span><@=item.supportNums@></span>人支持，剩余<span><@=item.nums@></span>位
</script>
<%@ include file="/WEB-INF/jsp/commons/footer.jsp" %>