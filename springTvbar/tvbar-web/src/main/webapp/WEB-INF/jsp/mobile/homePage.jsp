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
    <title>首页</title>
    <link rel="stylesheet" href="http://res.tvbar.yystatic.com/mobile/css/main.css">
    <link rel="stylesheet" href="http://res.tvbar.yystatic.com/mobile/css/sy.css">
</head>
<body>
<header id="header">
    <div class="title">剧吧</div>
    <div id="iconDiv">
        <div class="right-icon-user">
            <%--<img src="${icon}" alt="">--%>
        </div>
    </div>
</header>
<!-- /header -->

<div id="historyDiv">
</div>

<section class="carousel-box" id="JcarouselBox">
    <div id="carousel">
        <c:forEach var="recGroupInfo" items="${recommendGroups}">
            <div class="card"><img src="${recGroupInfo.headIconUrl}" alt="" data-name="${recGroupInfo.title}"
                                   data-url="http://tvbar.yy.com/tvbar/groupPage.action?groupId=${recGroupInfo.groupId}">
            </div>
        </c:forEach>
    </div>
    <div class="bg-img" src=""></div>
    <p class="card-name"></p>
    <em class="u-triangle"></em>

    <div class="mask-layer">
        <div class="mask-1"><a href=""></a></div>
        <div class="mask-2"></div>
        <div class="mask-3"></div>
        <div class="mask-4"></div>
        <div class="mask-5"></div>
    </div>
</section>
<div id="JtopicAll">
    <c:forEach var="recGroupInfo" items="${recommendGroups}" varStatus="index">
        <section class="topic-list topicList-${index.count}" data-groupId="${recGroupInfo.groupId}">
            <!-- <p class="topic-count">话题（113）</p> -->
            <c:if test="${!empty recGroupInfo.topics}">
                <c:forEach var="topicInfo" items="${recGroupInfo.topics}">
                    <div class="item" _topicId="${topicInfo.topicId}">
                        <div class="reply-topic"><span class="th">话题：</span>${topicInfo.title}<em class="triangle"></em>
                        </div>
                        <div class="thead">
                            <div class="pic"><img src="${topicInfo.creatorIcon}" alt=""></div>
                            <p>
                                <span class="name">${topicInfo.creatorName}</span>
                                <span class="action">发布了新话题</span>
                            </p>

                            <p class="date">${topicInfo.createTime}</p>
                            <a>
                                <div class="tbody">
                                    <p>${topicInfo.description}</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <!-- 观点 -->
                    <c:choose>
                        <c:when test="${!empty topicInfo.viewPoints}">
                            <c:forEach var="viewPointInfo" items="${topicInfo.viewPoints}">
                                <div class="item" _topicId="${viewPointInfo.topicId}">
                                    <div class="reply-topic"><span class="th">话题：</span>${topicInfo.title}<em
                                            class="triangle"></em></div>
                                    <div class="thead">
                                        <div class="pic"><img src="${viewPointInfo.creatorIcon}" alt=""></div>
                                        <p>
                                            <span class="name">${viewPointInfo.creatorName}</span>
                                            <span class="action">回复了话题</span>
                                        </p>

                                        <p class="date">${viewPointInfo.createTime}</p>

                                        <div class="tbody">
                                            <a>
                                                <p><span class="icon s-viewport">观点</span>${viewPointInfo.description}
                                                </p>
                                            </a>

                                            <div class="pic-list">
                                                <a>
                                                    <c:if test="${!empty viewPointInfo.evidences}">
                                                        <c:forEach var="evidenceInfo"
                                                                   items="${viewPointInfo.evidences}">
                                                            <c:if test="${!empty evidenceInfo.handlePic}">
                                                                <img src="${evidenceInfo.handlePic}" alt=""
                                                            </c:if>
                                                        </c:forEach>
                                                        <%--<span class="tip">共${fn:length(viewPointInfo.evidences)}张图</span>--%>
                                                    </c:if>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="tfoot"><span class="support-num">支持<i>${viewPointInfo.zanCount}</i></span><span
                                                class="tag"></span></div>
                                    </div>
                                </div>
                            </c:forEach>
                        </c:when>
                    </c:choose>
                </c:forEach>
            </c:if>
        </section>
    </c:forEach>
</div>
<a class="btn-more" id="Jbtnmore">查看更多 >></a>

<div class="load"></div>
<%--<c:choose>--%>
<%--<c:when test="${!empty uid}">--%>
<%--<a class="btn-publish" href="http://tvbar.yy.com/postTopicPage.action?uid=${uid}">发布</a>--%>
<%--</c:when>--%>
<%--<c:otherwise>--%>
<%--<a class="btn-publish" href="http://tvbar.yy.com/mobile/html/postTopic.html">发布</a>--%>
<%--</c:otherwise>--%>
<%--</c:choose>--%>
</body>
<script src="http://res.tvbar.yystatic.com/mobile/js/zepto.min.js" type="text/javascript" charset="utf-8"></script>
<script src="http://res.tvbar.yystatic.com/mobile/js/zepto.cookie.min.js" type="text/javascript" charset="utf-8"></script>
<script src="http://res.tvbar.yystatic.com/mobile/js/picCarousel.js" type="text/javascript" charset="utf-8"></script>
<script src="http://res.tvbar.yystatic.com/mobile/js/comment.js" type="text/javascript" charset="utf-8"></script>
<script src="http://res.tvbar.yystatic.com/js/commons/tvbar-util.js" type="text/javascript" charset="utf-8"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="http://static.tvbar.yy.com/mobile/js/wxShare.js" type="text/javascript"></script>
<script src="http://res.tvbar.yystatic.com/js/stat/hiido.js"></script>
<script type="text/javascript">
    //海度统计上报
    var uid = getUrlParam('uid');
    hiidoApi.addUVToHiido('tvbar');
    hiidoApi.reportEvent('tvbar','home',{uid:uid});
</script>
<script>
//    $.fn.cookie('cuid',"1");
//    console.log($.fn.cookie('cuid'))
//    var uid = getUrlParam('uid');

    $(function () {
        if (uid != "") {
            $.ajax({
                        url: "http://tvbar.yy.com/tvbar/homePageAdd.action",
                        data: {uid: uid},
                        dataType: 'json',
                        success: function (json) {
                            var data = json.data;
                            var icon = data.icon;
                            if (icon != "") {
                                $(".right-icon-user").remove();
                                $("#iconDiv").html('<div class="right-pic"><img src="'+icon+ '" alt=""></div>');
                            }
                            var historyGroups = data.historyGroups;
                            if (historyGroups.length > 0) {
                                var _html = '<nav class="navA">';
                                for (var i = 0; i < historyGroups.length; i++) {
                                    _html = _html + '<a href="http://tvbar.yy.com/tvbar/groupPage.action?groupId=' + historyGroups[i].groupId + '&uid=' + uid + '">';
                                    _html = _html + '<span>' + historyGroups[i].title + '</span></a>';
                                }
                                if(historyGroups.length == 3){
                                    _html = _html + '<a href="http://tvbar.yy.com/tvbar/historyGroupPage.action?uid=' + uid + '">';
                                    _html = _html + '<span>历史记录</span></a>';
                                }
                                _html = _html + '</nav>';
                                $('#historyDiv').html(_html)
                            }
                        },
                        error: function () {
                        },
                        type: "get"
                    }
            );
        }

        //设置旋转木马图片大小
        var $windowW = $(window).width(),
                $cardW = Math.round($windowW * 0.385),
                $cardH = Math.round($cardW * 170 / 123);
        //$yR=$cardH*0.17;
        $("#JcarouselBox").height($cardH + 48);
        $("#carousel .card").width($cardW).height($cardH);
        nowUrl = '';
        nowGroupId = '';
        //小组初始
        var pageList = [];
        for (var i = 0, len = $('#JtopicAll .topic-list').length; i < len; i++) {
            pageList[i] = 1;
        }
        //旋转木马
        var $carousel = $("#carousel").picCarousel({
            itemClass: "card",
            farScale: 0.5,
            speed: 500,
            yOrigin: $cardH * 0.5 + 10,
            onLoaded: function () {
                var $nowElement = this.container.eq(this.nowIndex),
                        topicnum = this.nowIndex + 1,
                        self = this,
                        $nowList = $("#JtopicAll .topicList-" + topicnum);
                $("#JcarouselBox .bg-img").css("background-image", "url(" + $nowElement.find('img').attr('src') + ")");
                $("#JcarouselBox .card-name").html($nowElement.find("img").attr("data-name"));
                $("#JtopicAll .topic-list").hide();
                $nowList.show();
                nowUrl = $nowElement.find("img").attr("data-url");
                nowUrl = nowUrl+'&uid='+uid;
                nowGroupId = $nowList.attr("data-groupid");
                //动态加载数据(暂时关闭动态加载)
//				$(window).scroll(function(){
//					scrollHandler("http://tvbar.yy.com/homeMoreTopic.action",$nowList.attr('data-groupId'),pageList[self.nowIndex],$nowList,function(i){
//							pageList[self.nowIndex]=i;
//						});
//				});
            },
            onSlideStart: function ($nowElement, nowIndex) {
                var topicnum = nowIndex + 1,
                        self = this,
                        $nowList = $("#JtopicAll .topicList-" + topicnum);
                //console.log(self.nowIndex,pageList[self.nowIndex]);
                $("#JcarouselBox .bg-img").css({
                    "background-image": "url(" + $nowElement.find('img').attr('src') + ")",
                    "visibility": "hidden"
                });
                setTimeout(function () {
                    $("#JcarouselBox .bg-img").css({
                        "visibility": "visible"
                    });
                    $("#JcarouselBox .card-name").html($nowElement.find("img").attr("data-name"));
                    $("#JtopicAll .topic-list").hide();
                    $nowList.show();
                    nowUrl = $nowElement.find("img").attr("data-url");
                    nowUrl = nowUrl+'&uid='+uid;
                    nowGroupId = $nowList.attr("data-groupid");
                }, 500);
                //暂时关闭动态加载
//				$(window).unbind('scroll');
//				$(window).scroll(function(){
//					scrollHandler("http://tvbar.yy.com/homeMoreTopic.action?",$nowList.attr('data-groupId'),pageList[self.nowIndex],$nowList,function(i){
//							pageList[self.nowIndex]=i;
//						});
//				});
            },
        });
        //遮罩层
        function setMask() {
            var $obj = $('#carousel .card').eq(0),
                    $maskLayer = $('#JcarouselBox .mask-layer'),
                    $mask1 = $maskLayer.find('.mask-1'),
                    $mask2 = $maskLayer.find('.mask-2'),
                    $mask3 = $maskLayer.find('.mask-3'),
                    $mask4 = $maskLayer.find('.mask-4'),
                    $mask5 = $maskLayer.find('.mask-5');

            var boxW = $('#carousel').width(),
                    boxH = $('#carousel').height(),
                    oTopH = $obj.position().top,
                    oBottomH = boxH - $obj.position().top - $obj.height(),
                    oLeftW = $obj.position().left,
                    oRightW = boxW - $obj.position().left - $obj.width(),
                    oLandRH = boxH - oTopH - oBottomH;
            $mask1.width($obj.width()).height($obj.height()).css({
                'top': oTopH + 'px',
                'left': oLeftW + 'px'
            }).find('a').attr('href', nowUrl);
            $mask2.width(boxW).height(oTopH);
            $mask3.width(oLeftW).height(oLandRH).css('top', oTopH + 'px');
            $mask4.width(boxW).height(oBottomH);
            $mask5.width(oRightW).height(oLandRH).css('top', oTopH + 'px');

            $('#JcarouselBox').on("touchmove", function (e) {
                e.preventDefault();
            }).swipeLeft(function () {
                $maskLayer.css('z-index', '700');
                $mask1.css('opacity', '1');
                $carousel.go(+1);
                $('#JcarouselBox').css("pointer-events", "none");
                setTimeout(function () {
                    $maskLayer.css('z-index', '500');
                    $mask1.css('opacity', '0');
                    $('#JcarouselBox').css("pointer-events", "auto");
                    $mask1.find('a').attr('href', nowUrl);
                }, 500)
            }).swipeRight(function () {
                $maskLayer.css('z-index', '700');
                $mask1.css('opacity', '1');
                $carousel.go(-1);
                $('#JcarouselBox').css("pointer-events", "none");
                setTimeout(function () {
                    $maskLayer.css('z-index', '500');
                    $mask1.css('opacity', '0');
                    $('#JcarouselBox').css("pointer-events", "auto");
                    $mask1.find('a').attr('href', nowUrl);
                }, 500)
            })
        }
        setMask();
        //查看更多按钮
        $('#Jbtnmore').on('click', function () {
            location.href = 'http://tvbar.yy.com/groupPage.action?uid=${uid}&groupId=' + nowGroupId;
        })
    })
    $("#JtopicAll").on('click', '.item', function () {
        var $this = $(this);
        $this.addClass('active');
        var topicId = $this.attr("_topicId");
        var url = "http://tvbar.yy.com/tvbar/topicPage.action?uid=" + uid + "&topicId=" + topicId;
        location.href = url;
    })
</script>
</html>