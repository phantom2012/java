var fansNum;var voteNum;var ticket;var fundNum;var hadVoteNum=0;var freeTicketNum=0;var projectId;var countDownInterval;var taskMap={};var status=-1;var round=1;var anchorUid="";var shareImgUrl="";var isShareImgExist=false;var curLoginUid="";var isInit=true;$(document).ready(function(){projectId=$.url.param("projectId");callClient("setEnterClientTime");$("a.support-btn").unbind("click").bind("click",function(){callClient("vote")});$("div.bottom-btns a:eq(0)").unbind("click").bind("click",function(){callClient("gotoHomeWeb");hiido_statPP(anchorUid,5,"pc")});callClient("getFreeTicket");getAllTasks(projectId,$(".round-time span:eq(0)"));setInterval(function(){try{callClient("addTicket")}catch(a){}},1000*60*5)});function gotoHomeWeb(b){var a="http://idol.yy.com/agency/"+projectId+"#"+b;openClientWindow("openHomeWeb",a)}function callClient(a){window.external.sendCommand("getUDBTicket",a)}function openClientWindow(b,a){if(a){window.external.sendCommand(b,a)}else{window.external.sendCommand(b)}}function setEnterClientTime(a){$.ajax({url:"/agency/setEnterClientTimeCache.action",type:"get",data:{projectId:projectId,udbTicket:a},dataType:"json",success:function(b){},exception:function(b){alert("设置进入客户端时间异常:,msg:"+b.msg)}})}function getShareImgUrl(){if(shareImgUrl){return shareImgUrl}shareImgUrl="http://agency.bs2dl.yy.com/bs2qrCodeImg_"+projectId+"_"+curLoginUid+".png";return shareImgUrl}function initShareImg(){$("#shareUrl").attr("src",getShareImgUrl());$("#shareUrl").error(function(){initQrCode()});$("div.bottom-btns a:eq(0)").unbind("mouseenter").bind("mouseenter",function(){if(shareImgUrl&&isShareImgExist){openClientWindow("openQrCodeWeb",shareImgUrl)}});$("div.bottom-btns a:eq(0)").unbind("mouseleave").bind("mouseleave",function(){if(shareImgUrl&&isShareImgExist){openClientWindow("closeQrCodeWeb")}})}function initQrCode(){if(isShareImgExist){$("#shareUrl").attr("src",getShareImgUrl()+"?_="+new Date().getTime());return}$.ajax({url:"/agency/getQRCodeUrl.action",data:{projectId:projectId,uid:curLoginUid},dataType:"json",success:function(a){if(!a||!a.data){return}shareImgUrl=a.data+"?_="+new Date().getTime();isShareImgExist=true;var b="http://res2.idol.yystatic.com/images/qrcode/"+a.data;$("div.bottom-btns a:eq(0)").unbind("mouseenter").bind("mouseenter",function(){openClientWindow("openQrCodeWeb",b)});$("div.bottom-btns a:eq(0)").unbind("mouseleave").bind("mouseleave",function(){openClientWindow("closeQrCodeWeb")})}})}function addTicket(a){$.ajax({url:"/agency/broadCastAddTicket.action",type:"post",data:{projectId:projectId,udbTicket:a},dataType:"json",success:function(b){freeTicketNum+=1;$("a.support-btn i:eq(0)").text(freeTicketNum)},exception:function(b){}})}function updateData(h,b,i,e,a,d,g,c){fansNum=h;voteNum=b;fundNum=i;round=computeRound(status);if(round==1){$("p.round-title").text("第"+round+"轮:决定是否录制新歌！")}else{if(round==2){$("p.round-title").text("第"+round+"轮:决定是否制作EP！")}}if(e>0){freeTicketNum=parseInt(a);$("a.support-btn i:eq(0)").text(a)}if(i>10000000){$("div.round-money p:eq(0)").text("已筹礼物数:超1千万")}else{$("div.round-money p:eq(0)").text("已筹礼物数:"+i)}$(".count").text("当前票数:"+b);var f=getVoteRate(voteNum);if(round==1&&taskMap[1]!=null){$("div.round-money p:eq(1)").text("目标礼物数:"+taskMap[1].targetIncome);$("div.progress-bar i:eq(0)").css("width",f+"%")}else{if(round==2&&taskMap[2]!=null){$("div.round-money p:eq(1)").text("目标礼物数:"+taskMap[2].targetIncome);$("div.progress-bar i:eq(0)").css("width",f+"%")}}if(isInit){renderRoundNode(f);isInit=false}if(status!=g){status=g;if(status==4||status==5){getSystemDate()}}}function renderRoundNode(a){if(parseInt(a)>=50&&parseInt(a)<100){$("ul.round-list li:eq(1)").removeClass("on").addClass("on")}else{if(parseInt(a)>=100){$("ul.round-list li:eq(1)").removeClass("on").addClass("on");$("ul.round-list li:eq(2)").removeClass("on").addClass("on")}}}function getVoteRate(a){var b=taskMap[2].goal;var c=(a*100/b);if(c>100){c=100}return c}function vote(b){var a=$("a.support-btn i:eq(0)").text();if(a!=""&&parseInt(a)<=0){return}$.ajax({url:"/agency/vote.action",type:"post",data:{projectId:projectId,udbTicket:b},dataType:"json",success:function(d){hadVoteNum+=1;try{freeTicketNum=parseInt(freeTicketNum)-1}catch(f){}if(freeTicketNum>=0){$("a.support-btn i:eq(0)").text(freeTicketNum)}var c=getVoteRate(voteNum);if(round==1&&taskMap[1]!=null){$("div.progress-bar i:eq(0)").css("width",c+"%")}else{if(round==2&&taskMap[2]!=null){$("div.progress-bar i:eq(0)").css("width",c+"%")}}renderRoundNode(c)},exception:function(c){alert(c.msg)}})}function getSystemDate(){var a=null;$.ajax({url:"/agency/getSystemDate.action",type:"get",dataType:"json",success:function(c){var b=new Date(formatDate(c.data,"yyyy/MM/dd hh:mm:ss"));initCountDownTime(b,$(".round-time span:eq(0)"))},exception:function(b){alert(b.msg)}});return null}function getAllTasks(a,b){$.ajax({url:"/agency/getAllTasks.action",type:"get",data:{projectId:a},dataType:"json",success:function(f,d,g){status=f.data.status;anchorUid=f.data.anchorUid;$("a.support-btn i:eq(0)").text(freeTicketNum);round=computeRound(status);var e=f.data.taskList;$.each(e,function(h,j){var k=j.actId;taskMap[k]=j});if(round==1&&taskMap[1]!=null){$("div.round-money p:eq(1)").text("目标礼物数:"+taskMap[1].targetIncome)}else{if(round==2&&taskMap[2]!=null){$("div.round-money p:eq(1)").text("目标礼物数:"+taskMap[2].targetIncome)}}if(status==4||status==5){var c=getServerNowDate(g.getResponseHeader("Date"));initCountDownTime(c,b)}},exception:function(c){alert(c.msg)}})}function getFreeTicket(a){$.ajax({url:"/agency/getFreeTicket.action",type:"get",data:{projectId:projectId,udbTicket:a},dataType:"json",success:function(c,b,d){curLoginUid=c.data.uid;freeTicketNum=parseInt(c.data.freeTicketNum);$("a.support-btn i:eq(0)").text(freeTicketNum)},exception:function(b){alert(b.msg)}})}function computeRound(a){if(a==4){round=1}else{if(a==5){round=2}else{round=0}}return round}function getServerNowDate(c){var a=null;try{if(!c){a=new Date()}else{a=new Date(formatDate(c,"yyyy/MM/dd hh:mm:ss"))}}catch(b){if(a==null){a=new Date()}return a}return a}function getDownTimeEndDate(){var a=null;if(status==4||status==5){if(status==4){a=taskMap[1]}else{if(status==5){a=taskMap[2]}}}if(a!=null&&a!=""){if(a.endTime.length>2){return new Date(formatDate(a.endTime.substring(0,a.endTime.length-2),"yyyy/MM/dd hh:mm:ss"))}else{return null}}}function initCountDownTime(j,g){if(countDownInterval){clearInterval(countDownInterval);countDownInterval=null}if(!j){j=getServerNowDate(null)}var e=getDownTimeEndDate();if(e==null){return e}var f=e.getTime();if(f==null||f==""){return false}var i=j.getTime();var c=Math.ceil((f-i)/1000);if(c>6*24*3600){return false}if(c<0){c=0}var a=Math.floor(c/(60*60));var b=a*60*60;var d=Math.floor((c-b)/60);var h=c-b-d*60;showCountDownTime(a,d,h,g);var k={h:a,m:d,s:h};countDownInterval=setInterval(function(){countDownTime(k);showCountDownTime(k.h,k.m,k.s,g);if(k.h==0&&k.m==0&&k.s==0){clearInterval(countDownInterval);countDownInterval=null}},1000)}function showCountDownTime(a,d,c,b){if(a>23){b.text(Math.ceil(a/24)+"天")}else{b.text(a+":"+d+":"+c)}}function countDownTime(a){if(a.s==0&&(a.h>0||a.m>0)){a.s=59;if(a.m==0){a.m=59;a.h=a.h-1}else{a.m=a.m-1}}else{if(a.s>0){a.s=a.s-1}}}function transTimeToStrArray(a){var b=[];var c=String(a);if(a>=10){b[0]=c.charAt(0);b[1]=c.charAt(1)}else{b[0]="0";b[1]=a}return b};