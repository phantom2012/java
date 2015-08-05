package com.yy.ent.tvbar.common.util;

import java.lang.reflect.Field;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;

import com.yy.ent.tvbar.common.constants.Constants;
import net.sf.json.JSONObject;

import org.apache.commons.lang3.StringUtils;

import com.yy.ent.commons.base.date.SysDateTime;
import com.yy.ent.commons.base.dto.Property;
import com.yy.ent.commons.base.valid.BlankUtil;

/**
 * 类说明：;
 *
 * @create:创建时间：2013-7-18 下午5:07:54
 * @author:<a href="mailto:chenxu@yy.com">陈顼</a>
 * @version:v1.00
 */
public class CommonUtils {


	public static String textOmitor(String text, int width, String suffix){
		int e = 7;
		int c = 12;
		int intCount = 0;
		int i = 0;
		boolean flag = false;
		if(!BlankUtil.isBlank(suffix)){
			intCount +=10;
		}
		for (; Math.min(i, text.length()) != text.length(); i++) {
			if (text.charAt(i) > 255) {
				intCount += c;
			} else {
				intCount += e;
			}
			if (intCount > width) {
				flag = true;
				break;
			}
		}
		String result = text.substring(0, i);
		if(flag && !BlankUtil.isBlank(suffix))
			result +="....";
		return result;
	}

	public static List<Property> dtoPropertyListTransfer(List<com.yy.ent.commons.base.dto.Property> list) {
		List<Property> retList = new ArrayList<Property>();
		for(com.yy.ent.commons.base.dto.Property p : list){
			Property prop = new Property();
			prop.putAll(p);
			retList.add(prop);
		}
		return retList;
	}



	public static List<com.yy.ent.commons.base.dto.Property> voPropertyListTransfer(List<Property> list) {
		List<com.yy.ent.commons.base.dto.Property> retList = new ArrayList<com.yy.ent.commons.base.dto.Property>();
		for(Property p : list){
			com.yy.ent.commons.base.dto.Property prop = new com.yy.ent.commons.base.dto.Property();
			prop.putAll(p);
			retList.add(prop);
		}
		return retList;
	}

	public static JSONObject string2json(String result, String regex) {
		JSONObject json = new JSONObject();
		String[] a = result.split(regex);
		for(String kv : a){
			String[] kva = kv.split("=");
			if(kva.length < 2){
				continue;
			}
			json.put(kva[0], kva[1]);
		}
		return json;
	}

	public static String getDateTime() {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
		String dt = formatter.format(new java.util.Date());
		return dt;
	}

	public static String getAstro(String birthday){
		String[] a = birthday.split("-");
		int month = Integer.valueOf(a[0]);
		int day = Integer.valueOf(a[1]);
	    String s = "魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
	    Integer[] arr = {20,19,21,20,21,22,23,23,23,24,23,22};
	    int start = month * 2 - (day < arr[month - 1] ? 2 : 0);
	    return s.substring(start, start + 2);
	}

	public static Property string2property(String str) {
		Property p = new Property();
		if(StringUtils.isEmpty(str)) return p;
		JSONObject json = JSONObject.fromObject(str);
		@SuppressWarnings("unchecked")
		Iterator<String> it = json.keys();
		while(it.hasNext()){
			String key = it.next();
			p.put(key, json.getString(key));
		}
		return p;
	}

	/**
	 * 检查表单，如果key存在，form如果出现key，则返回false
	 * @param form
	 * @param objectClass
	 * @param key
	 * @return
	 */
	public static Property checkForm(com.yy.ent.commons.base.dto.Property form,Class objectClass,String key)throws Exception{
		Field[] fields = objectClass.getFields();
		Property result = null;
		if(fields != null){
			result = new Property();
			for(Field field : fields){
				String fieldName = field.getName();
				String fieldValue = field.get(null).toString();
				if(fieldName.equals("TABLE")){
					continue;
				}
				if(key != null && key.equals(fieldValue) ){
					if(form.get(fieldValue)!=null)
						return null;
					continue;
				}
				if(StringUtils.isEmpty(form.get(fieldValue))){
					return null;
				}
				result.put(fieldValue, form.get(fieldValue));
			}
		}
		return result;
	}

	public static void main(String[] args)throws Exception {
		String hello = "fdsfs";
		System.out.println(String.class==hello.getClass());
	}

	/**
	 * 获取时间的格式
	 * @param date
	 * @param pattern
	 * @return
	 */
	public static String getDateStrByPattern(Date date,String pattern){
		SimpleDateFormat formatter = new SimpleDateFormat(pattern);
		String dt = formatter.format(date);
		return dt;
	}

	/**
	 * 是否昨天
	 * @param time
	 * @return
	 * @throws ParseException
	 */
	public static boolean isYesterday(String time) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date d1 = sdf.parse(time);
		Calendar c1 = Calendar.getInstance();
		c1.setTime(d1);
		c1.add(Calendar.DAY_OF_MONTH, 1);
		d1 = c1.getTime();

		Calendar c2 = Calendar.getInstance();
		Date d2 = sdf.parse(sdf.format(c2.getTime()));

		if(d1.equals(d2)){
			return true;
		}
		return false;
	}
	
	/**
	 * 获取直播状态 
	 * @return
	 * @throws Exception
	 */
	public static int getLiveStatus() throws Exception{
		String date = DateHelper.getDateSTR();
	    String start = date + " 19:30:00";
	    String end = date + " 20:31:00";
	    int num = DateHelper.getDayOfWeek(date);
	    if(num==5){
	    	Date dTime =  SysDateTime.getDate(start);
	    	Date eTime = SysDateTime.getDate(end);
	    	Date now = new Date();
	    	if(now.after(dTime) && now.before(eTime)){
	    		return 1;
	    	}
	    }
	    return 0;
	}
	
	
	/**
	 * 获得今天的剩余时间
	 * @param timeUnit 只接受 MICROSECONDS , MINUTES,SECONDS
	 * @return
	 */
	public static  Long todayLeftTime(TimeUnit timeUnit){
		/**
		 * 获得用户消息缓存过期时间：一天中剩余的时间
		 * @return
		 */
		long left = Constants.DAY_MILLISECONDE-(System.currentTimeMillis()+ Constants.EIGHT_HOUR_MILLISECODES)%Constants.DAY_MILLISECONDE;
		switch(timeUnit){
			case SECONDS : return left/1000;
			case MINUTES : return left/1000/60;
			default: return left;
		}
	}
	
	/**
	 * 获得真实的ip
	 * @param request
	 * @return
	 * @throws Exception
	 */
	public static String getRemoteIP(HttpServletRequest request)throws Exception{
		String ipString = request.getHeader("X-Real-IP");
		if(StringUtils.isEmpty(ipString)){
			ipString = request.getHeader("X-Forwarded-For");
			if(StringUtils.isEmpty(ipString)){
				ipString = request.getRemoteAddr();
			}
		}
		
		if(ipString.indexOf(Constants.COMMA_STRING)>-1){
			ipString = ipString.split(Constants.COMMA_STRING)[0];
		}
		return ipString;
	}
	/**
	 * 将list转换为string，以参数splitStr分割
	 * @param list
	 * @param splitStr
	 * @return
	 * @throws Exception
	 */
	
	public static String list2String(List<String> list ,String splitStr)throws Exception{
		if(BlankUtil.isBlank(list)){
			return null;
		}
		StringBuilder result = new StringBuilder();
		for(int index = 0;index<list.size();index++){
			if(index==list.size()-1){
				result.append(list.get(index));
			}else{
				result.append(list.get(index)).append(splitStr);
			}
		}
		return result.toString();
	}

    public static String replaceAuote(String s){
        if(s == null){
            return "";
        }
        return s.replaceAll("\"","\\\\\"");
    }
}
