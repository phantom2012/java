(function(b,c){var e={version:2,domain:"ylog.hiido.com",ipPrefix:"183.61.2.",ips:[91,92,94,95,96,97,98],getServerUrl:function(g){g=g||this.domain;var f="http:";var h="j.gif?";return f+"//"+g+"/"+h},randomIp:function(){var f=Math.random();var h=Math.round(f*(this.ips.length-1));var g=this.ips[h];return this.ipPrefix+g},getParam:function(f){var i=f;var j=[];i.time=parseInt(1*new Date()/1000);i.ui=this.getCookie("hiido_ui");i.username=this.getCookie("username");for(var g in i){if(i.hasOwnProperty(g)){j.push(encodeURIComponent(g)+"="+(i[g]===c||i[g]===null?"":encodeURIComponent(i[g])))}}return j.join("&")},send:function(h,i,j){var k=j||0;var g=new Image();var f=this;g.onerror=function(){if(k<=1){f.send(h,i,++k)}else{if(k==2){f.send(i,i,++k)}}};g.src=h},getCookie:function(g){var f,h=new RegExp("(^| )"+g+"=([^;]*)(;|$)");if(f=document.cookie.match(h)){return unescape(f[2])}else{return null}},loadHiidoJS:function(){b._hiido_no=0;var h=document.getElementsByTagName("head")[0]||document.documentElement;var f=document.createElement("script");f.src="http://www.duowan.com/duowan.js";f.type="text/javascript";var g=false;f.onload=f.onreadystatechange=function(){if(!g&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){g=true;f.onload=f.onreadystatechange=null;if(h&&f.parentNode){h.removeChild(f)}}};h.insertBefore(f,h.firstChild)},stat:function(h){if(!h){return false}var f=this.getServerUrl();var j=this.getParam(h);var g=f+j;var i=this.getServerUrl(e.randomIp())+j;this.send(g,i)}};var d={addUVToHiido:function(g){if(!$.isArray(g)){b._hiido_wid=[];_hiido_wid.push(g)}else{b._hiido_wid=g}if($.isFunction(b.hiidov3)){try{hiidov3()}catch(f){}}else{e.loadHiidoJS()}},reportEvent:function(f,g,j,k){try{if(!f){console.error("no eventid found")}var i={};j=j||{};i.eventid=f||0;i.act="webevent";i.eventype="1";i.value=g||0;i.uid=j.uid||0;i.class1="ent";i.class2=j.class2||"";i.bak1=j.bak1||"";i.bak2=j.bak2||"";i.bak3=j.bak3||"";e.stat(i);if(typeof k=="function"){k(i)}}catch(h){console.log("error"+h)}}};if(typeof(module)==="object"){module.exports=d}b.hiidoApi=d;var a=b.hiidoApi;e.noConflict=function(){if(b.hiidoApi===d){b.hiidoApi=a}return d}}(window));