package com.yy.ent.tvbar.service.info;


import com.yy.ent.cherroot.condition.DBCondition;
import com.yy.ent.commons.base.dto.Property;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.tvbar.common.model.info.Group;
import com.yy.ent.tvbar.common.model.info.Topic;
import com.yy.ent.tvbar.dao.base.MultiDao;
import com.yy.ent.tvbar.dao.info.GroupDao;
import com.yy.ent.tvbar.dao.info.TopicDao;
import com.yy.ent.tvbar.service.base.BaseService;
import net.sf.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


/**
 * 小组页
 *
 * @author libiao
 */
public class GroupService extends BaseService {


    @Inject(instance = GroupDao.class)
    private GroupDao groupDao;

    @Inject(instance = MultiDao.class)
    private MultiDao multiDao;

    /**
     * 查询某用户小组 *
     *
     * @return
     * @throws Exception
     */
    public List<Group> queryGroupByCreatorId(Integer creatorId) throws Exception {
        DBCondition dbCondition = new DBCondition();
        dbCondition.addCondition("creatorId",creatorId);
        return groupDao.query(dbCondition);
    }

    /**
     * 查询小组信息 *
     *
     * @return
     * @throws Exception
     */
    public Group queryGroupByGroupId(Integer groupId) throws Exception {
        return groupDao.query(groupId.longValue());
    }

    /**
     * 查询更多推荐小组 *
     *
     * @return
     * @throws Exception
     */
    public List<Property> queryMoreRecommendGroups(Integer offset, Integer moreCnt) throws Exception {
        return multiDao.queryCollection("QueryMoreRecommendGroups",1,offset,moreCnt);
    }
}











