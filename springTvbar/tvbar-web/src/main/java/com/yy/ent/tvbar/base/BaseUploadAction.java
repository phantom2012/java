package com.yy.ent.tvbar.base;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.IOUtils;

import com.yy.ent.cherrice.multipart.MultipartRequest;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.tvbar.service.bs2.Bs2Service;

/**
 * 上传基类
 * 
 * @author suzhihua
 * @date 2015年3月20日 下午6:20:27
 */
public class BaseUploadAction extends BaseAction {
    protected static final String TYPE_FILE = "file";
    protected static final String TYPE_MEDIA = "media";
    /** 经典案例专用*/
    protected static final String TYPE_CASE = "case";
    protected static final String TYPE_FLASH = "flash";
    protected static final String TYPE_IMAGE = "image";
    protected static final String TYPE_FULL_IMAGE = "full_image";
    protected static final String TYPE_RAR = "rar";
    /** 机构上传作品类型*/
    protected static final String TYPE_WORK = "work";
    @Inject(instance = Bs2Service.class)
    private Bs2Service bs2Service;
    /** 后缀名列表 */
    private final static HashMap<String, List<String>> SUFFIX_MAP = new HashMap<String, List<String>>();
    static {
        // 初始化文件后缀列表
    	initSuffix(TYPE_FULL_IMAGE, "gif,jpg,jpeg,png,bmp");
        initSuffix(TYPE_IMAGE, "jpg,png");
        initSuffix(TYPE_FLASH, "swf,flv");
        initSuffix(TYPE_MEDIA, "swf,flv,mp3,mp4,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb,swf,flv");
        initSuffix(TYPE_CASE, "mp3,mp4");
        initSuffix(TYPE_FILE, "doc,docx,xls,xlsx,ppt,htm,html,txt,zip,rar,gz,bz2");
        initSuffix(TYPE_RAR, "rar,zip");
        initSuffix(TYPE_WORK, "mp3,rar");
    }

    /**
     * 初始化后缀名
     * 
     * @param type
     * @param suffixs
     * @author suzhihua
     * @date 2015年3月20日 下午4:24:39
     */
    private static void initSuffix(String type, String suffixs) {
        SUFFIX_MAP.put(type, Arrays.<String>asList(suffixs.split(",")));
    }

    /**
     * 删除文件,不存在的文件删除仍然返回成功
     * 
     * @param fileName
     * @return
     * @throws Exception
     * @author suzhihua
     * @date 2015年3月26日 上午10:50:13
     */
    protected boolean deleteFile(String fileName) throws Exception {
        return bs2Service.deleteFile(fileName);
    }
    

    
    
    /**
     * 上传文件
     * 
     * @param req
     * @param formName 提交的表单字段名
     * @param type 文件类型 image/flash/media/file
     * @param maxSize 单位:k
     * @return 返回非空字串为成功上传文件url
     * @author suzhihua
     * @throws Exception 
     * @date 2015年3月20日 下午4:32:24
     */
    private List<String> _uploadFile(HttpServletRequest request, String formName, String type, long maxSize,boolean throwException) throws Exception {
    	List<String> result = new ArrayList<String>();
        // 是否是二进制流
        if (!(request instanceof MultipartRequest)) {
            return result;
        }
        MultipartRequest req = (MultipartRequest) request;
      //File file = req.getFile(formName)[0];
        for(File file : req.getFile(formName)){
            if (file == null) {
                logger.warn("没有文件");
                if(throwException)throw new Exception("没有文件");
                else return result;
            }
            // 检测文件大小是否合法
            maxSize = maxSize * 1024;
            req.setAttribute("work_size",  file.length());
            if (file.length() > maxSize) {
                logger.warn("文件太大:当前文件大小:" + file.length() + " ,maxSize=" + maxSize);
                if(throwException) throw new Exception("文件太大");
                else return result;
            }
            String fileName = req.getFileNames(formName)[0];
            // 检测后缀名是否合法
            String suffix = getSuffix(fileName);
            List<String> list = SUFFIX_MAP.get(type);
            if (list == null || !list.contains(suffix)) {
                logger.warn("后缀名不合法:" + suffix + " " + list);
                if(throwException)  throw new Exception("后缀名不合法");
                else return result;
            }
            // 合法文件进行上传
            FileInputStream is = null;
            try {
                is = new FileInputStream(file);
                byte[] source = IOUtils.toByteArray(is);
                String uuid = UUID.randomUUID().toString().replaceAll("-", "");
                //如果大于16M就选择大文件上传，分块上传
                long dfdf = file.length() ;
                if(file.length() > 1024 *1024* 16 ){
                	 result.add(bs2Service.uploadLargeFile(source, uuid + "." + suffix, type + "/" + suffix));
                }
                else{
                	 result.add(bs2Service.uploadFile(source, uuid + "." + suffix, type + "/" + suffix));            	
                }           
            } catch (Exception e) {
                logger.warn("上传文件出错", e);          
                if(throwException) throw e ;
            } finally {
                IOUtils.closeQuietly(is);
            }
        }
      
      

        return result;
    }
    /**
     * 上传文件
     * 
     * @param req
     * @param formName 提交的表单字段名
     * @param type 文件类型 image/flash/media/file
     * @param maxSize 单位:k
     * @return 返回非空字串为成功上传文件url
     * @author suzhihua
     * @throws Exception 
     * @date 2015年3月20日 下午4:32:24
     */
    protected List<String> uploadFile(HttpServletRequest request, String formName, String type, long maxSize) throws Exception {
        return _uploadFile(request, formName, type, maxSize, false);
    } 
    
    /**
     * 上传文件,有异常抛出
     * 
     * @param req
     * @param formName 提交的表单字段名
     * @param type 文件类型 image/flash/media/file
     * @param maxSize 单位:k
     * @return 返回非空字串为成功上传文件url
     * @author suzhihua
     * @throws Exception 
     * @date 2015年3月20日 下午4:32:24
     */
    protected List<String> uploadFileWidthException(HttpServletRequest request, String formName, String type, long maxSize) throws Exception {
        return _uploadFile(request, formName, type, maxSize, true);
    }

    /**
     * 返回文件后缀
     * 
     * @param fileName
     * @return
     * @author suzhihua
     * @date 2015年3月20日 下午4:19:08
     */
    protected String getSuffix(String fileName) {
        int lastIndexOfDot = fileName.lastIndexOf(".");
        return lastIndexOfDot != -1 ? fileName.substring(lastIndexOfDot + 1) : "";
    }

}
