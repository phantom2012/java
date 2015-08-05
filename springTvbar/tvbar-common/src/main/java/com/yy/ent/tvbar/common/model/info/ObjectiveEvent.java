package com.yy.ent.tvbar.common.model.info;

import com.yy.ent.cherroot.entity.EntityBean;
import com.yy.ent.cherroot.entity.annotation.Column;
import com.yy.ent.cherroot.entity.annotation.Entity;

@Entity(table = "objective_event")
public class ObjectiveEvent extends EntityBean{
    @Column(name = "eventId", isPK = true)
    private Integer eventId;

    @Column(name = "zhiType")
    private Byte zhiType;

    @Column(name = "title")
    private String title;

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
