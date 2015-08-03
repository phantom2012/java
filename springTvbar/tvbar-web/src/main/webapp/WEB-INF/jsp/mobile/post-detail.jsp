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
<body style="padding-bottom:60px;">
<header id="header">
    <div class="goback-btn" onclick="javascript:history.back(-1);"></div>
    <div class="title">话题</div>
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
<section id="post-details">
    <div class="prom-ctn">
        <div class="pormer">
            <div class="pic"><img src="${topicPage.creatorIcon}"></div>
            <div class="p-time">
                <h6>${topicPage.creatorName}</h6>

                <p>${topicPage.createTime}</p>
            </div>
        </div>
        <div class="p-info">
            <h3>${topicPage.title}</h3>

            <p>${topicPage.description}</p>

            <p><img src="${topicPage.topicPic}"/></p>
            <div>
                <c:if test="${!empty relateGroups}">
                    <c:forEach var="relateGroupInfo" items="${relateGroups}">
                        <a href="http://tvbar.yy.com/tvbar/groupPage.action?groupId=${relateGroupInfo.groupId}&uid=${uid}">${relateGroupInfo.title}</a>
                    </c:forEach>
                </c:if>
            </div>
        </div>
    </div>
    <div class="tab-nav">
        <ul>
            <li class="active" data-id="1"><a href="javascript:void(0)">按票数最多</a></li>
            <li data-id="2"><a href="javascript:void(0)">按发布时间</a></li>
        </ul>
    </div>

    <div id="contenttog">
    <c:if test="${!empty replyPages}">
        <c:forEach var="viewPointInfo" items="${replyPages}">
            <div class="p-content">
                    <%--<c:when test="${viewPointInfo.creatorId == viewPointInfo.userId}">--%>
                <div class="reply-first" _replyId="${viewPointInfo.replyId}">
                    <div class="pormer">
                        <div class="pic"><img src="${viewPointInfo.creatorIcon}"></div>
                        <div class="p-time" _replyId="${viewPointInfo.replyId}">
                            <h6>${viewPointInfo.creatorName}<span>回复了话题</span></h6>

                            <p>${viewPointInfo.createTime}</p>
                        </div>
                        <div class="assent">
                            <a class="btn-ass" href="javascript:void(0)" _uid="${uid}"
                               _replyId="${viewPointInfo.replyId}" _pointId="${viewPointInfo.pointId}">
                                <span class="icon-thu-up"></span><b>${viewPointInfo.zanCount}</b>
                            </a>

                            <a class="btn-opp" href="javascript:void(0)" _uid="${uid}"
                               _replyId="${viewPointInfo.replyId}">
                                <span class="icon-thu-dw"></span><b>${viewPointInfo.opposeCount}</b>
                            </a>
                        </div>
                    </div>
                    <div class="p-point" _replyId="${viewPointInfo.replyId}">
                        <a><span class="label-point">观点</span>${viewPointInfo.description}</a>

                        <div class="p-pics">
                            <c:if test="${!empty viewPointInfo.evidences}">
                                <c:forEach var="evidenceInfo" items="${viewPointInfo.evidences}">
                                    <img src="${evidenceInfo.handlePic}" alt="">
                                </c:forEach>
                            </c:if>
                        </div>
                    </div>
                </div>
                    <%--</c:when>--%>

                <c:forEach var="replyInfo" items="${viewPointInfo.replys}">
                    <c:if test="${viewPointInfo.replyId != replyInfo.replyId}">
                        <div class="reply-fol"  _replyId="${replyInfo.replyId}">
                            <div class="reply-arrow"></div>
                            <!-- 向上箭头 -->
                            <div class="pormer">
                                <div class="pic"><img src="${replyInfo.creatorIcon}"></div>
                                <div class="p-time" _replyId="${replyInfo.replyId}">
                                    <h6>${replyInfo.creatorName}<span>补充了证据</span></h6>

                                    <p>${replyInfo.createTime}</p>
                                </div>
                                <div class="assent">
                                    <a class="btn-ass" href="javascript:void(0)" _uid="${uid}"
                                       _replyId="${replyInfo.replyId}" _pointId="${replyInfo.pointId}">
                                        <span class="icon-thu-up"></span><b>${replyInfo.zanCount}</b>
                                    </a>

                                    <a class="btn-opp" href="javascript:void(0)" _uid="${uid}"
                                       _replyId="${replyInfo.replyId}">
                                        <span class="icon-thu-dw"></span><b>${replyInfo.opposeCount}</b>
                                    </a>
                                </div>
                            </div>
                            <div class="p-point" _replyId="${replyInfo.replyId}">
                                <a>${replyInfo.description}</a>

                                <div class="p-pics">
                                    <c:if test="${!empty replyInfo.evidences}">
                                        <c:forEach var="replyEvidence" items="${replyInfo.evidences}">
                                            <img src="${replyEvidence.handlePic}" alt="">
                                        </c:forEach>
                                    </c:if>
                                </div>
                            </div>
                        </div>
                    </c:if>
                </c:forEach>
                <!-- 回复内容 -->
            </div>
        </c:forEach>
    </c:if>
    </div>
    <div class="btoolbar"><a href="http://tvbar.yy.com/replyPage.action?uid=${uid}&topicId=${topicPage.topicId}">添加回复</a></div>
    <!--  -->
</section>
<div class="load"></div>
<div class="laodError" style="text-align:center;font-size:1.2rem;height:25px;line-height:25px;display:none;">
    网络加载失败，请检查网络！
</div>
<!-- 弹出框 -->
<div class="pop" style="display:none;">
    <div class="content"></div>
    <div class="mask"></div>
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
    hiidoApi.reportEvent('tvbar','topic',{uid:uid});
</script>
<script type="text/javascript">
    var moreReply = true;
    var currentPage = 1;
    var isAjaxOver = true;
    var _html,_url,currTab;
    var rankType=0;

    $(function(){
        currTab = $(".tab-nav").find("li.active").attr("data-id");
        $(".tab-nav li").click(function(){
            currTab = $(this).attr("data-id");
            $(this).siblings().removeClass("active");
            $(this).addClass("active");

            if(currTab == 1){
                rankType = 0;
            }else if(currTab == 2){
                rankType = 1;
            }
            currentPage = 0;
            $(window).bind("scroll",bindScroll);
            $("#contenttog").empty();
            $(".load").show();
            loadReply();
        })
    });

    function loadReply() {
        if (isAjaxOver) {
            isAjaxOver = false;
            $.ajax({
                type: "get",
                url: "http://tvbar.yy.com/topicPageMoreReply.action",
                data: {
                    topicId:${topicPage.topicId},
                    pageIndex: currentPage,
                    rankType: rankType
                },
                dataType: "json",
                timeout: 10000,
                success: function (json) {
                    $(".load").hide();
                    var data = json.data;
                    if (data.replyPages.length > 0) {
                        var dataLen = data.replyPages.length;
                        var iconView = '';
                        var replyClass = '';
                        var replyTxt = "";
                        var replyWrap = '';
                        for (var i = 0; i < dataLen; i++) {
                            var replyPage = data.replyPages[i];
                            var replyAction = "http://tvbar.yy.com/replyListPage.action?userId=" + replyPage.userId + "&pointId=" + replyPage.pointId + "&uid=${uid}";
                            var zanOrOppParam = " _uid=${uid}" + " _replyId=" + replyPage.replyId + " _pointId=" + replyPage.pointId;
                            replyWrap = '<div class="p-content">'
                            replyClass = 'reply-first" _replyId="'+replyPage.replyId ;
                            iconView = '<a><span class="label-point">观点</span>' + replyPage.description + '</a>';
                            replyTxt = "回复了话题";
                            var _html = replyWrap + '<div class="' + replyClass + '"><div class="pormer"><div class="pic"><img src="' +
                                    replyPage.creatorIcon + '"></div><div class="p-time" _replyId="'+replyPage.replyId+'"><h6>' + replyPage.creatorName + '<span>' + replyTxt + '</span></h6><p> ' + replyPage.createTime +
                                    '</a></div><div class="assent"><a class="btn-ass" href="javascript:void(0)"' + zanOrOppParam + '><span class="icon-thu-up"></span><b>' + replyPage.zanCount +
                                    '</b></p><a class="btn-opp" href="javascript:void(0)"' + zanOrOppParam + '><span class="icon-thu-dw"></span><b>' + replyPage.opposeCount + '</b></a></div></div><div class="p-point" _replyId="'+replyPage.replyId+'">' +
                                    iconView + '<div class="p-pics"><div>';
                            for (var e1 = 0; e1 < replyPage.evidences.length; e1++) {
                                _html += '<img src =" ' + replyPage.evidences[e1].handlePic + '" />';
                            }
                            //补全div
                            _html += "</div></div></div>"

                            for (var j = 0; j < replyPage.replys.length; j++) {
                                var reply = replyPage.replys[j];
                                if (reply.replyId != replyPage.replyId) {
                                    var replyAction = "http://tvbar.yy.com/replyListPage.action?userId=" + reply.userId + "&pointId=" + reply.pointId + "&uid=${uid}";
                                    var zanOrOppParam = " _uid=${uid}" + " _replyId=" + reply.replyId + " _pointId=" + reply.pointId;
                                    replyWrap = '';
                                    replyClass = 'reply-fol" _replyId="'+reply.replyId;
                                    iconView = '<a>' + reply.description + '</a>';
                                    replyTxt = "补充证据";
                                    _html = _html + replyWrap + '<div class="' + replyClass + '"><div class="reply-arrow"></div><div class="pormer"><div class="pic"><img src="' +
                                            reply.creatorIcon + '"></div><div class="p-time" _replyId="'+reply.replyId+'"><h6>' + reply.creatorName + '<span>' + replyTxt + '</span></h6><p> ' + reply.createTime +
                                            '</a></div><div class="assent"><a class="btn-ass" href="javascript:void(0)"' + zanOrOppParam + '><span class="icon-thu-up"></span><b>' + replyPage.zanCount +
                                            '</b></p><a class="btn-opp" href="javascript:void(0)"' + zanOrOppParam + '><span class="icon-thu-dw"></span><b>' + reply.opposeCount + '</b></a></div></div><div class="p-point" _replyId="'+reply.replyId+'">' +
                                            iconView + '<div class="p-pics"><div>';
                                    for (var e2 = 0; e2 < reply.evidences.length; e2++) {
                                        _html += '<img src =" ' + reply.evidences[e2].handlePic + '" />';
                                    }
                                    //补全div
                                    _html += "</div></div></div></div>"
                                }
                            }
                            _html += "</div>"
                            $("#contenttog").append(_html);
                            //                        if (reply.creatorId == reply.userId) {
                            //                            _html += "</div>"
                            //                            $("#post-details").append(_html);
                            //                        } else {
                            //                            _html += "</div></div>"
                            //                            $(".p-content").last().append(_html);
                            //                        }
                        }
                        currentPage = currentPage + 1;
                    } else {
                        $(window).unbind('scroll');
                    }
                },
                error: function () {
                    // $(".load").show().addClass("loadTxt").html("请求失败，请检查网络");
                    $(".load").hide();
                    $(".laodError").show();
                }
                ,
                complete: function () {
                    isAjaxOver = true;
                }
            });
        }
    }

    //滚动加载
    function bindScroll(){
        var top = $(document.body).scrollTop();
        var bh = $(document.body).height();
        var dh = $(document).height();
        var wh = $(window).height();
        var halfWh = wh / 2;
        if (top + wh + 52 > (dh - halfWh) && moreReply) {
            loadReply();
            $(".load").show();
        }
    }
    $(window).bind("scroll",bindScroll);

    $(".btn-ass").live('tap', function (e) {
        var $this = $(this);
        var uid = $this.attr("_uid");
        var pointId = $this.attr("_pointId");
        var replyId = $this.attr("_replyId");
        var url = "http://tvbar.yy.com/zanReply.action";
        $.ajax({
                    url: url,
                    data: {uid: uid, replyId: replyId},
                    dataType : 'json',
                    success: function (json) {
                        var data = json.data;
                        if(data.result == 1){
                            if(data.enable == 1){
                                $('b',$this).html(data.zanCount);
                                $(".content").html('<span class="pop-close"></span><h6>赞同<span class="addAssen">+1</span></h6><p>亮出你的观点，获取剧迷的认同</p><a href="http://tvbar.yy.com/replyPage.action?uid=${uid}&replyId=' + replyId + '&pointId='+pointId+'">添加证据</a>');
                                $(".pop").show();
                            }else{
                                $('b',$this).html(data.zanCount);
                                alert("取消赞");
                            }

                        }else
                            alert("不能点赞，登录后才能完成操作，长按二维码关注公众账号后即可登录。");
                    },
                    error: function () {

                    },
                    type: "POST"
                }
        );
    })
    $(".btn-opp").live('tap', function (e) {
        var $this = $(this);
        var uid = $this.attr("_uid");
        var replyId = $this.attr("_replyId");
        var url = "http://tvbar.yy.com/opposeReply.action";
        $.ajax({
                    url: url,
                    data: {uid: uid, replyId: replyId},
                    dataType : 'json',
                    success: function (json) {
                        var data = json.data;
                        if(data.result == 1){
                            if (data.enable == 1) {
                                $('b',$this).html(data.caiCount);
                                $(".content").html('<span class="pop-close"></span><h6>反对<span class="addOpp">+1</span></h6><p>亮出你的观点，获取剧迷的认同</p><a href="http://tvbar.yy.com/replyPage.action?uid=${uid}">添加回复</a>');
                                $(".pop").show();
                            } else {
                                $('b',$this).html(data.caiCount);
                                alert("取消踩")
                            }
                        }else
                            alert("不能点踩，登录后才能完成操作，长按二维码关注公众账号后即可登录。")
                    },
                    error: function () {
                    },
                    type: "POST"
                }
        );
    })
    $("#post-details").on('click','.p-content .p-time', function (e) {
        var $this = $(this);
        $this.addClass('active');
        var uid = "${uid}"
        var replyId = $this.attr("_replyId");
        var url = "http://tvbar.yy.com/replyListPage.action?uid="+uid+"&replyId="+replyId;
        location.href = url ;
    })
    $("#post-details").on('click','.p-content .p-point', function (e) {
        var $this = $(this);
        $this.addClass('active');
        var uid = "${uid}"
        var replyId = $this.attr("_replyId");
        var url = "http://tvbar.yy.com/replyListPage.action?uid="+uid+"&replyId="+replyId;
        location.href = url ;
    })
    $(".content").on('click', '.pop-close',function () {
        $(".content").empty();
        $(".pop").hide();
    })
</script>
</html>