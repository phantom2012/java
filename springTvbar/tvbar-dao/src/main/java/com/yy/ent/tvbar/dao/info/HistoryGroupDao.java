
package com.yy.ent.tvbar.dao.info;

import com.yy.ent.cherroot.core.datasource.DBEnv;
import com.yy.ent.cherroot.entity.EntityBeanDao;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.tvbar.common.model.info.HistoryGroup;
import com.yy.ent.tvbar.dao.base.TransactionSupportDBEnvImpl;

public class HistoryGroupDao extends EntityBeanDao<HistoryGroup> {

    @Inject(instance = TransactionSupportDBEnvImpl.class)
    private DBEnv dbEnv;

    public DBEnv getDataSource() {
        return dbEnv;
    }
}
