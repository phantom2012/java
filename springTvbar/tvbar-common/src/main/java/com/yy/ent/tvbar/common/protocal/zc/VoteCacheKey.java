package com.yy.ent.tvbar.common.protocal.zc;

import com.yy.ent.cherrice.util.BlankUtil;

public enum VoteCacheKey {
	
	//投票总数
	ZC_VOTE_TOTAL_CNT,
	//粉丝排行
    ZC_VOTE_RANK,
    //进入客户端时间
    ZC_ENTER_CLIENT_TIME,
    
    //参与粉丝数
    ZC_VOTE_FANS_COUNT;
    
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

}
