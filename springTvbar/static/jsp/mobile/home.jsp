<!doctype html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta content="telephone=no" name="format-detection"/>
    <meta content="email=no" name="format-detection"/>
    <%--<link rel="icon" href="http://res0.idol.yystatic.com/images/favicon.ico" type="image/x-icon" />--%>
    <link rel="stylesheet" href="http://res2.idol.yystatic.com/mobile/css/index.css?v=1.1"/>
    <title>偶像众筹</title>
<body>
<div class="index-con" id="contentTag">
    <header>
        <div class="video-box"
             style="background-image: url(${background});">
            <div class="play-btn" data-href="${videoUrl}" videoId="${videoId}"><i></i></div>
        </div>
        <a href="#" class="share-btn"></a>
    </header>
    <section class="dingyue-con">
        <p class="tip1">${title}</p>

        <p class="tip2">${describe}</p>

        <p class="tip3">本轮直播已筹礼物数：<span id="curGiftNum"></span> / <span
                id="targetGiftNum">${targetGiftNum}</span>万</p>
        <a href="#" class="dingyue-btn">
            <p class="status">订阅直播</p>

            <p class="info">已有 <span id="fansCount"></span>人订阅</p>
        </a>
        <a href="javascript:void(0);" class="live-btn" style="display: none"></a>
    </section>
    <section class="round-con">
        <div class="rule-view">
            <a id="rule_btn" class="rule-btn" href="javascript:void(0);">&nbsp;</a>

            <div id="rule_content" class="rule-content" style="display: none">
                <a id="rule_colse" href="javascript:void(0);" class="rule-colse"></a>

                <div>
                    <dl>
                        <dt>任务说明</dt>
                        <dd>1.初级目标是：新歌单曲，任务是：投票数累计${nowTargetVotes}万+“支持你”礼物数累计${targetGiftNum}万。</dd>
                        <dd>2.终极目标是：EP制作，任务是：投票数累计${finalTargetVotes}万+“支持你”礼物数累计100万。</dd>
                    </dl>
                </div>

                <div>
                    <dl>
                        <dt>投票说明</dt>
                        <dd>1.每天登录该艺人活动主页可获得1张免费票。</dd>
                        <dd>
                            2.第一次分享该艺人活动即可获得1张免费票，若有用户通过你分享的链接进入活动主页并为艺人投票，那你还可以获得更多免费票，上限是50票。（友情提醒，先登录再分享才可以获得更多免费票哦~）
                        </dd>
                        <dd>3.每连续观看艺人直播5分钟可获得1张免费票，每天的上限是10票。</dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="votecount">当前获得票数：<span id="anchorTotalTickets"></span></div>

        <div class="progress-bar">
            <i id="progress-bar-show" style="width:0%"></i>
        </div>
        <ul class="round-list">
            <li class="on">
                <i></i>

                <p class="time">&nbsp;</p>

                <p class="title">众筹开启</p>

                <p class="info"></p>
            </li>
            <li class="part-2">
                <i></i>

                <p class="time" id="part-2-time">还剩3天</p>

                <p class="title">本轮目标：${nowTargetVotes}万票</p>

                <p class="info">获得新歌单曲资格</p>
            </li>
            <li class="part-3">
                <i></i>

                <p class="time" id="part-3-time">还剩3天</p>

                <p class="title">终极目标：${finalTargetVotes}万票</p>

                <p class="info">获得EP制作资格</p>
            </li>
        </ul>
    </section>

    <jsp:include page="../articles/mobile/article_${anchorUid}.jsp"/>
    <%--<section class="info-con">--%>
    <%--<p class="title">关于我：一个琴痴的古琴梦</p>--%>

    <%--<p>我是风小筝，一个古琴爱好者，师从虞山吴派第二代传人、现年九十二岁的古琴名家胡维礼老先生，现跟随著名的古琴演奏家乔珊老师学琴。</p>--%>

    <%--<p>古琴是我的至爱，每天早晨起来，我做的第一件事情就是抚琴，晚上临睡前的最后一件事情，还是抚琴。古琴能使人平心静气，放松身心，让生活减少烦恼，增添喜</p>--%>
    <%--<img src="http://res0.idol.yystatic.com/mobile/images/info-1.jpg" width="100%">--%>

    <%--<p>三年前友人借我一张古琴，使我与古琴结下不解之缘。--%>
    <%--现在古琴文化越来越热，古琴的价格也越炒越高，动辄几万、十几万，让很多对古琴有兴趣的朋友望而却步。作为一名古琴文化的受益者，我很想让更多人弹得起琴，感受古琴的乐趣。为此，我通过师父的引荐，今年夏天赴扬州、苏州、常州等地拜访了十来位斫琴师。在听了我的梦想之后，老师们都很支持，他们允诺以成本价提供一些传统工艺精制的古琴给我，于是就有了这个【古琴漂流计划】。我的梦想就是：人人有琴弹，人人都能享受古琴之乐！</p>--%>

    <%--<p class="title">关于我：一个琴痴的古琴梦-2</p>--%>

    <%--<p>我是风小筝，一个古琴爱好者，师从虞山吴派第二代传人、现年九十二岁的古琴名家胡维礼老先生，现跟随著名的古琴演奏家乔珊老师学琴。</p>--%>

    <%--<p>古琴是我的至爱，每天早晨起来，我做的第一件事情就是抚琴，晚上临睡前的最后一件事情，还是抚琴。古琴能使人平心静气，放松身心，让生活减少烦恼，增添喜悦。有时忙里偷闲，只是拨弄几个悠然的散音，也能让心顿然安静下来。</p>--%>
    <%--</section>--%>
    <section class="video-con">
        <div class="title">TA的视频</div>
        <ul id="video_list">
            <li>
                <div class="video-box"
                     style="background-image: url(${background});">
                    <div class="play-btn" data-href="${videoUrl}" videoId="${videoId}">
                        <i></i></div>
                </div>
                <p>播放次数：<span>${videoClicks}</span></p>
            </li>
        </ul>
        <a href="javascript:void(0);" class="more-btn" id="show_all_video"><p id="switch_video_text">更多视频</p><i></i></a>
    </section>
    <section class="fensi-con">
        <p class="title">今日粉丝之星<span> 参与粉丝:<span id="voteFansCount"></span></span></p>
        <ul>
            <li>
                <div>
                    <img src="http://live1.yystatic.com/live/images/index/285x215.gif">
                    <span>今日粉丝之星</span>
                </div>
            </li>
            <li>
                <div>
                    <img src="http://live1.yystatic.com/live/images/index/285x215.gif">
                    <span>今日粉丝之星</span>
                </div>
            </li>
            <li>
                <div>
                    <img src="http://live1.yystatic.com/live/images/index/285x215.gif">
                    <span>今日粉丝之星</span>
                </div>
            </li>
        </ul>
        <div class="bottom">
            <a id="voteBtnId" href="#">为<span>TA</span>投票</a>
            <span id="tickets"><em>1</em></span>
            <i class="song-play"></i>
            <audio src="${songurl}" id="audio" preload="auto"></audio>
        </div>
    </section>
    <section class="weibo-con">
        <%--<wb:follow-button uid="2991975565" type="red_1" width="67" height="24"></wb:follow-button>--%>
        <div id="weiboIframe"></div>
        <%--<iframe width="100%" height="670" src="http://v.t.sina.com.cn/widget/widget_topic_width.php?tags=%E6%98%A5%E8%BF%90&height=670&width=900" frameBorder="0"/>--%>

    </section>
</div>

<%--<script type="text/javascript"--%>
<%--src="http://res0.1931.yystatic.com/dream/mobile/js/??lib/zepto/1.1.3/yymzepto.min.js,lib/handlebars/1.3.0/yym-handlebars.runtime.min.js,1931edition2/yym-requirejs.js,1931edition2/playvideo.js,1931edition2/common.js?nocdn=true&v8"></script>--%>
<script type="text/javascript" src="http://res0.idol.yystatic.com/mobile/js/common.js?v2.0"></script>
<script type="text/javascript"
        src="http://res0.idol.yystatic.com/js/??commons/common-util.js,commons/date-util.js,commons/hiido_click.js"></script>
<%--<script type="text/javascript"--%>
<%--src="http://res.1931.yystatic.com/dream/js/??jquery/jquery.min.js,commons/common-util.js,commons/date-util.js,stat/hiido.js,mobile/YYMobileBridge.js,mobile/WAJavascriptBridge.js,mobile/yymobile_api_v1.2.12.js"></script>--%>
<script type="text/javascript" src="http://res0.idol.yystatic.com/js/jquery/jquery.url.min.js"></script>
<%--<script data-main="scripts/main" src="http://res2.idol.yystatic.com/mobile/js/require.js"></script>--%>
<script type="text/javascript">
    var isLiving =  "0";  // 默认是不开播，之后初始化
    var anchorUid = "${anchorUid}";
    var anchorNick = "${anchorNick}";
    var totalVotes =  "0";  // 默认是不开播，之后初始化
    var nowTargetVotes = "${nowTargetVotes}";
    var finalTargetVotes = "${finalTargetVotes}";
    var projectStatus = "${projectStatus}";
    var task1LeftTime = "${task1LeftTime}";
    var task2LeftTime = "${task2LeftTime}";
    var weiboUid = "${weiboUid}";
    var verifier = "${verifier}";
    var chId = "${chId}";
    var subChid = "${subChid}";
    var shareTitle = "${title}";
    var shareContent = "${describe}";
    var shareImageurl = "${background}";
    var projectId = "${projectId}";

</script>
<script type="text/javascript" src="http://res2.idol.yystatic.com/js/agency/countdownUI.js?1.0"></script>
<script type="text/javascript" src="http://res0.idol.yystatic.com/mobile/js/video.js?v1.57"></script>
<script type="text/javascript" src="http://res2.idol.yystatic.com/mobile/js/home.js?v2.94"></script>
</body>
</html>