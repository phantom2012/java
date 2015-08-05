package com.yy.ent.tvbar.service.info;


import com.yy.ent.cherroot.condition.DBCondition;
import com.yy.ent.commons.base.dto.Property;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.tvbar.common.model.info.Reply;
import com.yy.ent.tvbar.common.model.info.ReplyHotReq;
import com.yy.ent.tvbar.dao.base.MultiDao;
import com.yy.ent.tvbar.dao.info.ReplyDao;
import com.yy.ent.tvbar.dao.info.ReplyHotReqDao;
import com.yy.ent.tvbar.dao.info.ViewPointDao;
import com.yy.ent.tvbar.service.base.BaseService;
import org.apache.commons.beanutils.BeanUtils;

import java.util.Date;


/**
 * 观点
 *
 * @author libiao
 */
public class ReplyHotReqService extends BaseService {
    @Inject(instance = ReplyHotReqDao.class)
    private ReplyHotReqDao replyHotReqDao;

    @Inject(instance = ReplyService.class)
    private ReplyService replyService;

    @Inject(instance = MultiDao.class)
    private MultiDao multiDao;

    public Property queryZan(Long replyId, String userId) throws Exception{
        return multiDao.query("QueryZan", replyId, userId);
    }

    public Property queryCai(Long replyId, String userId) throws Exception{
        return multiDao.query("QueryCai", replyId, userId);
    }

    public boolean queryIfZan(Long replyId, String userId) throws Exception{
        Property p = queryZan(replyId,userId);
        if(p == null || p.getInt("enable")==0){
            return false;
        }else
            return true;
    }

    public boolean queryIfCai(Long replyId, String userId) throws Exception{
        ReplyHotReq replyHotReq = new ReplyHotReq();
        replyHotReq.setReplyId(replyId);
        replyHotReq.setUserId(userId);
        replyHotReq.setType(1);
        ReplyHotReq retInfo =  replyHotReqDao.query(replyHotReq);
        if(retInfo == null || retInfo.getEnable()==1){
            return false;
        }else
            return true;
    }

    public int countZan(Long replyId) throws Exception{
        DBCondition dbCondition = new DBCondition();
        dbCondition.addCondition("replyId", replyId);
        dbCondition.addCondition("type", 0);
        dbCondition.addCondition("enable",1);
        return replyHotReqDao.count(dbCondition);
    }

    public int countCai(Long replyId) throws Exception{
        DBCondition dbCondition = new DBCondition();
        dbCondition.addCondition("replyId", replyId);
        dbCondition.addCondition("type", 1);
        dbCondition.addCondition("enable", 1);
        return replyHotReqDao.count(dbCondition);
    }

    public Integer clickZan(Long replyId, String userId) throws Exception{
        ReplyHotReq replyHotReq = new ReplyHotReq();
        replyHotReq.setReplyId(replyId);
        replyHotReq.setUserId(userId);
        replyHotReq.setType(0);

        Integer countAddValue = 1;
        Property req = queryZan(replyId,userId);
        if(req == null){
            replyHotReq.setEnable((byte) 1);
            replyHotReqDao.insert(replyHotReq);
        }else if(req.getInt("enable") == 1){
            replyHotReq.setEnable((byte)0);
            countAddValue = -1;
        }else if(req.getInt("enable") == 0){
            replyHotReq.setEnable((byte)1);
        }
        replyHotReqDao.update(replyHotReq);

        replyService.updateZanRepy(replyId,countAddValue);
        return replyHotReq.getEnable().intValue();
    }

    public Integer clickCai(Long replyId, String userId) throws Exception{
        ReplyHotReq replyHotReq = new ReplyHotReq();
        replyHotReq.setReplyId(replyId);
        replyHotReq.setUserId(userId);
        replyHotReq.setType(1);

        Integer countAddValue = 1;
        Property req = queryCai(replyId, userId);
        if(req == null){
            replyHotReq.setEnable((byte)1);
            replyHotReqDao.insert(replyHotReq);
        }else if(req.getInt("enable") == 1){
            replyHotReq.setEnable((byte)0);
            countAddValue = -1;
        }else if(req.getInt("enable") == 0){
            replyHotReq.setEnable((byte)1);
        }
        replyHotReqDao.update(replyHotReq);

        replyService.updateOpposeReply(replyId, countAddValue);
        return replyHotReq.getEnable().intValue();
    }

}











