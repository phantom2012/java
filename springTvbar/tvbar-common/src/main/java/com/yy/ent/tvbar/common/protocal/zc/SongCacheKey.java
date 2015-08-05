package com.yy.ent.tvbar.common.protocal.zc;

import com.yy.ent.cherrice.util.BlankUtil;

/**
 * Created by xieyong on 2015/1/26.
 */
public enum  SongCacheKey {

    SONG,            // 歌曲
    SONG_LOVE_TOTAL, //歌曲点赞总数
    SONG_LOVE,       //歌曲点赞过滤
    
    SONG_HOME_LIST,  //首页显示的歌曲
    SONG_PLAY_COUNT;  //歌曲播放次数
    

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

    public String getFilterKey(int songId, String nowTime)
    {
        return getKey() + "_" + String.valueOf(songId) + "_" + nowTime;
    }

    public static int TTL =  24 * 60 * 60;


}
