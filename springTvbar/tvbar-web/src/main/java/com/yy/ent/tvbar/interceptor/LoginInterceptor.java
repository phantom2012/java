package com.yy.ent.tvbar.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.yy.ent.tvbar.common.constants.ErrorCode;
import com.yy.ent.tvbar.common.util.UdbEnv;
import com.yy.ent.cherrice.Return;
import com.yy.ent.cherrice.interceptor.Interceptor;
import com.yy.ent.cherrice.invocation.ActionInvocation;
import com.yy.ent.commons.base.exception.BusinessException;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.commons.base.valid.CommUtil;

/**
 * 类说明：通过udb提供的jar服务器本地验证;
 *
 * @create:创建时间：2013-6-26 下午11:13:21
 * @author:<a href="mailto:chenxu@yy.com">陈顼</a>
 * @version:v0.0.1-SNAPSHOT0
 */
public class LoginInterceptor implements Interceptor {

    protected final Logger m_logger = Logger.getLogger(this.getClass());

    @Inject(instance = UdbEnv.class)
    private UdbEnv udbEnv;

    @Override
    public Return intercept(ActionInvocation invocation) throws Exception {

        HttpServletRequest req = invocation.getRequest();
        HttpServletResponse rep = invocation.getResponse();
        String referer = req.getHeader("Referer");
        String method = invocation.getActionMethod().getName();
        String loginUid = udbEnv.getLoginUid(req, rep);
        req.setAttribute("com.yy.agency.loginUid", loginUid);
        if (!CommUtil.isNumeric(loginUid)) {
            m_logger.info("LoginInterceptor validAccessToken is fail! udb yyuid:" + loginUid + " method:" + method + ",referer:" + referer);
            throw new BusinessException("login check exception", ErrorCode.NO_LOGIN);
        }
        return invocation.invoke();
    }

    public void destroy() {
    }

    public void init() {

    }

}
