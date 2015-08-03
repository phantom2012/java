package com.yy.ent.tvbar.common.constants;

/**
 * 系统级常量
 * Created by xieyong on 2014/11/6.
 */
public class Constants {

    /**
     * ipWhiteList.xml对应的PC服务器的key*
     */
    public final static String PC_KEY = "pc";

    /**
     * ipWhiteList.xml对应的MOBILE服务器的key*
     */
    public final static String MOBILE_KEY = "mobile";

    public final static int EVIDENCE_MORECNT = 3;    //一次更多证据结果数

    public final static int REPLY_MORECNT = 10;    //一次更多回复数

    public final static int VIEWPOINT_MORECNT = 3;    //一次更多观点结果数

    public final static int TOPIC_MORECNT = 10;    //一次更多话题结果数


    /**
     * 时间格式：yyyy-MM-dd HH:mm:ss
     */
    public final static String DATEPATTERN1 = "yyyy-MM-dd HH:mm:ss";
    /**
     * 时间格式：yyyy-MM-dd HH:mm
     */
    public final static String DATEPATTERN2 = "yyyy-MM-dd HH:mm";
    /**
     * 时间格式：HH:mm
     */
    public final static String DATEPATTERN3 = "HH:mm";

    /**
     * 时间格式：yyyy-MM-dd
     */
    public final static String DATEPATTERN4 = "yyyy-MM-dd";

    /**
     * 时间格式：MM-dd HH:mm
     */
    public final static String DATEPATTERN = "MM月dd日 HH:mm";

    /**
     * 一天的时间（毫秒表示）
     */
    public final static long DAY_MILLISECONDE =  86400000L;
    /**
     * 8个小时的时间（毫秒表示）
     */
    public final static long EIGHT_HOUR_MILLISECODES = 28800000L;


    /**
     * 1个小时的时间（毫秒表示）
     */
    public final static long ONE_HOUR_MILLISECODES = 3600000L;

    /**
     * 1分钟的时间（毫秒表示）
     */
    public final static long ONE_MUNITE_MILLISECODES = 60000L;


    /**
     * 1天的时间（秒表示）
     */
    public static final int DAY_SECOND = 60 * 60 * 24;

    /**
     * 逗号字符
     */
    public final static String COMMA_STRING  = ",";

    /**
     * true字符
     */
    public final static String TRUE_STRING  = "true";

    /**
     * false字符
     */
    public final static String FALSE_STRING  = "false";




    /**
     * redis true
     */
    public final static String REDIS_TRUE = "1";

    /**
     * redis false
     */
    public final static String REDIS_FALSE = "0";


    /**
     * 月份英文缩写
     */
    public final static String [] MONTH_ENGLISH_ABB= {"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"};

    /**
     * 星期英文缩写
     */
    public final static String [] WEEK_ENGLISH_ABB= {"Mon","Tues","Wed","Thur","Fri","Sat","Sun"};


    /**
     * 默认推荐位数量
     */
    public final static int DEFAULTORDERSIZE = 6 ;
    
    public final static int DEFAULTORDER = 0 ;
    
    /**正则表达式
     * @author suzhihua
     * @date 2015年3月25日 下午2:17:28
     */
    public final static class REG{
        
        /**邮件 */
        public final static String EMAIL= "^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$";
    }

    public final static String PAGENUM = "1";
    
    public final static String PAGESIZE = "20";
    
    public final static String ACTION_NAME_PREFIX = "agency_" ;
    
    public final static String CACHE_KEY_PREFIX = "agency_" ;
    
    public final static int DEFAULT_ORDER_PAGE_SIZE = 10 ;

  //昵称常量
    public final static String [] NICK= {"逗比","禽兽","大锤","隔壁小孩","大黄","山炮","帅锅","帅比","美女","饭桶"};

}
