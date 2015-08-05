package com.yy.ent.tvbar.action;

import java.io.File;
import java.io.FileInputStream;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import com.yy.ent.tvbar.base.BaseAction;
import net.sf.json.JSONObject;

import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;

import com.yy.ent.tvbar.service.bs2.Bs2Service;
//import com.yy.ent.tvbar.service.schedule.jobs.PushWorksSchedule;
import com.yy.ent.cherrice.annotation.Get;
import com.yy.ent.cherrice.annotation.Interceptor;
import com.yy.ent.cherrice.annotation.Read;
import com.yy.ent.cherrice.multipart.MultipartRequest;
import com.yy.ent.cherrice.ret.Forward;
import com.yy.ent.cherrice.ret.Render;
import com.yy.ent.cherrice.ret.RenderType;
import com.yy.ent.commons.base.http.HttpUtil;
import com.yy.ent.commons.base.inject.Inject;
//import com.yy.ent.commons.base.valid.Validation;

/**
 * @author wangqitao
 */
public class DemoAction extends BaseAction {

    private Logger logger = Logger.getLogger(DemoAction.class);

    @Inject(instance = Bs2Service.class)
    private Bs2Service bs2Service;

    @Interceptor(id = "UploadInterceptor")
    public Render checkUploadFile() {
        HttpServletRequest r = getRequest();
        JSONObject json = new JSONObject();
        if (r instanceof MultipartRequest) {
            MultipartRequest req = (MultipartRequest) r;
            Enumeration<String> fileParameterNames = req.getFileParameterNames();
            while (fileParameterNames.hasMoreElements()) {
                String nextElement = fileParameterNames.nextElement();
                File file = req.getFile(nextElement)[0];
                String name = req.getFileNames(nextElement)[0];
                int lastIndexOfDot = name.lastIndexOf(".");
                if (lastIndexOfDot == -1) {
                    json.put("error", 1);
                    json.put("message", "无文件后缀");
                    break;
                }
                HashMap<String, String> extMap = new HashMap<String, String>();
                extMap.put("image", "gif,jpg,jpeg,png,bmp");
                extMap.put("flash", "swf,flv");
                extMap.put("media", "swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb");
                extMap.put("file", "swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb,doc,docx,xls,xlsx,ppt,htm,html,txt,zip,rar,gz,bz2");
                String dirName = ((MultipartRequest) r).getRequest().getParameter("dir");
                if (dirName == null) {
                    dirName = "image";
                }
                if (!extMap.containsKey(dirName)) {
                    json.put("error", 1);
                    json.put("message", "文件类型不对");
                    break;
                }
                String suffix = name.substring(lastIndexOfDot + 1);
                if (!Arrays.<String>asList(extMap.get(dirName).split(",")).contains(suffix)) {
                    json.put("error", 1);
                    json.put("message", "文件类型不对");
                    break;
                }
                try {
                    byte[] byteArray = IOUtils.toByteArray(new FileInputStream(file));
                    String upladName =
                            UUID.randomUUID().toString().replaceAll("-", "") + "." + suffix;
                    String upload = bs2Service.uploadPhoto(byteArray, upladName);
                    System.out.println(nextElement + "\t" + file.getAbsolutePath() + "\t"
                            + file.length() + "\t" + upload);
                    json.put("error", 0);
                    json.put("url", upload);
                    break;
                } catch (Exception e) {
                    json.put("error", 2);
                }
            }
        } else {
            json.put("error", 1);
            json.put("message", "无文件");
        }
        return new Render(RenderType.JSON, json.toString());
    }

    @Interceptor(id = "LoginInterceptor")
    public Render checkLogin() {
        return getRender(getRequest().getAttribute("com.yy.agency.loginUid"));
    }

    @Get(encode = "UTF-8")
    public Render checkValidString(@Read(key = "t") String test) {
        String ip = HttpUtil.getIpAddr(getRequest());
        logger.info("ip:" + ip);
        return getRender(test);
    }

    public Render checkValidLong(@Read(key = "t") Long test) {
        return getRender(test);
    }

    public Render checkValidList(@Read(key = "t") List<Short> test) {

        return getRender(test);
    }

    public Render checkValidLinkList(@Read(key = "t") LinkedList<Long> test) {
        return getRender(test);
    }

    public Render checkValidArryLong(@Read(key = "t") Long[] test) {
        return getRender(test);
    }

    public Render checkValidArryString(@Read(key = "t") String[] test) {
        return getRender(test);
    }

    public Forward toHome() {
        return getForward("index.jsp");
    }


//    public Render querySignUp(@Read(key = "uid") String uid) throws Exception {
//
//        Validation.checkNumeric("uid", uid);
//        Demo signUp = agencyService.query(uid);
//        return getRender(signUp);
//    }


    public Render testSql()throws Exception{
    	logger.info("=======testSql.action=======");
//    	PushWorksSchedule.staticPushWorksToIdol();
    	//agencyService.testSql();
    	return null;
    	
    }
    

}
