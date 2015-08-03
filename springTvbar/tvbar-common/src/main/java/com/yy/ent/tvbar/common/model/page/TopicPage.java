package com.yy.ent.tvbar.common.model.page;


import org.apache.commons.beanutils.BeanUtils;

import java.util.List;


//话题页
public class TopicPage {
    //观点列表
    public List<PointPage> replyPoints;

    public List<PointPage> getViewPoints() {
        return replyPoints;
    }

    public void setViewPoints(List<PointPage> viewPoints) {
        this.replyPoints = viewPoints;
    }

    private Integer topicId;

    private String title;

    private Byte type;

    private String description;

    private String souName;

    private String creatorId;

    private String createTime;

    private String creatorName;

    private Integer replyCount;

    private String lastReplyTime;

    private Integer eventId;

    private Byte enable;

    private String topicPic;

    private String handlePic;

    private String creatorIcon;

    private Byte isEnd;

    public Byte getIsEnd() {
        return isEnd;
    }

    public void setIsEnd(Byte isEnd) {
        this.isEnd = isEnd;
    }

    public TopicPage(Object souObj) throws Exception{
        BeanUtils.copyProperties(this, souObj);
    }

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

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getCreatorName() {
        return creatorName;
    }

    public void setCreatorName(String creatorName) {
        this.creatorName = creatorName;
    }

    public Integer getReplyCount() {
        return replyCount;
    }

    public void setReplyCount(Integer replyCount) {
        this.replyCount = replyCount;
    }

    public String getLastReplyTime() {
        return lastReplyTime;
    }

    public void setLastReplyTime(String lastReplyTime) {
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

    public String getCreatorIcon() {
        return creatorIcon;
    }

    public void setCreatorIcon(String creatorIcon) {
        this.creatorIcon = creatorIcon;
    }

    public String getHandlePic() {
        return handlePic;
    }

    public void setHandlePic(String handlePic) {
        this.handlePic = handlePic;
    }

    @Override
    public String toString() {
        return "TopicPage{" +
                "replyPoints=" + replyPoints +
                ", topicId=" + topicId +
                ", title='" + title + '\'' +
                ", type=" + type +
                ", description='" + description + '\'' +
                ", souName='" + souName + '\'' +
                ", creatorId='" + creatorId + '\'' +
                ", createTime='" + createTime + '\'' +
                ", creatorName='" + creatorName + '\'' +
                ", replyCount=" + replyCount +
                ", lastReplyTime='" + lastReplyTime + '\'' +
                ", eventId=" + eventId +
                ", enable=" + enable +
                ", topicPic='" + topicPic + '\'' +
                ", handlePic='" + handlePic + '\'' +
                ", creatorIcon='" + creatorIcon + '\'' +
                ", isEnd=" + isEnd +
                '}';
    }
}