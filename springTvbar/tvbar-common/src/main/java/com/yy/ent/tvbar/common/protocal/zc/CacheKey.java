package com.yy.ent.tvbar.common.protocal.zc;

import com.yy.ent.cherrice.util.BlankUtil;


public enum CacheKey {
	SIGN_UP,
    ZC_FREE_TICKET_INFO,//用户所得免费票总数
    ZC_LOGIN_INFO,//用户每天登录记录
    ZC_SHARE_INFO,//用户分享缓存
    ZC_SHARECODE_INFO,//用户分享加密串
    ZC_BROADCAST_INFO,//看过直播间的用户缓存
    ZC_PROJECT_INFO,//项目列表缓存
    ZC_ALL_PROJECT_INFO, //所有项目信息
    ZC_SHARE_OUT,//项目已分享缓存
    ZC_TASK_INFO,//项目任务缓存

    VIDEO_TOTAL,
    VIDEO_ID_SET,
    VIDEO_INFO_SET,
    VIDEO_TEMP_ID_URL,
    PRJ_VIDEO_TOTAL,
    PRJ_VIDEO_LIST,
    ZC_HOME_RIGHT_VIDEOS,//项目最新视频列表
    ZC_HOME_BANNER_VIDEO,//首页推广视频
    ZC_VIDEO_CLICK_COUNT,//视频点击数

    FANS_COUNT
    ;

    /**
     * 例如 项目名 + "_" + 枚举名
     *
     * @return
     */
    public String getKey() {
        return ("agency_" + name()).toLowerCase();
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
