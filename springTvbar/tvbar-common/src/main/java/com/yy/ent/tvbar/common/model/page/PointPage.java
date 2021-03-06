package com.yy.ent.tvbar.common.model.page;


import com.yy.ent.commons.base.dto.Property;
import com.yy.ent.tvbar.common.model.info.Evidence;
import org.apache.commons.beanutils.BeanUtils;

import java.util.Date;
import java.util.List;
import java.util.Map;

//观点页
public class PointPage {
    //证据列表
    public List<Property> evidences;

    public List<Property> getEvidences() {
        return evidences;
    }

    public void setEvidences(List<Property> evidences) {
        this.evidences = evidences;
    }

    private Long replyId;

    private Integer pointId;

    private String userId;

    private String description;

    private Integer topicId;

    private String creatorId;

    private String createTime;

    private String creatorName;

    private Integer zanCount;

    private Integer opposeCount;

    private Byte enable;

    private String viewPic;

    private String creatorIcon;

    private Byte isEnd;

    public Long getReplyId() {
        return replyId;
    }

    public void setReplyId(Long replyId) {
        this.replyId = replyId;
    }

    public Byte getIsEnd() {
        return isEnd;
    }

    public void setIsEnd(Byte isEnd) {
        this.isEnd = isEnd;
    }

    public PointPage(Object souObj) throws Exception{
        BeanUtils.copyProperties(this, souObj);
    }

    public Integer getPointId() {
        return pointId;
    }

    public void setPointId(Integer pointId) {
        this.pointId = pointId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getTopicId() {
        return topicId;
    }

    public void setTopicId(Integer topicId) {
        this.topicId = topicId;
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

    public Integer getZanCount() {
        return zanCount;
    }

    public void setZanCount(Integer zanCount) {
        this.zanCount = zanCount;
    }

    public Integer getOpposeCount() {
        return opposeCount;
    }

    public void setOpposeCount(Integer opposeCount) {
        this.opposeCount = opposeCount;
    }

    public Byte getEnable() {
        return enable;
    }

    public void setEnable(Byte enable) {
        this.enable = enable;
    }

    public String getViewPic() {
        return viewPic;
    }

    public void setViewPic(String viewPic) {
        this.viewPic = viewPic;
    }

    public String getCreatorIcon() {
        return creatorIcon;
    }

    public void setCreatorIcon(String creatorIcon) {
        this.creatorIcon = creatorIcon;
    }

    @Override
    public String toString() {
        return "PointPage{" +
                "evidences=" + evidences +
                ", replyId=" + replyId +
                ", pointId=" + pointId +
                ", userId='" + userId + '\'' +
                ", description='" + description + '\'' +
                ", topicId=" + topicId +
                ", creatorId='" + creatorId + '\'' +
                ", createTime='" + createTime + '\'' +
                ", creatorName='" + creatorName + '\'' +
                ", zanCount=" + zanCount +
                ", opposeCount=" + opposeCount +
                ", enable=" + enable +
                ", viewPic='" + viewPic + '\'' +
                ", creatorIcon='" + creatorIcon + '\'' +
                ", isEnd=" + isEnd +
                '}';
    }
}