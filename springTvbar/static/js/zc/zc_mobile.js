/**
* Created by Administrator on 2015/1/21.
*/
var fansNum;     //粉丝数量
var voteNum;     //投票数量
var ticket;      //udb票据
var fundNum;     //已支持金额
var hadVoteNum = 0;  //已投免费票
var freeTicketNum = 0; //剩余免费票
var projectId;  // 项目编号
var countDownInterval;//倒计时计数器
var goal;         //本轮目标金额
var taskMap = {};    //任务信息缓存
var status = -1;       //项目状态
var round = 1;    //第一轮
var homeUrl = 'http://agency.yy.com/agency/mobile/mobilehome.action';  //主页地址
var ua = navigator.userAgent,isIos = ua.match(/iPhone|iPad|iPod/i) && ua.indexOf('AppleWebKit') > -1;

$(document).ready(function(){
    projectId = $.url.param("projectId");

    $("div.vote-btn").unbind("click").bind("click",function(){
        vote(projectId);
    });

    $("div.bottom-btns a:eq(1)").unbind("click").bind("click",function(){
        goto(homeUrl  + "?projectId=" + projectId);
    });
    $("div.more").unbind("click").bind("click",function(){
        goto(homeUrl  + "?projectId=" + projectId);
    });
    getAllTasks(projectId,$(".time span:eq(0)"));
    getFreeTicket();

});

var goto = function(url)
{
    window.AndroidJSInterfaceV2.invoke('ui','goto','{"url":'+encodeURIComponent(url)+'}','closePageCallBack');
}




/**
* currentFansCnt : 当前总粉丝数
* currentVoteCnt ：当前总的投票数
* freeTicketCnt  ：
* {"data":{"actid":19320001,"currentFansCnt":"10","currentVoteCnt":"20","freeTicketCnt":"50","fund":"30","hasVoteCnt":"40","agency":"1","agencyZcUrl":"test","subSid":69753215,"topSid":69753215},"keyName":"PKInfo","status":4}
* 广播
*/
function refreshAct(json){

    var con = eval("(" + json + ")");
    if(json){
        fansNum = con.data.currentFansCnt;
        voteNum = con.data.currentVoteCnt;
        freeTicketNum = con.data.freeTicketCnt;
        fundNum = con.data.fund;
        //hadVoteNum = con.data.hasVoteCnt;

        if(freeTicketNum && freeTicketNum >=0){
            $("div.vote-btn span:eq(0)").text(freeTicketNum);
        }
        round = computeRound(status);

       //Todo  文案修改
        //$(".num-box.num.num1 span:eq(0)").text(fundNum);
        if(fundNum > 990000){
            $(".num-box.num.num1 span:eq(0)").text("已筹礼物数:超99万");
        }else{
            $(".num-box.num.num1 span:eq(0)").text("已筹礼物数:" + _fundNum);
        }

        if(round == 1 && taskMap[1] != null){
            $(".round").text("第1轮目标：新歌");
            $("div.num.num2 span:eq(0)").text(taskMap[1].goal);
            $("div.line-sub").css("width",getVoteRate(voteNum) + "%");
        }else if(round == 2 && taskMap[2] != null){
            $(".round").text("第2轮目标：新歌");
            $("div.num.num2 span:eq(0)").text(taskMap[2].goal);
            $("div.line-sub").css("width",getVoteRate(voteNum) + "%");
        }

        if(status != info.data.status){
            status = info.data.status;
            if(round == 1 || round == 2){
                initCountDownTime(null,$("div.time span:eq(0)"));
            }
        }
    }
}


//登录状态查询,needlogin是说是否需要登录
var ua = navigator.userAgent,isIos = ua.match(/iPhone|iPad|iPod/i) && ua.indexOf('AppleWebKit') > -1;
function checkTicketStatus(callback, needlogin) {
    if (isIos) {
        var ticket = window.YYApiCore.invokeClientMethod('data', 'webTicket');
        if (ticket && ticket.length > 0) {
            //登录用户
            callback();
        } else {
            //匿名用户
            if (needlogin) {
                window.YYApiCore.invokeClientMethod('ui', 'goto', {'uri': 'yymobile://Login/Login'});
            }
        }
    } else {
        YYMobile.checkLoginStatusWithCallback(function () {
                YYMobile.requestUserWebToken(function (ticket) {
                    if (ticket && ticket.length > 0) {
                        //登录用户
                        callback();
                    } else {
                        //匿名用户
                        if (needlogin) {
                            YYMobile.gotoLogin();
                        }
                    }
                });
            },
            function () {
                //获取用户登录信息失败
                if (needlogin) {
                    YYMobile.gotoLogin();
                }
            });
    }
}

requirejs(['1931edition2/common'],function(common) {
    common.onUdbAuthReady(function () {
    });
})

/**
* 添加票接口
* @param projectId
* @param uid
*/
function addTicket(){
    $.ajax({
        url: '/agency/broadCastAddTicket.action',
        type: 'get',
        data: {projectId: projectId},
        dataType: 'json',
        success: function (json) {
            freeTicketNum += 1;
            $("a.support-btn i:eq(0)").text(freeTicketNum);
        },
        exception: function (data) {

        }
    });
}

/**
* 透传
*/
function resultToWeb(json){

}



/**
* 投票接口
* @param projectId
* @param uid
*/
function vote(projectId){
    if(freeTicketNum <= 0){
        return;
    }
    $.ajax({
        url: '/agency/vote.action',
        type: 'get',
        data: {projectId: projectId},
        dataType: 'json',
        success: function (json) {
            hadVoteNum += 1;
            freeTicketNum -= 1;
            $("a.support-btn i:eq(0)").text(freeTicketNum);
        },
        exception: function (data) {
            alert("投票异常:,msg:" + data.msg);
        }
    });
}


/**
* 查询所有任务
* @param projectId
* @param uid
*/
function getAllTasks(projectId,renderElem){
    $.ajax({
        url: '/agency/getAllTasks.action',
        type: 'get',
        data: {projectId: projectId},
        dataType: 'json',
        success: function (json,st,xhr) {
            status = json.data.status;
            round = computeRound(status);
            var taskList = json.data.taskList;
            $.each(taskList, function (i, item) {
                var actId = item.actId;
                taskMap[actId] = item;
            });

            //TODO 文案修改
            if(round == 1){
                $(".round").text("第1轮目标：新歌");
                $("div.num.num2 span:eq(0)").text(taskMap[1].targetIncome);
                $("div.line-sub").css("width",getVoteRate(voteNum) + "%");
            }else{
                $(".round").text("第2轮目标：新歌");
                $("div.num.num2 span:eq(0)").text(taskMap[2].targetIncome);
                $("div.line-sub").css("width",getVoteRate(voteNum) + "%");
            }
            if(round == 1 || round == 2){
                var serverCurrentTime = getServerNowDate(xhr.getResponseHeader("Date"));
                initCountDownTime(serverCurrentTime,renderElem);
            }

        },
        exception: function (data) {
            alert("查询任务异常:,msg:" + data.msg);
        }
    });
}

function getVoteRate(voteNum){
    var voteGoal = taskMap[1].goal + taskMap[2].goal;
    var rate = (voteNum * 100/voteGoal);
    if(rate > 100){
        rate = 100;
    }
    return rate;
}


/**
* 查询用户剩余免费票
* @param projectId
* @param ticket
* @param uid
*/
function getFreeTicket(){
    $.ajax({
        url: '/agency/getFreeTicket.action',
        type: 'get',
        data: {projectId: projectId},
        dataType: 'json',
        success: function (json,st,xhr) {
            status = json.data.status;
            freeTicketNum = json.data.freeTicketNum;
            $("div.vote-btn span:eq(0)").text(freeTicketNum);
        },
        exception: function (data) {
            alert("查询免费票异常:,msg:" + data.msg);
        }
    });
}

function computeRound(status){
    if(status == 4){
        round = 1;
    }else if(status == 5){
        round = 2;
    }else{
        round = 1;
    }
    return round;
}

function getServerNowDate(serverTime) {
    var currentDate = null;
    try {
        if (!serverTime) {
            currentDate = new Date();
        }
        else {
            currentDate = new Date(formatDate(serverTime, "yyyy/MM/dd hh:mm:ss"));
        }
    }
    catch (error) {
        if (currentDate == null) {
            currentDate = new Date();
        }
        return currentDate;
    }
    return currentDate;
}

/**
* 获得当前轮次倒计时结束时间
*/
function getDownTimeEndDate(){
    var item = null;
    if(round == 1 || round == 2){    // 第一轮或第二轮
        if(round == 1)
            item = taskMap[1];
        else if(round == 2)
            item = taskMap[2];
    }

    if(item != null && item != '')
    //$("div.round-money p:eq(0)").text("已筹:" + new Date(formatDate(item.endTime, "yyyy/MM/dd hh:mm:ss")));
    //$("div.round-money p:eq(0)").text("已筹:" + formatDate(item.endTime, "yyyy-MM-dd hh:mm:ss"));
        if(item.endTime.length > 2){
            return new Date(formatDate(item.endTime.substring(0,item.endTime.length - 2), "yyyy/MM/dd hh:mm:ss"));
        }
        // return new Date(formatDate(item.endTime, "yyyy/MM/dd hh:mm:ss"));
        else
            return null;
}


/**
* @param  nowDate 当前日期
* @param  renderElem 渲染的Jquery元素
*倒计时
*/
function initCountDownTime(nowDate,renderElem){
    if(countDownInterval){
        clearInterval(countDownInterval);
        countDownInterval = null;
    }

    if(!nowDate){
        nowDate = getServerNowDate(null);
    }

    var endDate = getDownTimeEndDate();

    if(endDate == null){
        return endDate;
    }
    var endTime = endDate.getTime();
    if(endTime == null || endTime == ''){
        return false;
    }

    var nowTime = nowDate.getTime();


    var maxSec = Math.ceil((endTime - nowTime)/1000);

    if(maxSec > 6 * 24 * 3600){
        return false;
    }
    if(maxSec< 0){
        maxSec = 0;
    }
    var hourNum = Math.floor(maxSec/(60 * 60));
    var hous_sec =  hourNum*60 * 60;
    var minusNum = Math.floor((maxSec - hous_sec)/60);
    var seconds = maxSec - hous_sec - minusNum*60;

    showCountDownTime(hourNum,minusNum,seconds,renderElem);

    var t = {h:hourNum,m:minusNum,s:seconds};
    countDownInterval = setInterval(function(){
        countDownTime(t);
        showCountDownTime(t.h,t.m,t.s,renderElem);
        if(t.h ==0 && t.m==0 && t.s==0){
            clearInterval(countDownInterval);
            countDownInterval = null;
        }

    },1000);
}

/**
* @param  renderElem 渲染的Jquery元素
*倒计时
*/
function showCountDownTime(hourNum,minusNum,secondNum,renderElem){

    if(hourNum > 24){
        renderElem.text(Math.ceil(hourNum /24) + "天");
    }else{
        renderElem.text(hourNum + ":" + minusNum + ":" + secondNum);
    }

}

function countDownTime(t){
    if(t.s == 0 && (t.h>0 || t.m > 0)){
        t.s = 59;
        if(t.m == 0){
            t.m = 59;
            t.h = t.h -1;
        }else{
            t.m = t.m -1;
        }
    }else if(t.s>0){
        t.s = t.s -1;
    }
}



function transTimeToStrArray(t){
    var ts = [];
    var tStr = String(t);
    if(t>=10){
        ts[0] = tStr.charAt(0);
        ts[1] = tStr.charAt(1);
    }else{
        ts[0] = "0";
        ts[1] = t;
    }
    return ts;
}