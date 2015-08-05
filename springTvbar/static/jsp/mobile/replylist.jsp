<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
    <link rel="stylesheet" href="http://res.tvbar.yystatic.com/mobile/css/main.css">
    <link rel="stylesheet" href="http://res.tvbar.yystatic.com/mobile/css/style.css">
    <title>剧吧-帖子详情</title>
<body class="topicPage">
<header id="header">
    <a class="goback-btn" href="javascript:history.back(-1);"></a>
    <div class="title">观点</div>
    <div class="right-icon-user"></div>
</header>
<!-- /header -->
<section id="post-details">
    <div class="prom-ctn">
        <div class="pormer">
            <div class="pic"><img src="${pointPage.creatorIcon}"></div>
            <div class="p-time">
                <h6>${pointPage.creatorName}</h6>

                <p>${pointPage.createTime}</p>
            </div>
        </div>
        <div class="p-info">
            <h3><span class="label-point">观点</span>${pointPage.description}</h3>
            <c:forEach var="evidence" items="${pointPage.evidences}">
                <p>${evidence.description}.......</p>

                <p><img src="${evidence.picture}"/></p>
            </c:forEach>
        </div>
    </div>
    <%--<div class="btoolbar"><a href="http://tvbar.yy.com/replyPage.action?uid=${uid}">添加回复</a></div>--%>
    <!--  -->
</section>
<div class="load"></div>
<div class="laodError" style="text-align:center;font-size:1.2rem;height:25px;line-height:25px;display:none;">
    网络加载失败，请检查网络！
</div>
</body>
<script type="text/javascript" src="http://res.tvbar.yystatic.com/mobile/js/zepto.min.js"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="http://static.tvbar.yy.com/mobile/js/wxShare.js" type="text/javascript"></script>
<script src="http://res.tvbar.yystatic.com/js/stat/hiido.js"></script>
<script type="text/javascript">
    //海度统计上报
    var uid = "${uid}"
    hiidoApi.addUVToHiido('tvbar');
    hiidoApi.reportEvent('tvbar','reply',{uid:uid});
</script>
<script type="text/javascript">
    var moreReply = true;
    var pageUrl = window.location.search;
    var currentPage = 1;
    var isAjaxOver = true;
    function loadReply() {
        if(isAjaxOver){
            isAjaxOver=false;
            $.ajax({
                type: "get",
                url: "http://tvbar.yy.com/moreReplyEvidences.action",
                data: {
                    userId:"${pointPage.userId}",
                    replyId: ${pointPage.replyId},
                    pageIndex: currentPage
                },
                dataType: "json",
                timeout: 10000,
                success: function (json) {
                    $(".load").hide();
                    var data = json.data;
                    var dataLen = data.evidences.length;
                    if (dataLen > 0) {
                        for (var i = 0; i < dataLen; i++) {
                            var _html = '<p>' + data.evidences[i].description + '</p><p><img src="' + data.evidences[i].picture + '"/></p>';
                            $(".p-info").append(_html);
                        }
                    } else {
                        $(window).unbind('scroll');
                    }
                    currentPage = currentPage + 1
                },
                error: function () {
                    $(".load").hide();
                    $(".laodError").show();
                },
                complete: function () {
                    isAjaxOver = true;
                }
            });
        }
    }
    $(window).bind("scroll", function () {
        var top = $(document.body).scrollTop();
        var bh = $(document.body).height();
        var dh = $(document).height();
        var wh = $(window).height();
        var halfWh = wh / 2;
        if (top + wh + 52 > (dh - halfWh) && moreReply) {
            loadReply();
            $(".load").show();
        }
    });
</script>
</html>