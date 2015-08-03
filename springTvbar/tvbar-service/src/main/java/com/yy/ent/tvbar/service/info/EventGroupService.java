package com.yy.ent.tvbar.service.info;

import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.tvbar.common.model.info.Event;
import com.yy.ent.tvbar.common.model.info.EventGroup;
import com.yy.ent.tvbar.dao.info.EventDao;
import com.yy.ent.tvbar.dao.info.EventGroupDao;
import com.yy.ent.tvbar.service.base.BaseService;

/**
 * Created by Administrator on 2015-07-20.
 */
public class EventGroupService extends BaseService {
    @Inject(instance = EventGroupDao.class)
    private EventGroupDao eventGroupDao;

    @Inject(instance = EventDao.class)
    private EventDao eventDao;

    public Integer insertGroupEvent(Integer groupId, Integer zhiType, String des) throws Exception{
        Event event = new Event();
        event.setZhiType(zhiType.byteValue());
        event.setDescription(des);
        Integer eventId = eventDao.insertReturnId(event).intValue();

        EventGroup eventGroup = new EventGroup();
        eventGroup.setEventId(eventId);
        eventGroup.setGroupId(groupId);
        eventGroupDao.insert(eventGroup);
        return eventId;
    }
}
