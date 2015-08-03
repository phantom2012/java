package com.yy.ent.tvbar.common.util;

import java.io.FileInputStream;
import java.util.Properties;

import com.yy.ent.commons.base.valid.CommUtil;

public class QrCodeConfigeLoader {
	 private static Properties properties;
	 
	 public static void init(String config) throws Exception {
        properties = new Properties();
        if (config.toLowerCase().endsWith(".xml")) {
            properties.loadFromXML(new FileInputStream(config));
        } else {
            properties.load(new FileInputStream(config));
        }
	}
	 
	 /**
     * 取配置文件中某个key的值
     * @param key 键名
     * @return
     * @throws Exception
     */
    public static String getKeyValue(String key) throws Exception {
        if(null != properties.get(key)) {
            return String.valueOf(properties.get(key)).trim();
        }
        return null;
    }
    
    public static int getImgWidth() throws Exception {
    	String value = getKeyValue("img_width");
    	if(CommUtil.isAllNumeric(value)) {
    		return Integer.parseInt(value);
    	}
    	return 0;
    }
    public static int getImgHeight() throws Exception {
    	String value = getKeyValue("img_height");
    	if(CommUtil.isAllNumeric(value)) {
    		return Integer.parseInt(value);
    	}
    	return 0;
    }
    
    public static String getUrl() throws Exception {
    	return getKeyValue("url");
    }
    public static String getVisitUrlPrefix() throws Exception {
    	return getKeyValue("visit_url_prefix");
    }
    public static String getDestPath() throws Exception {
    	return getKeyValue("dest_path");
    }
    
}
