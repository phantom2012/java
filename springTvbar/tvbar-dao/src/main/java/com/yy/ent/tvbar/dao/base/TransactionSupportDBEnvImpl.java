package com.yy.ent.tvbar.dao.base;

import java.sql.Connection;


/**
 * 支持事务dbenv,开始事务后注意当前线程只能有一个conn,提交后可以再开
 * 
 * @author suzhihua
 * @date 2015年3月25日 下午4:58:23
 */
public class TransactionSupportDBEnvImpl extends com.yy.ent.cherroot.core.datasource.base.DBEnvImpl {

    /**
     * 先从本地线程变量取连接,拿不到再从连接池取一个
     * 
     * @see com.yy.ent.cherroot.core.datasource.base.DBEnvImpl#borrowConn(int)
     */
    @Override
    public Connection borrowConn(int index) throws Exception {
        Connection conn = Transaction.getConnection();
        if (conn != null) {
            return conn;
        }
        return super.borrowConn(index);
    }

    /**
     * 先从本地线程变量取连接,拿不到再从连接池取一个
     * 
     * @see com.yy.ent.cherroot.core.datasource.base.DBEnvImpl#borrowConn(java.lang.String)
     */
    @Override
    public Connection borrowConn(String key) throws Exception {
        Connection conn = Transaction.getConnection();
        if (conn != null) {
            return conn;
        }
        return super.borrowConn(key);
    }



    /**
     * 返还连接
     * 
     * @see com.yy.ent.cherroot.core.datasource.base.DBEnvImpl#returnConn(int, java.sql.Connection)
     */
    @Override
    public void returnConn(int index, Connection conn) throws Exception {
        MyConnection myConnection = Transaction.getMyConnection();
        if (myConnection != null) {
            // do nothing 事务结束时候归还
        } else {
            super.returnConn(index, conn);
        }
    }

    /**
     * 返还连接
     * 
     * @see com.yy.ent.cherroot.core.datasource.base.DBEnvImpl#returnConn(java.lang.String,
     *      java.sql.Connection)
     */
    @Override
    public void returnConn(String key, Connection conn) throws Exception {
        MyConnection myConnection = Transaction.getMyConnection();
        if (myConnection != null) {
            // do nothing 事务结束时候归还
        } else {
            super.returnConn(key, conn);
        }
    }

    /**
     * 初始化,并设置Transaction.dbenv
     * 
     * @see com.yy.ent.cherroot.core.datasource.base.DBEnvImpl#loadConfig(java.lang.String)
     */
    @Override
    public void loadConfig(String filePath) throws Exception {
        super.loadConfig(filePath);
        Transaction.setDB_ENV(this);
    }


}
