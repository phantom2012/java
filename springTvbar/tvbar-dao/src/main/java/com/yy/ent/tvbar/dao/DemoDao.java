/**
 * sign_up 表 dao
 * @author xieyong
 *
 */
package com.yy.ent.tvbar.dao;

import com.yy.ent.tvbar.common.model.Demo;
import com.yy.ent.cherroot.core.datasource.DBEnv;
import com.yy.ent.cherroot.core.datasource.base.DBEnvImpl;
import com.yy.ent.cherroot.entity.EntityBeanDao;
import com.yy.ent.commons.base.inject.Inject;

public class DemoDao extends EntityBeanDao<Demo> {

    @Inject(instance = DBEnvImpl.class)
    private DBEnv dbEnv;

    public DBEnv getDataSource() {
        return dbEnv;
    }

}