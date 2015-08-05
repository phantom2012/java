package com.yy.ent.tvbar.common.protocal.zc;

/**
 * Created by xieyong on 2014/11/10.
 */
public class YYProtoURI {

    //协议常量开始
    /**
     * 查询我的订阅列表*
     */
    public static final YYProtoURI DEMO_URI = new YYProtoURI(200, 164);
    
    /** 查询主播粉丝总数 **/
    public static final YYProtoURI GET_FANS_COUNT = new YYProtoURI(117, 147);

    /** 订阅 **/
    public static final YYProtoURI SUBSCRIBE_ANCHOR = new YYProtoURI(5, 164);

    /** 取消订阅 **/
    public static final YYProtoURI CANCEL_SUBSCRIBE_ANCHOR = new YYProtoURI(7, 164);

    /**获取开播状态*/
    public static final YYProtoURI GET_LIVE_INFO = new YYProtoURI(71,159);
    
    /** 查询我的订阅列表 **/
    public static final YYProtoURI GET_SUBSCRIBE_LIST = new YYProtoURI(13,164);  
    
    /**
     * 查询众筹券余额
     */
    public static final YYProtoURI QUERYCROWDFUND_URI = new YYProtoURI(89,162);
    
    public static final YYProtoURI PQUERYUSERCOMMISSIONTABLE_URI = new YYProtoURI(95,162);
    
    /**
     * 转账
     */
    public static final YYProtoURI EXCHANGECROWDFUND_URI = new YYProtoURI(91,162);

    /**
     * 加众筹券
     */
    public static final YYProtoURI ADDCROWDFUND_URI = new YYProtoURI(87 ,162);
    
    /**
     * 卖票加钱给机构
     */
    public static final YYProtoURI ADDCROWDFUNDCOMPANY_URI = new YYProtoURI(93 ,162); 
    
    //协议常量开始

    private int requestCid; // 请求sid
    private int responseCid; // 响应sid
    private int sid;

    public YYProtoURI(int requestCid, int responseCid, int sid) {
        this.requestCid = requestCid;
        this.responseCid = responseCid;
        this.sid = sid;
    }

    public YYProtoURI(int requestCid, int sid) {
        this.requestCid = requestCid;
        this.sid = sid;
    }

    public int getRequestURI() {
        return requestCid << 8 | sid;
    }

    public int getResponseURI() {
        return responseCid << 8 | sid;
    }

}
