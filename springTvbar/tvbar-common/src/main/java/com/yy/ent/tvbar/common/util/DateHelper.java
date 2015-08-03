package com.yy.ent.tvbar.common.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import org.apache.log4j.Logger;

/**
 * 
 * 时间工具类. <p>
 * 
 * @author Allen.Li
 *
 */
public class DateHelper {
	
	private static Logger log = Logger.getLogger(DateHelper.class);
	
	public static final String TIME_FORMAT = "HH:mm:ss";
	public static final String DATE_FORMAT = "yyyy-MM-dd";
	public static final String DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
	
	public static final String CN_TIME_FORMAT = "HH时mm分ss秒";
	public static final String CN_DATE_FORMAT = "yyyy年MM月dd日";
	public static final String CN_DATETIME_FORMAT = "yyyy年MM月dd日 HH时mm分ss秒";
	
    public static final String DAY_TIME_START_FORMAT = " 00:00:00";
    public static final String DAY_TIME_END_FORMAT = " 23:59:59";
    
    public static final String FULL_DATETIME_FORMAT = "yyyyMMddHHmmssSSS";
	
    public static Date toDate(String date){
    	return parseDate(date,DATE_FORMAT);
    }
    
    public static Date toTime(String date){
    	return parseDate(date,TIME_FORMAT);
    }
    
    public static Date toDateTime(String date){
		return parseDate(date.trim(),DATETIME_FORMAT);
    }
    
    public static String toDateSTR(Date date){
    	return formatDate(date,DATE_FORMAT);
    }
    
    public static String toTimeSTR(Date date){
    	return formatDate(date,TIME_FORMAT);
    }
    
    public static String toDateTimeSTR(Date date){
    	return formatDate(date,DATETIME_FORMAT);
    }
    
    public static String formatDate(Date date,String fmt){
    	SimpleDateFormat format = new SimpleDateFormat(fmt);
    	if(date!=null){
    		try{
    			return format.format(date);
    		}catch(Exception e){
    			log.warn("时间解析错误：" , e);
    			return "";
    		}
    	}
    	return "";
    }
    
    public static Date parseDate(String date,String fmt){
    	SimpleDateFormat format = new SimpleDateFormat(fmt);
    	try {
			return format.parse(date);
		} catch (ParseException e) {
			log.warn("时间解析错误：" , e);
		}
    	return null;
    }
    
    public static String getDateSTR() {
		return getDateSTR(0);
	}

	/**
	 * 根据long值得到日期
	 * 
	 * @param time
	 * @return
	 */
	public static String getDateSTR(long time) {
		String pattern = "yyyy-MM-dd";
		Date date = new Date();
		if (time > 0) {
			date.setTime(time);
		}
		SimpleDateFormat format = new SimpleDateFormat(pattern);
		return format.format(date);
	}

	/**
	 * 得到当前时间
	 * 
	 * @return
	 */
	public static String getTimeSTR() {
		return getTimeSTR(0);
	}

	/**
	 * 根据time值得到时间
	 * 
	 * @param time
	 * @return
	 */
	public static String getTimeSTR(long time) {
		Date date = new Date();
		if (time > 0) {
			date.setTime(time);
		}
		SimpleDateFormat format = new SimpleDateFormat(DATETIME_FORMAT);
		return format.format(date);
	}
	
	/**
	 * 得到星期几
	 * @return
	 */
	public static String getWeekDay() {
		String[] names = { "天", "一", "二", "三", "四", "五", "六" };
		java.util.Calendar cal = java.util.Calendar.getInstance();
		int day = cal.get(Calendar.DAY_OF_WEEK) - 1;
		return names[day];
	}
	
	/**
	 * 判断字符串是否为正确的日期格式
	 * 
	 * @param str
	 * @return 是否合法日期格式
	 */
	public static boolean isDate(String str) {
		String regex = "^[0-9]{4}\\-[0-9]{1,2}\\-[0-9]{1,2}$";
		return str.matches(regex);
	}

	/**
	 * 判断字符串是否为正确的时间格式
	 * 
	 * @param str
	 * @return 是否合法时间格式
	 */
	public static boolean isTime(String str) {
		String regex = "^[0-9]{2}:[0-9]{1,2}:[0-9]{1,2}$";
		return str.matches(regex);
	}

	/**
	 * 判断字符串是否为正确的日期 + 时间格式
	 * 
	 * @param str
	 * @return 是否合法日期 + 时间格式
	 */
	public static boolean isDateTime(String str) {
		String regex = "^[0-9]{4}\\-[0-9]{1,2}\\-[0-9]{1,2} [0-9]{4}\\-[0-9]{1,2}\\-[0-9]{1,2}$";
		return str.matches(regex);
	}
	
    /**
     * 返回时间戳
     * @param dateStr
     * @param format
     * @return
     */
    public Long getTime(String dateStr,String format){
    	Date date = parseDate(dateStr, format);
    	return date==null?0l:date.getTime();
    }
    
    /**
     * 获取N分钟前的时间
     * 
     * @param num
     * @return
     */
    public static String getLastMinute(int num){
    	int times = num * 60 * 1000;
    	long ms = new Date().getTime();
    	long ns = ms - times;
    	Calendar cal = Calendar.getInstance();
    	cal.setTimeInMillis(ns);
    	Date date = cal.getTime();
    	return toDateTimeSTR(date);
    }
    
    /**
     * 在日期上增加数个整月
     * 
     * @param date
     * @param n
     * @return
     */
    public static Date addMonth(Date date, int n) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.MONTH, n);
        return cal.getTime();
    }
    
    /**
     * 在日期上增加数个小时
     * 
     * @param date
     * @param n
     * @return
     */
    public static Date addHour(Date date, int n) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.HOUR, n);
        return cal.getTime();
    }
    
    /**
     * 在日期上增加数分钟
     * 
     * @param date
     * @param n
     * @return
     */
    public static Date addMinutes(Date date, int n) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.MINUTE, n);
        return cal.getTime();
    }
    
    /**
     * 创建日期date
     * 
     * @param year：年
     * @param month：月
     * @param day：日
     * @return
     */
    public static Date createDate(int year,int month,int day){
    	Calendar calendar = Calendar.getInstance();
    	calendar.set(year, month, day);
    	return calendar.getTime();
    }
    
    /**
     * 获取两个日期之间所差的天数
     * 
     * @param from：开始日期
     * @param to：结束日期
     * @return：所差的天数(非负整数)
     */
    public static int diffDay(Date from, Date to) {
    	Calendar calendar = Calendar.getInstance();
    	calendar.setTime(from);
    	calendar.set(Calendar.HOUR, 0);
    	calendar.set(Calendar.MINUTE, 0);
    	calendar.set(Calendar.SECOND, 0);
    	Date fromDate = calendar.getTime();
    	calendar.setTime(to);
    	calendar.set(Calendar.HOUR, 0);
    	calendar.set(Calendar.MINUTE, 0);
    	calendar.set(Calendar.SECOND, 0);
    	Date toDate = calendar.getTime();
        int day = Math.abs((int) ((fromDate.getTime() - toDate.getTime()) / (24 * 3600 * 1000)));
        return day;
    }
    
    /**
     * 计算两个时间的差值(分钟)
     * 
     * @param dateA
     * @param dateB
     * @return long seconds
     */
    public static long diffTime(Date dateA,Date dateB) {
        long seconds = 0;
        seconds = (dateA.getTime() - dateB.getTime()) / 1000;
        return seconds;
    }
    
    /**
     * 给定的时间增加N分钟后，和当前时间比较
     * 
     * @param date
     * @param minutes date加上当前分数
     * @param target 比较时间
     * @return
     */
    public static boolean isBeforeNow(Date date,int minutes) {
    	if(date==null || minutes<=0){return false;}
    	Date nDate = addMinutes(date, minutes);
    	return nDate.before(new Date());
    }
    
    /**
     * 获取n天后的日期
     * 
     * @param date
     * @param nDay
     * @return
     */
    public static Date getNextDate(Date date, int nDay){
        return getDate(date, nDay, true);
    }
    
    /**
     * 获取n天前的日期
     * @param date
     * @param nDay
     * @return
     */
    public static Date getLastDate(Date date, int nDay){
        return getDate(date, nDay, false);
    }
    
    /**
     * 获取date前或后nDay天的日期
     * 
     * @param date：开始日期
     * @param nDay：天数
     * @param isAdd：是否增加天数
     * @return
     */
    private static Date getDate(Date date, int nDay, boolean isAdd){
        long millisecond = date.getTime(); //从1970年1月1日00:00:00开始算起所经过的微秒数
        if(nDay<0) nDay = 0;
        long msel = nDay * 24 * 3600 * 1000l; //获取nDay天总的毫秒数
        millisecond = millisecond + ((isAdd) ? msel : (-msel));
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(millisecond);
        return calendar.getTime();
    }
    
    /**
	  * 得到本周周日 
	  * @return yyyy-MM-dd
	  */
	public static String[] currentWeekTime(Date time) {
		String[] weekTime = new String[2];
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");  
		Calendar cal = Calendar.getInstance();  
		cal.setTime(time);
		int dayWeek = cal.get(Calendar.DAY_OF_WEEK);
		if(dayWeek == 1) {
		    cal.add(Calendar.DAY_OF_MONTH, -1);  
		}  
		cal.setFirstDayOfWeek(Calendar.MONDAY);
		int day = cal.get(Calendar.DAY_OF_WEEK);  
		cal.add(Calendar.DATE, cal.getFirstDayOfWeek()-day); 
		String startTime = sdf.format(cal.getTime()).concat(" 00:00:00");  
		cal.add(Calendar.DATE, 6);  
		String endTime = sdf.format(cal.getTime()).concat(" 23:59:59"); 
		weekTime[0] = startTime;
		weekTime[1] = endTime;
		return weekTime;
	}
	
	/**
	 * 获取本周所有日期
	 * @return
	 */
	public static List<String> getWeekDays() {
		return getWeekDays(new Date());
   }
	
   /**
    * 根据日期获得所在周的日期 
    * @param mdate
    * @return
    */
   @SuppressWarnings("deprecation")
   public static List<String> getWeekDays(Date date) {
       int day = date.getDay();
       Date tempDate;
       List<String> list = new LinkedList<String>();
       Long fTime = date.getTime() - day * 24 * 3600000;
       for (int a = 1; a <= 7; a++) {
    	   tempDate = new Date();
    	   tempDate.setTime(fTime + (a * 24 * 3600000));
           list.add(a-1, formatDate(tempDate,"yyyyMMdd"));
       }
       return list;
   }
	 
   /**
    * 获取今天是当年第多少周
    * @return
    */
   public static String getWeekOfYear() {
	   Calendar cal=Calendar.getInstance(); 
	   cal.setTime(new Date());
	   return String.valueOf(cal.get(Calendar.WEEK_OF_YEAR));
   }
   
   /**
    * 计算是星期几
    * @param time
    * @return
    * @throws Exception
    */
   public static int getDayOfWeek(String time) throws Exception {
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Calendar c = Calendar.getInstance();
		c.setTime(format.parse(time));
		int dayForWeek = 0;
		if (c.get(Calendar.DAY_OF_WEEK) == 1) {
			dayForWeek = 7;
		} else {
			dayForWeek = c.get(Calendar.DAY_OF_WEEK) - 1;
		}
		return dayForWeek;
   }
    
}