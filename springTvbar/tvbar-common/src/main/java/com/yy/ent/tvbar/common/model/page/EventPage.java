package com.yy.ent.tvbar.common.model.page;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;

import com.yy.ent.commons.base.dto.Property;

public class EventPage {
    private Integer eventId;

    private Byte zhiType;

    private String description;
    
    public List<Property> groups;

    public EventPage(Object souObj) throws Exception{
        BeanUtils.copyProperties(this,souObj);
    }
    
	public Integer getEventId() {
		return eventId;
	}

	public void setEventId(Integer eventId) {
		this.eventId = eventId;
	}

	public Byte getZhiType() {
		return zhiType;
	}

	public void setZhiType(Byte zhiType) {
		this.zhiType = zhiType;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Property> getGroups() {
		return groups;
	}

	public void setGroups(List<Property> groups) {
		this.groups = groups;
	}
    
    
}
