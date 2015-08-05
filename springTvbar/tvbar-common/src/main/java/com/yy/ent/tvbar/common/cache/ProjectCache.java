package com.yy.ent.tvbar.common.cache;

import com.yy.ent.tvbar.common.constants.Constants;
import com.yy.ent.cherrice.util.BlankUtil;

public enum ProjectCache {

	AGENCYPROJECT , //项目信息
	AGENCYREPORT , //动态信息
	AGENCYBENEFITS ,  //项目回报
	PROJECTSUPPORTS ,  //
	SUMPRICECOUNTUIDINAGENCYORDER ,
	USERNICKNAME //用户昵称
	;
	
	/**
     * 例如 项目名 + "_" + 枚举名
     *
     * @return
     */
    public String getKey() {
        return (Constants.CACHE_KEY_PREFIX + name()).toLowerCase();
    }


    public String getKey(String suffix) {
        if (BlankUtil.isBlank(suffix)) {
            return getKey();
        } else {
            return getKey() + "_" + suffix;
        }

    }

    public String getKey(Object suffix) {
        if (BlankUtil.isBlank(suffix)) {
            return getKey();
        } else {
            return getKey() + "_" + suffix.toString();
        }
    }

    public String getFilter(int programId, String nowTime)
	{
		if (BlankUtil.isBlank(programId)) {
            return getKey();
        } else {
            return getKey() + "_" + String.valueOf(programId)+"_"+nowTime;
        }
	}


	public String getKey(int programId, long uid)
	{
		if (BlankUtil.isBlank(programId)) {
            return getKey();
        } else {
            return getKey() + "_" + String.valueOf(programId)+"_"+String.valueOf(uid);
        }
	}
	
}
