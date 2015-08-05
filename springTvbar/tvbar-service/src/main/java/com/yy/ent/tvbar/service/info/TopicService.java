package com.yy.ent.tvbar.service.info;



import com.yy.ent.commons.base.dto.Property;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.tvbar.common.constants.Constants;
import com.yy.ent.tvbar.common.model.info.Topic;
import com.yy.ent.tvbar.common.model.page.TopicPage;
import com.yy.ent.tvbar.dao.base.MultiDao;
import com.yy.ent.tvbar.dao.info.TopicDao;
import com.yy.ent.tvbar.service.base.BaseService;
import org.apache.commons.beanutils.BeanUtils;
import net.sf.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;


/**
 * 话题页
 *
 * @author libiao
 */
public class TopicService extends BaseService {


    @Inject(instance = TopicDao.class)
    private TopicDao topicDao;

    @Inject(instance = UserInfoService.class)
    private UserInfoService userInfoService;

    @Inject(instance = MultiDao.class)
    private MultiDao multiDao;

    /**
     * 发布    *
     *
     * @return
     * @throws Exception
     */
    public int publish() throws Exception {
        try {
                SimpleDateFormat dateformat = new SimpleDateFormat("yyyyMMdd HH:mm:ss");
                Topic topic = new Topic();
                topic.setTitle("何以琛为什么会喜欢赵默笙");
                topic.setType(new Integer(1).byteValue());
                topic.setDescription("关于这个话题讨论得很多");
                topic.setSouName("何以笙箫默");
                topic.setCreatorId("1");
                topic.setCreateTime(new Date());
                topic.setLastReplyTime(new Date());
                topic.setTopicPic("http://baike.baidu.com/picture/590814/590814/16943870/f11f3a292df5e0fe23ae6649586034a85fdf72c0.html?fr=lemma&ct=cover#aid=16943870&pic=1b4c510fd9f9d72a24a622bad02a2834359bbb52");
                int ret = topicDao.insert(topic);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return  12 ;
    }

    public void insertTopicById(Property p) throws Exception {

//        SimpleDateFormat dateformat = new SimpleDateFormat(Constants.DATEPATTERN1);
//        String date = dateformat.format(new Date());
        Topic topic = new Topic();
        topic.setTitle(p.get("title"));
        topic.setEventId(p.getInt("eventId"));
        topic.setType((byte) p.getInt("type"));
        topic.setDescription(p.get("description"));
        topic.setSouName(p.get("souName"));
        topic.setCreatorId(p.get("userId"));
        topic.setCreateTime(new Date());
        topic.setLastReplyTime(new Date());
        topic.setTopicPic(p.get("topicPic"));
        topic.setHandlePic(p.get("handlePic"));
        topicDao.insert(topic);
    }

    /**
     * 查询某话题 *
     *
     * @return
     * @throws Exception
     */
    public Topic queryTopicById(Long topicId) throws Exception {
        return topicDao.query(topicId);
    }

    /**
     * 查询小组更多话题 *
     *
     *
     * @return
     * @throws Exception
     */
    public List<Property> queryGroupMoreTopics(Integer groupId, Integer offset, Integer moreCnt){
        return multiDao.queryCollection("QueryGroupMoreTopics", groupId, offset, moreCnt);
    }

    /**
     * 查询话题基本信息页 *
     *
     *
     * @return
     * @throws Exception
     */
    public TopicPage queryBaseTopicPage(Integer topicId) throws Exception{
        Topic topic = queryTopicById(topicId.longValue());
        TopicPage topicPage = new TopicPage(topic);
        topicPage.setCreatorIcon(userInfoService.getUserIcon(topic.getCreatorId()));
        topicPage.setCreatorName(userInfoService.getUserNick(topic.getCreatorId()));
        return topicPage;
    }

    /**
     * 插入话题json对象 *
     *
     * @return
     * @throws Exception
     */
    public void insertTopic(JSONObject jsonTopic) throws Exception {
        Topic topic = new Topic();
        BeanUtils.copyProperties(topic, jsonTopic);
        topicDao.insert(topic);
    }

    /**
     * 插入话题json字串 *
     *
     * @return
     * @throws Exception
     * @param strJsonTopic
     */
    public void insertTopic(String strJsonTopic) throws Exception {
        JSONObject topicObj = JSONObject.fromObject(strJsonTopic);
        insertTopic(topicObj);
    }

}











