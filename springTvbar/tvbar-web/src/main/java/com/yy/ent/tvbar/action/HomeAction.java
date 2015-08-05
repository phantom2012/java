package com.yy.ent.tvbar.action;

import java.util.List;

import com.yy.ent.cherrice.Return;
import com.yy.ent.cherrice.annotation.Read;
import com.yy.ent.cherrice.ret.Render;
import com.yy.ent.cherrice.ret.RenderType;
import com.yy.ent.commons.base.dto.Property;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.tvbar.base.BaseAction;
import com.yy.ent.tvbar.base.BaseForward;
import com.yy.ent.tvbar.common.constants.Constants;
import com.yy.ent.tvbar.common.model.page.GroupPage;
import com.yy.ent.tvbar.common.model.page.TopicPage;
import com.yy.ent.tvbar.service.info.*;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by Administrator on 2015-06-25.
 */
@Controller
@RequestMapping("/tvbar")
public class HomeAction{
	
	private final Logger logger = Logger.getLogger(getClass());
	
    @Inject(instance = GroupService.class)
    private GroupService groupService;

    @Inject(instance = TopicService.class)
    private TopicService topicService;

    @Inject(instance = HistoryGroupService.class)
    private HistoryGroupService historyGroupService;

    @Inject(instance = PageService.class)
    private PageService pageService;

    @Inject(instance = UserInfoService.class)
    private UserInfoService userInfoService;

    @RequestMapping(value = "/homePage", method = RequestMethod.GET)
    public String homePage(@RequestParam("uid") String uid, Model model) throws Exception {
    	try {
    		List<Property> historyGroups = historyGroupService.queryMoreHistoryGroups(uid, 0, 3);
            List<GroupPage> recommendGroups = pageService.queryHomeMoreRecommendGroup(0, 10, 0);
            String icon = userInfoService.getUserIcon(uid);
            model.addAttribute("icon",icon);
            model.addAttribute("uid", uid);
            model.addAttribute("historyGroups", historyGroups);
            model.addAttribute("recommendGroups", recommendGroups);
    	} catch (Exception e) {
    		logger.warn("The error in homePage: ", e);
    	}

//        return BaseForward.moblie("index.jsp");
        return "index";
    }

//    public BaseForward homePageHtml() throws Exception {
//        try {
//            List<GroupPage> recommendGroups = pageService.queryHomeMoreRecommendGroup(0, 10, 0);
//            setAttribute("recommendGroups", recommendGroups);
//        } catch (Exception e) {
//            logger.warn("The error in homePageHtml: ", e);
//        }
//        return BaseForward.moblie("homePage.jsp");
//    }
//
//    public Render homePageAdd(@Read(key = "uid") String uid) throws Exception {
//        JSONObject json = new JSONObject();
//        try {
//            List<Property> historyGroups = historyGroupService.queryMoreHistoryGroups(uid, 0, 3);
//            String icon = userInfoService.getUserIcon(uid);
//            json.put("icon", icon);
//            json.put("uid",uid);
//            json.put("historyGroups", historyGroups);
//        } catch (Exception e) {
//            logger.warn("The error in homePageAdd: ", e);
//        }
//        return getRender(json.toString());
//    }
//
//    public Render homePage1(@Read(key = "uid") String uid) throws Exception {
//    	JSONObject json = new JSONObject();
//    	json.put("result", 0);
//    	try {
//    		List<Property> historyGroups = historyGroupService.queryMoreHistoryGroups(uid, 0, 3);
//            List<GroupPage> recommendGroups = pageService.queryHomeMoreRecommendGroup(0, 10, 0);
//            json.put("historyGroups", historyGroups);
//            json.put("recommendGroups", recommendGroups);
//            json.put("result", 1);
//    	} catch (Exception e) {
//    		logger.warn("The error in homePage1: ", e);
//    	}
//        return new Render(RenderType.JSON, json.toString());
//    }
//
//    /*public Render homePage(@Read(key = "uid") String uid) throws Exception {
//    	JSONObject json = new JSONObject();
//    	json.put("result", 0);
//    	try {
//    		List<Property> historyGroups = historyGroupService.queryMoreHistoryGroups(uid, 0, 3);
//            List<GroupPage> recommendGroups = pageService.queryHomeMoreRecommendGroup(0, 10);
//            json.put("historyGroups", historyGroups);
//            json.put("recommendGroups", recommendGroups);
//            json.put("result", 1);
//    	} catch (Exception e) {
//    	}
//
//        return getRender(json.toString());
//    }*/
//
//    public Return homeMoreTopic(@Read(key = "groupId") Integer groupId, @Read(key = "pageIndex") Integer pageIndex) throws Exception {
//        JSONObject json = new JSONObject();
//        json.put("result", 0);
//        try {
//            List<TopicPage> topicPages = pageService.queryHomeMoreTopic(groupId, pageIndex*Constants.TOPIC_MORECNT, Constants.TOPIC_MORECNT, 0);
//            if(topicPages.size() < Constants.TOPIC_MORECNT)
//                json.put("isEnd", 1);
//            else
//                json.put("isEnd",0);
//            json.put("topics", topicPages);
//            json.put("result", 1);
//        } catch (Exception e) {
//            logger.warn("homeMoreTopic.action err",e);
//        }
//
//        return getRender(json.toString());
//    }
//
//    public Return getHomeGroup(@Read(key = "id") Long id) throws Exception {
//        HttpServletRequest req = getRequest();
////        Property companyCase = homeService.queryCompanyCase(id);
////        req.setAttribute("item", companyCase);
//        return getRender("publishTopic.action");
//    }
}


