var Zepto=function(){function t(t){return null==t?t+"":U[X.call(t)]||"object"}function e(e){return"function"==t(e)}function n(t){return null!=t&&t==t.window}function i(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function r(e){return"object"==t(e)}function o(t){return r(t)&&!n(t)&&Object.getPrototypeOf(t)==Object.prototype}function a(t){return"number"==typeof t.length}function s(t){return A.call(t,function(t){return null!=t})}function u(t){return t.length>0?T.fn.concat.apply([],t):t}function c(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function l(t){return t in k?k[t]:k[t]=RegExp("(^|\\s)"+t+"(\\s|$)")}function f(t,e){return"number"!=typeof e||Z[c(t)]?e:e+"px"}function h(t){var e,n;return M[t]||(e=N.createElement(t),N.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),M[t]=n),M[t]}function p(t){return"children" in t?P.call(t.children):T.map(t.childNodes,function(t){return 1==t.nodeType?t:x})}function d(t,e,n){for(E in e){n&&(o(e[E])||J(e[E]))?(o(e[E])&&!o(t[E])&&(t[E]={}),J(e[E])&&!J(t[E])&&(t[E]=[]),d(t[E],e[E],n)):e[E]!==x&&(t[E]=e[E])}}function m(t,e){return null==e?T(t):T(t).filter(e)}function g(t,n,i,r){return e(n)?n.call(t,i,r):n}function v(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function y(t,e){var n=t.className||"",i=n&&n.baseVal!==x;return e===x?i?n.baseVal:n:(i?n.baseVal=e:t.className=e,x)}function b(t){try{return t?"true"==t||("false"==t?!1:"null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?T.parseJSON(t):t):t}catch(e){return t}}function w(t,e){e(t);for(var n=0,i=t.childNodes.length;i>n;n++){w(t.childNodes[n],e)}}var x,E,T,S,j,C,O=[],P=O.slice,A=O.filter,N=window.document,M={},k={},Z={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},_=/^\s*<(\w+|!)[^>]*>/,D=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,L=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,$=/^(?:body|html)$/i,F=/([A-Z])/g,R=["val","css","html","text","data","width","height","offset"],z=["after","prepend","before","append"],q=N.createElement("table"),W=N.createElement("tr"),I={tr:N.createElement("tbody"),tbody:q,thead:q,tfoot:q,td:W,th:W,"*":N.createElement("div")},B=/complete|loaded|interactive/,V=/^[\w-]*$/,U={},X=U.toString,H={},Y=N.createElement("div"),G={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},J=Array.isArray||function(t){return t instanceof Array};return H.matches=function(t,e){if(!e||!t||1!==t.nodeType){return !1}var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n){return n.call(t,e)}var i,r=t.parentNode,o=!r;return o&&(r=Y).appendChild(t),i=~H.qsa(r,e).indexOf(t),o&&Y.removeChild(t),i},j=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},C=function(t){return A.call(t,function(e,n){return t.indexOf(e)==n})},H.fragment=function(t,e,n){var i,r,a;return D.test(t)&&(i=T(N.createElement(RegExp.$1))),i||(t.replace&&(t=t.replace(L,"<$1></$2>")),e===x&&(e=_.test(t)&&RegExp.$1),e in I||(e="*"),a=I[e],a.innerHTML=""+t,i=T.each(P.call(a.childNodes),function(){a.removeChild(this)})),o(n)&&(r=T(i),T.each(n,function(t,e){R.indexOf(t)>-1?r[t](e):r.attr(t,e)})),i},H.Z=function(t,e){return t=t||[],t.__proto__=T.fn,t.selector=e||"",t},H.isZ=function(t){return t instanceof H.Z},H.init=function(t,n){var i;if(!t){return H.Z()}if("string"==typeof t){if(t=t.trim(),"<"==t[0]&&_.test(t)){i=H.fragment(t,RegExp.$1,n),t=null}else{if(n!==x){return T(n).find(t)}i=H.qsa(N,t)}}else{if(e(t)){return T(N).ready(t)}if(H.isZ(t)){return t}if(J(t)){i=s(t)}else{if(r(t)){i=[t],t=null}else{if(_.test(t)){i=H.fragment(t.trim(),RegExp.$1,n),t=null}else{if(n!==x){return T(n).find(t)}i=H.qsa(N,t)}}}}return H.Z(i,t)},T=function(t,e){return H.init(t,e)},T.extend=function(t){var e,n=P.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){d(t,n,e)}),t},H.qsa=function(t,e){var n,r="#"==e[0],o=!r&&"."==e[0],a=r||o?e.slice(1):e,s=V.test(a);return i(t)&&s&&r?(n=t.getElementById(a))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:P.call(s&&!r?o?t.getElementsByClassName(a):t.getElementsByTagName(e):t.querySelectorAll(e))},T.contains=N.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);){if(e===t){return !0}}return !1},T.type=t,T.isFunction=e,T.isWindow=n,T.isArray=J,T.isPlainObject=o,T.isEmptyObject=function(t){var e;for(e in t){return !1}return !0},T.inArray=function(t,e,n){return O.indexOf.call(e,t,n)},T.camelCase=j,T.trim=function(t){return null==t?"":String.prototype.trim.call(t)},T.uuid=0,T.support={},T.expr={},T.map=function(t,e){var n,i,r,o=[];if(a(t)){for(i=0;t.length>i;i++){n=e(t[i],i),null!=n&&o.push(n)}}else{for(r in t){n=e(t[r],r),null!=n&&o.push(n)}}return u(o)},T.each=function(t,e){var n,i;if(a(t)){for(n=0;t.length>n;n++){if(e.call(t[n],n,t[n])===!1){return t}}}else{for(i in t){if(e.call(t[i],i,t[i])===!1){return t}}}return t},T.grep=function(t,e){return A.call(t,e)},window.JSON&&(T.parseJSON=JSON.parse),T.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){U["[object "+e+"]"]=e.toLowerCase()}),T.fn={forEach:O.forEach,reduce:O.reduce,push:O.push,sort:O.sort,indexOf:O.indexOf,concat:O.concat,map:function(t){return T(T.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return T(P.apply(this,arguments))},ready:function(t){return B.test(N.readyState)&&N.body?t(T):N.addEventListener("DOMContentLoaded",function(){t(T)},!1),this},get:function(t){return t===x?P.call(this):this[t>=0?t:t+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return O.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return e(t)?this.not(this.not(t)):T(A.call(this,function(e){return H.matches(e,t)}))},add:function(t,e){return T(C(this.concat(T(t,e))))},is:function(t){return this.length>0&&H.matches(this[0],t)},not:function(t){var n=[];if(e(t)&&t.call!==x){this.each(function(e){t.call(this,e)||n.push(this)})}else{var i="string"==typeof t?this.filter(t):a(t)&&e(t.item)?P.call(t):T(t);this.forEach(function(t){0>i.indexOf(t)&&n.push(t)})}return T(n)},has:function(t){return this.filter(function(){return r(t)?T.contains(this,t):T(this).find(t).size()})},eq:function(t){return -1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!r(t)?t:T(t)},last:function(){var t=this[this.length-1];return t&&!r(t)?t:T(t)},find:function(t){var e,n=this;return e=t?"object"==typeof t?T(t).filter(function(){var t=this;return O.some.call(n,function(e){return T.contains(e,t)})}):1==this.length?T(H.qsa(this[0],t)):this.map(function(){return H.qsa(this,t)}):T()},closest:function(t,e){var n=this[0],r=!1;for("object"==typeof t&&(r=T(t));n&&!(r?r.indexOf(n)>=0:H.matches(n,t));){n=n!==e&&!i(n)&&n.parentNode}return T(n)},parents:function(t){for(var e=[],n=this;n.length>0;){n=T.map(n,function(t){return(t=t.parentNode)&&!i(t)&&0>e.indexOf(t)?(e.push(t),t):x})}return m(e,t)},parent:function(t){return m(C(this.pluck("parentNode")),t)},children:function(t){return m(this.map(function(){return p(this)}),t)},contents:function(){return this.map(function(){return P.call(this.childNodes)})},siblings:function(t){return m(this.map(function(t,e){return A.call(p(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return T.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=h(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var n=e(t);if(this[0]&&!n){var i=T(t).get(0),r=i.parentNode||this.length>1}return this.each(function(e){T(this).wrapAll(n?t.call(this,e):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){T(this[0]).before(t=T(t));for(var e;(e=t.children()).length;){t=e.first()}T(t).append(this)}return this},wrapInner:function(t){var n=e(t);return this.each(function(e){var i=T(this),r=i.contents(),o=n?t.call(this,e):t;r.length?r.wrapAll(o):i.append(o)})},unwrap:function(){return this.parent().each(function(){T(this).replaceWith(T(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(t){return this.each(function(){var e=T(this);(t===x?"none"==e.css("display"):t)?e.show():e.hide()})},prev:function(t){return T(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return T(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var n=this.innerHTML;T(this).empty().append(g(this,t,e,n))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=g(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this[0].textContent:null},attr:function(t,e){var n;return"string"!=typeof t||1 in arguments?this.each(function(n){if(1===this.nodeType){if(r(t)){for(E in t){v(this,E,t[E])}}else{v(this,t,g(this,e,n,this.getAttribute(t)))}}}):this.length&&1===this[0].nodeType?!(n=this[0].getAttribute(t))&&t in this[0]?this[0][t]:n:x},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){v(this,t)},this)})},prop:function(t,e){return t=G[t]||t,1 in arguments?this.each(function(n){this[t]=g(this,e,n,this[t])}):this[0]&&this[0][t]},data:function(t,e){var n="data-"+t.replace(F,"-$1").toLowerCase(),i=1 in arguments?this.attr(n,e):this.attr(n);return null!==i?b(i):x},val:function(t){return 0 in arguments?this.each(function(e){this.value=g(this,t,e,this.value)}):this[0]&&(this[0].multiple?T(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t){return this.each(function(e){var n=T(this),i=g(this,t,e,n.offset()),r=n.offsetParent().offset(),o={top:i.top-r.top,left:i.left-r.left};"static"==n.css("position")&&(o.position="relative"),n.css(o)})}if(!this.length){return null}var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(e,n){if(2>arguments.length){var i,r=this[0];if(!r){return}if(i=getComputedStyle(r,""),"string"==typeof e){return r.style[j(e)]||i.getPropertyValue(e)}if(J(e)){var o={};return T.each(e,function(t,e){o[e]=r.style[j(e)]||i.getPropertyValue(e)}),o}}var a="";if("string"==t(e)){n||0===n?a=c(e)+":"+f(e,n):this.each(function(){this.style.removeProperty(c(e))})}else{for(E in e){e[E]||0===e[E]?a+=c(E)+":"+f(E,e[E])+";":this.each(function(){this.style.removeProperty(c(E))})}}return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(T(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?O.some.call(this,function(t){return this.test(y(t))},l(t)):!1},addClass:function(t){return t?this.each(function(e){if("className" in this){S=[];var n=y(this),i=g(this,t,e,n);i.split(/\s+/g).forEach(function(t){T(this).hasClass(t)||S.push(t)},this),S.length&&y(this,n+(n?" ":"")+S.join(" "))}}):this},removeClass:function(t){return this.each(function(e){if("className" in this){if(t===x){return y(this,"")}S=y(this),g(this,t,e,S).split(/\s+/g).forEach(function(t){S=S.replace(l(t)," ")}),y(this,S.trim())}})},toggleClass:function(t,e){return t?this.each(function(n){var i=T(this),r=g(this,t,n,y(this));r.split(/\s+/g).forEach(function(t){(e===x?!i.hasClass(t):e)?i.addClass(t):i.removeClass(t)})}):this},scrollTop:function(t){if(this.length){var e="scrollTop" in this[0];return t===x?e?this[0].scrollTop:this[0].pageYOffset:this.each(e?function(){this.scrollTop=t}:function(){this.scrollTo(this.scrollX,t)})}},scrollLeft:function(t){if(this.length){var e="scrollLeft" in this[0];return t===x?e?this[0].scrollLeft:this[0].pageXOffset:this.each(e?function(){this.scrollLeft=t}:function(){this.scrollTo(t,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),n=this.offset(),i=$.test(e[0].nodeName)?{top:0,left:0}:e.offset();return n.top-=parseFloat(T(t).css("margin-top"))||0,n.left-=parseFloat(T(t).css("margin-left"))||0,i.top+=parseFloat(T(e[0]).css("border-top-width"))||0,i.left+=parseFloat(T(e[0]).css("border-left-width"))||0,{top:n.top-i.top,left:n.left-i.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||N.body;t&&!$.test(t.nodeName)&&"static"==T(t).css("position");){t=t.offsetParent}return t})}},T.fn.detach=T.fn.remove,["width","height"].forEach(function(t){var e=t.replace(/./,function(t){return t[0].toUpperCase()});T.fn[t]=function(r){var o,a=this[0];return r===x?n(a)?a["inner"+e]:i(a)?a.documentElement["scroll"+e]:(o=this.offset())&&o[t]:this.each(function(e){a=T(this),a.css(t,g(this,r,e,a[t]()))})}}),z.forEach(function(e,n){var i=n%2;T.fn[e]=function(){var e,r,o=T.map(arguments,function(n){return e=t(n),"object"==e||"array"==e||null==n?n:H.fragment(n)}),a=this.length>1;return 1>o.length?this:this.each(function(t,e){r=i?e:e.parentNode,e=0==n?e.nextSibling:1==n?e.firstChild:2==n?e:null;var s=T.contains(N.documentElement,r);o.forEach(function(t){if(a){t=t.cloneNode(!0)}else{if(!r){return T(t).remove()}}r.insertBefore(t,e),s&&w(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},T.fn[i?e+"To":"insert"+(n?"Before":"After")]=function(t){return T(t)[e](this),this}}),H.Z.prototype=T.fn,H.uniq=C,H.deserializeValue=b,T.zepto=H,T}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(F){function R(a){return a._zid||(a._zid=O++)}function K(c,f,e,b){if(f=N(f),f.ns){var d=H(f.ns)}return(P[R(c)]||[]).filter(function(a){return !(!a||f.e&&a.e!=f.e||f.ns&&!d.test(a.ns)||e&&R(a.fn)!==R(e)||b&&a.sel!=b)})}function N(a){var b=(""+a).split(".");return{e:b[0],ns:b.slice(1).sort().join(" ")}}function H(a){return RegExp("(?:^| )"+a.replace(" "," .* ?")+"(?: |$)")}function J(a,b){return a.del&&!q&&a.e in W||!!b}function X(a){return A[a]||q&&W[a]||a}function G(c,a,t,o,f,g,b){var i=R(c),e=P[i]||(P[i]=[]);a.split(/\s/).forEach(function(l){if("ready"==l){return F(document).ready(t)}var h=N(l);h.fn=t,h.sel=f,h.e in A&&(t=function(d){var p=d.relatedTarget;return !p||p!==this&&!F.contains(this,p)?h.fn.apply(this,arguments):Q}),h.del=g;var m=g||t;h.proxy=function(d){if(d=V(d),!d.isImmediatePropagationStopped()){d.data=o;var n=m.apply(c,d._args==Q?[d]:[d].concat(d._args));return n===!1&&(d.preventDefault(),d.stopPropagation()),n}},h.i=e.length,e.push(h),"addEventListener" in c&&c.addEventListener(X(h.e),h.proxy,J(h,b))})}function C(d,b,f,e,a){var g=R(d);(b||"").split(/\s/).forEach(function(c){K(d,c,f,e).forEach(function(h){delete P[g][h.i],"removeEventListener" in d&&d.removeEventListener(X(h.e),h.proxy,J(h,a))})})}function V(a,b){return(b||!a.isDefaultPrevented)&&(b||(b=a),F.each(k,function(d,c){var e=b[d];a[d]=function(){return this[c]=z,e&&e.apply(b,arguments)},a[c]=D}),(b.defaultPrevented!==Q?b.defaultPrevented:"returnValue" in b?b.returnValue===!1:b.getPreventDefault&&b.getPreventDefault())&&(a.isDefaultPrevented=z)),a}function M(a){var b,c={originalEvent:a};for(b in a){j.test(b)||a[b]===Q||(c[b]=a[b])}return V(c,a)}var Q,O=1,I=Array.prototype.slice,U=F.isFunction,L=function(a){return"string"==typeof a},P={},B={},q="onfocusin" in window,W={focus:"focusin",blur:"focusout"},A={mouseenter:"mouseover",mouseleave:"mouseout"};B.click=B.mousedown=B.mouseup=B.mousemove="MouseEvents",F.event={add:G,remove:C},F.proxy=function(d,a){var b=2 in arguments&&I.call(arguments,2);if(U(d)){var c=function(){return d.apply(a,b?b.concat(I.call(arguments)):arguments)};return c._zid=R(d),c}if(L(a)){return b?(b.unshift(d[a],d),F.proxy.apply(null,b)):F.proxy(d[a],d)}throw new TypeError("expected function")},F.fn.bind=function(a,b,c){return this.on(a,b,c)},F.fn.unbind=function(a,b){return this.off(a,b)},F.fn.one=function(b,c,d,a){return this.on(b,c,d,a,1)};var z=function(){return !0},D=function(){return !1},j=/^([A-Z]|returnValue$|layer[XY]$)/,k={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};F.fn.delegate=function(a,b,c){return this.on(b,a,c)},F.fn.undelegate=function(a,b,c){return this.off(b,a,c)},F.fn.live=function(a,b){return F(document.body).delegate(this.selector,a,b),this},F.fn.die=function(a,b){return F(document.body).undelegate(this.selector,a,b),this},F.fn.on=function(l,s,d,g,m){var b,p,f=this;return l&&!L(l)?(F.each(l,function(a,c){f.on(a,s,d,c,m)}),f):(L(s)||U(g)||g===!1||(g=d,d=s,s=Q),(U(d)||d===!1)&&(g=d,d=Q),g===!1&&(g=D),f.each(function(a,c){m&&(b=function(e){return C(c,e.type,g),g.apply(this,arguments)}),s&&(p=function(n){var h,r=F(n.target).closest(s,c).get(0);return r&&r!==c?(h=F.extend(M(n),{currentTarget:r,liveFired:c}),(b||g).apply(r,[h].concat(I.call(arguments,1)))):Q}),G(c,l,g,d,s,p||b)}))},F.fn.off=function(c,d,a){var b=this;return c&&!L(c)?(F.each(c,function(f,g){b.off(f,d,g)}),b):(L(d)||U(a)||a===!1||(a=d,d=Q),a===!1&&(a=D),b.each(function(){C(this,c,a,d)}))},F.fn.trigger=function(a,b){return a=L(a)||F.isPlainObject(a)?F.Event(a):V(a),a._args=b,this.each(function(){a.type in W&&"function"==typeof this[a.type]?this[a.type]():"dispatchEvent" in this?this.dispatchEvent(a):F(this).triggerHandler(a,b)})},F.fn.triggerHandler=function(c,a){var b,d;return this.each(function(e,f){b=M(L(c)?F.Event(c):c),b._args=a,b.target=f,F.each(K(f,c.type||c),function(g,h){return d=h.proxy(b),b.isImmediatePropagationStopped()?!1:Q})}),d},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(a){F.fn[a]=function(b){return 0 in arguments?this.bind(a,b):this.trigger(a)}}),F.Event=function(b,d){L(b)||(d=b,b=d.type);var f=document.createEvent(B[b]||"Events"),a=!0;if(d){for(var c in d){"bubbles"==c?a=!!d[c]:f[c]=d[c]}}return f.initEvent(b,a,!0),V(f)}}(Zepto),function(t){function e(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function n(t,n,i,r){return t.global?e(n||y,i,r):void 0}function i(e){e.global&&0===t.active++&&n(e,null,"ajaxStart")}function r(e){e.global&&!--t.active&&n(e,null,"ajaxStop")}function o(t,e){var i=e.context;return e.beforeSend.call(i,t,e)===!1||n(e,i,"ajaxBeforeSend",[t,e])===!1?!1:(n(e,i,"ajaxSend",[t,e]),void 0)}function a(t,e,i,r){var o=i.context,a="success";i.success.call(o,t,a,e),r&&r.resolveWith(o,[t,a,e]),n(i,o,"ajaxSuccess",[e,i,t]),u(a,e,i)}function s(t,e,i,r,o){var a=r.context;r.error.call(a,i,e,t),o&&o.rejectWith(a,[i,e,t]),n(r,a,"ajaxError",[i,r,t||e]),u(e,i,r)}function u(t,e,i){var o=i.context;i.complete.call(o,e,t),n(i,o,"ajaxComplete",[e,i]),r(i)}function c(){}function l(t){return t&&(t=t.split(";",2)[0]),t&&(t==T?"html":t==E?"json":w.test(t)?"script":x.test(t)&&"xml")||"text"}function f(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function h(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=f(e.url,e.data),e.data=void 0)}function p(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function d(e,n,i,r){var o,a=t.isArray(n),s=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(s||"object"==o||"array"==o?n:"")+"]"),!r&&a?e.add(u.name,u.value):"array"==o||!i&&"object"==o?d(e,u,i,n):e.add(n,u)})}var m,g,v=0,y=window.document,b=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,w=/^(?:text|application)\/javascript/i,x=/^(?:text|application)\/xml/i,E="application/json",T="text/html",S=/^\s*$/,j=y.createElement("a");j.href=window.location.href,t.active=0,t.ajaxJSONP=function(e,n){if(!("type" in e)){return t.ajax(e)}var i,r,u=e.jsonpCallback,c=(t.isFunction(u)?u():u)||"jsonp"+ ++v,l=y.createElement("script"),f=window[c],h=function(e){t(l).triggerHandler("error",e||"abort")},p={abort:h};return n&&n.promise(p),t(l).on("load error",function(o,u){clearTimeout(r),t(l).off().remove(),"error"!=o.type&&i?a(i[0],p,e,n):s(null,u||"error",p,e,n),window[c]=f,i&&t.isFunction(f)&&f(i[0]),f=i=void 0}),o(p,e)===!1?(h("abort"),p):(window[c]=function(){i=arguments},l.src=e.url.replace(/\?(.+)=\?/,"?$1="+c),y.head.appendChild(l),e.timeout>0&&(r=setTimeout(function(){h("timeout")},e.timeout)),p)},t.ajaxSettings={type:"GET",beforeSend:c,success:c,error:c,complete:c,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:E,xml:"application/xml, text/xml",html:T,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var n,r=t.extend({},e||{}),u=t.Deferred&&t.Deferred();for(m in t.ajaxSettings){void 0===r[m]&&(r[m]=t.ajaxSettings[m])}i(r),r.crossDomain||(n=y.createElement("a"),n.href=r.url,n.href=n.href,r.crossDomain=j.protocol+"//"+j.host!=n.protocol+"//"+n.host),r.url||(r.url=""+window.location),h(r);var p=r.dataType,d=/\?.+=\?/.test(r.url);if(d&&(p="jsonp"),r.cache!==!1&&(e&&e.cache===!0||"script"!=p&&"jsonp"!=p)||(r.url=f(r.url,"_="+Date.now())),"jsonp"==p){return d||(r.url=f(r.url,r.jsonp?r.jsonp+"=?":r.jsonp===!1?"":"callback=?")),t.ajaxJSONP(r,u)}var v,b=r.accepts[p],w={},x=function(t,e){w[t.toLowerCase()]=[t,e]},E=/^([\w-]+:)\/\//.test(r.url)?RegExp.$1:window.location.protocol,T=r.xhr(),C=T.setRequestHeader;if(u&&u.promise(T),r.crossDomain||x("X-Requested-With","XMLHttpRequest"),x("Accept",b||"*/*"),(b=r.mimeType||b)&&(b.indexOf(",")>-1&&(b=b.split(",",2)[0]),T.overrideMimeType&&T.overrideMimeType(b)),(r.contentType||r.contentType!==!1&&r.data&&"GET"!=r.type.toUpperCase())&&x("Content-Type",r.contentType||"application/x-www-form-urlencoded"),r.headers){for(g in r.headers){x(g,r.headers[g])}}if(T.setRequestHeader=x,T.onreadystatechange=function(){if(4==T.readyState){T.onreadystatechange=c,clearTimeout(v);var e,n=!1;if(T.status>=200&&300>T.status||304==T.status||0==T.status&&"file:"==E){p=p||l(r.mimeType||T.getResponseHeader("content-type")),e=T.responseText;try{"script"==p?(1,eval)(e):"xml"==p?e=T.responseXML:"json"==p&&(e=S.test(e)?null:t.parseJSON(e))}catch(i){n=i}n?s(n,"parsererror",T,r,u):a(e,T,r,u)}else{s(T.statusText||null,T.status?"error":"abort",T,r,u)}}},o(T,r)===!1){return T.abort(),s(null,"abort",T,r,u),T}if(r.xhrFields){for(g in r.xhrFields){T[g]=r.xhrFields[g]}}var O="async" in r?r.async:!0;T.open(r.type,r.url,O,r.username,r.password);for(g in w){C.apply(T,w[g])}return r.timeout>0&&(v=setTimeout(function(){T.onreadystatechange=c,T.abort(),s(null,"timeout",T,r,u)},r.timeout)),T.send(r.data?r.data:null),T},t.get=function(){return t.ajax(p.apply(null,arguments))},t.post=function(){var e=p.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=p.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length){return this}var r,o=this,a=e.split(/\s/),s=p(e,n,i),u=s.success;return a.length>1&&(s.url=a[0],r=a[1]),s.success=function(e){o.html(r?t("<div>").html(e.replace(b,"")).find(r):e),u&&u.apply(o,arguments)},t.ajax(s),this};var C=encodeURIComponent;t.param=function(e,n){var i=[];return i.add=function(e,n){t.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(C(e)+"="+C(n))},d(i,e,n),i.join("&").replace(/%20/g,"+")}}(Zepto),function(A){function w(c,f,h,a){return Math.abs(c-f)>=Math.abs(h-a)?c-f>0?"Left":"Right":h-a>0?"Up":"Down"}function j(){k=null,q.last&&(q.el.trigger("longTap"),q={})}function m(){k&&clearTimeout(k),k=null}function b(){B&&clearTimeout(B),z&&clearTimeout(z),x&&clearTimeout(x),k&&clearTimeout(k),B=z=x=k=null,q={}}function g(a){return("touch"==a.pointerType||a.pointerType==a.MSPOINTER_TYPE_TOUCH)&&a.isPrimary}function y(a,c){return a.type=="pointer"+c||a.type.toLowerCase()=="mspointer"+c}var B,z,x,k,v,q={},d=750;A(document).ready(function(){var h,c,f,e,i=0,a=0;"MSGesture" in window&&(v=new MSGesture,v.target=document.body),A(document).bind("MSGestureEnd",function(l){var n=l.velocityX>1?"Right":-1>l.velocityX?"Left":l.velocityY>1?"Down":-1>l.velocityY?"Up":null;n&&(q.el.trigger("swipe"),q.el.trigger("swipe"+n))}).on("touchstart MSPointerDown pointerdown",function(l){(!(e=y(l,"down"))||g(l))&&(f=e?l:l.touches[0],l.touches&&1===l.touches.length&&q.x2&&(q.x2=void 0,q.y2=void 0),h=Date.now(),c=h-(q.last||h),q.el=A("tagName" in f.target?f.target:f.target.parentNode),B&&clearTimeout(B),q.x1=f.pageX,q.y1=f.pageY,c>0&&250>=c&&(q.isDoubleTap=!0),q.last=h,k=setTimeout(j,d),v&&e&&v.addPointer(l.pointerId))}).on("touchmove MSPointerMove pointermove",function(l){(!(e=y(l,"move"))||g(l))&&(f=e?l:l.touches[0],m(),q.x2=f.pageX,q.y2=f.pageY,i+=Math.abs(q.x1-q.x2),a+=Math.abs(q.y1-q.y2))}).on("touchend MSPointerUp pointerup",function(l){(!(e=y(l,"up"))||g(l))&&(m(),q.x2&&Math.abs(q.x1-q.x2)>30||q.y2&&Math.abs(q.y1-q.y2)>30?x=setTimeout(function(){q.el.trigger("swipe"),q.el.trigger("swipe"+w(q.x1,q.x2,q.y1,q.y2)),q={}},0):"last" in q&&(30>i&&30>a?z=setTimeout(function(){var n=A.Event("tap");n.cancelTouch=b,q.el.trigger(n),q.isDoubleTap?(q.el&&q.el.trigger("doubleTap"),q={}):B=setTimeout(function(){B=null,q.el&&q.el.trigger("singleTap"),q={}},250)},0):q={}),i=a=0)}).on("touchcancel MSPointerCancel pointercancel",b),A(window).on("scroll",b)}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(a){A.fn[a]=function(c){return this.on(a,c)}})}(Zepto),function(k){function g(o,n){var m=o[l],p=m&&b[m];if(void 0===n){return p||d(o)}if(p){if(n in p){return p[n]}var a=h(n);if(a in p){return p[a]}}return c.call(k(o),n)}function d(i,q,m){var a=i[l]||(i[l]=++k.uuid),p=b[a]||(b[a]=f(i));return void 0!==q&&(p[h(q)]=m),p}function f(a){var i={};return k.each(a.attributes||j,function(n,m){0==m.name.indexOf("data-")&&(i[h(m.name.replace("data-",""))]=k.zepto.deserializeValue(m.value))}),i}var b={},c=k.fn.data,h=k.camelCase,l=k.expando="Zepto"+ +new Date,j=[];k.fn.data=function(a,e){return void 0===e?k.isPlainObject(a)?this.each(function(m,i){k.each(a,function(n,o){d(i,n,o)})}):0 in this?g(this[0],a):void 0:this.each(function(){d(this,a,e)})},k.fn.removeData=function(a){return"string"==typeof a&&(a=a.split(/\s+/)),this.each(function(){var m=this[l],e=m&&b[m];e&&k.each(a||e,function(i){delete e[a?h(this):i]})})},["remove","empty"].forEach(function(a){var i=k.fn[a];k.fn[a]=function(){var e=this.find("*");return"remove"===a&&(e=e.add(this)),e.removeData(),i.call(this)}})}(Zepto),function(m){function h(a){return a=m(a),!(!a.width()&&!a.height())&&"none"!==a.css("display")}function f(c,s){c=c.replace(/=#\]/g,'="#"]');var v,a,q=p.exec(c);if(q&&q[2] in k&&(v=k[q[2]],a=q[3],c=q[1],a)){var u=Number(a);a=isNaN(u)?a.replace(/^["']|["']$/g,""):u}return s(c,v,a)}var g=m.zepto,b=g.qsa,d=g.matches,k=m.expr[":"]={visible:function(){return h(this)?this:void 0},hidden:function(){return h(this)?void 0:this},selected:function(){return this.selected?this:void 0},checked:function(){return this.checked?this:void 0},parent:function(){return this.parentNode},first:function(a){return 0===a?this:void 0},last:function(a,c){return a===c.length-1?this:void 0},eq:function(a,c,i){return a===i?this:void 0},contains:function(c,o,a){return m(this).text().indexOf(a)>-1?this:void 0},has:function(a,c,i){return g.qsa(this,i).length?this:void 0}},p=RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),l=/^\s*>/,j="Zepto"+ +new Date;g.qsa=function(a,c){return f(c,function(t,i,q){try{var e;!t&&i?t="*":l.test(t)&&(e=m(a).addClass(j),t="."+j+" "+t);var r=b(a,t)}catch(o){throw console.error("error performing selector: %o",c),o}finally{e&&e.removeClass(j)}return i?g.uniq(m.map(r,function(n,s){return i.call(n,s,r,q)})):r})},g.matches=function(a,c){return f(c,function(q,r,o){return !(q&&!d(a,q)||r&&r.call(a,null,o)!==a)})}}(Zepto),function(a){function b(F,R){var K=this.os={},N=this.browser={},H=F.match(/Web[kK]it[\/]{0,1}([\d.]+)/),J=F.match(/(Android);?[\s\/]+([\d.]+)?/),X=!!F.match(/\(Macintosh\; Intel /),G=F.match(/(iPad).*OS\s([\d_]+)/),C=F.match(/(iPod)(.*OS\s([\d_]+))?/),V=!G&&F.match(/(iPhone\sOS)\s([\d_]+)/),M=F.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),Q=/Win\d{2}|Windows/.test(R),O=F.match(/Windows Phone ([\d.]+)/),I=M&&F.match(/TouchPad/),U=F.match(/Kindle\/([\d.]+)/),L=F.match(/Silk\/([\d._]+)/),P=F.match(/(BlackBerry).*Version\/([\d.]+)/),B=F.match(/(BB10).*Version\/([\d.]+)/),q=F.match(/(RIM\sTablet\sOS)\s([\d.]+)/),W=F.match(/PlayBook/),A=F.match(/Chrome\/([\d.]+)/)||F.match(/CriOS\/([\d.]+)/),z=F.match(/Firefox\/([\d.]+)/),D=F.match(/MSIE\s([\d.]+)/)||F.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),j=!A&&F.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),k=j||F.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);(N.webkit=!!H)&&(N.version=H[1]),J&&(K.android=!0,K.version=J[2]),V&&!C&&(K.ios=K.iphone=!0,K.version=V[2].replace(/_/g,".")),G&&(K.ios=K.ipad=!0,K.version=G[2].replace(/_/g,".")),C&&(K.ios=K.ipod=!0,K.version=C[3]?C[3].replace(/_/g,"."):null),O&&(K.wp=!0,K.version=O[1]),M&&(K.webos=!0,K.version=M[2]),I&&(K.touchpad=!0),P&&(K.blackberry=!0,K.version=P[2]),B&&(K.bb10=!0,K.version=B[2]),q&&(K.rimtabletos=!0,K.version=q[2]),W&&(N.playbook=!0),U&&(K.kindle=!0,K.version=U[1]),L&&(N.silk=!0,N.version=L[1]),!L&&K.android&&F.match(/Kindle Fire/)&&(N.silk=!0),A&&(N.chrome=!0,N.version=A[1]),z&&(N.firefox=!0,N.version=z[1]),D&&(N.ie=!0,N.version=D[1]),k&&(X||K.ios||Q)&&(N.safari=!0,K.ios||(N.version=k[1])),j&&(N.webview=!0),K.tablet=!!(G||W||J&&!F.match(/Mobile/)||z&&F.match(/Tablet/)||D&&!F.match(/Phone/)&&F.match(/Touch/)),K.phone=!(K.tablet||K.ipod||!(J||V||M||P||B||A&&F.match(/Android/)||A&&F.match(/CriOS\/([\d.]+)/)||z&&F.match(/Mobile/)||D&&F.match(/Touch/)))}b.call(a,navigator.userAgent,navigator.platform),a.__detect=b}(Zepto);