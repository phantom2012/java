package com.yy.ent.tvbar.action;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import sun.misc.BASE64Decoder;//将base64转换为byte[]

import com.yy.ent.cherrice.annotation.Interceptor;
import com.yy.ent.cherrice.annotation.Read;
import com.yy.ent.cherrice.ret.Render;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.mobile.bs2.EntBs2Client;
import com.yy.ent.mobile.bs2.util.Bs2CdnUtils;
import com.yy.ent.mobile.bs2.util.ImageViewUrl;
import com.yy.ent.tvbar.base.BaseUploadAction;
import com.yy.ent.tvbar.service.info.UploadService;
//转byet[]换为base64

public class UploadAction extends BaseUploadAction {

	@Inject(instance = UploadService.class)
	private UploadService uploadService;

	@Inject(instance = EntBs2Client.class)
	private EntBs2Client entBs2Client;

//	@Interceptor(id = "UploadInterceptor")
//	public Render uploadImage() throws Exception {
//		List<String> urlList = null;
//		urlList = uploadService.uploadFile(getRequest(), "file", "image",
//				1024 * 1024 * 60, true);
//		if (urlList == null) {
//			return getRenderError("上传内容非图片，或者图片太大");
//		}
//		JSONArray jsonArray = new JSONArray();
//		for (String url : urlList) {
//			System.out.println("上传URL:" + url);
//			JSONObject object = new JSONObject();
//			object.put("url", url);
//			object.put("handlePic", ImageViewUrl.atLeastEdge().width(200)
//					.dropExif().blur(1.0).on(url));
//			/*
//			 * object.put( "handlePic", url);
//			 */
//			jsonArray.add(object);
//		}
//		// 微信测试用，上线时去掉
//		getResponse().setHeader("Access-Control-Allow-Origin", "*");
//		return getRender(jsonArray);
//	}

	@Interceptor(id = "UploadInterceptor")
	public Render uploadImage(@Read(key = "uid") String uid) throws Exception {
//		System.out.println(uid);
		String result;
		int index = uid.indexOf("base64,");
//		System.out.println("index:" + index);
		uid = uid.substring(index+7, uid.length());
		//Base64解码  
		BASE64Decoder decoder = new BASE64Decoder(); 
        byte[] b = decoder.decodeBuffer(uid);  
        for(int i=0;i<b.length;++i)  
        {  
            if(b[i]<0)  
            {//调整异常数据  
                b[i]+=256;  
            }  
        }  
        JSONArray jsonArray = new JSONArray();
		result = uploadService.uploadFile(b, "image");
		JSONObject object = new JSONObject();
		object.put("url", Bs2CdnUtils.toCdnUrl(result));
		object.put("handlePic", ImageViewUrl.atLeastEdge().width(200).dropExif().blur(1.0).on(result));
		jsonArray.add(object);
		// 微信测试用，上线时去掉
		getResponse().setHeader("Access-Control-Allow-Origin", "*");
		return getRender(jsonArray);
	}

	// public Forward indexUpload() throws Exception {
	// return getForward("testUpload.jsp");
	// }
}
