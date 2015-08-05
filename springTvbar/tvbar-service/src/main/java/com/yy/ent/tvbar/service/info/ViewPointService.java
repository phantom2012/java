package com.yy.ent.tvbar.service.info;


import com.yy.ent.cherroot.condition.DBCondition;
import com.yy.ent.commons.base.dto.Property;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.tvbar.common.model.info.Reply;
import com.yy.ent.tvbar.common.model.info.ViewPoint;
import com.yy.ent.tvbar.dao.base.MultiDao;
import com.yy.ent.tvbar.dao.info.GroupDao;
import com.yy.ent.tvbar.dao.info.ReplyDao;
import com.yy.ent.tvbar.dao.info.ViewPointDao;
import com.yy.ent.tvbar.service.base.BaseService;
import net.sf.json.JSONObject;
import org.apache.commons.beanutils.BeanUtils;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;


/**
 * 观点
 *
 * @author libiao
 */
public class ViewPointService extends BaseService {

    @Inject(instance = ViewPointDao.class)
    private ViewPointDao viewPointDao;

    @Inject(instance = ReplyDao.class)
    private ReplyDao replyDao;

    @Inject(instance = MultiDao.class)
    private MultiDao multiDao;

    public ViewPoint queryPointByPointId(Integer pointId) throws Exception{
        return viewPointDao.query(pointId.longValue());
    }

    /**
     * 查询话题更多观点 *
     * @param topicId
     * @param offset
     * @param moreCnt
     * @param rankType 排序类型:0-票数，1-时间
     * @return
     * @throws Exception
     */
    public List<Property> queryMorePointByTopicId(Integer topicId, Integer offset, Integer moreCnt, Integer rankType) throws Exception {
        List<Property> points = new LinkedList<Property>();
        if(rankType == 0)
            points =  multiDao.queryCollection("QueryMoreHotPointByTopicId", topicId, offset, moreCnt);
        else if(rankType == 1)
            points = multiDao.queryCollection("QueryMorePointByTopicId", topicId, offset, moreCnt);
        return points;
    }

    /**
     * 查询观点更多回复 *
     *
     * @return
     * @throws Exception
     */
    public List<Property> queryMoreHotReplyByPointId(Integer pointId, Integer offset, Integer moreCnt, Integer rankType) throws Exception {
        List<Property> replys = new LinkedList<Property>();
        if(rankType == 0)
            replys =  multiDao.queryCollection("QueryMoreHotReplyByPointId", pointId, offset, moreCnt);
        else if(rankType == 1)
            replys = multiDao.queryCollection("QueryMoreReplyByPointId", pointId, offset, moreCnt);
        return replys;
    }

    /**
     * 查询话题前n热门观点 *
     *
     * @return
     * @throws Exception
     */
    public List<Property> queryRankPointByTopicId(Integer topicId, Integer offset, Integer moreCnt) throws Exception {
        return multiDao.queryCollection("QueryRankPointByTopicId", topicId, offset, moreCnt);
    }

    /**
     * 查询话题更多热门观点 *
     *
     * @return
     * @throws Exception
     */
    public List<Property> queryMoreHotPointByTopicId(Integer topicId, Integer offset, Integer moreCnt) throws Exception {
        return multiDao.queryCollection("QueryMoreHotPointByTopicId", topicId, 30, offset, moreCnt);
    }

    /**
     * 插入观点对象 *
     *
     * @return
     * @throws Exception
     */
    public Long insertPoint(Object pointObj) throws Exception {
        ViewPoint viewPoint = new ViewPoint();
        BeanUtils.copyProperties(viewPoint, pointObj);
        viewPoint.setCreateTime(new Date());
        return viewPointDao.insertReturnId(viewPoint);
    }

    /**
     * 插入观点json字串 *
     *
     * @return
     * @throws Exception
     */
    public void insertPoint(String strJsonPoint) throws Exception {
        insertPoint(JSONObject.fromObject(strJsonPoint));
    }

    public void updateReplyId(Integer pointId, Long replyId) throws Exception {
        ViewPoint viewPoint = new ViewPoint();
        viewPoint.setPointId(pointId);
        viewPoint.setReplyId(replyId);
        viewPointDao.update(viewPoint);
    }

}











