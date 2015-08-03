(function() {
	var page = {
		recoveryTouchMove:function(){
			document.ontouchmove = undefined;
		},
		disableTouchMove:function(){
			document.ontouchmove = function(e) {
		            e.preventDefault();
			};
		}
	}

	var newAlertView = {
		config:{},
		timeOut:null,
		alertId:"newAlert",
		render:function(){
			var _this = this;
			
			$("body").append('<div id="' + this.alertId + '" class="alert-view">' + this.config.content + '</div>');
			
			page.disableTouchMove();
			
			this.timeOut = setTimeout(function(){
				_this.closeView();
			},2000);
		},
		closeView:function(){
			clearTimeout(this.timeOut);
			
			$("#" + this.alertId).remove();
			
			page.recoveryTouchMove();
			
			if (this.config && this.config.callBack && typeof(this.config.callBack) == "function"){
				this.config.callBack();	
			}			
		},
		eventBind:function(){
			var _this = this;
			
			$("#" + this.alertId).on("click",function(){
				_this.closeView();
			});
		},
		init:function(config){
			
			if (config && config.content && config.content.length){
				this.closeView();
			
				this.config = config;
				this.render();
				this.eventBind();
			}
		}
	};

	var newConfirmView = {
		config:{},
		viewId:"confirm_view",
		transparentId:"full_transparent",
		render:function(){
			
			var _html = [];
			
			//断是否己有半透明遮罩层存在，如有则显示，如无则创建
			if (!$("#" + this.transparentId).size()){
				_html.push('<section id="' + this.transparentId + '" class="full_transparent"></section>');
			}else{
				$("#" + this.transparentId).show();
			}
			
			_html.push([
				'<section id="' + this.viewId + '" class="confirm-view">',
					'<div class="confirm-box">',
						'<div class="content">',
							'<p class="title">' + (this.config.title || '提示') + '</p>',
							'<p class="text">' + (this.config.content || '您确定该操作吗？') + '</p>',
						'</div>',
						'<div class="btns">',
							'<span class="cancel">取消</span>',
							'<span class="define">确定</span>',
						'</div>',
					'</div>',
				'</section>'
			].join(""));
			
			$("body").append(_html.join(""));
			
			page.disableTouchMove();
		},
		closeView:function(){
			var _this = this;
			
			setTimeout(function(){
				$("#" + _this.transparentId).hide();
			
				$("#" + _this.viewId).remove();
				
				page.recoveryTouchMove();
				
			},200);
		},
		eventBind:function(){
			var _this = this;
			var box = $("#" + this.viewId + "");
			
			
			box.find(".define").on("click",function(e){
				e.stopPropagation();
				
				if (_this.config && _this.config.callBack && _this.config.callBack.define && typeof(_this.config.callBack.define) == "function"){
					var returnValue = _this.config.callBack.define();
					
					if (returnValue === false){
						return false;
					}else{
						_this.closeView();
					}
				}else{
					_this.closeView();
				}
			});
			
			box.find(".cancel").on("click",function(e){
				e.stopPropagation();
					
				if (_this.config.callBack && _this.config.callBack.cancel && typeof(_this.config.callBack.cancel) == "function"){
					var returnValue = _this.config.callBack.cancel();
					
					if (returnValue === false){
						return false;
					}else{
						_this.closeView();
					}
				}else{
					_this.closeView();
				}
			});
			
			$("#" + this.viewId).on("click",function(){
				_this.closeView();
			});
		},
		init:function(config){
			this.config = config;
			this.render();
			this.eventBind();
		}
	};

	window.Ui = {
		newAlert:newAlertView,
		newConfirm:newConfirmView
	};
})();