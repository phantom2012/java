var data = 1;
//alert(4);
//alert(location.href.split('#')[0]);
$.ajax({
	//url : "http://mmyzlinyingjie.oicp.net/tvbar/getSign.action",
	url : "http://tvbar.yy.com/getSign.action",
	type : "get",
	dataType : 'json',
	success : function(response) {
		
		data = response.data;
		wx.config({
			debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	//		appId : 'wxbea2b5d9b8ffad02', // 必填，公众号的唯一标识  测试
			appId : data.appId, // 必填，公众号的唯一标识 剧吧
			timestamp : data.timestamp, // 必填，生成签名的时间戳
			nonceStr : data.noncestr, // 必填，生成签名的随机串
			signature : data.signature,// 必填，签名，见附录1
			jsApiList : [ "onMenuShareTimeline", "onMenuShareAppMessage","onMenuShareQQ","onMenuShareQZone","onMenuShareWeibo" ]
		// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		
        wx.ready(function(){
            console.log('weixin ready..');
            // 分享到朋友圈
            wx.onMenuShareTimeline({
                title: "“剧吧”根据地隆重开业啦！这里是电视剧的海洋~~ 这里是高逼格的影视讨论基地~~这里有志同道合的朋友们一起谈天说地！！！", // 分享标题
                link: "http://tvbar.yy.com/html/home.html", // 分享链接
                imgUrl:"https://mmbiz.qlogo.cn/mmbiz/C20YMQ7usXMBWZD0X3yeeo78VichZIQvBwATkw1Ve1r0cHj5vYKlCzDyaG4ibjpq3pWvZ4PJVEo5K45dvYticjcqA/0?wx_fmt=png", // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    console.log('ok');
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    console.log('cancel');
                }
            });
            //分享给朋友
            wx.onMenuShareAppMessage({
                desc: "这里是电视剧的海洋~~ 这里是高逼格的影视讨论基地~~这里有志同道合的朋友们一起谈天说地！！！", // 分享描述
                title: "剧吧根据地，诚邀你的加入！", // 分享标题
                link: "http://tvbar.yy.com/html/home.html", // 分享链接
                imgUrl:"https://mmbiz.qlogo.cn/mmbiz/C20YMQ7usXMBWZD0X3yeeo78VichZIQvBwATkw1Ve1r0cHj5vYKlCzDyaG4ibjpq3pWvZ4PJVEo5K45dvYticjcqA/0?wx_fmt=png", // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    console.log('ok');
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    console.log('cancel');
                }
            });
            
            //分享到QQ
            wx.onMenuShareQQ({
                desc: "这里是电视剧的海洋~~ 这里是高逼格的影视讨论基地~~这里有志同道合的朋友们一起谈天说地！！！", // 分享描述
                title: "剧吧根据地，诚邀你的加入！", // 分享标题
                link: "http://tvbar.yy.com/html/home.html", // 分享链接
                imgUrl:"https://mmbiz.qlogo.cn/mmbiz/C20YMQ7usXMBWZD0X3yeeo78VichZIQvBwATkw1Ve1r0cHj5vYKlCzDyaG4ibjpq3pWvZ4PJVEo5K45dvYticjcqA/0?wx_fmt=png", // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    console.log('ok');
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    console.log('cancel');
                }
            });
            //分享到腾讯微博
            wx.onMenuShareWeibo({
                desc: "这里是电视剧的海洋~~ 这里是高逼格的影视讨论基地~~这里有志同道合的朋友们一起谈天说地！！！", // 分享描述
                title: "剧吧根据地，诚邀你的加入！", // 分享标题
                link: "http://tvbar.yy.com/html/home.html", // 分享链接
                imgUrl:"https://mmbiz.qlogo.cn/mmbiz/C20YMQ7usXMBWZD0X3yeeo78VichZIQvBwATkw1Ve1r0cHj5vYKlCzDyaG4ibjpq3pWvZ4PJVEo5K45dvYticjcqA/0?wx_fmt=png", // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    console.log('ok');
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    console.log('cancel');
                }
            });
        });
	}
});