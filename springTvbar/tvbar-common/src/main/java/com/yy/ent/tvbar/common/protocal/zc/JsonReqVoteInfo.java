package com.yy.ent.tvbar.common.protocal.zc;


import com.alibaba.fastjson.annotation.JSONType;

@JSONType
public class JsonReqVoteInfo  {

	public  String chId;

	public String subChId;

	public long uid;

	public String freeCnt;   //还有票数

	public String  voteCnt;

}
