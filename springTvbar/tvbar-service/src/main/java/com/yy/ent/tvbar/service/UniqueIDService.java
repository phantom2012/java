package com.yy.ent.tvbar.service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import com.yy.ent.tvbar.common.model.UniqueID;
import com.yy.ent.tvbar.dao.UniqueIDDao;
import com.yy.ent.commons.base.inject.Inject;
/**
 * 唯一键生成获取服务
 * @author cwc
 *
 */
public class UniqueIDService {


    private Class<UniqueID> entityClass =UniqueID.class;

	@Inject(instance = UniqueIDDao.class)
	private UniqueIDDao dao;

	public Class<UniqueID> getEntityClass() {
		return entityClass;
	}

	public void setEntityClass(Class<UniqueID> entityClass) {
		this.entityClass = entityClass;
	}

	public static final String TABLE = "unique_value";

    private static final int ADD_NUM = 100;

    private static Map<String, AtomicLong> uniqueMap = new ConcurrentHashMap<String, AtomicLong>();

	private static Map<String, Long> LimitMap = new ConcurrentHashMap<String, Long>();

	public UniqueID get(String key) throws Exception{
		return dao.query(key);
	}

	/**
	 * 产生id
	 */
	private synchronized AtomicLong initUnique(String table)
		throws Exception
	{
		// 防止在上层中的线程问题
		AtomicLong uniqueId = uniqueMap.get(table);
		Long limit = LimitMap.get(table);
		if(uniqueId != null && uniqueId.get() < limit)
		{
			return uniqueId;
		}
		AtomicLong result = dao.addOrUptUnique(table,ADD_NUM);
		uniqueMap.put(table, result);
		LimitMap.put(table, result.get()+ADD_NUM);
		return result;
	}
	/**
	 * 获取唯一ID
	 */
	public long getUniqueID(String table) throws Exception
	{
		AtomicLong uniqueID = uniqueMap.get(table);
		Long limit = LimitMap.get(table);
		// 这里判断有些线程问题，考虑到该方法的性能，则在initUnique(db, table);方法中重新做了次判断
		if(uniqueID == null || uniqueID.longValue() >= limit)
		{
			uniqueID = initUnique(table);
		}
		long id=uniqueID.incrementAndGet();

		return id;
	}

}
