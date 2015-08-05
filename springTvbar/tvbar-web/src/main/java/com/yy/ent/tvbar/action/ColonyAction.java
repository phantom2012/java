package com.yy.ent.tvbar.action;

import com.yy.ent.cherrice.Return;
import com.yy.ent.cherrice.annotation.Read;
import com.yy.ent.tvbar.base.BaseAction;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2015-06-25.
 */
public class ColonyAction extends BaseAction{
    public Return getColony(@Read(key = "op") String op) throws Exception {
        HttpServletRequest req = getRequest();
        String value = req.getParameter("op");
//        Property companyCase = homeService.queryCompanyCase(id);
//        req.setAttribute("item", companyCase);
        String json="";

//        TopicData data;
//        return getRender(data);
//        return getRender(json);
        return getRender("publishTopic.action?"+op);
    }
}

