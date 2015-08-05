package com.yy.ent.tvbar.service.service;

import com.yy.ent.tvbar.common.model.domain.Groups;
import com.yy.ent.tvbar.dao.mapper.GroupsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2015-08-04.
 */
@Service
public class GroupService {
//    private static final Logger LOG = LoggerFactory.getLogger(GroupService.class);
    @Autowired
    private GroupsMapper groupsMapper;

    public Groups queryGroupByGroupId(Integer groupId) {
        return groupsMapper.selectByPrimaryKey(groupId);
    }
}
