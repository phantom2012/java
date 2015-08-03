package com.yy.ent.tvbar.base;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONObject;

import org.apache.commons.lang3.StringUtils;

import com.google.common.base.Joiner;
import com.yy.ent.tvbar.common.util.UdbEnv;
import com.yy.ent.cherrice.ret.Forward;
import com.yy.ent.cherrice.ret.Redirect;
import com.yy.ent.cherrice.ret.Render;
import com.yy.ent.cherrice.ret.RenderType;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.external.service.UdbServiceAgentHalbService;

public class BaseAction extends com.yy.ent.cherrice.BaseAction {

    protected static String basePath = "/WEB-INF/jsp/";

    private static final String KEY_RESULT = "result"; // JSON 是否成功标识KEY 0: 成功 1：失败
    private static final String KEY_DATA = "data"; // JSON 数据KEY
    private static final String RESULT_SUCCESS = "0"; // 成功
    private static final String RESULT_ERROR = "1"; // 失败


    @Inject(instance = UdbEnv.class)
    public UdbEnv udbEnv;

    @Inject(instance = UdbServiceAgentHalbService.class)
    private UdbServiceAgentHalbService udbSAService;

    /**
     * getLoginUid：获取登录者的UID
     *
     * @return
     * @throws Exception
     * @author:<a href="mailto:chenxu@yy.com">Kyle</a>
     */
    protected String getLoginUid() throws Exception {
        return udbEnv.getLoginUid(getRequest(), getResponse());
    }

    /**
     * 根据ticket 获取用户UID
     * 
     * @return
     */
    // protected String getLoginUid(String ticket) throws Exception{
    // if (StringUtils.isNotBlank(ticket)) {
    // Map<String, String> resp = udbSAService.verifyAppToken(ticket);
    // return resp.get("uid");
    // }
    // return getLoginUid();
    // }


    private String formatData(Object data) {
        return formatData(data, RESULT_SUCCESS);
    }

    private String formatData(Object data, String result) {
        JSONObject json = new JSONObject();
        json.put(KEY_DATA, data);
        json.put(KEY_RESULT, result);
        return json.toString();
    }



    /**
     * 只返回成功状态,无数据
     * 
     * @return
     * @author suzhihua
     * @date 2015年3月25日 上午10:30:11
     */
    protected Render getRender() {
        return getRender("success");
    }

    /**
     * 返回成功+数据
     * 
     * @param data
     * @return
     * @author suzhihua
     * @date 2015年3月25日 上午10:30:21
     */
    protected Render getRender(Object data) {
        return new Render(RenderType.JSON, formatData(data));
    }

    protected Render getRender(RenderType type, Object data) {
        return new Render(type, formatData(data));
    }


    protected Forward getForward(String path) {
        return new BaseForward(path);
    }


    protected Redirect getRedirect(String path) {
        return new BaseRedirect(path);
    }


    /**
     * 获取前端加密的中文参数
     * 
     * @param str
     * @return
     */
    public String getUTF8String(String str) {
        String res = "";
        if (StringUtils.isEmpty(str)) return res;
        try {
            res = new String(str.getBytes("ISO8859-1"), "UTF-8");
        } catch (UnsupportedEncodingException e) {
        	logger.warn(e) ;
        }
        return res;
    }

    /**
     * 返回多个params,用逗号划分
     * 
     * @param key
     * @return
     * @author suzhihua
     * @date 2015年3月24日 下午4:02:26
     */
    public String getArrays(String key) {
        String[] parameterValues = getRequest().getParameterValues(key);
        if (parameterValues == null || parameterValues.length == 0) {
            return "";
        }
        List<String> list = new ArrayList<String>(parameterValues.length);
        for (String s : parameterValues) {
            if (!StringUtils.isBlank(s)) {
                list.add(s);
            }
        }
        String join = Joiner.on(',').join(list);
        return join;
    }
}
