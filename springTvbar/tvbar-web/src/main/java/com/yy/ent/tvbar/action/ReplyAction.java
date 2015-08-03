package com.yy.ent.tvbar.action;

import com.yy.ent.cherrice.Return;
import com.yy.ent.cherrice.annotation.Read;
import com.yy.ent.cherrice.ret.Forward;
import com.yy.ent.cherrice.ret.Render;
import com.yy.ent.commons.base.dto.Property;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.tvbar.base.BaseAction;
import com.yy.ent.tvbar.common.constants.Constants;
import com.yy.ent.tvbar.common.model.info.ViewPoint;
import com.yy.ent.tvbar.common.model.page.PointPage;
import com.yy.ent.tvbar.service.info.*;
import net.sf.json.JSONObject;

import javax.servlet.http.HttpServletRequest;
import java.awt.*;
import java.util.List;

/**
 * Created by Administrator on 2015-06-25.
 */
public class ReplyAction extends BaseAction{
    @Inject(instance = PageService.class)
    private PageService pageService;

    @Inject(instance = ViewPointService.class)
    private ViewPointService viewPointService;

    @Inject(instance = ReplyService.class)
    private ReplyService replyService;

    @Inject(instance = ReplyHotReqService.class)
    private ReplyHotReqService replyHotReqService;

    @Inject(instance = EvidenceService.class)
    private EvidenceService evidenceService;

    @Inject(instance = UserInfoService.class)
    private UserInfoService userInfoService;

    public Forward replyListPage(@Read(key = "uid") String uid, @Read(key = "userId") String userId, @Read(key = "replyId") Long replyId) throws Exception {
        try {
            if(replyId != null && replyId != 0){
                PointPage pointPage = pageService.queryReplyPageByReplyId(replyId);
                setAttribute("pointPage", pointPage);
            }
            else
                return getForward("无效的页面");
            String icon = userInfoService.getUserIcon(uid);
            setAttribute("icon",icon);
            setAttribute("uid", uid);
        } catch (Exception e) {
            logger.warn("The error in homePage: ", e);
        }

        return getForward("mobile/replylist.jsp");
    }

    public Forward replyPage(@Read(key = "uid") String uid, @Read(key = "pointId") Integer pointId, @Read(key = "topicId") Integer topicId) throws Exception {
        try {
            if(!uid.isEmpty() && pointId != null){
                ViewPoint viewPoint = viewPointService.queryPointByPointId(pointId);
                setAttribute("viewPoint", viewPoint);
            }
            String icon = userInfoService.getUserIcon(uid);
            setAttribute("topicId",topicId);
            setAttribute("icon",icon);
            setAttribute("uid", uid);
        } catch (Exception e) {
            logger.warn("The error in homePage: " , e);
        }

        return getForward("mobile/reply.jsp");
    }

    public Render moreReplyEvidences(@Read(key = "replyId") Long replyId, @Read(key = "pageIndex") Integer pageIndex) throws Exception {
        JSONObject json = new JSONObject();
        try {
            if(replyId != null){
                List<Property> evidences = evidenceService.queryMoreEvidenceByReplyId(replyId, pageIndex*Constants.EVIDENCE_MORECNT, Constants.EVIDENCE_MORECNT);
                json.put("evidences", evidences);
            }
        } catch (Exception e) {
            logger.warn("moreReplyEvidences.action err ",e);
        }
        return getRender(json.toString());
    }

    public Return zanReply(@Read(key = "uid") String uid, @Read(key = "replyId") Long replyId) throws Exception {
        HttpServletRequest req = getRequest();
        JSONObject json = new JSONObject();
        json.put("result",0);
        try {
            if(uid.isEmpty())
                return getRender(json.toString());
            Integer enable = replyHotReqService.clickZan(replyId, uid);
            Integer zanCount = replyService.queryReplyZanCount(replyId);
            json.put("zanCount",zanCount);
            json.put("enable", enable);
            json.put("result", 1);
        } catch (Exception e) {
            logger.warn("zanReply.action error",e);
        }
        return getRender(json.toString());
    }

    public Return opposeReply(@Read(key = "uid") String uid, @Read(key = "replyId") Long replyId) throws Exception {
        HttpServletRequest req = getRequest();
        JSONObject json = new JSONObject();
        json.put("result",0);
        try {
            if(uid.isEmpty())
                return getRender(json.toString());
            Integer enable = replyHotReqService.clickCai(replyId, uid);
            Integer caiCount = replyService.queryReplyCaiCount(replyId);
            json.put("caiCount", caiCount);
            json.put("enable", enable);
            json.put("result",1);
        } catch (Exception e) {
            logger.warn("opposeReply.action error",e);
        }
        return getRender(json.toString());
    }

    public Return getReply(@Read(key = "op") String op) throws Exception {
        HttpServletRequest req = getRequest();
//        Property companyCase = homeService.queryCompanyCase(id);
//        req.setAttribute("item", companyCase);
        return getRender("getReply.action?op="+op);
    }
    
	public Render replyTopic(@Read(key = "uid") String uid, @Read(key = "point") String point) throws Exception{
        JSONObject json = new JSONObject();
        json.put("result",0);
        try {
            //JSON示例
            //{"name":"《蜘蛛侠》：能力越大，责任越大","url0":"http://tvbar.bs2dl.yy.com/NWFlNjIwOTFlZjZjNGMyMmE5M2UxMzU5YmQzMmUwNzBfMTQzNjUxMzQwMDQwMw.jpg","url1":"http://tvbar.bs2dl.yy.com/ZTg3ZjQ3ZTgwMzg2NDFmMDgwNGI4NDAxNWZlMDAyOTdfMTQzNjUxMzQwNDA2MA.jpg","url2":"http://tvbar.bs2dl.yy.com/MGYyMjEzZWY1ZTQ4NDU2NDhiMzBhOWZlMDIxYWI2M2JfMTQzNjUxMzQxMTIyMg.jpg","url3":"http://tvbar.bs2dl.yy.com/Y2Y0NTZkMjU5ZTQ5NGZkYWIwMGVmYzU3YjFiNDAwNjZfMTQzNjUxMzQxNDE0MA.jpg","desc0":"图片0","desc1":"图片1","desc2":"","desc3":"图片3"}

            if(uid.isEmpty()){
                json.put("errMsg","发布失败,请登陆后发布话题");
                return getRender(json.toString());
            }
            logger.info("replyTopic uid="+uid+"point="+point);

            JSONObject pointJson = JSONObject.fromObject(point);
            PointPage topicReplyPage = new PointPage(pointJson);

            if(topicReplyPage.getTopicId() == 0 && topicReplyPage.getPointId() == 0){
                json.put("errMsg","不属于任何话题或观点，发表回复失败");
                return getRender(json.toString());
            }

            topicReplyPage.setUserId(uid);
            topicReplyPage.setCreatorId(uid);
            pageService.insertReply(topicReplyPage);

            json.put("result",1);
        } catch (Exception e) {
            logger.warn("replyTopic.action err",e);
        }
        return getRender(json.toString());
	}

    public Render agreeHotPoint(@Read(key = "topicId") Integer topicId){
        JSONObject json = new JSONObject();
        json.put("result", 0);
        try {
            List<Property> viewPoints = viewPointService.queryRankPointByTopicId(topicId, 0, 4);
            json.put("viewPoints", viewPoints);
            json.put("result", 1);
        } catch (Exception e) {
            logger.warn("agreeHotPoint.action err ",e);
        }

        return getRender(json.toString());
    }
}
