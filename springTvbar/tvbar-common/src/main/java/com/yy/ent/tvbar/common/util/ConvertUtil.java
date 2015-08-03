package com.yy.ent.tvbar.common.util;

import java.lang.reflect.InvocationTargetException;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.AbstractConverter;

import com.yy.ent.commons.base.valid.ValidationException;

/**
 * 转换验证类
 * 
 * @author suzhihua
 * @date 2015年3月23日 下午6:41:38
 */
public class ConvertUtil {
    public static void init() {
        ConvertUtils.register(new DateConverter(), Date.class);
    }

    /**
     * 验证bean
     * 
     * @param obj
     * @author suzhihua
     * @date 2015年3月23日 下午6:41:27
     */
    public static void validate(Object obj) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Object>> validate = validator.validate(obj);
        Iterator<ConstraintViolation<Object>> iterator = validate.iterator();
        StringBuilder sb = new StringBuilder();
        while (iterator.hasNext()) {
            ConstraintViolation<Object> next = iterator.next();
            sb.append(next.getPropertyPath()).append(" ").append(next.getMessage()).append("\n");
        }
        if (sb.length() > 0) {
            throw new ValidationException(sb.toString());
        }
    }

    /**
     * map转换为bean
     * 
     * @param obj
     * @param p
     * @throws IllegalAccessException
     * @throws InvocationTargetException
     * @author suzhihua
     * @date 2015年3月23日 下午6:41:15
     */
    public static void populate(Object obj, Map p) throws IllegalAccessException, InvocationTargetException {
        BeanUtils.populate(obj, p);
    }

    /**
     * 日期转换
     * 
     * @author suzhihua
     * @date 2015年3月23日 下午6:41:52
     */
    public static class DateConverter extends AbstractConverter {
        @Override
        protected Object handleMissing(Class type) {
            return null;
        }

        @Override
        protected Object convertToType(Class type, Object value) throws Throwable {
            if (value.getClass() == String.class) {
                String str = (String) value;
                int length = str.length();
                if (length > 19) {
                    length = 19;
                    str = str.substring(0, length);
                }
                // yyyy-MM-dd HH:mm:ss
                if (length == 19) return TimeUtil.parseTimeDate(str);
                // yyyy-MM-dd
                if (length == 10) return TimeUtil.parseDate(str);
            }
            return null;
        }

        @Override
        protected Class getDefaultType() {
            return Date.class;
        }

    }
}
