package com.yy.ent.tvbar.service.info;

import java.util.LinkedList;
import java.util.List;

import com.yy.ent.commons.base.dto.Property;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.tvbar.common.model.page.EventPage;
import com.yy.ent.tvbar.dao.base.MultiDao;
import com.yy.ent.tvbar.service.base.BaseService;

public class ConnectService extends BaseService{

    @Inject(instance = MultiDao.class)
    private MultiDao multiDao;
    
    public List<Property> queryTopic(){
    	List<Property> topicList = multiDao.queryCollection("QueryTopic");
    	List<Property> EventList = multiDao.queryCollection("QueryEvent");
    	for(Property pro : topicList){
    		
    		if(pro.get("eventId")!=null || pro.get("eventId")!="0"){
    			for(Property proEvent : EventList){
    				if(proEvent.get("eventId").equals(pro.get("eventId"))){
    					pro.put("eventDesc", proEvent.get("description"));
    				}
    			}
    		}
    	}
    	return topicList;
    }
    
    public List<Property> queryGroups(){
    	return multiDao.queryCollection("QueryGroups");
    }
    
    public List<Property> queryEvent(){
    	return multiDao.queryCollection("QueryEvent");
    }
    
    /**
     * 话题关联事件
     * @param eventId
     * @param topicId
     * @return
     */
    public int connectEventTopic(Integer eventId, Integer topicId){
    	return multiDao.update("ConnectEventTopic", eventId, topicId);
    }
    
    /**
     * 事件关联小组
     * @param eventId
     * @param groupId
     * @return
     */
    public int connectEventGroup(Integer eventId, Integer groupId){
    	return multiDao.update("ConnectEventGroup", eventId, groupId);
    }
    
    public int cancelEventGroup(Integer eventId, Integer groupId){
    	return multiDao.update("CancelEventGroup", eventId, groupId);
    }
    
    public List<Property> queryEventGroupByEventId(Integer eventId){
    	return multiDao.queryCollection("QueryEventGroupByEventId", eventId);
    }
    
    public List<EventPage> queryEventDetail() throws Exception{
    	List<EventPage> eventPages = new LinkedList<EventPage>();
    	List<Property> eventList = this.queryEvent();
    	for(Property event : eventList){
    		EventPage eventPage = new EventPage(event);
    		List<Property> eventGroupList = this.queryEventGroupByEventId(Integer.valueOf(event.get("eventId")));
    		eventPage.setGroups(eventGroupList);
    		eventPages.add(eventPage);
    	}
    	return eventPages;
    }
}
