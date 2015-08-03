var data = 1;
alert(3);
$.ajax({
	//url : "http://mmyzlinyingjie.oicp.net/tvbar/getSign.action",
	url : "http://tvbar.yy.com/getSign.action",
	type : "get",
	dataType : 'json',
	success : function(response) {
		
		data = response.data;
		wx.config({
			debug : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	//		appId : 'wxbea2b5d9b8ffad02', // 必填，公众号的唯一标识  测试
			appId : data.appId, // 必填，公众号的唯一标识 剧吧
			timestamp : data.timestamp, // 必填，生成签名的时间戳
			nonceStr : data.noncestr, // 必填，生成签名的随机串
			signature : data.signature,// 必填，签名，见附录1
			jsApiList : [ "onMenuShareTimeline", "onMenuShareAppMessage","onMenuShareQQ","onMenuShareQZone","onMenuShareWeibo" ]
		// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
	}
});

wx.ready(function() {
			document.querySelector('#checkJsApi').onclick = function() {
				wx.checkJsApi({
					jsApiList : [ 'getNetworkType', 'previewImage' ],
					success : function(res) {
						alert(JSON.stringify(res));
					}
				});
			};

			document.querySelector('#onMenuShareTimeline').onclick = function() {
				wx
						.onMenuShareTimeline({
							title : '互联网之子',
							link : 'http://movie.douban.com/subject/25785114/',
							imgUrl : 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
							trigger : function(res) {
								// 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
								alert('用户点击分享到朋友圈');
							},
							success : function(res) {
								alert('已分享');
							},
							cancel : function(res) {
								alert('已取消');
							},
							fail : function(res) {
								alert(JSON.stringify(res));
							}
						});
				alert('已注册获取“分享到朋友圈”状态事件');
			};

			// 2. 分享接口
			// 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
			document.querySelector('#onMenuShareAppMessage').onclick = function() {
				wx
						.onMenuShareAppMessage({
							title : '互联网之子',
							desc : '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
							link : 'http://movie.douban.com/subject/25785114/',
							imgUrl : 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
							trigger : function(res) {
								// 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
								alert('用户点击发送给朋友');
							},
							success : function(res) {
								alert('已分享');
							},
							cancel : function(res) {
								alert('已取消');
							},
							fail : function(res) {
								alert(JSON.stringify(res));
							}
						});
				alert('已注册获取“发送给朋友”状态事件');
			};
		});