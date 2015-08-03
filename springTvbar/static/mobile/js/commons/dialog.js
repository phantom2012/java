(function(){(function(d){var e={},g=d.fn.data,b=d.camelCase,c=d.expando="Zepto"+(+new Date()),i=[];function f(m,k){var n=m[c],j=n&&e[n];if(k===undefined){return j||h(m)}else{if(j){if(k in j){return j[k]}var l=b(k);if(l in j){return j[l]}}return g.call(d(m),k)}}function h(l,k,m){var n=l[c]||(l[c]=++d.uuid),j=e[n]||(e[n]=a(l));if(k!==undefined){j[b(k)]=m}return j}function a(k){var j={};d.each(k.attributes||i,function(m,l){if(l.name.indexOf("data-")==0){j[b(l.name.replace("data-",""))]=d.zepto.deserializeValue(l.value)}});return j}d.fn.data=function(j,k){return k===undefined?d.isPlainObject(j)?this.each(function(l,m){d.each(j,function(n,o){h(m,n,o)})}):(0 in this?f(this[0],j):undefined):this.each(function(){h(this,j,k)})};d.fn.removeData=function(j){if(typeof j=="string"){j=j.split(/\s+/)}return this.each(function(){var l=this[c],k=l&&e[l];if(k){d.each(j||k,function(m){delete k[j?b(this):m]})}})};["remove","empty"].forEach(function(j){var k=d.fn[j];d.fn[j]=function(){var l=this.find("*");if(j==="remove"){l=l.add(this)}l.removeData();return k.call(this)}})})(Zepto);!function(a){var b={};b.cache={};a.tpl=function(f,e,d){var c=!/[^\w\-\.:]/.test(f)?b.cache[f]=b.cache[f]||this.get(document.getElementById(f).innerHTML):function(l,j){var h,g=[],k=[];for(h in l){g.push(h);k.push(l[h])}return(new Function(g,c.code)).apply(j||l,k)};c.code=c.code||"var $parts=[]; $parts.push('"+f.replace(/\\/g,"\\\\").replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/(^|%>)[^\t]*/g,function(g){return g.replace(/'/g,"\\'")}).replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("$parts.push('")+"'); return $parts.join('');";return e?c(e,d):c}}(Zepto);
/*! Tappy! - a lightweight normalized tap event. Copyright 2013 @scottjehl, Filament Group, Inc. Licensed MIT */
(function(c,f,g){c.tapHandling=false;var b=function(h){return h.off(".fz.tap")};var e=function(h){return h.each(function(){var s=f(this),m,p,q,r,i=10;function k(t){f(t.target).trigger("tap",[t,f(t.target).attr("href")]);t.stopPropagation()}function o(v){var t=v.originalEvent||v,u=t.touches||t.targetTouches;if(u){return[u[0].pageX,u[0].pageY]}else{return null}}function j(u){if(u.touches&&u.touches.length>1||u.targetTouches&&u.targetTouches.length>1){return false}var t=o(u);q=t[0];p=t[1]}function l(u){if(!r){var t=o(u);if(t&&(Math.abs(p-t[1])>i||Math.abs(q-t[0])>i)){r=true}}}function n(t){clearTimeout(m);m=setTimeout(function(){c.tapHandling=false;r=false},1000);if((t.which&&t.which>1)||t.shiftKey||t.altKey||t.metaKey||t.ctrlKey){return}t.preventDefault();if(r||c.tapHandling&&c.tapHandling!==t.type){r=false;return}c.tapHandling=t.type;k(t)}s.bind("touchstart.fz.tap MSPointerDown.fz.tap",j).bind("touchmove.fz.tap MSPointerMove.fz.tap",l).bind("touchend.fz.tap MSPointerUp.fz.tap",n).bind("click.fz.tap",n)})};if(f.event&&f.event.special){f.event.special.tap={add:function(h){e(f(this))},remove:function(h){b(f(this))}}}else{var a=f.fn.on,d=f.fn.off;f.fn.on=function(h){if(/(^| )tap( |$)/.test(h)){b(this);e(this)}return a.apply(this,arguments)};f.fn.off=function(h){if(/(^| )tap( |$)/.test(h)){b(this)}return d.apply(this,arguments)}}f.fn.tap=function(h){this.on("tap",h)}}(this,Zepto));!function(c){var f='<div class="ui-dialog"><div class="ui-dialog-cnt"><div class="ui-dialog-bd"><div><h4><%=title%></h4><div><%=content%></div></div></div><div class="ui-dialog-ft ui-btn-group"><% for (var i = 0; i < button.length; i++) { %><% if (i == select) { %><button type="button" data-role="button"  class="select" id="dialogButton<%=i%>"><%=button[i]%></button><% } else { %><button type="button" data-role="button" id="dialogButton<%=i%>"><%=button[i]%></div><% } %><% } %></div></div></div>';var d={title:"",content:"",button:["确认"],select:0,allowScroll:false,callback:function(){}};var a=function(i,h,g){console.log(h);this.option=c.extend(d,h);this.element=c(i);this._isFromTpl=g;this.button=c(i).find('[data-role="button"]');this._bindEvent()};a.prototype={_bindEvent:function(){var g=this;g.button.on("click",function(){var h=c(g.button).index(c(this));g.option.callback("button",h);g.hide.apply(g)})},toggle:function(){if(this.element.hasClass("show")){this.hide()}else{this.show()}},show:function(){var g=this;g.option.callback("show");g.element.addClass("show");this.option.allowScroll&&g.element.on("touchmove",e)},hide:function(){var g=this;g.option.callback("hide");g.element.off("touchmove",e);g.element.removeClass("show");console.log(g._isFromTpl);g._isFromTpl&&g.element.remove()}};function e(){return false}function b(i){var j=this;var h=c.extend({},d,typeof i=="object"&&i);var g=false;if(c.isArray(this)&&this.length&&c(this)[0].nodeName.toLowerCase()=="script"){j=c(c.tpl(this[0].innerHTML,h)).appendTo("body");g=true}else{if(c.isArray(this)&&this.length&&j.selector==""){j=c(c.tpl(this[0].outerHTML,h)).appendTo("body");g=true}else{if(!c.isArray(this)){j=c(c.tpl(f,h)).appendTo("body");g=true}}}return j.each(function(){var k=c(this);var l=k.data("fz.dialog");if(!l){k.data("fz.dialog",(l=new a(this,c.extend({},d,typeof i=="object"&&i),g)))}l.toggle()})}c.fn.dialog=c.dialog=b}(Zepto)})();