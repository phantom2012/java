package com.yy.ent.tvbar.common.protocal.zc;


import java.util.HashMap;
import java.util.Map;

import com.yy.ent.commons.protopack.marshal.StringMarshal;

public class JsonRspVoteInfo extends StringMarshal{
	public int result;

	public Map<String,String> extendInfo = new HashMap<String, String>();
	public String toString()
	{
		String log="result: "+result;
		return log;
	}
}
