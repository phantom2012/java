(function(a){a.uiwidget=a.uiwidget||{};a.uiwidget.Messagebox=function(c,b){a.extend(this,b);this.messagebox=a(c);this.init();this.render()};a.uiwidget.Messagebox.prototype={OK_TEXT:"确 定",CANCEL_TEXT:"取 消",CLOSE_TEXT:"关 闭",ASK_TITLE:"提示",ALERT_TITLE:"警告",SUCCESS_TITLE:"成功",ERROR_TITLE:"失败",WIDTH:426,init:function(){var b=this;a(window).bind("resize",function(){b.reLayout()});a(window).bind("scroll",function(){b.reLayout()})},render:function(){},renderWindow:function(){var b=a(['<div class="pop_box" onselectstart="return false;" style="-moz-user-select: none;width:'+WIDTH+'px;"><div class="pop_title"><div class="pop_title_left"><div class="pop_title_right">','<div class="pop_title_midle"></div><span class="pop_close" title="关闭" ></span>',"</div></div></div>",'<div class="pop_content" style="width:'+(WIDTH-2)+'px;">','<div class="msg-window-ico-prompt"></div><div class="msg-window-msg-content"><table cellpadding="0" cellspacing="0"><tr><td></td></tr></table>',"</div>",'<div class="msg-window-button" >',"</div> ","</div>","</div>"].join(""));a(document.body).append(b);this.titleEl=b.find("div.pop_title_midle");this.msgEl=b.find("div.pop_content td");this.iconEl=b.find("div.pop_content>div")[0];this.buttonEl=b.find("div.msg-window-button");return b},renderMask:function(){var b=a('<div class="mask"><iframe frameborder="0" style="width:100%;height:100%"></iframe></div>');a(document.body).append(b);return b},message:function(b){if(b.width){WIDTH=b.width}else{WIDTH=426}this.show();if(b.type){this[b.type](b)}else{this.customCommand(b)}},customCommand:function(b){if(b.title){this.setTitle(b.title)}this.setMsg(b.msg);if(b.iconCls){this.setIconCls(b.iconCls)}this.reSetWidth(WIDTH);var f=this.getWindow();var e=(document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft);var d=(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop);f.css("left",(a(window).width()-f.eq(0).width())/2+e);f.css("top",(a(window).height()-f.eq(0).height())/2+d);f.css("z-index",30003);if(b.buttons){this.setButton(b.buttons)}var c=this;this.windowEl.find("div.btn-order").each(function(g){a(this).bind("click",function(){if(b.fn){b.fn({index:g},b.msg)}c.hide()});a(this).find("li.middle-normal").hover(function(){a(this).prev().addClass("left-over");a(this).addClass("middle-over");a(this).next().addClass("right-over")},function(){a(this).prev().removeClass("left-over");a(this).removeClass("middle-over");a(this).next().removeClass("right-over")})});this.windowEl.find("span.pop_close").unbind("click");this.windowEl.find("span.pop_close").bind("click",function(){if(b.fn){b.fn({index:-1},b.msg)}c.hide()})},ask:function(b){this.setTitle(this.ASK_TITLE);this.setIconCls("msg-window-ico-prompt");this.setButton([{text:this.OK_TEXT,iconCls:"ico-btn-order-ok"},{text:this.CANCEL_TEXT,iconCls:"ico-btn-order-close"}]);this.customCommand(b)},alert:function(b){this.setTitle(this.ALERT_TITLE);this.setIconCls("msg-window-ico-warning");this.setButton([{text:this.OK_TEXT,iconCls:"ico-btn-order-ok"}]);this.customCommand(b)},success:function(b){this.setTitle(this.SUCCESS_TITLE);this.setIconCls("msg-window-ico-success");this.setButton([{text:this.OK_TEXT,iconCls:"ico-btn-order-ok"}]);this.customCommand(b)},error:function(b){this.setTitle(this.ERROR_TITLE);this.setIconCls("msg-window-ico-error");this.setButton([{text:this.OK_TEXT,iconCls:"ico-btn-order-ok"}]);this.customCommand(b)},getWindow:function(){return this.windowEl||(this.windowEl=this.renderWindow())},getMask:function(){return this.maskEl||(this.maskEl=this.renderMask())},setTitle:function(b){this.titleEl.html(b)},setMsg:function(b){this.msgEl.html(b)},setIconCls:function(b){this.iconEl.className=b},reSetWidth:function(b){var c=this.getWindow();c.find("div.pop_content").css("width",b-2);c.css("width",b)},setButton:function(c){this.buttonEl.empty();for(var b=0;b<c.length;b++){if(c[b].iconCls){this.buttonEl.append(['<div class="btn-order"><input type="button" class="pop_btn ',c[b].iconCls,'" id="delete_ajax" value="',c[b].text,'"></div>'].join(""))}else{this.buttonEl.append(['<div class="btn-order"><ul><li class="left-normal"></li><li class="middle-normal">',c[b].text,'</li><li class="right-normal"></li></ul></div>'].join(""))}}},show:function(){this.getWindow().show();this.getMask();var b=document.body.scrollHeight;if(document.body.scrollHeight<=document.body.clientHeight){b=document.body.clientHeight}if(a.browser.mozilla){b=a(document).height()}a("div.mask").height(b).show()},hide:function(){this.getWindow().hide();this.getMask().hide()},reLayout:function(){var d=this.getWindow();var c=(document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft);var b=(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop);d.css("left",(a(window).width()-d.eq(0).width())/2+c);d.css("top",(a(window).height()-d.eq(0).height())/2+b)}};a.messagebox=function(b){a.uiwidget.Messagebox.instance=a.uiwidget.Messagebox.instance||new a.uiwidget.Messagebox(document.body,{});return a.uiwidget.Messagebox.instance.message(b)}})(jQuery);