package com.yy.ent.tvbar.dao.base;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Savepoint;


/**
 * 事务,开始事务后注意当前线程只能有一个conn,提交后可以再开另一个事物
 * 
 * @author suzhihua
 * @date 2015年3月25日 下午4:55:32
 */
public class Transaction {
    /** 线程变量,事务开始-结束时保存当前连接信息 */
    private static final ThreadLocal<MyConnection> LOCAL = new ThreadLocal<MyConnection>();
    private static TransactionSupportDBEnvImpl DB_ENV;

    /**
     * 设置数据库连接
     * 
     * @param dB_ENV
     * @author suzhihua
     * @date 2015年3月25日 下午6:09:43
     */
    protected static void setDB_ENV(TransactionSupportDBEnvImpl dB_ENV) {
        DB_ENV = dB_ENV;
    }

    /**
     * 取当前线程连接
     * 
     * @return
     * @author suzhihua
     * @date 2015年3月25日 下午4:55:39
     */
    protected static Connection getConnection() {
        MyConnection myConnection = LOCAL.get();
        if (myConnection != null) return myConnection.getConn();
        return null;
    }

    protected static MyConnection getMyConnection() {
        return LOCAL.get();
    }

    /**
     * 开始事务,返回当前线程连接,key=""
     * 
     * @return
     * @throws Exception
     * @author suzhihua
     * @date 2015年3月25日 下午4:55:58
     */
    public static Connection beginTransaction() throws Exception {
        return beginTransaction("");
    }

    /**
     * 开始事务,返回当前线程连接
     * 
     * @param index
     * @return
     * @throws Exception
     * @author suzhihua
     * @date 2015年3月25日 下午4:56:50
     */
    public static Connection beginTransaction(int index) throws Exception {
        MyConnection myConnection = LOCAL.get();
        if (myConnection != null) {
            return myConnection.getConn();
        }
        Connection conn = DB_ENV.borrowConn(index);
        LOCAL.set(new MyConnection(conn, conn.getAutoCommit(), index, null));
        conn.setAutoCommit(false);
        return conn;
    }

    /**
     * 开始事务,返回当前线程连接
     * 
     * @param key
     * @return
     * @throws Exception
     * @author suzhihua
     * @date 2015年3月25日 下午4:56:54
     */
    public static Connection beginTransaction(String key) throws Exception {
        MyConnection myConnection = LOCAL.get();
        if (myConnection != null) {
            return myConnection.getConn();
        }
        Connection conn = DB_ENV.borrowConn(key);
        LOCAL.set(new MyConnection(conn, conn.getAutoCommit(), null, key));
        conn.setAutoCommit(false);
        return conn;
    }

    /**
     * 提交事务
     * 
     * @throws Exception
     * @author suzhihua
     * @date 2015年3月25日 下午4:56:58
     */
    public static void commit() throws Exception {
        MyConnection myConnection = LOCAL.get();
        if (myConnection != null) {
            try {
                myConnection.getConn().commit();
            } finally {
                clear(myConnection);
            }
        }
    }

    /**
     * 回滚事务
     * 
     * @throws Exception
     * @author suzhihua
     * @date 2015年3月25日 下午4:57:03
     */
    public static void rollback() throws Exception {
        MyConnection myConnection = LOCAL.get();
        if (myConnection != null) {
            try {
                myConnection.getConn().rollback();
            } finally {
                clear(myConnection);
            }
        }
    }

    /**
     * 回滚事务到某一保存点
     * 
     * @param savepoint
     * @throws Exception
     * @author suzhihua
     * @date 2015年3月25日 下午4:57:15
     */
    public static void rollback(Savepoint savepoint) throws Exception {
        MyConnection myConnection = LOCAL.get();
        if (myConnection != null) {
            try {
                myConnection.getConn().rollback(savepoint);
            } finally {
                clear(myConnection);
            }
        }
    }

    /**
     * 事务结束后清理现场
     * 
     * @param myConnection
     * @throws SQLException
     * @throws Exception
     * @author suzhihua
     * @date 2015年3月25日 下午9:37:57
     */
    private static void clear(MyConnection myConnection) throws SQLException, Exception {
        LOCAL.set(null);
        Connection conn = myConnection.getConn();
        conn.setAutoCommit(myConnection.isAutoCommit());
        if (myConnection.getIndex() != null) {
            DB_ENV.returnConn(myConnection.getIndex(), conn);
        } else {
            DB_ENV.returnConn(myConnection.getKey(), conn);
        }
    }

}


/**
 * 保存当前连接信息
 * 
 * @author suzhihua
 * @date 2015年3月25日 下午6:08:41
 */
class MyConnection {
    private Connection conn;
    private Integer index;
    private String key;
    /** 开始事务前提交状态,用于事务结束还原状态 */
    private boolean autoCommit;

    public MyConnection(Connection conn, boolean autoCommit, Integer index, String key) {
        super();
        this.conn = conn;
        this.autoCommit = autoCommit;
        this.index = index;
        this.key = key;
    }


    public Connection getConn() {
        return conn;
    }


    public Integer getIndex() {
        return index;
    }


    public String getKey() {
        return key;
    }

    /** 开始事务前提交状态,用于事务结束还原状态 */
    public boolean isAutoCommit() {
        return autoCommit;
    }

}
