package com.yy.ent.cherroot.entity.callback;
import com.yy.ent.cherroot.core.callback.IResultSetExtractor;
import com.yy.ent.cherroot.core.callback.IRowMapper;
import com.yy.ent.cherroot.entity.EntityFactory;
import com.yy.ent.cherroot.entity.EntityProperty;
import com.yy.ent.commons.base.TypeUtils;
import com.yy.ent.commons.base.valid.BlankUtil;
import org.apache.commons.lang3.ClassUtils;
import org.apache.log4j.Logger;

import java.lang.reflect.Field;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

public class EntityResultSetWrapImpl<T> implements IResultSetExtractor<T>,IRowMapper<T>
{
    private static Logger m_logger = Logger.getLogger(EntityResultSetWrapImpl.class);
    
    protected Class<T> entityClass;
    
    /**
     * column--field
     */
    private Map<String,Field> columnMap;
    
    public EntityResultSetWrapImpl( Class<T> entityClass) {

        this.entityClass =entityClass;
        
        Map<Field,String> fieldColumnMap=EntityFactory.getEntityColumnMap(this.entityClass);
        this.columnMap=new HashMap<String,Field>();
        for(Entry<Field,String> e:fieldColumnMap.entrySet())
        {
            columnMap.put(e.getValue(), e.getKey());
        }
    }
    
    public EntityResultSetWrapImpl( Class<T> entityClass,Map<String,Field> columnMap) {

        this(entityClass);
        this.columnMap=columnMap;
    }

    public Map<String, Field> getColumnMap()
    {
        return columnMap;
    }

    public void setColumnMap(Map<String, Field> columnMap)
    {
        this.columnMap = columnMap;
    }
    
    public T wrapRs(ResultSet rs)  throws SQLException
    {

        ResultSetMetaData rsmt = rs.getMetaData();
        int columnCount = rsmt.getColumnCount();
        try
        {
            T entity =entityClass.newInstance();
            for(int i = 1; i <= columnCount; i++)
            {
                
                String name = rsmt.getColumnName(i);
                Object value = rs.getObject(i);
                if(value==null || BlankUtil.isBlank(value))
                {
                    continue;
                }
                
                Field field =null;
                if(columnMap!=null )
                    field = columnMap.get(name);
                if(BlankUtil.isBlank(field))
                    continue;
                
//              String methodStr="get"+StringUtils.capitalize(field);
//              String setMethodStr="set"+StringUtils.capitalize(field);
//              Method getMethod =entityClass.getMethod(methodStr);
//              if(getMethod==null)
//              {
//                  methodStr="is"+StringUtils.capitalize(field);
//                  getMethod =entityClass.getMethod(methodStr);
//              }
//              if(getMethod==null)
//                  continue;
//              Class<?> returnClass =getMethod.getReturnType();
//              Method setMethod =entityClass.getMethod(setMethodStr, returnClass);
//              if(setMethod==null)
//                  continue;

                //只支持简单类型和时间类型
//              if(ClassUtils.isPrimitiveOrWrapper(returnClass) || returnClass.isAssignableFrom(String.class))
//              {
//                  invokeSet(returnClass,t,setMethod,value);
//              }else if(returnClass.isAssignableFrom(Date.class)){
//                  invokeSet(returnClass,t,setMethod,rs.getString(i));
//              }else {
//                  continue;
//              }
                Class<?> returnClass = EntityFactory.getEntityFieldType(entityClass,field);
                if(ClassUtils.isPrimitiveOrWrapper(returnClass) || returnClass.isAssignableFrom(String.class))
                {
                    invokeSet(returnClass,entity,field,value);
                }else if(returnClass.isAssignableFrom(Date.class)){
                    invokeSet(returnClass,entity,field,rs.getTimestamp(i));
                }else {
                    continue;
                }
            }
            return entity;
        }catch(Exception e)
        {
            m_logger.warn(e.getMessage());           
        }
        return null;    
    }
    
    public T extractData(ResultSet rs) throws SQLException
    {
        if(rs.next())
            return wrapRs(rs);
        else
            return null;
        
    }
    
    public T mapRow(ResultSet rs, int paramInt) throws SQLException
    {
        return wrapRs(rs);  
    }
    
    
    private void invokeSet(Class<?> returnClass,T t,Field field,Object value)
    {
        if(value == null){
            return ;
        }

        field.setAccessible(true);
        try{
            boolean isBean = EntityFactory.isBeanEntity(entityClass);
            if(!isBean && t instanceof EntityProperty){
                EntityProperty p = (EntityProperty)t;
                p.put(field.get(t).toString(),value.toString());
                return ;
            }

            if(returnClass.isAssignableFrom(Integer.class) || returnClass.isAssignableFrom(int.class))
            {
                field.set(t, TypeUtils.ObjectToInteger(value));
            }
            else if(returnClass.isAssignableFrom(Long.class) || returnClass.isAssignableFrom(long.class))
            {
                field.set(t, TypeUtils.ObjectToLong(value));
            }
            else if(returnClass.isAssignableFrom(String.class))
            {
                field.set(t, TypeUtils.ObjectToString(value));
            }
            else if(returnClass.isAssignableFrom(Boolean.class) || returnClass.isAssignableFrom(boolean.class)  )
            {
                field.set(t, TypeUtils.ObjectToBoolean(value));
            }
            else if(returnClass.isAssignableFrom(Byte.class) || returnClass.isAssignableFrom(byte.class)  )
            {
                field.set(t, TypeUtils.ObjectToByte(value));
            }
            else if(returnClass.isAssignableFrom(Character.class) || returnClass.isAssignableFrom(char.class)  )
            {
                field.set(t, TypeUtils.ObjectToChar(value));
            }
            else if(returnClass.isAssignableFrom(Short.class) || returnClass.isAssignableFrom(short.class)  )
            {
                field.set(t, TypeUtils.ObjectToShort(value));
            }
            else if(returnClass.isAssignableFrom(Float.class) || returnClass.isAssignableFrom(float.class)  )
            {
                field.set(t, TypeUtils.ObjectToFloat(value));
            }
            else if(returnClass.isAssignableFrom(Double.class) || returnClass.isAssignableFrom(double.class)  )
            {
                field.set(t, TypeUtils.ObjectToDouble(value));
            }
            else if(returnClass.isAssignableFrom(Date.class)){
                //Constructor<?> constructor = returnClass.getConstructor(long.class);
                //field.set(t, constructor.newInstance(SysDateTime.getTime((String)value)));
                field.set(t, value);
            }

        }catch(Exception e)
        {
            m_logger.warn("invokeSet_error",e);
        }
    }   
}
