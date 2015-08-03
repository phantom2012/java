/**
 * sign_up 表 dao
 * @author xieyong
 *
 */
package com.yy.ent.tvbar.dao.info;

import com.yy.ent.cherroot.core.datasource.DBEnv;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.tvbar.common.model.info.ViewPoint;
import com.yy.ent.tvbar.dao.base.BaseEntityBeanDao;
import com.yy.ent.tvbar.dao.base.TransactionSupportDBEnvImpl;

public class ViewPointDao extends BaseEntityBeanDao<ViewPoint> {

    @Inject(instance = TransactionSupportDBEnvImpl.class)
    private DBEnv dbEnv;

    public DBEnv getDataSource() {
        return dbEnv;
    }

}