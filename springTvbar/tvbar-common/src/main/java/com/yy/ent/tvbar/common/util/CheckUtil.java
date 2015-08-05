package com.yy.ent.tvbar.common.util;

import com.yy.ent.tvbar.common.constants.ErrorCode;
import com.yy.ent.commons.base.exception.BusinessException;
import org.apache.commons.lang3.StringUtils;

/**
 * CheckUtil
 *
 * @author suzhihua
 * @date 2015/6/1.
 */
public class CheckUtil {
    /**
     * null时会抛异常
     *
     * @param bean
     * @throws BusinessException
     */
    public static void checkNotNull(Object bean) throws BusinessException {
        if (bean != null && bean instanceof String) {
            if (StringUtils.isBlank((String) bean)) {
                throw new BusinessException(ErrorCode.AGENCY_ERROR);
            }
        }
        if (bean == null) {
            throw new BusinessException(ErrorCode.AGENCY_ERROR);
        }
    }

    /**
     * 非null时会抛异常
     *
     * @param bean
     * @throws BusinessException
     */
    public static void checkNull(Object bean) throws BusinessException {
        if (bean != null) {
            if (bean instanceof String) {
                if (StringUtils.isNotBlank((String) bean)) {
                    throw new BusinessException(ErrorCode.AGENCY_ERROR);
                }
            }
            throw new BusinessException(ErrorCode.AGENCY_ERROR);
        }
    }

    /**
     * 不相等时会抛异常
     *
     * @param bean1
     * @param bean2
     * @throws BusinessException
     */
    public static void checkEqual(Object bean1, Object bean2) throws BusinessException {
        if (bean1 == null || !bean1.equals(bean2)) {
            throw new BusinessException(ErrorCode.AGENCY_ERROR);
        }
    }

    /**
     * 相等时会抛异常
     *
     * @param bean1
     * @param bean2
     * @throws BusinessException
     */
    public static void checkNotEqual(Object bean1, Object bean2) throws BusinessException {
        if (bean1 != null && bean1.equals(bean2)) {
            throw new BusinessException(ErrorCode.AGENCY_ERROR);
        }
    }
}
