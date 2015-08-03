package com.yy.ent.tvbar.common.protocal.zc;

import com.yy.ent.external.util.Convert;

/**
* 查询我的订阅列表
*/
public class SubscirbedList {

	@Convert(key=7003)
	public static final String UID = "uid";
	
	@Convert(key=8000)
	public static final String CHANNEL = "channel";
	
	@Convert(key=8008)
	public static final String STATUS = "status"; //是否正在直播，0为未在直播，1为在直播
	
	@Convert(key=7004)
	public static final String USERNICK = "userNick";
	
	public static final String SIGNCHANNEL = "signChannel";
	
	public static final String USERS = "users"; // 在线人数 
	
	public static final String loadUrl = "loadUrl"; // 上麦名片
	
	public static final String NICK = "nick";  // 微博昵称
	
	public static final String YYNUM = "yyNum"; 
}
