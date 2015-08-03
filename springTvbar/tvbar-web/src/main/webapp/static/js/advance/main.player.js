//兼容IE低版本浏览器没有控制台
if (typeof(window.console) == "undefined"){
	window.console={
		log:function(){}
	};
}

//判断是否支持动画和过渡动画
var allowAnimation = !$.browser.msie || parseInt($.browser.version) >9;
var isIE7 = $.browser.msie && parseInt($.browser.version) == 7;
var isIE9 = $.browser.msie && parseInt($.browser.version) == 9;
var macSafari = false;
var videoPlay = null;

//macBook 上的  Safari 浏览器 当成不支持CSS处理，
if (/.+mac os((?!chrome).)+Safari.+/i.test(window.navigator.userAgent.toLowerCase())){
	macSafari = true;
}

$(function(){
	//设置控制台开关
	if (window.localStorage && window.localStorage.getItem && window.localStorage.getItem("showConsole") == "true"){
		window.myConsole = function(txt){
			console.log(txt);
		};
		
		console.log("控制台信息己开启");
	}else{
		window.myConsole = function(){};
	}
     

    videoPlay = {
    	idstr:"a",
    	/**
		* @author chenwubin
		* @description 创建视频播放弹窗
		* @param {json} param 相关参数
		* {
		* 	tid : 顶级频道,
		* 	cid : 子频道,
		* 	url : 视频地址
		* 	live : 是否直播
		* }
		* @example
		* video.createVCRPlayer()
		*/
		createVCRPlayer:function(params){
			var videoWarp = $('#videoShowBox');
			var playBtn = $('#top-video-play');
			//检查获取浮窗相关对象
			var _html = [];
			var _this = this;
			
			if(params.live == 'true'){
				_html = [
					this.createLiveBox(params)
				].join("");
				videoWarp.html(_html);
				videoWarp.show();
				playBtn.hide();
				return;
			}

			if ($("#jquery_jplayer_"+this.idstr).size()  && $("#jquery_jplayer_"+this.idstr).data("ready") == "1"){
	            $("#jquery_jplayer_"+this.idstr).jPlayer("setMedia", {
					m4v: params.url
				}).jPlayer("play");
			}else{
				_html = [
					this.createShowBox()
				].join("");

				videoWarp.html(_html);
				videoWarp.show();
				playBtn.hide();
				
				$("#jquery_jplayer_"+_this.idstr).jPlayer({
					ready: function () {
						$("#jquery_jplayer_"+_this.idstr).data("ready",1);

						$(this).jPlayer("setMedia", {
							mp3: params.url
						}).jPlayer("play");
					},
					play:function(){
						$("#videoShowBox").find(".jp-video").addClass("jp-video-playing");
						$("#view-" + _this.idstr + "-btn").removeClass("video-play").addClass("video-pause");
					},
					pause:function(){
						$("#videoShowBox").find(".jp-video").removeClass("jp-video-playing");
						$("#view-" + _this.idstr + "-btn").removeClass("video-pause").addClass("video-play");
					},
					ended:function(){
						var _vthis = $(this);
						
						$("#view-" + _this.idstr).find(".jp-video").removeClass("jp-video-playing");
						
						_vthis.jPlayer("stop").jPlayer("setMedia", {
							mp3: params.url
						});
					},

					swfPath: "http://res0.1931.yystatic.com/dream/swf/Jplayer.swf",
					supplied: "mp3",
					size: {
						width: "600px",
						height: "420px",
						cssClass: "jp-video-470p"
					},
					solution: "flash,html",
					cssSelectorAncestor: "#jp_container_a",
					fullBtn:true,
					smoothPlayBar: true,
					keyEnabled: true
				});
			}
		},
		createLiveBox:function(params){
			return [
			   '<div class="show_video" id="main_video">',
			   '<object height="420" width="600" align="middle" type="application/x-shockwave-flash" data="http://webyylbs.yy.duowan.com/s/'+params.tid+'/'+params.cid+'/entjs.swf">',
			   '<param name="quality" value="high">',
			   '<param name="allowScriptAccess" value="always">',
			   '<param name="wMode" value="transparent">',
			   '<param name="swLiveConnect" value="true">',
			   '<param name="menu" value="false">',
			   '<param name="flashVars" value="">',
			   '</object>',
			   '</div>'
			].join("");
		},
		/**
		* @author chenwubin
		* @description 创建视频播放主要显示区 DOM
		* @example
		* photo.createShowBox()
		*/
		createShowBox:function(){
			var selAncestor = "jp_container_" + this.idstr;

			return [
				'<div id="' + selAncestor + '" class="jp-video">',
		           ' <div class="jp-type-single">',
		                '<div id="jquery_jplayer_' + this.idstr + '" class="jp-jplayer"></div>',
		                '<div class="jp-gui">',
		                    '<a id="view-' + this.idstr + '-btn" class="video-play" href="javascript:void(0);"></a>',
		                    '<div class="jp-interface">',
		                        '<div class="jp-progress">',
		                           ' <div class="jp-seek-bar">',
		                                '<div class="jp-play-bar"></div>',
		                            '</div>',
		                        '</div>',
		                        '<div class="jp-time">',
		                            '<span class="jp-current-time"></span><span class="jp-duration"></span>',
		                        '</div>',
		                        '<div class="jp-controls-holder">',
		                            '<ul class="jp-controls">',
		                                '<li><a href="javascript:;" class="jp-play" tabindex="1" title="播放">play</a></li>',
		                                '<li><a href="javascript:;" class="jp-pause" tabindex="1" title="暂停">pause</a></li>',
		                                '<li><a href="javascript:;" class="jp-mute" tabindex="1" title="静音">mute</a></li>',
		                                '<li><a href="javascript:;" class="jp-unmute" tabindex="1" title="取消静音">unmute</a></li>',
		                            '</ul>',
		                            '<div class="jp-volume-bar">',
		                                '<div class="jp-volume-bar-value"></div>',	                               
		                            '</div>',
		                            '</ul>',
		                            isIE7 ? "" : ['<div class="jp-screen-bar">',
			                           	'<a href="javascript:;" class="jp-full-screen" title="全屏显示"></a>',
			                           	'<a href="javascript:;" class="	jp-restore-screen" title="退出显示"></a>',	
		                            '</div>'].join(''),
		                        '</div>',
		                    '</div>',
		                '</div>',
		            '</div>',
			   	'</div>'
			].join("");
		},
		/**
		* @author chenwubin
		* @description 获取图片对象相关数据
		* @param {obj} obj 图片对象
		* @example
		* photo.getParam(obj)
		*/
		getParam:function(obj){
			return {
				tid : obj.attr("_tid") || "",
				cid : obj.attr("_cid") || "",
				live : obj.attr("_live") || "",
				url : obj.attr("_url") || ""
			};
		},
		eventBind:function(){

			var _this = this;

            var params = _this.getParam($("#videoBox"));

			if(params.live == 'true'){
				_this.createVCRPlayer(params);
				return;
			}else{
				//绑定视频按钮事件
				$("#topBanner").on("click","#videoBox",function(){
					if($('#videoShowBox').find('.jp-video').size() > 0){
						return;
					}
					var _self = $(this);
					var params = _this.getParam(_self);

					_this.createVCRPlayer(params);
				});

				$("#topBanner").on('click',"#view-a-btn", function(event) {
					var _self = $(this);

					if (_self.hasClass('video-play')){
						_self.parent().siblings(".jp-jplayer").jPlayer("play");
					}else{
						_self.parent().siblings(".jp-jplayer").jPlayer("pause");
					}
					return false;
				});
			}
			
		},
		init:function(){
			this.eventBind();
		}
    };
    videoPlay.init();

});