package com.yy.ent.tvbar.action;

import com.yy.ent.cherrice.annotation.Read;
import com.yy.ent.cherrice.ret.Forward;
import com.yy.ent.cherrice.ret.Render;
import com.yy.ent.cherrice.ret.RenderType;
import com.yy.ent.commons.base.dto.Property;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.tvbar.base.BaseAction;
import com.yy.ent.tvbar.base.BaseForward;
import com.yy.ent.tvbar.common.constants.Constants;
import com.yy.ent.tvbar.common.model.info.Event;
import com.yy.ent.tvbar.common.model.info.Topic;
import com.yy.ent.tvbar.common.model.page.PointPage;
import com.yy.ent.tvbar.common.model.page.ReplyPage;
import com.yy.ent.tvbar.common.model.page.TopicPage;
import com.yy.ent.tvbar.dao.info.EventDao;
import com.yy.ent.tvbar.service.info.EventGroupService;
import com.yy.ent.tvbar.service.info.PageService;
import com.yy.ent.tvbar.service.info.TopicService;
import com.yy.ent.tvbar.service.info.UserInfoService;
import net.sf.json.JSONObject;

import java.util.List;

/**
 * Created by Administrator on 2015-06-25.
 */
public class TopicAction extends BaseAction {
    @Inject(instance = PageService.class)
    private PageService pageService;

    @Inject(instance = TopicService.class)
    private TopicService topicService;

    @Inject(instance = EventGroupService.class)
    private EventGroupService eventGroupService;

    @Inject(instance = UserInfoService.class)
    private UserInfoService userInfoService;

    public BaseForward topicPage(@Read(key = "uid") String uid, @Read(key = "topicId") Integer topicId) throws Exception {
        JSONObject json = new JSONObject();
        json.put("result", 0);
        try {
//            TopicPage topicPage = pageService.queryTopicByTopicId(topicId);
            TopicPage topicPage = topicService.queryBaseTopicPage(topicId);
            List<ReplyPage> replyPages = pageService.queryTopicReplyPage(topicId,0);
            List<Property> relateGroups =  pageService.queryRelativeGroupByTopicId(topicId);
            String icon = userInfoService.getUserIcon(uid);
            setAttribute("icon",icon);
            setAttribute("topicPage", topicPage);
            setAttribute("replyPages", replyPages);
            setAttribute("relateGroups",relateGroups);
            setAttribute("uid", uid);
            setAttribute("result", 1);
        } catch (Exception e) {
            logger.warn("topicPage.action err", e);
        }
        return BaseForward.moblie("post-detail.jsp");
    }

    public Render loadTopicData(@Read(key = "topicId") Integer topicId) throws Exception {
        JSONObject json = new JSONObject();
        json.put("result", 0);
        try {
            TopicPage topicPage = topicService.queryBaseTopicPage(topicId);
            List<ReplyPage> replyPages = pageService.queryTopicReplyPage(topicId,0);
            json.put("topicPage", topicPage);
            json.put("replyPages",replyPages.toString());
            json.put("result", 1);
        } catch (Exception e) {
        }
        return getRender(json.toString());
    }

    public Render topicPageMoreReply(@Read(key = "topicId") Integer topicId, @Read(key = "pageIndex") Integer pageIndex, @Read(key = "rankType") Integer rankType) throws Exception {
        JSONObject json = new JSONObject();
        json.put("result", 0);
        try {
            List<ReplyPage> replyPages = pageService.queryTopicMoreReplyPage(topicId, pageIndex*Constants.VIEWPOINT_MORECNT, Constants.VIEWPOINT_MORECNT,rankType);
            if(replyPages.size() < Constants.VIEWPOINT_MORECNT)
                json.put("isEnd", 1);
            else
                json.put("isEnd",0);
            json.put("replyPages", replyPages);
            json.put("result", 1);
            return getRender(RenderType.JSON, json.toString());
        } catch (Exception e) {
            logger.warn("topicPageMoreReply.action err",e);
        }
        return getRender("");
    }

    public Forward postTopicPage(@Read(key = "uid") String uid, @Read(key = "groupId") String groupId) throws Exception{
        setAttribute("groupId", groupId);
        setAttribute("uid", uid);
        return getForward("mobile/postTopic.jsp");
    }

    public Render postTopic(@Read Property p ) throws Exception{
        JSONObject json = new JSONObject();
        json.put("result", 0);
        try {
            if(p.get("userId").isEmpty())
                return getRender(json.toString());

            if(!p.get("groupId").isEmpty()){
                Integer eventId = eventGroupService.insertGroupEvent(p.getInt("groupId"), 0, "default");
                p.put("eventId",eventId);
            }
            topicService.insertTopicById(p);
            json.put("result", 1);
        } catch (Exception e) {
            logger.warn("postTopic.action err",e);
        }
        return getRender(json.toString());
    }
}


