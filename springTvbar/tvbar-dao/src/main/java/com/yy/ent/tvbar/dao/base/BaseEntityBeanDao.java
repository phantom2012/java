package com.yy.ent.tvbar.dao.base;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.yy.ent.cherroot.core.callback.IPreparedStatementSetter;
import com.yy.ent.cherroot.entity.EntityBean;
import com.yy.ent.cherroot.entity.EntityBeanDao;
import com.yy.ent.cherroot.entity.EntityFactory;
import com.yy.ent.cherroot.entity.EntitySqlMarker;
import com.yy.ent.cherroot.entity.callback.EntitySpecFieldStatmentSetterImpl;

/**
 * 增加插入bean返回主键
 * 
 * @author suzhihua
 * @date 2015年3月26日 上午11:27:37
 * @param <T>
 */
public class BaseEntityBeanDao<T extends EntityBean> extends EntityBeanDao<T> {
    /**
     * 返回插入的主键id
     * 
     * @param entity
     * @return
     * @throws Exception
     * @author suzhihua
     * @date 2015年3月26日 上午11:27:13
     */
    public Long insertReturnId(T entity) throws Exception {
        String key = EntityFactory.getEntityHashValue(entityClass, entity);
        Map<String, Boolean> pkMap = EntityFactory.getEntityAutoPkStrMap(entityClass);
        if (pkMap == null) {
            pkMap = new HashMap<String, Boolean>();
        }
        List<Field> fields = new LinkedList<Field>();
        List<String> setColumns = fieldsColumnRelation(entityClass, entity, fields);
        String table = EntityFactory.getEntityTable(entityClass, entity);
        String sql = EntitySqlMarker.makeInsertSql(table, setColumns, pkMap);
        IPreparedStatementSetter setter = new EntitySpecFieldStatmentSetterImpl<T>(entity, fields);
        return (Long) insertReturnId(key, sql, setter);
    }


    private <T> List<String> fieldsColumnRelation(Class<T> entityClass, T entity, List<Field> fields) throws Exception {
        List<String> conditionColumns = new LinkedList<String>();
        Map<Field, String> columnMap = EntityFactory.getEntityColumnMap(entityClass);
        // 偏历filed,如果entity中该属性有值存在，则作为查询的条件
        for (Field field : columnMap.keySet()) {
            Object value = EntityFactory.getEntityFieldValue(entityClass, entity, field);
            if (value != null) {
                conditionColumns.add(columnMap.get(field));
                fields.add(field);
            }
        }
        return conditionColumns;
    }
}
