(function(e){var b=(function(){var m=["webkit","moz","ms"];var j=document.createElement("div").style;var h="transform" in j?"transform":undefined;for(var g=0,k=m.length;g<k;g++){var l=m[g]+"Transform";if(l in j){h=l;break}}return h})();var d=window.cancelAnimationFrame||window.cancelRequestAnimationFrame;var c=window.requestAnimationFrame;(function(){var j=["webkit","moz","ms"];for(var g=0,h=j.length;g<h&&!d;g++){d=window[j[g]+"CancelAnimationFrame"]||window[j[g]+"CancelRequestAnimationFrame"];c=c&&window[j[g]+"RequestAnimationFrame"]}}());function a(g){this.element=e(g);this.fullWidth=this.element.width();this.fullHeight=this.element.height();this.element.css("position","absolute");g.style[b+"Origin"]=this.xOrigin+" "+this.yOrigin;this.moveTo=function(h,j,i){this.width=this.fullWidth*i;this.height=this.fullHeight*i;this.x=h;this.y=j;this.scale=i;g.style[b]="translate("+h+"px, "+j+"px) scale("+i+")"}}function f(i,h){var g={farScale:0.5,speed:500,autoPlay:0,autoPlayDelay:4000,itemClass:"item",};this.farScale=h.farScale||g.farScale;this.speed=h.speed||g.speed;this.autoPlay=h.autoPlay||g.autoPlay;this.autoPlayDelay=h.autoPlayDelay||g.autoPlayDelay;this.itemClass=h.itemClass||g.itemClass;this.onLoaded=h.onLoaded;this.onSlideStart=h.onSlideStart;this.onSlideEnd=h.onSlideEnd;this.container=e(i);this.items=[];this.xOrigin=(h.xOrigin==null)?this.container.width()*0.5:h.xOrigin;this.yOrigin=(h.yOrigin==null)?this.container.height()*0.5:h.yOrigin;this.nowIndex=0;this._init()}f.prototype={_init:function(){this._setCss();this._rotateItem(0);this._eventBind();if(typeof this.onLoaded==="function"){this.onLoaded()}},_setCss:function(){this.container.css({position:"relative",overflow:"hidden"});var g=this.container.find("."+this.itemClass);this.itemWidth=g.eq(0).width();this.itemHeight=g.eq(0).height();this.x=this.xOrigin-this.itemWidth*0.5,this.y=this.yOrigin-this.itemHeight*0.5;for(var h=0;h<g.length;h++){this.items.push(new a(g[h]));this.items[h].moveTo(this.x,this.y,1)}},_rotateItem:function(k){if(k<0){this.nowIndex=this.items.length-1}else{if(k>this.items.length-1){this.nowIndex=0}else{this.nowIndex=k}}var j=this.nowIndex-1<0?this.items.length-1:this.nowIndex-1,g=this.nowIndex+1>this.items.length-1?0:this.nowIndex+1;for(var h=0;h<this.items.length;h++){if(h!=this.nowIndex&&h!=j&&h!=g){this.items[h].element.css("z-index",this.items.length-h);this.items[h].moveTo(this.x,this.y,this.farScale)}}this.items[this.nowIndex].element.css("z-index",this.items.length+1);this.items[j].element.css("z-index",this.items.length);this.items[g].element.css("z-index",this.items.length);this.items[this.nowIndex].moveTo(this.x,this.y,1);this.items[j].moveTo(this.x-this.itemWidth*0.8,this.y,0.7);this.items[g].moveTo(this.x+this.itemWidth*0.8,this.y,0.7)},_eventBind:function(){this._swipeLeft();this._swipeRight()},_swipeLeft:function(){var g=this;this.container.swipeLeft(function(){g.go(+1)})},_swipeRight:function(){var g=this;this.container.swipeRight(function(){g.go(-1)})},go:function(j){var g=this;this._rotateItem(this.nowIndex+j);if(typeof this.onSlideStart==="function"){this.onSlideStart(this.items[this.nowIndex].element,this.nowIndex)}if(typeof this.onSlideEnd==="function"){window.setTimeout(function(){g.onSlideEnd(g.items[g.nowIndex].element,g.nowIndex)},this.speed)}for(var h=0;h<this.items.length;h++){this.items[h].element.css("transition","all "+this.speed+"ms ease-in-out")}}};e.fn.picCarousel=function(g){return new f(this,g)}})(window.jQuery||window.Zepto);