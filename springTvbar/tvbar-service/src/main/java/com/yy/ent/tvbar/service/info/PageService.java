package com.yy.ent.tvbar.service.info;


import com.yy.ent.commons.base.dto.Property;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.tvbar.common.constants.Constants;
import com.yy.ent.tvbar.common.model.info.Group;
import com.yy.ent.tvbar.common.model.info.Topic;
import com.yy.ent.tvbar.common.model.page.GroupPage;
import com.yy.ent.tvbar.common.model.page.PointPage;
import com.yy.ent.tvbar.common.model.page.ReplyPage;
import com.yy.ent.tvbar.common.model.page.TopicPage;
import com.yy.ent.tvbar.dao.base.MultiDao;
import com.yy.ent.tvbar.dao.info.ReplyHotReqDao;
import com.yy.ent.tvbar.service.base.BaseService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;


/**
 * 实体页面
 *
 * @author libiao
 */
public class PageService extends BaseService {

    @Inject(instance = GroupService.class)
    private GroupService groupService;

    @Inject(instance = TopicService.class)
    private TopicService topicService;

    @Inject(instance = ViewPointService.class)
    private ViewPointService viewPointService;

    @Inject(instance = EvidenceService.class)
    private EvidenceService evidenceService;

    @Inject(instance = UserInfoService.class)
    private UserInfoService userInfoService;

    @Inject(instance = ReplyService.class)
    private ReplyService replyService;

    @Inject(instance = ReplyHotReqService.class)
    private ReplyHotReqService replyHotReqService;

    @Inject(instance = MultiDao.class)
    private MultiDao multiDao;

    /**
     * 查询更多观点页 *
     * @param topicId
     * @param offset
     * @param moreCnt
     * @param rankType 排序类型:0-票数，1-时间
     * @return
     * @throws Exception
     */
    public List<PointPage> queryMorePoint(Integer topicId, Integer offset, Integer moreCnt, Integer rankType) throws Exception {
        List<PointPage> viewPoints= new LinkedList<PointPage>();
        List<Property> hotPoints = viewPointService.queryMorePointByTopicId(topicId, offset, moreCnt, rankType);
        for(Property p:hotPoints){
            Integer pointId = p.getInt("pointId");
            PointPage topicReplyPage = new PointPage(p);
            topicReplyPage.setZanCount(replyHotReqService.countZan(p.getLong("replyId")));
            topicReplyPage.setOpposeCount(replyHotReqService.countCai(p.getLong("replyId")));
            topicReplyPage.setCreatorIcon(userInfoService.getUserIcon(topicReplyPage.getUserId()));
            topicReplyPage.setCreatorName(userInfoService.getUserNick(p.get("userId")));
            if(hotPoints.size()<moreCnt)
                topicReplyPage.setIsEnd((byte)1);
            else
                topicReplyPage.setIsEnd((byte)0);
            //查询对应回复的证据
            List<Property> evidences = evidenceService.queryMoreEvidenceByReplyId(topicReplyPage.getReplyId(), 0, Constants.EVIDENCE_MORECNT);
            topicReplyPage.setEvidences(evidences);
            viewPoints.add(topicReplyPage);
        }
        return viewPoints;
    }

    /**
     * 查询回复页 *
     *
     * @return
     * @throws Exception
     */
    public PointPage queryReplyPageByPriId(String userId, Integer pointId) throws Exception {
        Property p = replyService.queryReply(userId, pointId);
        PointPage pointPage = new PointPage(p);
        pointPage.setZanCount(replyHotReqService.countZan(p.getLong("replyId")));
        pointPage.setOpposeCount(replyHotReqService.countCai(p.getLong("replyId")));
        pointPage.setCreatorIcon(userInfoService.getUserIcon(pointPage.getUserId()));
        pointPage.setCreatorName(userInfoService.getUserNick(p.get("userId")));

        List<Property> evidences = evidenceService.queryMoreEvidenceByReplyId(pointPage.getReplyId(), 0, Constants.EVIDENCE_MORECNT);
        pointPage.setEvidences(evidences);
        return pointPage;
    }

    /**
     * 查询回复页(replyId) *
     *
     * @return
     * @throws Exception
     */
    public PointPage queryReplyPageByReplyId(Long ReplyId) throws Exception {
        Property p = replyService.queryReply(ReplyId);
        PointPage pointPage = new PointPage(p);
        pointPage.setZanCount(replyHotReqService.countZan(p.getLong("replyId")));
        pointPage.setOpposeCount(replyHotReqService.countCai(p.getLong("replyId")));
        pointPage.setCreatorIcon(userInfoService.getUserIcon(pointPage.getUserId()));
        pointPage.setCreatorName(userInfoService.getUserNick(p.get("userId")));

        List<Property> evidences = evidenceService.queryMoreEvidenceByReplyId(pointPage.getReplyId(), 0, Constants.EVIDENCE_MORECNT);
        pointPage.setEvidences(evidences);
        return pointPage;
    }

    /**
     * 查询话题更多回复页 *
     * @param topicId
     * @param offset
     * @param moreCnt
     * @param rankType 排序类型:0-票数，1-时间
     * @return
     * @throws Exception
     */
    public List<ReplyPage> queryTopicMoreReplyPage(Integer topicId, Integer offset, Integer moreCnt, Integer rankType) throws Exception {
        List<ReplyPage> replyPages = new LinkedList<ReplyPage>();

        List<PointPage> viewPoints = queryMorePoint(topicId, offset, moreCnt, rankType);
        for(PointPage pointPage:viewPoints){
            ReplyPage replyPage = new ReplyPage(pointPage);
            //查询观点对应的非主回复插入主回复观点页
            List<PointPage> replys = new LinkedList<PointPage>();
            List<Property> replyPoints = viewPointService.queryMoreHotReplyByPointId(pointPage.getPointId(), 0, Constants.REPLY_MORECNT, rankType);
            for(Property p:replyPoints){
                if(pointPage.getUserId() != p.get("userId")){
                    PointPage replyPointPage = new PointPage(p);
                    replyPointPage.setZanCount(replyHotReqService.countZan(p.getLong("replyId")));
                    replyPointPage.setOpposeCount(replyHotReqService.countCai(p.getLong("replyId")));
                    replyPointPage.setCreatorIcon(userInfoService.getUserIcon(replyPointPage.getUserId()));
                    replyPointPage.setCreatorName(userInfoService.getUserNick(p.get("userId")));

                    List<Property> evidences = evidenceService.queryMoreEvidenceByReplyId(p.getLong("replyId"), 0, Constants.EVIDENCE_MORECNT);
                    replyPointPage.setEvidences(evidences);
                    replys.add(replyPointPage);
                }
            }
            replyPage.setReplys(replys);
            //将回复页增加到回复列表
            replyPages.add(replyPage);
        }

        return replyPages;
    }

    /**
     * 查询话题回复页 *
     *
     * @return
     * @throws Exception
     */
    public List<ReplyPage> queryTopicReplyPage(Integer topicId, Integer rankType) throws Exception {
        return queryTopicMoreReplyPage(topicId, 0, Constants.VIEWPOINT_MORECNT, rankType);
    }

    /**
     * 查询更多热门观点页 *
     *
     * @return
     * @throws Exception
     */
    public List<PointPage> queryMoreHotPoint(Integer topicId, Integer offset, Integer moreCnt) throws Exception {
        List<PointPage> topicReplyPages = new LinkedList<PointPage>();
        List<Property> hotPoints = viewPointService.queryMoreHotPointByTopicId(topicId, offset, moreCnt);
        for(Property p:hotPoints){
            Integer pointId = p.getInt("pointId");
            PointPage topicReplyPage = new PointPage(p);
            topicReplyPage.setZanCount(replyHotReqService.countZan(p.getLong("replyId")));
            topicReplyPage.setOpposeCount(replyHotReqService.countCai(p.getLong("replyId")));
            topicReplyPage.setCreatorIcon(userInfoService.getUserIcon(topicReplyPage.getCreatorId()));
            topicReplyPage.setCreatorName(userInfoService.getUserNick(p.get("creatorId")));
            if(hotPoints.size()<moreCnt)
                topicReplyPage.setIsEnd((byte)1);
            else
                topicReplyPage.setIsEnd((byte)0);
            //查询对应回复的证据
            List<Property> evidences = evidenceService.queryMoreEvidenceByReplyId(p.getLong("replyId"), 0, Constants.EVIDENCE_MORECNT);
            topicReplyPage.setEvidences(evidences);
            topicReplyPages.add(topicReplyPage);
        }
        return topicReplyPages;//返回观点页列表
    }

    /**
     * 查询主页小组更多话题 *
     *
     * @return
     * @throws Exception
     */
    public List<TopicPage> queryHomeMoreTopic(Integer groupId, Integer offset, Integer moreCnt, Integer rankType) throws Exception {
        List<TopicPage> topicList = new LinkedList<TopicPage>();
        List<Property> topics = topicService.queryGroupMoreTopics(groupId, offset, moreCnt);
        for(Property p:topics){
            Integer topicId = p.getInt("topicId");
            TopicPage topicPage = new TopicPage(p);
            topicPage.setCreatorIcon(userInfoService.getUserIcon(topicPage.getCreatorId()));
            topicPage.setCreatorName(userInfoService.getUserNick(p.get("creatorId")));
            if(topics.size()<moreCnt)
                topicPage.setIsEnd((byte)1);
            else
                topicPage.setIsEnd((byte)0);

            List<PointPage> points= queryMorePoint(topicId, 0, Constants.VIEWPOINT_MORECNT, rankType);
            //为话题json添加观点key:value(json串)
            topicPage.setViewPoints(points);
            topicList.add(topicPage);
        }
        return topicList;//返回话题页列表
    }

    /**
     * 查询主页更多推荐小组话题 *
     * @param offset
     * @param moreCnt
     * @return 返回json对象
     * @throws Exception
     */
    public List<GroupPage> queryHomeMoreRecommendGroup(Integer offset, Integer moreCnt, Integer rankType) throws Exception {
        List<GroupPage> groupPages = new LinkedList<GroupPage>();
        List<Property> groups = groupService.queryMoreRecommendGroups(offset, moreCnt);
        for(Property p:groups){
            Integer groupId = p.getInt("groupId");
            GroupPage groupPage = new GroupPage(p);
            if(groups.size()<moreCnt)
                groupPage.setIsEnd((byte)1);
            else
                groupPage.setIsEnd((byte)0);

            List<TopicPage> topicPages = queryMoreTopic(groupId, 0, Constants.TOPIC_MORECNT);
            groupPage.setTopicLists(topicPages);
            groupPages.add(groupPage);
        }
        return groupPages;//返回推荐小组页列表
    }

    /**
     * 查询小组更多话题页 *
     *
     * @return
     * @throws Exception
     */
    public List<TopicPage> queryMoreTopic(Integer groupId, Integer offset, Integer moreCnt) throws Exception {
        List<TopicPage> topicPages = new LinkedList<TopicPage>();
        List<Property> topics = topicService.queryGroupMoreTopics(groupId, offset, moreCnt);
        for(Property p:topics){
            Integer topicId = p.getInt("topicId");
            TopicPage topicPage = new TopicPage(p);
            topicPage.setCreatorIcon(userInfoService.getUserIcon(topicPage.getCreatorId()));
            topicPage.setCreatorName(userInfoService.getUserNick(p.get("creatorId")));
            if(topics.size()<moreCnt)
                topicPage.setIsEnd((byte)1);
            else
                topicPage.setIsEnd((byte)0);

            List<PointPage> topicReplyPages = queryMoreHotPoint(topicId, 0, Constants.VIEWPOINT_MORECNT);
            topicPage.setViewPoints(topicReplyPages);
            topicPages.add(topicPage);
        }
        return topicPages; //返回话题页列表
    }

    /**
     * 查看小组页 *
     * @param groupId   小组id
     * @param moreCnt   查询的话题数
     * @return
     * @throws Exception
     */
    public GroupPage queryGroup(Integer groupId, Integer moreCnt) throws Exception {
        Group group = groupService.queryGroupByGroupId(groupId);
        GroupPage groupPage = new GroupPage(group);

        List<TopicPage> topicPages = queryMoreTopic(groupId, 0, moreCnt);
        if(topicPages.size()<moreCnt)
            groupPage.setIsEnd((byte)1);
        else
            groupPage.setIsEnd((byte)0);
        groupPage.setTopicLists(topicPages);
        return groupPage;
    }

    /**
     * 查询topicId对应话题 *
     *
     * @return
     * @throws Exception
     */
    public TopicPage queryTopicByTopicId(Integer topicId, Integer rankType) throws Exception {
        Topic topic = topicService.queryTopicById(topicId.longValue());
        TopicPage topicPage = new TopicPage(topic);
        topicPage.setCreatorIcon(userInfoService.getUserIcon(topicPage.getCreatorId()));
        topicPage.setCreatorName(userInfoService.getUserNick(topic.getCreatorId()));

        List<PointPage> topicReplyPages = queryMorePoint(topicId, 0, Constants.VIEWPOINT_MORECNT, rankType);
        if(topicReplyPages.size()<Constants.VIEWPOINT_MORECNT)
            topicPage.setIsEnd((byte)1);
        else
            topicPage.setIsEnd((byte)0);
        topicPage.setViewPoints(topicReplyPages);
        return topicPage;
    }

    /**
     * 查询userId,pointId对应话题 *
     *
     * @return
     * @throws Exception
     */
    public PointPage queryReplyPage(String userId, Integer topicId) throws Exception {
        Property reply = replyService.queryReply(userId, topicId);
        PointPage topicReplyPage = new PointPage(reply);
        topicReplyPage.setZanCount(replyHotReqService.countZan(topicReplyPage.getReplyId()));
        topicReplyPage.setOpposeCount(replyHotReqService.countCai(topicReplyPage.getReplyId()));
        topicReplyPage.setCreatorIcon(userInfoService.getUserIcon(topicReplyPage.getUserId()));
        topicReplyPage.setCreatorName(userInfoService.getUserName(topicReplyPage.getUserId()));
        //查询对应回复的证据
        List<Property> evidences = evidenceService.queryMoreEvidenceByReplyId(topicReplyPage.getReplyId(), 0, Constants.EVIDENCE_MORECNT);
        topicReplyPage.setEvidences(evidences);

        return topicReplyPage;
    }

    /**
     * 查询groupId热度关联小组 *
     *
     * @return
     * @throws Exception
     */
    public List<Property> queryRelativeGroupByGroupId(Integer groupId) throws Exception {
        List<Property> groupList = multiDao.queryCollection("QueryRelativeGroupByGroupId", groupId, groupId);
        return groupList;
    }

    /**
     * 查询topicId热度关联小组 *
     *
     * @return
     * @throws Exception
     */
    public List<Property> queryRelativeGroupByTopicId(Integer topicId) throws Exception {
        Topic topic = topicService.queryTopicById(topicId.longValue());
        List<Property> groupList = multiDao.queryCollection("QueryRelativeGroupByTopicId", topic.getEventId());
        return groupList;
    }

    /**
     * 发布回复页 *
     * jsonObject对象
     * @return
     * @throws Exception
     */
    public void insertReply(PointPage topicReplyPage) throws Exception {
        try {
            Integer pointId = topicReplyPage.getPointId();
            if(pointId==0){
                //如果是新观点则插入
                topicReplyPage.setEnable((byte)1);
                Long lPointId = viewPointService.insertPoint(topicReplyPage);
                topicReplyPage.setPointId(lPointId.intValue());
            }
            Long replyId = replyService.insertReturnId(topicReplyPage);
            topicReplyPage.setReplyId(replyId);
            if(pointId==0){
                viewPointService.updateReplyId(topicReplyPage.getPointId(),replyId);
            }
            evidenceService.insertEvidenceList(topicReplyPage.getUserId(),topicReplyPage.getReplyId(), topicReplyPage.getEvidences());
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("插入观点失败");
        }
    }

    /**
     * 发布观点页 *
     * jsonObject对象
     * @return
     * @throws Exception
     */
    public void insertPoint(JSONObject pointObj) throws Exception {
        JSONArray evidences = pointObj.getJSONArray("evidences");
        evidenceService.insertEvidenceList(evidences);
        viewPointService.insertPoint(pointObj);
    }

    /**
     * 发布观点页 *
     * 字串
     * @return
     * @throws Exception
     */
    public void insertPoint(String strPointPage) throws Exception {
        JSONObject pointObj = JSONObject.fromObject(strPointPage);
        insertPoint(pointObj);
    }

//    /**
//     * 发布观点页(适配证据一个描述多个图) *
//     * jsonObject对象
//     * @return
//     * @throws Exception
//     */
//    public void insertPointV1(JSONObject pointObj) throws Exception {
//        JSONArray evidences = pointObj.getJSONArray("evidences");
//        String evidenceDes = pointObj.getString("evidenceDes");
//        evidenceService.insertEvidenceList(evidences, evidenceDes);
//        viewPointService.insertPoint(pointObj);
//    }

//    /**
//     * 发布观点页(适配证据一个描述多个图) *
//     * 字串
//     * @return
//     * @throws Exception
//     */
//    public void insertPointV1(String strPointPage) throws Exception {
//        JSONObject pointObj = JSONObject.fromObject(strPointPage);
//        insertPointV1(pointObj);
//    }

    /**
     * 发布话题页 *
     *
     * @return
     * @throws Exception
     */
    public void insertTopic(String strTopicPage) throws Exception {
        JSONObject topicObj = JSONObject.fromObject(strTopicPage);
        JSONArray points = (JSONArray)topicObj.get("points");
        for(Object obj:points){
            insertPoint((JSONObject)obj);
        }
        topicService.insertTopic(topicObj);
    }
}











