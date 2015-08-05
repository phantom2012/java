<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="../commons/taglibs.jsp" %>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta content="telephone=no" name="format-detection"/>
    <meta content="email=no" name="format-detection"/>
    <title>电视剧</title>
    <link rel="stylesheet" href="http://res.tvbar.yystatic.com/mobile/css/main.css">
    <link rel="stylesheet" href="http://res.tvbar.yystatic.com/mobile/css/sy.css">
</head>
<body>
<header id="header">
    <a class="goback-btn" href="javascript:history.back(-1);"></a>
    <div class="title">${group.title}</div>
    <c:choose>
        <c:when test="${!empty icon}">
            <div class="right-pic"><img src="${icon}" alt="">
            </div>
        </c:when>
        <c:otherwise>
            <div class="right-icon-user">
            </div>
        </c:otherwise>
    </c:choose>
</header>
<!-- /header -->
<section class="desc-box drama-desc">
    <div class="pic"><img src="${group.headIconUrl}" alt=""></div>
    <div class="summary">
        <p class="th">${group.title}</p>

        <p class="tb" id="Jsummary">${group.description}</p>
        <a href="javascript:" class="btn-showall" id="JshowAll">展开</a>
    </div>
</section>
<nav class="navB">
    <c:if test="${!empty relateGroups}">
        <c:forEach var="relateGroupInfo" items="${relateGroups}">
            <a href="">${relateGroupInfo.title}</a>
        </c:forEach>
    </c:if>
</nav>
<section class="topic-list">
    <!-- <p class="topic-count">话题（113）</p> -->
    <c:if test="${!empty group.topics}">
        <c:forEach var="topicInfo" items="${group.topics}">
            <div class="item" _uid="${uid}" _topicId="${topicInfo.topicId}">
                <div class="reply-topic"><span class="th">话题：</span>${topicInfo.title}<em class="triangle"></em></div>
                <div class="thead">
                    <div class="pic"><img src="${topicInfo.creatorIcon}" alt=""></div>
                    <p>
                        <span class="name">${topicInfo.creatorName}</span>
                        <span class="action">发布了新话题</span>
                    </p>
                </div>
                <p class="date">${topicInfo.createTime}</p>
                <a href="http://tvbar.yy.com/tvbar/topicPage.action?topicId=${topicInfo.topicId}&uid=${uid}">
                    <div class="tbody">
                        <p>${topicInfo.description}</p>
                    </div>
                </a>
            </div>
            <!-- 观点 -->
            <c:choose>
                <c:when test="${!empty topicInfo.viewPoints}">
                    <c:forEach var="viewPointInfo" items="${topicInfo.viewPoints}">
                        <div class="item" onclick="location.href='javascript:void(0)'" _uid="${uid}" _topicId="${topicInfo.topicId}">
                            <div class="reply-topic"><span class="th">话题：</span>${topicInfo.title}<em
                                    class="triangle"></em></div>
                            <div class="thead">
                                <div class="pic"><img src="${viewPointInfo.creatorIcon}" alt=""></div>
                                <p>
                                    <span class="name">${viewPointInfo.creatorName}</span>
                                    <span class="action">回复了话题</span>
                                </p>

                                <p class="date">${viewPointInfo.createTime}</p>
                            </div>
                            <div class="tbody">
                                <a href="http://tvbar.yy.com/tvbar/topicPage.action?topicId=${topicInfo.topicId}&uid=${uid}">
                                    <p><span class="icon s-viewport">观点</span>${viewPointInfo.description}</p>
                                </a>

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
                            <div class="tfoot"><span
                                    class="support-num">支持<i>${viewPointInfo.zanCount}</i></span><span
                                    class="tag"></span>
                            </div>

                        </div>
                    </c:forEach>
                </c:when>
            </c:choose>
        </c:forEach>
    </c:if>
</section>
<div class="load"></div>
<a class="btn-publish" href="http://tvbar.yy.com/postTopicPage.action?uid=${uid}&groupId=${group.groupId}">发布</a>
</body>
<script src="http://res.tvbar.yystatic.com/mobile/js/zepto.min.js" type="text/javascript" charset="utf-8"></script>
<script src="http://res.tvbar.yystatic.com/mobile/js/comment.js" type="text/javascript" charset="utf-8"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="http://static.tvbar.yy.com/mobile/js/wxShare.js" type="text/javascript"></script>
<script src="http://res.tvbar.yystatic.com/js/stat/hiido.js"></script>
<script type="text/javascript">
    //海度统计上报
    var uid = "${uid}"
    hiidoApi.addUVToHiido('tvbar');
    hiidoApi.reportEvent('tvbar','group',{uid:uid});
</script>
<script>
    $(function () {
        //展开按钮绑定事件
        $("#JshowAll").on("click", function () {
            var $desc = $("#Jsummary");
            if ($desc.css("overflow") == "hidden" || $desc.css("display") == "-webkit-box") {
                $desc.css({
                    "overflow": "visible",
                    "display": "block"
                });
                $(this).html("收起");
            } else {
                $desc.css({
                    "overflow": "hidden",
                    "display": "-webkit-box"
                });
                $(this).html("展开");
            }
        })
        //滚动加载
        var nowPage = 1;
        $(window).scroll(function () {
            scrollHandler("http://tvbar.yy.com/homeMoreTopic.action", "${group.groupId}", nowPage, $('.topic-list'), function (i) {
                nowPage = i;
            });
        });
    })
    $(".topic-list").on('click','.item',function () {
        var $this = $(this);
        $this.addClass('active');
        var uid = $this.attr("_uid");
        var topicId = $this.attr("_topicId");
        var url = "http://tvbar.yy.com/tvbar/topicPage.action?uid="+uid+"&topicId="+topicId;
        location.href = url ;
    })
    var userId="${uid}"
</script>
</html>