package com.yy.ent.tvbar.common.model.info;

import com.yy.ent.cherroot.entity.EntityBean;
import com.yy.ent.cherroot.entity.annotation.Column;
import com.yy.ent.cherroot.entity.annotation.Entity;

import java.util.Date;


@Entity(table = "topic")
public class Topic extends EntityBean {
    @Column(name = "topicId", isPK = true)
    private Integer topicId;

    @Column(name = "title")
    private String title;

    @Column(name = "type")
    private Byte type;

    @Column(name = "description")
    private String description;

    @Column(name = "souName")
    private String souName;

    @Column(name = "creatorId")
    private String creatorId;

    @Column(name = "createTime")
    private Date createTime;

    @Column(name = "replyCount")
    private Integer replyCount;

    @Column(name = "lastReplyTime")
    private Date lastReplyTime;

    @Column(name = "eventId")
    private Integer eventId;

    @Column(name = "enable")
    private Byte enable;

    @Column(name = "topicPic")
    private String topicPic;

    @Column(name = "handlePic")
    private String handlePic;

    public Integer getTopicId() {
        return topicId;
    }

    public void setTopicId(Integer topicId) {
        this.topicId = topicId;
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

    public String getSouName() {
        return souName;
    }

    public void setSouName(String souName) {
        this.souName = souName;
    }

    public String getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(String creatorId) {
        this.creatorId = creatorId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getReplyCount() {
        return replyCount;
    }

    public void setReplyCount(Integer replyCount) {
        this.replyCount = replyCount;
    }

    public Date getLastReplyTime() {
        return lastReplyTime;
    }

    public void setLastReplyTime(Date lastReplyTime) {
        this.lastReplyTime = lastReplyTime;
    }

    public Integer getEventId() {
        return eventId;
    }

    public void setEventId(Integer eventId) {
        this.eventId = eventId;
    }

    public Byte getEnable() {
        return enable;
    }

    public void setEnable(Byte enable) {
        this.enable = enable;
    }

    public String getTopicPic() {
        return topicPic;
    }

    public void setTopicPic(String topicPic) {
        this.topicPic = topicPic;
    }

    public String getHandlePic() {
        return handlePic;
    }

    public void setHandlePic(String handlePic) {
        this.handlePic = handlePic;
    }

    @Override
    public String toString() {
        return "Topic{" +
                "topicId=" + topicId +
                ", title='" + title + '\'' +
                ", type=" + type +
                ", description='" + description + '\'' +
                ", souName='" + souName + '\'' +
                ", creatorId='" + creatorId + '\'' +
                ", createTime=" + createTime +
                ", replyCount=" + replyCount +
                ", lastReplyTime=" + lastReplyTime +
                ", eventId=" + eventId +
                ", enable=" + enable +
                ", topicPic='" + topicPic + '\'' +
                ", handlePic='" + handlePic + '\'' +
                '}';
    }
}