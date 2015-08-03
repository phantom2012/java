package com.yy.ent.tvbar.common.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.log4j.Logger;

/**
 * Created by xieyong on 2014/10/17.
 */
public class TimeUtil {

    /**
     * 获得当前日期 日期格式为 yyyyMMdd
     *
     * @return
     */

    private static Logger logger = Logger.getLogger(TimeUtil.class);

    public static String getYYYYMMDD() {
        Calendar c = Calendar.getInstance();
        Date date = c.getTime();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        return sdf.format(date);
    }


    /**
     * 格式化为时间格式 为yyyy-MM-dd HH:mm:ss的日期
     *
     * @return
     */
    public static Date parseTimeDate(String time) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return formatter.parse(time);
    }

    /**
     * 格式化为时间格式 为yyyy-MM-dd 的日期
     *
     * @return
     */
    public static Date parseDate(String time) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        return formatter.parse(time);
    }

    /**
     * 格式化时间为 yyyy-MM-dd格式
     *
     * @param date
     * @return
     */
    public static String formatDate(Date date) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        return formatter.format(date);
    }

    public static String formatTimeEx(Date date) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return formatter.format(date);
    }

    /**
     * 减去 minus 个星期
     *
     * @return
     * @throws ParseException
     */
    public static Date minusWeekDate(int minus, Date date) throws ParseException {
        int days = minus * 7;
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DAY_OF_WEEK_IN_MONTH, minus);
        return cal.getTime();
    }




    /**
     * 获得两个时间之间的相差的分钟数
     *
     * @param d1
     * @param d2
     * @return
     */
    public static long getMinutesBetween(Date d1, Date d2) {

        long diff = d1.getTime() - d2.getTime();
        long nd = 1000 * 24 * 60 * 60;//一天的毫秒数
        long nh = 1000 * 60 * 60;//一小时的毫秒数
        long nm = 1000 * 60;//一分钟的毫秒数
        long min = diff / nm;//计算差多少分钟
        return min;

    }

    public static String getBeforeTime(long beforeMillTime) {
        Long beforeMillis = System.currentTimeMillis() - beforeMillTime;
        SimpleDateFormat formatUtil = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String nowTime = formatUtil.format(beforeMillis);
        logger.info("before time is: " + nowTime);
        return nowTime;
    }

    public static Date getCurrentDate(){
    	Calendar c = Calendar.getInstance();
        c.setTime(new Date());
    	return c.getTime();
    }


    public static void main(String[] args) throws ParseException {
        Date deadLineDate = TimeUtil.parseTimeDate("2014-10-28 11:55:00");
        int t = deadLineDate.compareTo(new Date());
        if(t > 0){
            System.out.printf("current date less than deadLine date");
        }else{
            System.out.printf("current more than deadLine date");

        }
    }
}
