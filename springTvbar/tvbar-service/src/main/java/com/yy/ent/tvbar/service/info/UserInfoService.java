package com.yy.ent.tvbar.service.info;

import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.tvbar.common.model.info.UserInfo;
import com.yy.ent.tvbar.dao.base.MultiDao;
import com.yy.ent.tvbar.dao.info.UserInfoDao;
import com.yy.ent.tvbar.service.base.BaseService;
import org.apache.log4j.Logger;

/**
 * Created by Administrator on 2015-07-09.
 */
public class UserInfoService extends BaseService {
    private Logger logger = Logger.getLogger(UserInfoService.class);

    @Inject(instance = UserInfoDao.class)
    private UserInfoDao userInfoDao;

    @Inject(instance = MultiDao.class)
    private MultiDao multiDao;

    public String getUserName(String userId) throws Exception{
        UserInfo userInfo = userInfoDao.query(userId);
        return userInfo.getName();
    }

    public String getUserNick(String userId) throws Exception{
        UserInfo userInfo = userInfoDao.query(userId);
        if(userInfo == null){
            logger.warn("getUserNick null: userId="+userId);
            return "";
        }
        return userInfo.getNick();
    }

    public String getUserIcon(String userId) throws Exception{
        if(userId.isEmpty())
            return "";
        UserInfo userInfo = userInfoDao.query(userId);
        if(userInfo == null){
            logger.warn("getUserIcon null: userId="+userId);
            return "";
        }

        return userInfo.getWeixinPic();
    }
}
