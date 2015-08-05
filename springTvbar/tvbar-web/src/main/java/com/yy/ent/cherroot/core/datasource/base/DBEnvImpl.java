package com.yy.ent.cherroot.core.datasource.base;

import com.yy.ent.cherroot.core.datasource.DBConnFactory;
import com.yy.ent.cherroot.core.datasource.DBEnv;
import com.yy.ent.cherroot.core.datasource.DBServerInfo;
import com.yy.ent.cherroot.core.datasource.MapObjectPool;
import com.yy.ent.cherroot.exception.CherrootException;
import com.yy.ent.commons.base.timelogger.TimerLogger;
import com.yy.ent.commons.base.valid.BlankUtil;
import org.apache.commons.pool.impl.GenericObjectPool;
import org.apache.log4j.Logger;

import java.net.URLEncoder;
import java.sql.Connection;
import java.sql.SQLNonTransientConnectionException;
import java.util.HashMap;
import java.util.Map;

/**
 * 
 * 类说明：初使化数据库连接池;
 *
 * @create:创建时间：2013-2-26 上午11:09:36
 * @author:<a href="mailto:chenxu@yy.com">陈顼</a>
 * @version:v1.00
 */
public class DBEnvImpl extends DBServerInfo implements DBEnv
{
    private static Logger m_logger = Logger.getLogger(DBEnvImpl.class);
    
    /**
     * 保存jdbc url字符串
     */
    private Map<Integer, String> urls = new HashMap<Integer, String>();
    
    /**
     * 获得当前key所hash到的DB url
     * @param key
     * @return
     */
    public String getURL(String key)
    {
        Integer index = _hashIndex(key);
        return urls.get(index);
    }

    /**
     * 分布式的连接池
     */
    private MapObjectPool m_dbpool = new MapObjectPool();
    
    /**
     * 获取数据库连接
     * 
     * @param index 数据库索引
     * @return
     * @throws Exception
     */
    public Connection borrowConn(int index)
        throws Exception
    {
        // int index = _hashIndex(key);
        try{
            return (Connection)m_dbpool.borrowObject(index);
        }catch (SQLNonTransientConnectionException e) {
            throw new CherrootException(urls.get(index), e);
        }
    }
    
    /**
     * 返回数据库连接
     * 
     * @param index 数据库索引
     * @param conn 数据库连接
     * @throws Exception
     */
    public void returnConn(int index, Connection conn)
        throws Exception
    {
        m_dbpool.returnObject(index, conn);
    }
    
    /**
     * 获取数据库连接
     * 
     * @param key 均衡值
     * @return
     * @throws Exception
     */
    public Connection borrowConn(String key)
        throws Exception
    {
        try{
            int index = 0;
            if(!BlankUtil.isBlank(key)){
                index = _hashIndex(key);
            }
            if (m_logger.isDebugEnabled()) {
                m_logger.debug("key " + key + "'s hash result is: " + index);
            }
            TimerLogger.startTime("borrowConn", "db borrow conn,index=" + index);
            Connection ret = (Connection)m_dbpool.borrowObject(index);
            TimerLogger.endTime("borrowConn");
            return ret;
        }catch (SQLNonTransientConnectionException e) {
            throw new CherrootException(getURL(key), e);
        }
        //  m_logger.debug("------------borrowConn: " + index);
    }
    
    /**
     * 返回数据库连接
     * 
     * @param key 均衡值
     * @param conn 数据库连接
     * @throws Exception
     */
    public void returnConn(String key, Connection conn)
        throws Exception
    {   int index = 0;
        if(!BlankUtil.isBlank(key)){
            index = _hashIndex(key);
        }
        if (m_logger.isDebugEnabled()) {
            m_logger.debug("key " + key + "'s hash result is: " + index);
        }
        m_dbpool.returnObject(index, conn);
    
    }
    
    /**
     * 初始化连接池
     * 
     */
    public void initPool() throws Exception{
        for(DBServerInfo serverInfo : DBConfig.mutiServerInfo){
            Class.forName("com.mysql.jdbc.Driver");
            int index = serverInfo.getDbIndex();
            int maxActive = serverInfo.getMaxActive();
            int minIdle =  serverInfo.getMinIdle();
            int maxIdle = serverInfo.getMaxIdle();
            String user = serverInfo.getUsername();
            String passwd = serverInfo.getPasswd();
            //DBConfigDecrypt dbDecrypt = new DBConfigDecrypt();
            //passwd = dbDecrypt.dbPasswdDecrypt(passwd);
            String url = serverInfo.getUrl();
            url+="?user="+user+"&password="+URLEncoder.encode(passwd, "UTF-8")+"&useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&useAffectedRows=true";
            DBConnFactory f = new DBConnFactory(url);
            @SuppressWarnings({ "rawtypes", "unchecked" })
            GenericObjectPool pool = new GenericObjectPool(f);
            pool.setMaxActive(maxActive);
            pool.setMinIdle(minIdle);
            pool.setMaxIdle(maxIdle);
            pool.setTestWhileIdle(true);
            //10分钟检查一次
            pool.setTimeBetweenEvictionRunsMillis(1000L * 60L * 10);
            m_dbpool.putObjectPool(index, pool);
        }
        m_logger.info("init datasource complete!");
    }
    
    @Override
    public void loadConfig(String filePath) throws Exception {
        DBConfig.loadConfig(filePath);
        initPool();
    }
    
    /**
     * 数据库索引大小
     * 
     * @return
     */
    public int indexSize()
    {
        return m_dbpool.size();
    }
    
    /**
     * 分布式数据库水平切分哈希index
     * 
     * @param id
     * @return
     */
    private int _hashIndex(String id)
    {
        long hash = 5381;
        for(int i = 0; i < id.length(); i++)
        {
            hash = ((hash << 5) + hash) + id.charAt(i);
            hash = hash & 0xFFFFFFFFl;
        }
        
        int index = (int)hash % m_dbpool.size();
        index = Math.abs(index);
        
        return index;
    }
    
    public String getDBPoolStatus()
    {
        return "\n db pool status:\n"+m_dbpool.getPoolsStatus();
    }
    
    // 测试
    public static void main(String[] args)
        throws Exception
    {
        for(int dd = 0; dd < 1000; dd++)
        {
            String id = "46721710";
            long hash = 5381;
            for(int i = 0; i < id.length(); i++)
            {
                hash = ((hash << 5) + hash) + id.charAt(i);
                hash = hash & 0xFFFFFFFFl;
            }
            
            int index = (int)hash % 6;
            index = Math.abs(index);
            System.out.println(index);
        }
        
    }
}
