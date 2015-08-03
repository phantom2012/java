package com.yy.ent.tvbar.common.model.info;

import com.yy.ent.cherroot.entity.EntityBean;
import com.yy.ent.cherroot.entity.annotation.Column;
import com.yy.ent.cherroot.entity.annotation.Entity;

import java.util.Date;

@Entity(table = "groups")
public class Group extends EntityBean {
    @Column(name = "groupId", isPK = true)
    private Integer groupId;

    @Column(name = "title")
    private String title;

    @Column(name = "type")
    private Byte type;

    @Column(name = "description")
    private String description;

    @Column(name = "headIconUrl")
    private String headIconUrl;

    @Column(name = "creatorId")
    private String creatorId;

    @Column(name = "createTime")
    private Date createTime;

    @Column(name = "attentionCount")
    private Integer attentionCount;

    @Column(name = "recommend")
    private Byte recommend;

    @Column(name = "enable")
    private Byte enable;

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Byte getType() {
        return type;
    }

    public void setType(Byte type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getHeadIconUrl() {
        return headIconUrl;
    }

    public void setHeadIconUrl(String headIconUrl) {
        this.headIconUrl = headIconUrl;
    }

    public String getCreator() {
        return creatorId;
    }

    public void setCreator(String creator) {
        this.creatorId = creatorId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getAttentionCount() {
        return attentionCount;
    }

    public void setAttentionCount(Integer attentionCount) {
        this.attentionCount = attentionCount;
    }

    public Byte getRecommend() {
        return recommend;
    }

    public void setRecommend(Byte recommend) {
        this.recommend = recommend;
    }

    public Byte getEnable() {
        return enable;
    }

    public void setEnable(Byte enable) {
        this.enable = enable;
    }
}