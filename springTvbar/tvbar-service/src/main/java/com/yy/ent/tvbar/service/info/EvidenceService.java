package com.yy.ent.tvbar.service.info;


import com.yy.ent.commons.base.dto.Property;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.tvbar.common.model.info.Evidence;
import com.yy.ent.tvbar.dao.base.MultiDao;
import com.yy.ent.tvbar.dao.info.EvidenceDao;
import com.yy.ent.tvbar.dao.info.GroupDao;
import com.yy.ent.tvbar.service.base.BaseService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.beanutils.BeanUtils;

import java.util.Date;
import java.util.List;


/**
 * 证据
 *
 * @author libiao
 */
public class EvidenceService extends BaseService {

    @Inject(instance = EvidenceDao.class)
    private EvidenceDao evidenceDao;

    @Inject(instance = MultiDao.class)
    private MultiDao multiDao;

    /**
     * 查询观点更多证据 *
     *
     * @return
     * @throws Exception
     */
    public List<Property> queryMoreEvidenceByPriId(String userId, Integer pointId, Integer offset, Integer moreCnt) throws Exception {
        return multiDao.queryCollection("QueryMoreEvidenceByPriId", userId, pointId, offset, moreCnt);
    }

    public List<Property> queryMoreEvidenceByReplyId(Long replyId, Integer offset, Integer moreCnt) throws Exception {
        return multiDao.queryCollection("QueryMoreEvidenceByReplyId", replyId, offset, moreCnt);
    }

    /**
     * 插入单个证据json对象 *
     *
     * @return
     * @throws Exception
     */
    public void insertEvidence(Object p) throws Exception {
        Evidence evidence = new Evidence();
        BeanUtils.copyProperties(evidence, p);
        evidence.setCreateTime(new Date());
        evidenceDao.insert(evidence);
    }

    /**
     * 插入单个证据 *
     *
     * @return
     * @throws Exception
     */
    public void insertEvidence(Evidence evidence) throws Exception {
        evidence.setCreateTime(new Date());
        evidenceDao.insert(evidence);
    }

    /**
     * 插入证据jsonArray列表 *
     *
     * @return
     * @throws Exception
     */
    public void insertEvidenceList(String userId, Long replyId, List<Property> evidenceList) throws Exception {
        for(Object obj:evidenceList){
            Evidence evidence = new Evidence();
            BeanUtils.copyProperties(evidence, obj);
            evidence.setReplyId(replyId);
            evidence.setCreatorId(userId);
            insertEvidence(evidence);
        }
    }

    /**
     * 插入证据jsonArray列表 *
     *
     * @return
     * @throws Exception
     */
    public void insertEvidenceList(List<Property> evidenceList) throws Exception {
        for(Object obj:evidenceList){
            insertEvidence(obj);
        }
    }

    /**
     * 插入证据jsonArray列表(适配证据一个描述多个图) *
     *
     * @return
     * @throws Exception
     */
//    public void insertEvidenceList(JSONArray jsonArray, String evidenceDes) throws Exception {
//        for(Object  obj:jsonArray){
//            JSONObject evidenceObj = (JSONObject)obj;
//            evidenceObj.put("description", evidenceDes);
//            insertEvidence(evidenceObj);
//        }
//    }

//    /**
//     * 插入证据json字串列表 *
//     *
//     * @return
//     * @throws Exception
//     */
//    public void insertEvidenceList(String jsonStrEvidences) throws Exception {
//        JSONArray jsonArray = JSONArray.fromObject(jsonStrEvidences);
//        insertEvidenceList(jsonArray);
//    }

}








