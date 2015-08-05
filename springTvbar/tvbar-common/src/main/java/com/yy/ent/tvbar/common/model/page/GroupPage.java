package com.yy.ent.tvbar.common.model.page;


import org.apache.commons.beanutils.BeanUtils;

import java.util.Date;
import java.util.List;

//小组页
public class GroupPage {
    //话题列表
    public List<TopicPage> topics;

    public List<TopicPage> getTopicLists() {
        return topics;
    }

    public void setTopicLists(List<TopicPage> topics) {
        this.topics = topics;
    }

    public String getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(String creatorId) {
        this.creatorId = creatorId;
    }

    private Integer groupId;

    private String title;

    private Byte type;

    private String description;

    private String headIconUrl;

    private String creatorId;

    private String createTime;

    private Integer attentionCount;

    private Byte recommend;

    private Byte enable;

    private Byte isEnd;

    public GroupPage(Object souObj) throws Exception{
        BeanUtils.copyProperties(this,souObj);
    }

    public Byte getIsEnd() {
        return isEnd;
    }

    public void setIsEnd(Byte isEnd) {
        this.isEnd = isEnd;
    }

    public List<TopicPage> getTopics() {
        return topics;
    }

    public void setTopics(List<TopicPage> topics) {
        this.topics = topics;
    }

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

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
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