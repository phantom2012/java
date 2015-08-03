package com.yy.ent.tvbar.service.info;


import com.yy.ent.cherroot.condition.DBCondition;
import com.yy.ent.commons.base.dto.Property;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.tvbar.common.constants.Constants;
import com.yy.ent.tvbar.common.model.info.Reply;
import com.yy.ent.tvbar.common.model.info.ViewPoint;
import com.yy.ent.tvbar.dao.base.MultiDao;
import com.yy.ent.tvbar.dao.info.ReplyDao;
import com.yy.ent.tvbar.dao.info.ViewPointDao;
import com.yy.ent.tvbar.service.base.BaseService;
import net.sf.json.JSONObject;
import org.apache.commons.beanutils.BeanUtils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


/**
 * 观点
 *
 * @author libiao
 */
public class ReplyService extends BaseService {

    @Inject(instance = ViewPointDao.class)
    private ViewPointDao viewPointDao;

    @Inject(instance = ReplyDao.class)
    private ReplyDao replyDao;

    @Inject(instance = MultiDao.class)
    private MultiDao multiDao;

    public Property queryReply(String userId, Integer pointId) throws Exception{
        return multiDao.query("QueryReply", pointId, userId);
    }

    public Reply queryReplyByReplyId(Long replyId) throws Exception{
        DBCondition dbCondition = new DBCondition();
        dbCondition.addCondition("replyId", replyId);
        List<Reply> replies = replyDao.query(dbCondition);
        if (replies.isEmpty())
            return null;
        return replies.get(0);
    }

    public Property queryReply(Long replyId) throws Exception{
        return multiDao.query("QueryReplyByReplyId", replyId);
    }

    public Integer queryReplyZanCount(Long replyId) throws Exception{
        Reply reply = queryReplyByReplyId(replyId);
        if(reply == null){
            logger.warn("queryReplyZanCount error, empty reply: replyId="+replyId);
            return 0;
        }
        return reply.getZanCount();
    }

    public Integer queryReplyCaiCount(Long replyId) throws Exception{
        Reply reply = queryReplyByReplyId(replyId);
        if(reply == null){
            logger.warn("queryReplyCaiCount error, empty reply: replyId="+replyId);
            return 0;
        }
        return reply.getOpposeCount();
    }

    public void updateZanRepy(Long replyId, Integer addValue) throws Exception{
        multiDao.update("UpdateZanReply",addValue,replyId);
    }

    public void updateOpposeReply(Long replyId, Integer addValue) throws Exception{
        multiDao.update("UpdateOpposeReply",addValue,replyId);
    }

    public void insertOrUpdate(Object pointPage) throws Exception{
        Reply reply = new Reply();
        BeanUtils.copyProperties(reply, pointPage);
        reply.setCreateTime(new Date());
        multiDao.update("InsertOrUpdateReply",reply.getUserId(),reply.getPointId(),reply.getTopicId(),reply.getCreateTime(),reply.getCreateTime());
    }

    public Long insertReturnId(Object pointPage) throws Exception{
        Reply reply = new Reply();
        BeanUtils.copyProperties(reply, pointPage);
        reply.setCreateTime(new Date());

        return replyDao.insertReturnId(reply);
//        multiDao.update("InsertOrUpdateReply",reply.getUserId(),reply.getPointId(),reply.getTopicId(),reply.getCreateTime(),reply.getCreateTime());
    }

}











