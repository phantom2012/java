package com.yy.ent.tvbar.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.concurrent.atomic.AtomicLong;

import org.apache.log4j.Logger;

import com.yy.ent.tvbar.common.model.UniqueID;
import com.yy.ent.cherroot.condition.DBCondition;
import com.yy.ent.cherroot.core.callback.IPreparedStatementSetter;
import com.yy.ent.cherroot.core.datasource.DBEnv;
import com.yy.ent.cherroot.core.datasource.base.DBEnvImpl;
import com.yy.ent.cherroot.entity.EntityBeanDao;
import com.yy.ent.cherroot.entity.EntityFactory;
import com.yy.ent.cherroot.entity.EntitySqlMarker;
import com.yy.ent.cherroot.entity.callback.EntityConditionStatmentSetterImpl;
import com.yy.ent.cherroot.entity.callback.EntityStatementSetterImpl;
import com.yy.ent.commons.base.inject.Inject;

public class UniqueIDDao extends EntityBeanDao<UniqueID> {

	private static Logger m_logger = Logger.getLogger(UniqueIDDao.class);

	@Inject(instance = DBEnvImpl.class)
    private DBEnv dbEnv;

    public DBEnv getDataSource()
    {
        return dbEnv;
    }


	public String getHashKey()
	{
		return getTable();
	}


	/**
	 * 串行事务执行
	 */
	public int executeTranSerial(String key,String sql,IPreparedStatementSetter setter) throws Exception
	{
		int res=-1;
		DBEnv db=this.getDataSource();
		Connection conn = null;
		PreparedStatement st = null;
		boolean defaultCommit = true;
		int defaultTran = Connection.TRANSACTION_REPEATABLE_READ;
		try
		{
			conn = db.borrowConn(key);
			defaultCommit = conn.getAutoCommit();
			defaultTran = conn.getTransactionIsolation();
			// 设置事务和事务级别
			conn.setAutoCommit(false);
			conn.setTransactionIsolation(Connection.TRANSACTION_SERIALIZABLE);
			st = conn.prepareStatement(sql);
			setter.setValues(st);
			res = st.executeUpdate();
			conn.commit();
		}
		catch(Exception e)
		{			
			if(null != conn){
				conn.rollback();
			}
			m_logger.warn("串行事务执行失败", e);
			throw new RuntimeException("串行事务执行失败", e);
		}
		finally
		{
			if(null != st)
				st.close();
			if(conn != null)
			{
				conn.setAutoCommit(defaultCommit);
				conn.setTransactionIsolation(defaultTran);
			}
			db.returnConn(key, conn);
		}
		return res;
	}


	public AtomicLong addOrUptUnique(String table,int addNum) throws Exception
	{
		AtomicLong result =new AtomicLong(0);
		UniqueID unId = query(table);
		if(unId!=null)
		{// 如果数据有值则执行更新操作
			long currValue = unId.getValue();
			long updateValue = currValue + addNum;
			result.set(currValue);
			// 执行更新
			DBCondition dbCondition1 =new DBCondition();
			dbCondition1.addSetValue("value", String.valueOf(updateValue));
			dbCondition1.addCondition("key", table);
			dbCondition1.addCondition("value", currValue+"");
			String updateSql = EntitySqlMarker.makeUpdateSql(entityClass,dbCondition1);
			IPreparedStatementSetter setter =new EntityConditionStatmentSetterImpl(entityClass,dbCondition1);
			int ret=executeTranSerial(getHashKey(),updateSql,setter);
			if(ret==0){
				throw new RuntimeException("the unique id is update wrong");
			}

		}
		else
		{   // 如果数据库没记录则进行插入操作
		    UniqueID uniqueId =new UniqueID();
			String insertSql = EntityFactory.getInsertSql(entityClass,uniqueId);
			uniqueId.setKey(table);
			uniqueId.setValue(new Integer(addNum).longValue());
			IPreparedStatementSetter setter = new EntityStatementSetterImpl<UniqueID>(entityClass,uniqueId);
			executeTranSerial(getHashKey(),insertSql,setter);
		}
		return result;
	}
}
