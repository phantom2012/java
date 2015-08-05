package com.yy.ent.tvbar.action;

import java.util.List;

import com.alibaba.fastjson.JSON;
import com.yy.ent.cherrice.annotation.Read;
import com.yy.ent.cherrice.ret.Render;
import com.yy.ent.commons.base.dto.Property;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.tvbar.base.BaseAction;
import com.yy.ent.tvbar.service.info.ConnectService;

public class ConnectAction extends BaseAction{

    @Inject(instance = ConnectService.class)
    private ConnectService connectService;
    
    public Render queryTopic(){
    	List<Property> list =  connectService.queryTopic();
    	return getRender(list);
    }
    
    
    public Render queryEvent(){
    	List<Property> list = connectService.queryEvent();
    	return getRender(list);
    }
    
    public Render queryGroups(){
    	List<Property> list = connectService.queryGroups();
    	return getRender(list);
    }
    
    
    public Render connectEventTopic(@Read(key = "eventId") int eventId,@Read(key = "topicId") int topicId){
    	int result = connectService.connectEventTopic(eventId, topicId);
    	return getRender(result);
    }
    
    public Render queryEventDetail() throws Exception{
    	return getRender(connectService.queryEventDetail());
    }
    
    public Render connectEventGroup(@Read(key = "eventId") int eventId,@Read(key = "groupId") int groupId){
    	System.out.println("eventId：" + eventId + "  groupId:" + groupId);
    	int result = connectService.connectEventGroup(eventId, groupId);
    	return getRender(result);
    }
    
    public Render cancelEventGroup(@Read(key = "eventId") int eventId,@Read(key = "groupId") int groupId){
    	System.out.println("eventId：" + eventId + "  groupId:" + groupId);
    	int result = connectService.cancelEventGroup(eventId, groupId);
    	return getRender(result);
    }
    
    
    
}
