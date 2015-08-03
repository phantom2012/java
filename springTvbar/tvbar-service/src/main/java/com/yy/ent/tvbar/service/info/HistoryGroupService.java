package com.yy.ent.tvbar.service.info;



import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.yy.ent.commons.base.dto.Property;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.commons.base.valid.BlankUtil;
import com.yy.ent.tvbar.common.constants.Constants;
import com.yy.ent.tvbar.dao.base.MultiDao;
import com.yy.ent.tvbar.dao.info.HistoryGroupDao;
import com.yy.ent.tvbar.service.base.BaseService;


/**
 * 历史访问小组
 *
 * @author libiao
 */
public class HistoryGroupService extends BaseService {


    @Inject(instance = HistoryGroupDao.class)
    private HistoryGroupDao historyGroupDao;

    @Inject(instance = MultiDao.class)
    private MultiDao multiDao;

    /**
     * 查询更多历史访问小组(返回json) *
     * @param uid   用户id
     * @param offset    从第几组开始查(初始值为0)
     * @param moreCnt   查多少个
     * @return JsonString
     * @throws Exception
     */
    public List<Property> queryMoreHistoryGroups(String uid, Integer offset, Integer moreCnt) throws Exception {
        if(BlankUtil.isBlank(uid))
            return new ArrayList<Property>();
        List<Property> listGroups = multiDao.queryCollection("QueryMoreHistoryGroups",uid,offset,moreCnt);
        return listGroups;
    }


    public void insertOrUpdateHistoryGroup(String uid, Integer groupId, String title) throws Exception {
        SimpleDateFormat dateformat = new SimpleDateFormat(Constants.DATEPATTERN1);
        String time = dateformat.format(new Date());
        multiDao.update("InsertOrUpdateHistoryGroup",uid,groupId,title,time);
    }
}











