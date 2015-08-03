package com.yy.ent.tvbar.common.model.info;

import com.yy.ent.cherroot.entity.EntityBean;
import com.yy.ent.cherroot.entity.annotation.Column;
import com.yy.ent.cherroot.entity.annotation.Entity;

@Entity(table = "event_group")
public class EventGroup extends EntityBean {
    @Column(name = "eventId", isPK = true)
    private Integer eventId;

    @Column(name = "groupId")
    private Integer groupId;

    public Integer getEventId() {
        return eventId;
    }

    public void setEventId(Integer eventId) {
        this.eventId = eventId;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    @Override
    public String toString() {
        return "EventGroup{" +
                "eventId=" + eventId +
                ", groupId=" + groupId +
                '}';
    }
}