package com.yy.ent.tvbar.common.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashSet;
import java.util.Properties;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

/**
 * 
 * 获取管理员信息
 * 
 * @author Allen.Li
 *
 */
public class AdminInfoHelpler {
	
	private static Logger log = Logger.getLogger(AdminInfoHelpler.class);
	
	private static final int REFRESH_TIME = 5 * 60 * 1000;
	private static volatile long readFileTime = 0L;
	private static volatile long lastModified = 0L;
	private static AdminInfoHelpler instance = null;
	private static String fileName;

	private static final Set<String> uidsSetForIdol = new HashSet<String>();
	private static final Set<String> uidsSetForClient = new HashSet<String>();
	
	private static Properties p = new Properties() ;




	/**
	 * 构造函数
	 */
	private AdminInfoHelpler() {
		readFileTime = System.currentTimeMillis();
	}
	
	/**
	 * 获取唯一实例
	 * @return
	 */
	public  static AdminInfoHelpler getInstance() {
		if (instance == null) {
			instance = new AdminInfoHelpler();
		} else if (instance != null
				&& System.currentTimeMillis() - readFileTime > REFRESH_TIME) {
			if (instance.fileHasChange()) {
			    instance.readAdminInfo();
			    readProperties(fileName);
			}
		}
		return instance;
	}

    public void init(String filePath){
        fileName = filePath;
        instance.readAdminInfo();
        readProperties(fileName);
      
    }
	
	/**
	 * 文件是否修改
	 * @return
	 */
	private  boolean fileHasChange() {
		File file = new File(fileName);
		long nowlastModified = file.lastModified();
		if (nowlastModified != lastModified) {
			log.info("the file had modified,reading file:" + fileName);
			lastModified = nowlastModified;
			return true;
		}
		return false;
	}
	
    /**
     * 读取配置文件
     * @param config
     * @return
     */
	private  Properties getProperties(String config){
		Properties props = new Properties();
        try {
            props.load(new FileInputStream(config));
        } catch (IOException e) {
        	log.warn("getProperties error", e);
        }
        return props;
	}
	
	/**
	 * 读取管理员列表
	 */
    private  void readAdminInfo() {
    	Properties props = getProperties(fileName);
    	String adminList = (String) props.get("agency.admin.list");
    	String clientList = (String) props.get("client.admin.list");
    	if (!StringUtils.isEmpty(adminList)) {
    		uidsSetForIdol.clear();
			String[] uids = adminList.split(",");
			for (String uid : uids) {
				uidsSetForIdol.add(uid);
			}
			readFileTime = System.currentTimeMillis();
		}
    	if (!StringUtils.isEmpty(clientList)) {
    		uidsSetForClient.clear();
			String[] uids = clientList.split(",");
			for (String uid : uids) {
				uidsSetForClient.add(uid);
			}
			readFileTime = System.currentTimeMillis();
		}
    }
    
    public  String readMobWhiteList(){
    	Properties props = getProperties(fileName);
    	return (String) props.get("mob.white.list")==null?"":(String) props.get("mob.white.list");
    }

    public Set<String> getUidssetforIdol() {
		return uidsSetForIdol;
	}

	public Set<String> getUidssetforclient() {
		return uidsSetForClient;
	}
	
    /**
     * 读取配置文件
     * @param config
     * @return
     */
    private static  void readProperties(String config){ 
        try {
            p.load(new FileInputStream(config));
        } catch (IOException e) {
        	log.warn("readProperties error", e);
        }       
    }   
	
	/**返回配置内容的value
     * @Author HuangJunHua(victor)
     * @param key
     * @return
     * String
     * 2015年4月27日 下午2:14:28
     */
    public String getProperty(String key){
         return p.getProperty(key);
    }
    
    /**返回整个配置文件的信息
     * @Author HuangJunHua(victor)
     * @return
     * Properties
     * 2015年4月27日 下午2:30:30
     */
    public Properties getProperties(){
        return p ;
    } 
    
   
    
}
