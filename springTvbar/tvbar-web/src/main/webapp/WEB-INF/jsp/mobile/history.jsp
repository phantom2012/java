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
    <link rel="stylesheet" href="http://res.tvbar.yystatic.com/mobile/css/main.css">
    <link rel="stylesheet" href="http://static.tvbar.yy.com/mobile/css/style.css">
    <title>剧吧-历史</title>
<body>
<header id="header">
    <div class="goback-btn" onclick="javascript:history.back(-1);"></div>
    <div class="title">历史记录</div>
</header>
<!-- /header -->
<section id="history">
    <c:if test="${!empty historyGroups}">
        <ul class="history-list">
            <c:forEach var="hisGroupInfo" items="${historyGroups}">
                <li>
                    <a href="http://tvbar.yy.com/tvbar/groupPage.action?groupId=${hisGroupInfo.groupId}&uid=${uid}">${hisGroupInfo.title}</a><span></span>
                </li>
            </c:forEach>
        </ul>
    </c:if>
</section>
</body>

<script type="text/javascript" src="http://res.tvbar.yystatic.com/mobile/js/zepto.min.js"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="http://static.tvbar.yy.com/mobile/js/wxShare.js" type="text/javascript"></script>
</html>