(function(e){function b(l,m){for(var k in m){l[k]=m[k]}return l}function a(l,k,n,m){return n*Math.sqrt(1-(l=l/m-1)*l)+k}function j(){var m,o,q=navigator.userAgent;var n=function(s){s=s.toLowerCase();var r=/(chrome)[ \/]([\w.]+)/.exec(s)||/(webkit)[ \/]([\w.]+)/.exec(s)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(s)||/(msie) ([\w.]+)/.exec(s)||s.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(s)||[];return{browser:r[1]||"",version:r[2]||"0"}};m=n(q);o={};var l="chrome webkit opera msie".split(" ");for(var p=0,k=l.length;p<k;p++){o[l[p]]=false}if(m.browser){o[m.browser]=true;o.version=m.version}if(o.webkit){o.safari=true}else{o.safari=false}o.webkit=o.chrome||o.webkit;return o}var g=j();function c(r,m,p,k,n){var o=(new Date()).getTime();var q=0;var l;if(!c.s_timmer||c.s_timmer===null){c.s_timmer=setInterval(function(){q=(new Date()).getTime()-o;l=a(q,m,p,k);if(q>k){r.scrollLeft=p+m;clearInterval(c.s_timmer);c.s_timmer=null;n&&n();return}r.scrollLeft=l},13)}}function f(l,y,p){var o={};var m=b(o,l);var x={curClass:"current",triggerEvent:"mouseover",scrollUnit:m.sBody[0].offsetWidth,direc:"x",interval:0,delay:600};var k=b(x,y);var s=null;var w=m.contents.length;var v=0;var r=m.ctrls?m.ctrls:"";var l={ctrls:r,contents:m.contents},q={css:k.curClass,eventName:k.triggerEvent,delay:100,interval:k.interval};var n=new switchable(l,q);if(k.direc=="x"){n.onHandle=function(z,B,A){u(z,k.scrollUnit,m.sBody[0],k.delay);p&&p(z,B,A)};m.sItemsWrap.css({width:w*k.scrollUnit+"px"});m.sBody[0].scrollLeft=n.param.curIndex*k.scrollUnit}else{if(k.direc=="y"){n.onHandle=function(z,B,A){t(z,k.scrollUnit,m.sBody[0],k.delay);p&&p(z,B,A)};m.sItemsWrap.css({height:w*k.scrollUnit+"px"});m.sBody[0].scrollTop=n.param.curIndex*k.scrollUnit}}function u(B,E,D,z){if(s!=null){clearInterval(s);s=null}var F=B*E,G=D.scrollLeft,H=0;var A=(new Date()).getTime();var C=0;s=setInterval(function(){C=(new Date()).getTime()-A;H=a(C,G,F-G,z);if(C>z){D.scrollLeft=F;clearInterval(s);s=null;return}D.scrollLeft=H},13)}function t(B,E,D,z){if(s!=null){clearInterval(s);s=null}var F=B*E,G=D.scrollTop,H=0;var A=(new Date()).getTime();var C=0;s=setInterval(function(){C=(new Date()).getTime()-A;H=a(C,G,F-G,z);if(C>z){D.scrollTop=F;clearInterval(s);s=null;return}D.scrollTop=H},13)}return n}function d(l,m){var n=this;var o={};var k={initDist:0,scrollUnit:500,delay:600,cellFill:0,allFill:0,sItemsWrap_W:0,disabledClass:"matchnav_ctrl_disabled",fillClass:"matchnav_fill"};n.nodes=b(o,l);n.options=b(k,m)}d.prototype={init:function(){var k=this;k.nodes.sBody[0].scrollLeft=k.options.initDist;k.options.sBody_W=k.nodes.sBody[0].offsetWidth;k.options.sItemsWrap_W=(k.options.sItemsWrap_W!=0)?k.options.sItemsWrap_W:(k.nodes.sItems[k.nodes.sItems.length-1].offsetWidth+k.options.cellFill)*k.nodes.sItems.length+k.options.allFill;if(k.nodes.sBody[0].scrollLeft==0){k.nodes.sPrev.addClass(k.options.disabledClass)}if(k.options.sItemsWrap_W>k.options.sBody_W){k.nodes.sItemsWrap.css({width:k.options.sItemsWrap_W+"px"});if(k.options.sItemsWrap_W-k.options.initDist<k.options.sBody_W){k.nodes.sNext.addClass(k.options.disabledClass)}else{k.nodes.sNext.removeClass(k.options.disabledClass)}}else{k.fill();k.nodes.sItemsWrap.css({width:k.options.sBody_W+"px"});k.nodes.sNext.addClass(k.options.disabledClass)}k.eventHandle()},eventHandle:function(){var k=this;k.nodes.sPrev.bind("click",function(l){l.preventDefault();k.prev()});k.nodes.sNext.bind("click",function(l){l.preventDefault();k.next()})},prev:function(){var k=this;var l=k.nodes.sBody[0].scrollLeft;var n=0;var m=null;if(k.options.sItemsWrap_W>k.options.sBody_W){if(l>k.options.scrollUnit){n=-k.options.scrollUnit;m=function(){k.nodes.sNext.removeClass(k.options.disabledClass)}}else{n=-l;m=function(){k.nodes.sNext.removeClass(k.options.disabledClass);k.nodes.sPrev.addClass(k.options.disabledClass)}}if(n==0){return}c(k.nodes.sBody[0],l,n,k.options.delay,m)}else{return}},next:function(){var k=this;var l=k.nodes.sBody[0].scrollLeft;var n=0;var m=null;if(k.options.sItemsWrap_W>k.options.sBody_W){if((k.options.sItemsWrap_W-k.options.sBody_W-l)>k.options.scrollUnit){n=k.options.scrollUnit;m=function(){k.nodes.sPrev.removeClass(k.options.disabledClass)}}else{n=k.options.sItemsWrap_W-k.options.sBody_W-l;m=function(){k.nodes.sPrev.removeClass(k.options.disabledClass);k.nodes.sNext.addClass(k.options.disabledClass)}}if(n==0){return}c(k.nodes.sBody[0],l,n,k.options.delay,m)}else{return}},fill:function(){var l=this;if(e("."+l.options.fillClass,l.nodes.sWrap)[0]){return}var k=document.createElement("div");k.className=l.options.fillClass;if(l.options.sItemsWrap_W<l.options.sBody_W){e(k).css({width:l.options.sBody_W-l.options.sItemsWrap_W+"px"});e(l.nodes.sItems[l.nodes.sItems.length-1]).after(k)}}};function i(m){var k={ctrls:e(".tabs li",m),contents:e(".panels .panel",m)};var n={css:"on",eventName:"mouseover",delay:100};var l=new switchable(k,n)}function h(o){var k=e(".scroll_prev",o),n=e(".scroll_next",o);var l={sWrap:e(o),sBody:e(".scroll_body",o),sItemsWrap:e(".scroll_items",o),ctrls:e(".scroll_ctrls span",o),contents:e(".scroll_item",o)};var m={curClass:"current",triggerEvent:"mouseover",direc:"x",delay:500,scrollUnit:o.offsetWidth};var p=new f(l,m);p.trans(0);k.bind("click",function(q){q.preventDefault();p.prev()});n.bind("click",function(q){q.preventDefault();p.next()})}window.T={browser:g};window.F={FocusScroll:f,Slider:d,tabSwitch:i,sliderCall:h};e(".js_switch").each(function(){i(this)})})(jQuery);