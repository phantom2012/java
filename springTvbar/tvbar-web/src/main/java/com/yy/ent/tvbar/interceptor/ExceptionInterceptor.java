package com.yy.ent.tvbar.interceptor;

import java.net.ConnectException;
import java.net.SocketTimeoutException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yy.ent.tvbar.base.BaseForward;
import com.yy.ent.tvbar.exception.MessageMapper;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;

import com.yy.ent.tvbar.common.constants.ErrorCode;
import com.yy.ent.cherrice.Return;
import com.yy.ent.cherrice.exception.ActionInvocationException;
import com.yy.ent.cherrice.interceptor.Interceptor;
import com.yy.ent.cherrice.invocation.ActionInvocation;
import com.yy.ent.cherrice.ret.Render;
import com.yy.ent.cherrice.ret.RenderType;
import com.yy.ent.cherrice.util.BlankUtil;
import com.yy.ent.clients.monitor.model.ServerExceptionWarning;
import com.yy.ent.clients.monitor.model.Warning;
import com.yy.ent.clients.monitor.service.CommonMonitorService;
import com.yy.ent.commons.base.exception.BusinessException;
import com.yy.ent.commons.base.exception.ServerException;
import com.yy.ent.commons.base.inject.Inject;

public class ExceptionInterceptor implements Interceptor {

    public enum ErrorType {
        BUSINESS, ARGUMENT, NETWORK, UNKNOWN,NOLOGIN
    }

    protected final Logger logger = Logger.getLogger(this.getClass());

    @Inject(instance = MessageMapper.class)
    public MessageMapper mapper;

    @Inject(instance = CommonMonitorService.class)
    public CommonMonitorService monitorService;

    @Override
    public Return intercept(ActionInvocation invocation) throws Exception {
        JSONObject json = null;
        HttpServletRequest req = invocation.getRequest();
        HttpServletResponse rep = invocation.getResponse();
        req.setCharacterEncoding("utf-8");
        rep.setCharacterEncoding("utf-8");
        try {
            return invocation.invoke();
        } catch (ActionInvocationException e) {
            Throwable ex = e.getCause();
//            while (ex instanceof InvocationTargetException) {
//                ex = (Exception) ex.getCause();
//            }         
            //appmonitor 需要记录的异常
            Throwable appmonitorEx = null;
            if (ex instanceof IllegalArgumentException) {
            	appmonitorEx = new com.yy.ent.clients.appmonitor.exception.IllegalArgumentException() ;
                json = getErrorJson(HttpServletResponse.SC_BAD_REQUEST,
                        ErrorType.ARGUMENT);
            } else if (ex instanceof BusinessException) {            	
                BusinessException ex0 = (BusinessException) ex;
                appmonitorEx = new com.yy.ent.clients.appmonitor.exception.BusinessException(ex0.resultCode) ;
                json = getErrorJson(ex0.resultCode, ErrorType.BUSINESS);
            } else if (ex instanceof ServerException) {
            	ServerException ex0 = (ServerException)ex ;
            	appmonitorEx = new com.yy.ent.clients.appmonitor.exception.ServerException(ex0.ip, ex0.port, ex0.url) ;
                Warning warning = new ServerExceptionWarning(
                        (ServerException) ex, req.getRequestURL().toString());
                warning.fromSvrNameSuffix = "NETWORK";
                monitorService.sendWarning(warning);
                if (ex.getCause() instanceof SocketTimeoutException) {
                    // 超时
                    json = getErrorJson(HttpServletResponse.SC_GATEWAY_TIMEOUT,
                            ErrorType.NETWORK);
                } else if (ex.getCause() instanceof ConnectException) {
                    // 连不上
                    json = getErrorJson(
                            HttpServletResponse.SC_SERVICE_UNAVAILABLE,
                            ErrorType.NETWORK);
                } else {
                    json = getErrorJson(
                            HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                            ErrorType.NETWORK);
                }
            } else {
            	appmonitorEx = new Exception() ;            	
                json = getErrorJson(
                        HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                        ErrorType.UNKNOWN);
            }
            appmonitorEx.initCause(ex) ;
            if(appmonitorEx instanceof com.yy.ent.clients.appmonitor.exception.BusinessException || appmonitorEx instanceof com.yy.ent.clients.appmonitor.exception.IllegalArgumentException )
                logger.warn("FAIL on uri=" + req.getRequestURI()+","+e.getMessage(), appmonitorEx);
            else
            	logger.error("FAIL on uri=" + req.getRequestURI()+","+e.getMessage(), appmonitorEx);
        } catch (BusinessException e) {          
            com.yy.ent.clients.appmonitor.exception.BusinessException appmonitorEx = new com.yy.ent.clients.appmonitor.exception.BusinessException(e.resultCode) ;
            appmonitorEx.initCause(e) ;
            logger.warn("FAIL on " + req.getRequestURI(), appmonitorEx);
            if(e.resultCode==ErrorCode.NO_LOGIN){
                json = getErrorJson(
                    e.resultCode,
                    ErrorType.NOLOGIN);
            }else{
                json = getErrorJson(e.resultCode,
                    ErrorType.BUSINESS);
            }
            
        }catch (Exception e) {
            logger.error("FAIL on " + req.getRequestURI(), e);
            json = getErrorJson(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    ErrorType.UNKNOWN);
        }

        if (json != null) {
            String jsonStr = json.toString();
            rep.setStatus(500);
            if ("ajax".equals(req.getHeader("Request-Type"))
                    || !BlankUtil.isBlank(req.getHeader("X-Requested-With"))) {
                rep.setHeader("Json-Exception", "jsExc");
                return new Render(RenderType.JSON, jsonStr);
            } else {
                rep.addHeader("Server-Exception", jsonStr);
                return new BaseForward("500.jsp");
            }

        }
        return null;
    }

    private JSONObject getErrorJson(int result, ErrorType type) {
        String message = mapper.getMessge(result);
        JSONObject json = new JSONObject();
        json.put("type", type);
        json.put("msg", message);
        json.put("result", result);
        return json;
    }

}
