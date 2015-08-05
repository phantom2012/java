package com.yy.ent.tvbar.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;

import com.yy.ent.tvbar.common.constants.ErrorCode;
import com.yy.ent.tvbar.common.util.PrintLogger;
import com.yy.ent.tvbar.common.util.UdbEnv;
import com.yy.ent.cherrice.Return;
import com.yy.ent.cherrice.interceptor.Interceptor;
import com.yy.ent.cherrice.invocation.ActionInvocation;
import com.yy.ent.cherrice.ret.Render;
import com.yy.ent.cherrice.ret.RenderType;
import com.yy.ent.commons.base.exception.BusinessException;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.commons.base.valid.CommUtil;
import com.yy.ent.external.udb.CookieProcesse;

/**
 * 类说明：远程去udb进行验证;
 *
 * @create:创建时间：2013-6-26 下午11:12:59
 * @author:<a href="mailto:chenxu@yy.com">陈顼</a>
 * @version:v0.0.1-SNAPSHOT0
 */
public class RemoteLoginInterceptor implements Interceptor {

    protected final Logger m_logger = Logger.getLogger(this.getClass());

    private static final String KEY_RESULT = "result";    //JSON 是否成功标识KEY  0: 失败  1：成功
    private static final String KEY_DATA = "data";        //JSON 数据KEY
    private static final String RESULT_FAIL = "1";      //失败

    @Inject(instance = UdbEnv.class)
    private UdbEnv udbEnv;

    @Override
    public Return intercept(ActionInvocation invocation) throws Exception {

        HttpServletRequest req = invocation.getRequest();
        HttpServletResponse rep = invocation.getResponse();
        String className = invocation.getAction().getClass().getSimpleName();
        String loginUid = udbEnv.getLoginUid(req, rep);
        String referer = invocation.getRequest().getHeader("Referer");
        String uri = req.getRequestURI();
        StringBuilder data = new StringBuilder();
        data.append("LoginInterceptor intercept className:" + className + ",uri:" + uri + ",referer:" + referer + ",loginUid:" + loginUid);
        if (!CommUtil.isNumeric(loginUid)) {
            PrintLogger.printParamsLog(data, req.getParameterMap());
            throw new BusinessException("login check exception", ErrorCode.SERVER_ERROR);
        }

        if(udbEnv.isTicketValid(req) == false){
            JSONObject json = udbEnv.validAccessToken(req, rep);
            boolean flag = false;
            if (json != null) {
                flag = json.getBoolean("result");
            }
            if (!flag) {
                data.append(",flag:" + flag);
                PrintLogger.printParamsLog(data, req.getParameterMap());
                CookieProcesse.clearCookie(req, rep);
                return null;
            }
        }

        return invocation.invoke();
    }

    private String formatData(Object data) {
        JSONObject json = new JSONObject();
        json.put(KEY_DATA, data);
        json.put(KEY_RESULT, RESULT_FAIL);
        return json.toString();
    }

    protected Render getRender(Object data) {
        return new Render(RenderType.JSON, formatData(data));
    }


    public void destroy() {
    }

    public void init() {

    }

}
