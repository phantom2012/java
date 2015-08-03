package com.yy.ent.tvbar.common.constants;
/**
 * UdbKey.java
 * @author <a href="mailto:chenxu@yy.com">Kyle</a>
 * @created 2014年4月11日
 */
public class UdbKey {

	/**前辍**/
	public static final String PREFIX = "http://www.agency.com";// no use

	/**YY前辍**/
	public static final String YY_PREFIX = "http://idol.yy.com";

	/**点击UDB弹窗上面的X和取消时回调的方法**/
	public static final String DENY_CALLBACK_URL = "/agency/udbCallback.action?cancel=1";
	/**点击UDB弹窗上面的确定回调的方法**/
	public static final String CALLBACK_URL = "/agency/udbCallback.action";
	
	/**手机端udb回调**/
	public static final String MOBILE_CALLBACK_URL = "/agency/mobile/udbCallback.action";

	/**getSdkAuth处理完成后，返回给前端是否成功的key**/
	public static final String IS_SUCCESS = "success";

	/**getSdkAuth处理正常后，返回给前端的url**/
	public static final String SUCCESS_URL = "url";

	/**getSdkAuth处理正常后，返回给前端的ttokensec**/
	public static final String TTOKEN_SEC = "ttokensec";
	/**getSdkAuth处理正常后，返回给前端的ttoken**/
	public static final String TTOKEN = "ttoken";

	/**udboauthtmptokensec**/
	public static final String UDB_OAUTH_TMP_TOKEN_SEC = "udboauthtmptokensec";

	/**getSdkAuth处理出导常时，返回给前端的错误消息的key**/
	public static final String GET_SDK_AUTH_ERROR_MSG = "errMsg";

}
