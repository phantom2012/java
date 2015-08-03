;(function($) {
  //transform
  var transform = (function() {
    var vendors = ['webkit', 'moz', 'ms'];
    var style   = document.createElement( "div" ).style;
    var trans   = 'transform' in style ? 'transform' : undefined;

    for( var i = 0, count = vendors.length; i < count; i++ ) {
      var prop = vendors[i] + 'Transform';
      if( prop in style ) {
        trans = prop;
        break;
      }
    }
    return trans;
  })();
  //requestAnimationFrame
  var cancelFrame = window.cancelAnimationFrame || window.cancelRequestAnimationFrame;
  var requestFrame = window.requestAnimationFrame;

  (function() {
    var vendors = ['webkit', 'moz', 'ms'];

    for( var i = 0, count = vendors.length; i < count && !cancelFrame; i++ ) {
      cancelFrame = window[vendors[i]+'CancelAnimationFrame'] || window[vendors[i]+'CancelRequestAnimationFrame'];
      requestFrame = requestFrame && window[vendors[i]+'RequestAnimationFrame'];
    }
  }());
  function Item(element){
    this.element=$(element);
    this.fullWidth = this.element.width();
    this.fullHeight = this.element.height();
    this.element.css('position','absolute');
    element.style[transform + "Origin"] = this.xOrigin+" "+this.yOrigin;

    this.moveTo=function(x,y,scale){
      this.width = this.fullWidth * scale;
      this.height = this.fullHeight * scale;
      this.x = x;
      this.y = y;
      this.scale = scale;
      element.style[transform] = "translate(" + x + "px, " + y + "px) scale(" + scale + ")";   
    }
  }

  function Carousel(element,options){
    var defaultOptions = {
      farScale: 0.5,        // scale of the farthest item
      speed:500,            // unit:ms
      autoPlay: 0,          // [ 0: off | number of items (integer recommended, positive is clockwise) ]
      autoPlayDelay: 4000,
      itemClass: 'item',
    };

    this.farScale=options.farScale||defaultOptions.farScale;
    this.speed=options.speed||defaultOptions.speed;
    this.autoPlay=options.autoPlay||defaultOptions.autoPlay;
    this.autoPlayDelay=options.autoPlayDelay||defaultOptions.autoPlayDelay;
    this.itemClass=options.itemClass||defaultOptions.itemClass;
    this.onLoaded = options.onLoaded;
    this.onSlideStart=options.onSlideStart;
    this.onSlideEnd=options.onSlideEnd;

    this.container=$(element);
    this.items=[];
    this.xOrigin = (options.xOrigin == null) ? this.container.width() * 0.5 : options.xOrigin;
    this.yOrigin = (options.yOrigin == null) ? this.container.height() * 0.5 : options.yOrigin;
    this.nowIndex=0;
    this._init();
  }
  Carousel.prototype={
    _init:function(){
      this._setCss();
      this._rotateItem(0);
      this._eventBind();
      if( typeof this.onLoaded === 'function' )
        this.onLoaded();
    },
    _setCss:function(){
      this.container.css({
        'position': 'relative',
        'overflow': 'hidden'
      });
      var items=this.container.find('.'+this.itemClass);
      this.itemWidth=items.eq(0).width();
      this.itemHeight=items.eq(0).height();
      this.x=this.xOrigin-this.itemWidth*0.5,
      this.y=this.yOrigin-this.itemHeight*0.5;
      for(var i=0;i<items.length;i++){
        this.items.push(new Item(items[i]))
        this.items[i].moveTo(this.x,this.y,1);
      }
    },
    _rotateItem:function(itemIndex){
      if(itemIndex<0){
        this.nowIndex=this.items.length-1;
      }else if(itemIndex>this.items.length-1){
        this.nowIndex=0;
      }else{
        this.nowIndex=itemIndex;
      }
      var prevIndex=this.nowIndex-1<0?this.items.length-1:this.nowIndex-1,
          nextIndex=this.nowIndex+1>this.items.length-1?0:this.nowIndex+1;
      for(var i=0;i<this.items.length;i++){
        if(i!=this.nowIndex&&i!=prevIndex&&i!=nextIndex){
          this.items[i].element.css("z-index",this.items.length-i);
          this.items[i].moveTo(this.x,this.y,this.farScale);
        }
      }
      this.items[this.nowIndex].element.css("z-index",this.items.length+1);
      this.items[prevIndex].element.css("z-index",this.items.length);
      this.items[nextIndex].element.css("z-index",this.items.length);
      this.items[this.nowIndex].moveTo(this.x,this.y,1);
      this.items[prevIndex].moveTo(this.x-this.itemWidth*0.8,this.y,0.7);
      this.items[nextIndex].moveTo(this.x+this.itemWidth*0.8,this.y,0.7);
    },
    _eventBind:function(){
      this._swipeLeft();
      this._swipeRight();
    },
    _swipeLeft:function(){
      var self=this;
      this.container.swipeLeft(function(){
        self.go(+1);  
      })
    },
    _swipeRight:function(){
      var self=this;
      this.container.swipeRight(function(){
        self.go(-1);  
      })
    },
    go:function(count){
      var self=this;
      this._rotateItem(this.nowIndex+count);
      if( typeof this.onSlideStart === 'function' ){
        this.onSlideStart(this.items[this.nowIndex].element,this.nowIndex);
      }
      if( typeof this.onSlideEnd === 'function' ){
        window.setTimeout(function(){
          self.onSlideEnd(self.items[self.nowIndex].element,self.nowIndex);
        },this.speed)
      }
      for(var i=0;i<this.items.length;i++){
        this.items[i].element.css('transition',"all "+this.speed+"ms ease-in-out")
      }
    }
  }
  //
  // The jQuery plugin
  //
  $.fn.picCarousel = function( options ) {
    return new Carousel(this,options);
  }
})( window.jQuery || window.Zepto );