var _gaq = _gaq || []; //google
	_gaq.push(['_setAccount', 'UA-49333096-1']);
	_gaq.push(['_trackPageview']);
	
var _hmt = _hmt || []; //baidu

/**
 * 
   	category：要监控的目标的类型名称，通常是同一组目标的名字，比如"视频"、"音乐"、"软件"、"游戏"等等。该项必选。
    action：用户跟目标交互的行为，如"播放"、"暂停"、"下载"等等。该项必选。
    opt_label：事件的一些额外信息，通常可以是歌曲的名称、软件的名称、链接的名称等等。该项可选。
    opt_value：事件的一些数值信息，比如权重、时长、价格等等，在报表中可以看到其平均值等数据。该项可选。

 */
  function state_trackEvent(category,action,opt_label,opt_value){	  
	  _gaq.push(['_trackEvent',category,action,opt_label,opt_value]);
	  _hmt.push(['_trackEvent',category,action,opt_label,opt_value]);
  }
  /**
   * index：是自定义变量所占用的位置。取值为从1到5。该项必选。
	 name：是自定义变量的名字。该项必选。
	 value：就是自定义变量的值。该项必选。
     opt_scope：是自定义变量的作用范围。该项可选。1为访客级别（对该访客始终有效），2为访次级别（在当前访次内生效），3为页面级别（仅在当前页面生效）。默认为3。
   */
  function state_setCustomVar(index, name, value, opt_scope){
  	if($.isArray(opt_scope)){
  		$.each(opt_scope,function(n,scope) {
  			_hmt.push(['_setCustomVar', 1, name, value, scope]);
  			_gaq.push(['_setCustomVar', 1, name, value, scope]);  
  		});
	}else{
		_hmt.push(['_setCustomVar', 1, name, value, opt_scope]);
		_gaq.push(['_setCustomVar', 1, name, value, opt_scope]); 
	}
  }
  