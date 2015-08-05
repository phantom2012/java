package com.yy.ent.tvbar.action;

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
import com.yy.ent.tvbar.service.info.GroupService;
import com.yy.ent.tvbar.service.info.HistoryGroupService;
import com.yy.ent.tvbar.service.info.PageService;

import com.yy.ent.tvbar.service.info.UserInfoService;
import net.sf.json.JSONObject;

import javax.servlet.http.HttpServletRequest;

import java.util.List;

/**
 * Created by Administrator on 2015-06-25.
 */
public class GroupAction extends BaseAction{
    @Inject(instance = PageService.class)
    private PageService pageService;

    @Inject(instance = GroupService.class)
    private GroupService groupService;

    @Inject(instance = HistoryGroupService.class)
    private HistoryGroupService historyGroupService;

    @Inject(instance = UserInfoService.class)
    private UserInfoService userInfoService;

    public BaseForward groupPage(@Read(key = "uid") String uid, @Read(key = "groupId") Integer groupId) throws Exception {
        try {
            GroupPage groupPage =  pageService.queryGroup(groupId, 10);
            List<Property> relateGroups = pageService.queryRelativeGroupByGroupId(groupId);
            if (uid != null && uid != "") {
                historyGroupService.insertOrUpdateHistoryGroup(uid,groupId,groupPage.getTitle());
                String icon = userInfoService.getUserIcon(uid);
                setAttribute("icon",icon);
                setAttribute("uid", uid);
            }
            setAttribute("group", groupPage);
            setAttribute("relateGroups", relateGroups);
        } catch (Exception e) {
            logger.warn("The error in groupPage: ", e);
        }
        return BaseForward.moblie("drama.jsp");
    }

    public BaseForward historyGroupPage(@Read(key = "uid") String uid) throws Exception {
        try {
            List<Property> historyGroups = historyGroupService.queryMoreHistoryGroups(uid, 0, 100);
            String icon = userInfoService.getUserIcon(uid);
            setAttribute("icon",icon);
            setAttribute("uid", uid);
            setAttribute("historyGroups", historyGroups);
        } catch (Exception e) {
            logger.warn("The error in historyGroupPage: ", e);
        }
        return BaseForward.moblie("history.jsp");
    }

    public Render loadGroupData(@Read(key = "groupId") Integer groupId) throws Exception {
        JSONObject json = new JSONObject();
        json.put("result", 0);
        try {
            GroupPage groupPage =  pageService.queryGroup(groupId, 10);
            List<Property> relateGroups = pageService.queryRelativeGroupByGroupId(groupId);
            json.put("group", groupPage);
            json.put("relateGroups", relateGroups);
            json.put("result", 1);
        } catch (Exception e) {
        }
        return getRender(json.toString());
    }
    
    public Render groupPageMoreTopic(@Read(key = "groupId") Integer groupId, @Read(key = "pageIndex") Integer pageIndex) throws Exception {
        JSONObject json = new JSONObject();
        json.put("result", 0);
        try {
            List<TopicPage> topicPages = pageService.queryMoreTopic(groupId, pageIndex, Constants.TOPIC_MORECNT);
            if(topicPages.size()<Constants.TOPIC_MORECNT)
                json.put("isEnd",1);
            else
                json.put("isEnd",0);
            json.put("topics", topicPages);
            json.put("result", 1);
            return getRender(RenderType.JSON, json.toString());
        } catch (Exception e) {
            logger.warn("groupPageMoreTopic err ",e);
        }
        return getRender("");
    }
}

