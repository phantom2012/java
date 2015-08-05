package com.yy.ent.tvbar.action;

import java.security.NoSuchAlgorithmException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import me.chanjar.weixin.common.api.WxConsts;
import me.chanjar.weixin.common.bean.WxJsapiSignature;
import me.chanjar.weixin.common.exception.WxErrorException;
import me.chanjar.weixin.common.util.RandomUtils;
import me.chanjar.weixin.common.util.StringUtils;
import me.chanjar.weixin.common.util.crypto.SHA1;
import me.chanjar.weixin.mp.api.WxMpInMemoryConfigStorage;
import me.chanjar.weixin.mp.api.WxMpMessageRouter;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.api.WxMpServiceImpl;
import me.chanjar.weixin.mp.bean.WxMpXmlMessage;
import me.chanjar.weixin.mp.bean.WxMpXmlOutMessage;
import me.chanjar.weixin.mp.bean.result.WxMpOAuth2AccessToken;
import me.chanjar.weixin.mp.bean.result.WxMpUser;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;

import com.yy.ent.cherrice.annotation.Interceptor;
import com.yy.ent.cherrice.annotation.Read;
import com.yy.ent.cherrice.ret.Forward;
import com.yy.ent.cherrice.ret.Render;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.tvbar.action.test.Sign;
import com.yy.ent.tvbar.base.BaseAction;
import com.yy.ent.tvbar.service.info.PageService;
import com.yy.ent.tvbar.service.info.RouterService;


/**
 * 微信入口Action
 * @author 林英杰
 * 2015年8月3日下午4:13:47
 */
public class RouterAction extends BaseAction {

	private Logger logger = Logger.getLogger(RouterAction.class);
	private WxMpInMemoryConfigStorage wxMpConfigStorage;
	private WxMpService wxMpService;
	private WxMpMessageRouter wxMpMessageRouter;

	@Inject(instance = RouterService.class)
	private RouterService routerService;

	@Inject(instance = PageService.class)
	private PageService pageService;
	
	static boolean si = true;
	static String jsapi_ticket = null;
	static boolean debug = false;

	public RouterAction() throws Exception {
		super();
		wxMpConfigStorage = new WxMpInMemoryConfigStorage();
		if(!debug){
		//剧吧
			System.out.println("----------------------------------------------------------");
			System.out.println();
			System.out.println("剧吧公众号");
			System.out.println();
			System.out.println("----------------------------------------------------------");
			wxMpConfigStorage.setAppId("wx2c8b623edcf7d929"); // 设置微信公众号的appid
			wxMpConfigStorage.setSecret("1bed31661891ad3a2c789b1108a21839"); // 设置微信公众号的app
		}else{
			//测试号
			System.out.println("----------------------------------------------------------");
			System.out.println();
			System.out.println("测试号");
			System.out.println();
			System.out.println("----------------------------------------------------------");
			wxMpConfigStorage.setAppId("wxbea2b5d9b8ffad02"); // 设置微信公众号的appid
			wxMpConfigStorage.setSecret("c084c7231172adab97ea4ce515516333"); // 设置微信公众号的app
		}
		wxMpConfigStorage.setToken("vzhanqun1234567890"); // 设置微信公众号的token
		wxMpConfigStorage
				.setOauth2redirectUri("http://tvbar.yy.com/redirect.action");
		wxMpService = new WxMpServiceImpl();
		wxMpService.setWxMpConfigStorage(wxMpConfigStorage);
	}

	/**
	 * 网页授权重定向（此接口由微信调用）
	 * @param code
	 * @return
	 * @throws WxErrorException
	 */
	public Render redirect(@Read(key = "code") String code)
			throws WxErrorException {
		WxMpOAuth2AccessToken wxMpOAuth2AccessToken = wxMpService
				.oauth2getAccessToken(code);
		WxMpUser wxMpUser = wxMpService.oauth2getUserInfo(
				wxMpOAuth2AccessToken, null);
		routerService.saveUserInfo(wxMpUser);
		return getRender(wxMpUser.toString());
	}

	/**
	 * 微信api请求入口
	 * 
	 * @param signature
	 *            微信参数
	 * @param nonce
	 *            微信参数
	 * @param timestamp
	 *            微信参数
	 * @return
	 * @throws Exception
	 */
	public Render api(@Read(key = "signature") String signature,
			@Read(key = "nonce") String nonce,
			@Read(key = "timestamp") String timestamp) throws Exception {

		System.out.println("----------------来自微信的请求--------------------------");

		wxMpMessageRouter = new WxMpMessageRouter(wxMpService);

		if (!wxMpService.checkSignature(timestamp, nonce, signature)) {
			System.out.println("非法请求！");
			return getRender("非法请求");
		}

		getResponse().setContentType("text/html;charset=utf-8");
		getResponse().setStatus(HttpServletResponse.SC_OK);
		String encryptType = StringUtils.isBlank(getRequest().getParameter(
				"encrypt_type")) ? "raw" : getRequest().getParameter(
				"encrypt_type");

		// 明文传输的消息
		if ("raw".equals(encryptType)) {
			WxMpXmlMessage inMessage = WxMpXmlMessage.fromXml(getRequest()
					.getInputStream());
			WxMpXmlOutMessage outMessage = wxMpMessageRouter.route(inMessage);
			System.out.println("微信消息:" + inMessage.toString());

			if (outMessage == null) {
				System.out.println("防止重传--------------");
				getResponse().getWriter().write("");
				getResponse().getWriter().flush();
				getResponse().getWriter().close();
				routerService.dispose(inMessage, wxMpService);
			} else {
				System.out.println("已被路由拦截-----------");
				getResponse().getWriter().write(outMessage.toXml());
			}
		}
		return getRender("success");
	}

	/**
	 * 获取网页授权url
	 * @return
	 */
	public Render getUrl() {
		String url = wxMpService.oauth2buildAuthorizationUrl(
				WxConsts.OAUTH2_SCOPE_USER_INFO, null);
		return getRender(url);
	}

	/**
	 * 设置菜单
	 * 
	 * @return
	 * @throws WxErrorException
	 */
	public Render setMenu() throws WxErrorException {
		System.out.println("已进入菜单设置。。。。。。。。。。。。。。。。。。。。。。。。");
		routerService.setMenu(wxMpService);
		return getRender("success");
	}

	/**
	 * 删除微信菜单
	 * 
	 * @return
	 * @throws WxErrorException
	 */
	public Render deleteMenu() throws WxErrorException {
		routerService.deleteMenu(wxMpService);
		return getRender("success");
	}


	/**
	 * 查询当前设置的菜单
	 * 
	 * @return
	 * @throws WxErrorException
	 */
	public Render queryMenu() throws WxErrorException {
		return getRender(routerService.queryMenu(wxMpService));
	}

	/**
	 * 获取并保存已关注用户信息，项目上线时调用一次
	 * @throws WxErrorException
	 */
	public Render saveCurrentUser() throws WxErrorException {
		return getRender(routerService.saveCurrentUser(wxMpService));
	}
	
	/**
	 * 获取AccessToken
	 * @return
	 * @throws WxErrorException
	 */
	public Render getAccessToken() throws WxErrorException{
		
		return getRender(wxMpService.getAccessToken());
	}
	

	/**
	 * 微信多媒体上传（目前未使用）
	 * @return
	 * @throws Exception
	 */
	@Interceptor(id = "UploadInterceptor")
	public Render wxMediaUpload() throws Exception{
		return getRender(routerService.wxMediaUpload(wxMpService, getRequest(), "image"));
	}

	/**
	 * 微信JSSDK获取数字签名
	 * @return
	 * @throws WxErrorException
	 */
	public Render getSign() throws WxErrorException{
		String url = getRequest().getHeader("REFERER");
		WxJsapiSignature wss = wxMpService.createJsapiSignature(url);
		JSONObject jo = new JSONObject();
		jo.put("noncestr", wss.getNoncestr());
		jo.put("jsapiTicket", wss.getJsapiTicket());
		jo.put("timestamp", wss.getTimestamp());
		jo.put("url", wss.getUrl());
		jo.put("signature", wss.getSignature());
		jo.put("appId", wxMpConfigStorage.getAppId());
        getResponse().setHeader("Access-Control-Allow-Origin", "*");
        System.out.println("后台数字签名信息：" + jo.toString());
        return getRender(jo);
	} 
	
}
