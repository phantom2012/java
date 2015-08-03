package com.yy.ent.tvbar.common.model.info;

import com.yy.ent.cherroot.entity.EntityBean;
import com.yy.ent.cherroot.entity.annotation.Column;
import com.yy.ent.cherroot.entity.annotation.Entity;

import java.util.Date;

/**
 * Created by Administrator on 2015-06-29.
 */
@Entity(table = "history_group")
public class HistoryGroup extends EntityBean {
    @Column(name = "userId", isPK = true)
    private String userId;

    @Column(name = "groupId", isPK = true)
    private Integer groupId;

    @Column(name = "title")
    private String title;

    @Column(name = "lastVistTime")
    private Date lastVistTime;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public HistoryGroup(String userId, Integer groupId, Date lastVistTime) {
        this.userId = userId;
        this.groupId = groupId;
        this.lastVistTime = lastVistTime;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public Date getLastVistTime() {
        return lastVistTime;
    }

    public void setLastVistTime(Date lastVistTime) {
        this.lastVistTime = lastVistTime;
    }
}
