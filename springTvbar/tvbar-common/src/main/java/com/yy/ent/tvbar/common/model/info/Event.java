package com.yy.ent.tvbar.common.model.info;

import com.yy.ent.cherroot.entity.EntityBean;
import com.yy.ent.cherroot.entity.annotation.Column;
import com.yy.ent.cherroot.entity.annotation.Entity;

@Entity(table = "event")
public class Event extends EntityBean{
    @Column(name = "eventId", isPK = true)
    private Integer eventId;

    @Column(name = "zhiType")
    private Byte zhiType;

    @Column(name = "description")
    private String description;

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
}
