package com.yy.ent.tvbar.common.constants;

/**
 * 定义异常编码 Created by xieyong on 2014/11/6.
 */
public class ErrorCode {

    // 参数错误
    public static final int PARAM_ERROR = 1001;

    // 参数为空
    public static final int PARAM_BLANK = 1002;
    
    public static final int GETTAGSFAIL = 1005 ;

    // 客户端请求与语法错误
    public static final int REQUEST_ERROR = 400;

    // 服务器收到请求，但是拒绝提供服务
    public static final int REQUEST_FORBIDDEN = 403;

    // 未找到资源
    public static final int NOT_FOUND = 404;

    // 服务器发生了不可预期的错误
    public static final int SERVER_ERROR = 500;

    // 服务器当前不能处理客户端的请求
    public static final int SERVER_UNAVAILABLE = 503;

    // 减票失败
    public static final int DECR_TICKETS_ERROR = 3001;

    // 不能投票,项目已借宿或未到目标
    public static final int VOTE_ERROR = 3002;

    // 今日登录已加票
    public static final int LOGIN_TICKETS_LIMIT_ERROR = 3003;

    // 分享得票数超过50票上限
    public static final int SHARE_TICKETS_LIMIT_ERROR = 3004;

    // 直播得票数超过10票上限
    public static final int BROADCAST_TICKETS_LIMIT_ERROR = 3005;

    // 今日歌曲点赞已加票
    public static final int LOVE_SONG_TICKETS_LIMIT_ERROR = 3014;

    // 加票异常
    public static final int ADD_TICKETS_ERROR = 3006;

    // 项目状态异常
    public static final int PROJECT_STATUS_ERROR = 3007;

    // 加密串为空异常
    public static final int ENCRYPTION_STR_ERROR = 3008;

    // 直播间停留加票时间未达到
    public static final int BROADCAST_REMAIN_ERROR = 3009;

    // 加票类型不正确
    public static final int ADD_TICKETS_TYPE_ERROR = 3010;

    // uid 为空
    public static final int UID_NULL = 3011;

    // 项目编码为空
    public static final int PROJECT_ID_NULL = 3012;

    // 解码的项目编码和传入的参数不一致
    public static final int DESENCRYPT_PROJECT_ID_ERROR = 3013;

    // 歌曲未找到
    public static final int LOVE_SONG_NULL_ERROR = 3014;

    // 歌曲已点赞
    public static final int LOVE_SONG_ALREADY_ERROR = 3015;

    // 该链接已分享
    public static final int SHARE_LIMIT_ERROR = 3016;

    // 频道不在直播中，不能加票
    public static final int BROADCAST_NOT_LIVE_ERROR = 3017;

    // 由分享链接访问投的票，同一个被分享者只对分享者加一次票
    public static final int SHARE_TICKETS_ONE_TIME_LIMIT_ERROR = 3018;

    // 上传视频地址为空异常
    public static final int VIDEO_URL_NULL = 4001;

    /** 已存在公司记录 */
    public static final int ALREADY_EXIST_COMPANY = 5001;
    /** 不存在公司记录 */
    public static final int NOT_EXIST_COMPANY = 5002;
    /** 不存在订单 */
    public static final int NOT_EXIST_ORDER = 5003;
    /** 订单状态不对 */
    public static final int ORDER_STATUS_ERROR = 5004;
    /** 没有权限操作 */
    public static final int NO_PERMISSION = 5005;
    /** 没登录 */
    public static final int NO_LOGIN = 5006;
    /** 订单实付金额不能大于服务金额 */
    public static final int ORDER_PRICE_ERROR = 5007;
    /** 对不起，目前服务预定仅对成功完成众筹任务的YY艺人开放  */
    public static final int NOT_IN_WHITE_LIST = 5008;
    /** 没有购买此服务的权限,请先完成相应的众筹任务 */
    public static final int NOT_IS_BUY_RIGHT = 5009;
    /** 您本期已存在订单,不能再下订单 */
    public static final int HAS_EXIST_ORDER = 5010;
    /** 订单支付失败 */
    public static final int PAY_ORDER_ERROR = 5011;
    /** 余额不足 */
    public static final int PAY_ORDER_BALANCE_NOT_ENOUGH = 5016;
    /** 查询余额出错 */
    public static final int QUERY_BALANCE_ERROR = 5017;
    /** 请先完成相应的仲裁任务 */
    public static final int HAS_EXIST_ORDER_COMPLETE = 5018;
    public static final int COMID_NOT_FOUND_ERROR = 5015;
    /** 非法操作 */
    public static final int AGENCY_ERROR = 6001;
    /** 票数不足 */
    public static final int AGENCY_ORDER_NOT_ENOUGH_ERROR = 6002;
    /** 项目还未开始或者已结束 */
    public static final int AGENCY_ORDER_TIME_ERROR = 6003;


}
