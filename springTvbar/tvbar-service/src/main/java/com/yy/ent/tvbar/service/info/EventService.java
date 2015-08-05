package com.yy.ent.tvbar.service.info;

import com.yy.ent.commons.base.dto.Property;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.tvbar.dao.info.EventDao;
import com.yy.ent.tvbar.service.base.BaseService;

/**
 * Created by Administrator on 2015-07-20.
 */
public class EventService extends BaseService {
    @Inject(instance = EventDao.class)
    private EventDao eventDao;
}
