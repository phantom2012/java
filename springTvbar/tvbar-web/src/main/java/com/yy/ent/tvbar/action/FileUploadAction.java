package com.yy.ent.tvbar.action;
import com.duowan.udb.json.JSONObject;
import com.duowan.udb.util.string.StringUtil;
import com.yy.ent.tvbar.base.BaseUploadAction;
import com.yy.ent.cherrice.annotation.Interceptor;
import com.yy.ent.cherrice.ret.Render;
import com.yy.ent.cherrice.ret.RenderType;

import java.util.List;

public class FileUploadAction extends BaseUploadAction {

	  @Interceptor(id="UploadInterceptor")
	  public Render uploadFile() throws Exception {
	    	 List<String> urlList = this.uploadFile(getRequest(), "imgFile", TYPE_IMAGE, 1024) ;
	    	 JSONObject p = new JSONObject();
	    	 if(urlList.isEmpty()){
	    		 p.put("error", 1) ;
	    	 }
	    	 else{
	    		 p.put("error", 0) ;
	    	 }
	      	 return new Render(RenderType.JSON, p.toString());
	     }
	  
	  @Interceptor(id="UploadInterceptor")
	  public Render uploadVedio() throws Exception {
		  List<String> urlList = this.uploadFile(getRequest(), "imgFile", TYPE_MEDIA, 1024*100) ;
	    	 JSONObject p = new JSONObject();
	    	 if(urlList.isEmpty()){
	    		 p.put("error", 1) ;
	    	 }
	    	 else{
	    		 p.put("error", 0) ;
	    	 }
	      	 return new Render(RenderType.JSON, p.toString());
	     }
	
}
