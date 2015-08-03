<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE>
<html>
<head>
<script type="text/javascript" src="http://static.tvbar.yy.com/mobile/js/zepto.min.js"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script type="text/javascript" src="http://static.tvbar.yy.com/mobile/js/wxShare.js"></script>
<!-- <script type="text/javascript" src="http://mmyzlinyingjie.oicp.net/tvbar/static/mobile/js/wxShare.js"></script> -->
    <%@ include file="../commons/taglibs.jsp" %>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta content="telephone=no" name="format-detection"/>
    <meta content="email=no" name="format-detection"/>
    <title>话题回复</title>
    <link rel="stylesheet" href="http://static.tvbar.yy.com/mobile/css/main.css">
    <link rel="stylesheet" href="http://static.tvbar.yy.com/mobile/css/post.css">

</head>
<body>

<header id="header">
    <div id="reply-head">
        <a class="cancel-btn"></a>
        <div class="title">话题回复</div>
        <div class="right-btn" id="postTopic">发布</div>
    </div>
    <div id="viewpoint-head" style="display: none">
        <div class="goback-btn" id="goback"></div>
        <div class="title">话题回复</div>
        <div class="right-btn" id="vpSubmit">确定</div>
    </div>
</header>
<!-- /header -->
<section id="replyContent">
    <section id="topic-reply">
        <div class="item-con">
            <c:choose>
                <c:when test="${!empty viewPoint}">
                    <input type="text" class="viewpoint" id="viewpointIpt" value="${viewPoint.description}">
                </c:when>
                <c:otherwise>
                    <input type="text" class="viewpoint" id="viewpointIpt" placeholder="一句话表达你的观点">
                </c:otherwise>
            </c:choose>
        </div>
        <div id="topic-desc-con">
            <div class="item-con upload">
                <textarea class="topic-desc-area" placeholder="输入简短的证据描述" maxlength="256"></textarea>

                <div class="upload-img">
                    <div class="img"></div>
                    <form><input type="file" name="pic" class="upload-btn" accept="image/*"></form>
                    <div class="imgUrl" hidden="true"></div>
                    <div class="url" hidden="true" ></div>
                    <div class="order" hidden="true" >0</div>
                </div>
                <div class="delete-img">删除图片</div>
            </div>
        </div>
        <div class="add-btn" id="add-btn">添加</div>
    </section>
</section>
<section id="viewpointContent" style="display: none;">
    <section id="topic-post">
        <div class="item-con">
            <input type="text" class="viewpoint" id="viewpointIpt2" placeholder="" maxlength="28" autofocus>
        </div>
        <div id="viewpoint-list">
            <p>或赞同现有观点</p>
            <ul id="viewPointUl">
            </ul>
        </div>
    </section>
</section>
<div id="uploadLoading"><span class="loadingicon"></span></div>
</body>

<script type="text/javascript" src="http://static.tvbar.yy.com/mobile/js/main.js"></script>
<script type="text/javascript" src="http://static.tvbar.yy.com/mobile/js/reply.js"></script>
<script src="http://res.tvbar.yystatic.com/js/stat/hiido.js"></script>
<script type="text/javascript">
    //海度统计上报
    var uid = "${uid}"
    hiidoApi.addUVToHiido('tvbar');
    hiidoApi.reportEvent('tvbar','postReply',{uid:uid});
</script>
<script>
    var uid = "${uid}"
    var pointId = "${viewPoint.pointId}"
    var topicId = "${topicId}"
    if(topicId == "")
        topicId="${viewPoint.topicId}"
</script>
</html>
