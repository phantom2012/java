package com.yy.ent.tvbar.service.info;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import me.chanjar.weixin.common.bean.WxMenu;
import me.chanjar.weixin.common.bean.WxMenu.WxMenuButton;
import me.chanjar.weixin.common.exception.WxErrorException;
import me.chanjar.weixin.common.session.WxSessionManager;
import me.chanjar.weixin.common.util.http.MediaUploadRequestExecutor;
import me.chanjar.weixin.mp.api.WxMpMessageHandler;
import me.chanjar.weixin.mp.api.WxMpMessageRouter;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.bean.WxMpCustomMessage;
import me.chanjar.weixin.mp.bean.WxMpXmlMessage;
import me.chanjar.weixin.mp.bean.WxMpXmlOutMessage;
import me.chanjar.weixin.mp.bean.WxMpXmlOutTextMessage;
import me.chanjar.weixin.mp.bean.custombuilder.NewsBuilder;
import me.chanjar.weixin.mp.bean.result.WxMpUser;
import me.chanjar.weixin.mp.bean.result.WxMpUserList;

import org.apache.log4j.Logger;

import com.yy.ent.cherroot.condition.DBCondition;
import com.yy.ent.cherroot.condition.DBCondition.OrderType;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.tvbar.common.constants.Constants;
import com.yy.ent.tvbar.common.model.info.Image;
import com.yy.ent.tvbar.common.model.info.News;
import com.yy.ent.tvbar.common.model.info.Router;
import com.yy.ent.tvbar.common.model.info.Text;
import com.yy.ent.tvbar.common.model.info.UserInfo;
import com.yy.ent.tvbar.common.model.info.Voice;
import com.yy.ent.tvbar.common.util.MessageType;
import com.yy.ent.tvbar.common.util.WeiXinConstant;
import com.yy.ent.tvbar.dao.base.MultiDao;
import com.yy.ent.tvbar.dao.info.ImageDao;
import com.yy.ent.tvbar.dao.info.NewsDao;
import com.yy.ent.tvbar.dao.info.RouterDao;
import com.yy.ent.tvbar.dao.info.TextDao;
import com.yy.ent.tvbar.dao.info.UserInfoDao;
import com.yy.ent.tvbar.dao.info.VideoDao;
import com.yy.ent.tvbar.dao.info.VoiceDao;
import com.yy.ent.tvbar.service.base.BaseService;

public class RouterService extends BaseService {

	private Logger logger = Logger.getLogger(RouterService.class);

	@Inject(instance = MultiDao.class)
	private MultiDao multiDao;
	
	@Inject(instance = RouterDao.class)
	protected RouterDao routerDao;
	
	@Inject(instance = NewsDao.class)
	protected NewsDao newsDao;
	
	@Inject(instance = TextDao.class)
	protected TextDao textDao;
	
	@Inject(instance = VoiceDao.class)
	protected VoiceDao voiceDao;
	
	@Inject(instance = ImageDao.class)
	protected ImageDao imageDao;
	
	@Inject(instance = VideoDao.class)
	protected VideoDao videoDao;

	@Inject(instance = UserInfoDao.class)
	protected UserInfoDao userInfoDao;
	 
	/**
	 * 处理微信请求
	 * @param inMessage
	 * @param wxMpService
	 * @throws Exception
	 */
	public void dispose(WxMpXmlMessage inMessage, WxMpService wxMpService)
			throws Exception {
		WxMpCustomMessage message;
		String msgType = inMessage.getMsgType();

		// 对菜单事件的处理
		if (msgType.equals("event")) {
			String eventKey = inMessage.getEventKey();
			
			if (eventKey != null) {
				if (eventKey.equals("活动专区")) {
//					NewsBuilder nb = WxMpCustomMessage.NEWS();
//					message = newNews(nb, WeiXinConstant.menu11.value)
//							.toUser(inMessage.getFromUserName()).build();
					message = WxMpCustomMessage.TEXT().content("冰箱君正在努力的想活动，请大家多多关注哦！")
							.toUser(inMessage.getFromUserName()).build();
					wxMpService.customMessageSend(message);

				} else if (eventKey.equals("往期精选")) {
					NewsBuilder nb = WxMpCustomMessage.NEWS();
					message = newNews(nb, WeiXinConstant.menu12.value,inMessage)
							.toUser(inMessage.getFromUserName()).build();
					wxMpService.customMessageSend(message);

				} else if (eventKey.equals("反馈建议")) {
					NewsBuilder nb = WxMpCustomMessage.NEWS();
					message = newNews(nb, WeiXinConstant.menu21.value,inMessage)
							.toUser(inMessage.getFromUserName()).build();
					wxMpService.customMessageSend(message);

				} else if (eventKey.equals("我要投稿")) {
					NewsBuilder nb = WxMpCustomMessage.NEWS();
					message = newNews(nb, WeiXinConstant.menu22.value,inMessage)
							.toUser(inMessage.getFromUserName()).build();
					wxMpService.customMessageSend(message); 

				} else if (eventKey.equals("剧吧基地")) {
					NewsBuilder nb = WxMpCustomMessage.NEWS();
					message = newNews(nb, WeiXinConstant.menu31.value,inMessage)
							.toUser(inMessage.getFromUserName()).build();
					wxMpService.customMessageSend(message);
//					String content = "即将上线,敬请期待！";
//					message = WxMpCustomMessage.TEXT()
//							.toUser(inMessage.getFromUserName()).content(content)
//							.build();
//					wxMpService.customMessageSend(message);
				} 
				
			//给新用户的回复
				if (inMessage.getEvent().equals("subscribe")) {
					String content = "欢迎关注“剧吧”公众号！我是小编——冰箱君。"
							+ "我们公众号秉承着无节操、无下限，不畏强权的精神，"
							+ "顶着锅盖开扒各种雷剧神剧，也会推荐一些小众的良心剧集，"
							+ "我们的宗旨是：绝不放过任何一部电视剧！/:handclap";
					message = WxMpCustomMessage.TEXT()
							.toUser(inMessage.getFromUserName()).content(content)
							.build();
					wxMpService.customMessageSend(message);
					// 保存用户信息
					String lang = "zh_CN"; //语言
					WxMpUser user = wxMpService.userInfo(inMessage.getFromUserName(), lang);
					saveUserInfo(user);
				}
			}
		}
		
		// 对文本时间的处理	
		if (msgType.equals("text")) {

			disposeText(inMessage, wxMpService);
		}		
	}
	
	public void disposeText(WxMpXmlMessage inMessage, WxMpService wxMpService)
			throws Exception {

		WxMpCustomMessage message;
		String content = inMessage.getContent().replace(" ", "");

		//查询出所有关键字
		DBCondition db = new DBCondition();
		List<Router> list = routerDao.query(db);
		int type = -1;
		int type_id = -1;
		for(Router router : list){
			//匹配到拦截
			if(router.getIntercept().contains(content)){
				 type = router.getType();
				 type_id = router.getType_id();
				 break;
			}
		}
		if(type != -1 && type_id != -1){
		switch (type) {
			case MessageType.WX_TEXT:
				Text text = textDao.query((long) type_id);
				message = WxMpCustomMessage.TEXT().content(text.getContent())
						.toUser(inMessage.getFromUserName()).build();
				wxMpService.customMessageSend(message);
				break;
			case MessageType.WX_VOICE:
				System.out.println("拦截：" + "发送语音---------------");
				Voice voice = voiceDao.query((long) type_id);
				message = WxMpCustomMessage.VOICE().mediaId(voice.getMedia_id())
						.toUser(inMessage.getFromUserName()).build();
				wxMpService.customMessageSend(message);
				break;
			case MessageType.WX_IMAGE:
				System.out.println("拦截：" + "发送图片---------------");
				Image image = imageDao.query((long) type_id);
				message = WxMpCustomMessage.IMAGE().mediaId(image.getMedia_id())
						.toUser(inMessage.getFromUserName()).build();
				wxMpService.customMessageSend(message);
				break;
			default:
				break;
			}
		}
		
		if (type == -1 || type_id == -1) {
			String contentText = "";
			message = WxMpCustomMessage.TEXT().content(contentText)
					.toUser(inMessage.getFromUserName()).build();
			wxMpService.customMessageSend(message);
		}
	}
	
	/**
	 * 构建图文信息列表
	 * 
	 * @param nb
	 * @param type
	 * @return
	 * @throws Exception
	 */
	public NewsBuilder newNews(NewsBuilder nb, int type, WxMpXmlMessage inMessage) throws Exception {

		System.out.println("-----------value---------------: " + type);
		DBCondition db = new DBCondition();
		db.addCondition("type", type);
		db.addOrder("sortord", OrderType.ASC);
		List<News> list = null;
		try {
			list = newsDao.query(db);
		} catch (Exception e) {
			logger.error(e);
			e.printStackTrace();
		}

		int count = 0;
		for (News news : list) {
			WxMpCustomMessage.WxArticle item = new WxMpCustomMessage.WxArticle();
			item.setDescription(news.getDescription());
			item.setPicUrl(news.getPicUrl());
			item.setTitle(news.getTitle());
			if(type == 31){
				DBCondition userDB = new DBCondition();
				userDB.addCondition("openId", inMessage.getFromUserName());
				List<UserInfo> userList = userInfoDao.query(userDB);
				item.setUrl(news.getUrl() + "?uid=" + userList.get(0).getUserId());
			}else{
				item.setUrl(news.getUrl());
			}
			nb = nb.addArticle(item);
			count++;
			if (count > 9)
				break;
		}
		return nb;
	}
	
	/**
	 * 保存用户信息
	 * @param user
	 */
	public void saveUserInfo(WxMpUser user) {
		
		System.out.println("保存用户信息:" + user.toString());
		String   str   =   user.getNickname();  
		String regEx  = "[\ud83c\udc00-\ud83c\udfff]|[\ud83d\udc00-\ud83d\udfff]|[\u2600-\u27ff]";
		Pattern p = Pattern.compile(regEx);
		Matcher m = p.matcher(str);
		String result = m.replaceAll("");
		if(result.equals("")){
			System.out.println("此处有个逗比昵称...................");
			Random ra =new Random();
			result = Constants.NICK[ra.nextInt(10)];
		}
		
		if(user.getUnionId()==null || user.getUnionId().equals("")){
			//测试号
			multiDao.update("InsertOrUpdateUserInfo", user.getOpenId(),user.getOpenId(),
					result, 0, 0, 0, user.getSex(), 0, "测试公众号",
					user.getHeadImgUrl(),new Date());
		}else{
			multiDao.update("InsertOrUpdateUserInfo", user.getUnionId(),user.getOpenId(),
					result, 0, 0, 0, user.getSex(), 0, 0,
					user.getHeadImgUrl(),new Date());
		}
	}

	/**
	 * 设置微信公众号菜单
	 * 
	 * @param wxMpService
	 * @return
	 * @throws WxErrorException
	 */
	public boolean setMenu(WxMpService wxMpService) {
		// 菜单1
		WxMenuButton menu1 = new WxMenuButton();
		menu1.setName("更多动态");
		// 菜单1的子菜单
		List<WxMenuButton> subMenu1 = new ArrayList<WxMenuButton>(2);
		WxMenuButton menu11 = new WxMenuButton();
		menu11.setKey("活动专区");
		menu11.setName("活动专区");
		menu11.setType("click");

		WxMenuButton menu12 = new WxMenuButton();
		menu12.setKey("往期精选");
		menu12.setName("往期精选");
		menu12.setType("click");

		subMenu1.add(menu11);
		subMenu1.add(menu12);
		menu1.setSubButtons(subMenu1);

		// 菜单2
		WxMenuButton menu2 = new WxMenuButton();
		menu2.setName("我要反馈");
		// 菜单2的子菜单
		List<WxMenuButton> subMenu2 = new ArrayList<WxMenuButton>(2);
		WxMenuButton menu21 = new WxMenuButton();
		menu21.setKey("反馈建议");
		menu21.setName("反馈建议");
		menu21.setType("click");

		WxMenuButton menu22 = new WxMenuButton();
		menu22.setKey("我要投稿");
		menu22.setName("我要投稿");
		menu22.setType("click");

		subMenu2.add(menu21);
		subMenu2.add(menu22);
		menu2.setSubButtons(subMenu2);

		// 菜单3
		WxMenuButton menu3 = new WxMenuButton();
		menu3.setName("剧吧基地");
		menu3.setKey("剧吧基地");
		menu3.setType("click");
		//menu3.setUrl("http://tvbar.yy.com/homePage.action?uid=1");

		// 设置菜单
		List<WxMenuButton> lists = new ArrayList<WxMenuButton>(3);
		lists.add(menu1);
		lists.add(menu2);
		lists.add(menu3);
		WxMenu wxMenu = new WxMenu();
		wxMenu.setButtons(lists);
		try {
			wxMpService.menuCreate(wxMenu);
		} catch (WxErrorException e) {
			logger.error(e);
			e.printStackTrace();
		}
		return true;
	}

	/**
	 * 删除微信公众号菜单
	 * 
	 * @param wxMpService
	 * @throws WxErrorException
	 */
	public void deleteMenu(WxMpService wxMpService) {
		try {
			wxMpService.menuDelete();
		} catch (WxErrorException e) {
			logger.error(e);
			e.printStackTrace();
		}
	}
	

	
	/**
	 * 辅助方法
	 * 
	 * @param intercept
	 * @param concent
	 * @param wxMpMessageRouter
	 * @return
	 */
	public WxMpMessageRouter setTextHandler(String intercept,
			final String concent, WxMpMessageRouter wxMpMessageRouter) {

		System.out.println("设置文字路由,拦截的文字为：" + intercept);
		WxMpMessageHandler handler = new WxMpMessageHandler() {
			@Override
			public WxMpXmlOutMessage handle(WxMpXmlMessage wxMessage,
					Map<String, Object> context, WxMpService wxMpService,
					WxSessionManager arg3) throws WxErrorException {
				WxMpXmlOutTextMessage m = WxMpXmlOutMessage.TEXT()
						.content(concent).fromUser(wxMessage.getToUserName())
						.toUser(wxMessage.getFromUserName()).build();
				return m;
			}
		};

		return wxMpMessageRouter.rule().async(false).content(intercept)
				.handler(handler).end();
	}
	
	/**
	 * 多媒体文件上传
	 * @param wxMpService
	 * @param request
	 * @param mediaType
	 * @return
	 * @throws Exception
	 */
	 public String wxMediaUpload( WxMpService wxMpService,HttpServletRequest request, String mediaType) throws Exception {
			
			// 是否是二进制流
		 /*			if (!(request instanceof MultipartRequest)) {
				System.out.println("-----------------------------");
			}
			MultipartRequest req = (MultipartRequest) request;
			File file = req.getFile("media")[0];
			System.out.println(file.toPath());;*/
			File file = new File("E:\1.jpg");
			String url = "https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=ACCESS_TOKEN&type=" + mediaType;
			System.out.println("url----------------------:" + url);
		    return wxMpService.execute(new MediaUploadRequestExecutor(), url, file).toString();
	 }
	 
		/**
		 * 查询微信公众号菜单
		 * 
		 * @param wxMpService
		 * @throws WxErrorException
		 */
		public String queryMenu(WxMpService wxMpService) {
			WxMenu wxMenu = null;
			try {
				wxMenu = wxMpService.menuGet();
			} catch (WxErrorException e) {
				logger.error(e);
				e.printStackTrace();
			}
			return wxMenu.toJson();
		}

		/**
		 * 保存已关注的用户（项目上线时调用一次）
		 * @param wxMpService
		 * @return
		 * @throws WxErrorException
		 */
		public boolean saveCurrentUser(WxMpService wxMpService) throws WxErrorException {
			
			WxMpUserList wxUserList = wxMpService.userList(null);
			do{
				for(String openId: wxUserList.getOpenIds()){
					// 保存用户信息
					String lang = "zh_CN"; //语言
					WxMpUser user = wxMpService.userInfo(openId, lang);
					saveUserInfo(user);
				}

			}
			while(wxUserList.getCount() == 10000);
			return true;
		}


}
