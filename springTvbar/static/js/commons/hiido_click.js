(function(){var a=1.1;var c=window;var d=c._hiidoDebug||false;var b={log:function(){if(d){c.console&&c.console.log(arguments)}}};var f={domain:"ylog.hiido.com",ipPrefix:"183.61.2.",ips:[91,92,94,95,96,97,98],getServerUrl:function(i){i=i||this.domain;var g=location.protocol;var j="j.gif?";return g+"//"+i+"/"+j},randomIp:function(){var g=Math.random();var j=Math.round(g*(this.ips.length-1));var i=this.ips[j];return this.ipPrefix+i},getParam:function(g){var i=g;var j=[];i.time=parseInt(1*new Date()/1000);i.uid=this.getCookie("uid");i.ui=this.getCookie("hiido_ui");i.username=this.getCookie("username");for(h in i){if(i.hasOwnProperty(h)){j.push(encodeURIComponent(h)+"="+(i[h]===undefined||i[h]===null?"":encodeURIComponent(i[h])))}}return j.join("&")},send:function(j,k,l){var m=l||0;var i=new Image();var g=this;i.onerror=function(){if(m<=1){g.send(j,k,++m)}else{if(m==2){g.send(k,k,++m)}}};i.src=j},getCookie:function(i){var g,j=new RegExp("(^| )"+i+"=([^;]*)(;|$)");if(g=document.cookie.match(j)){return unescape(g[2])}else{return null}}};var e={stat:function(j){if(!j){return false}var g=f.getServerUrl();var l=f.getParam(j);var i=g+l;var k=f.getServerUrl(f.randomIp())+l;f.send(i,k)}};if(typeof(module)==="object"){module.exports=e}window.appHiido=e}).apply(this);function hiido_statPP(a,b,c){var d={eventid:10005681,act:"webevent",eventype:1,time:"",uid:0,class1:"ent",class2:"agencyzc",bak1:a,bak2:b,bak3:c};window.appHiido.stat(d)};