package com.yy.ent.tvbar.common.model.page;

import com.yy.ent.tvbar.common.model.info.Evidence;
import org.apache.commons.beanutils.BeanUtils;

import java.util.List;

//回复观点列表页
public class ReplyPage {
    private List<PointPage> replys;

    private List<Evidence> evidences;

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

    public ReplyPage(Object souObj) throws Exception{
        BeanUtils.copyProperties(this, souObj);
    }

    public List<PointPage> getReplys() {
        return replys;
    }

    public void setReplys(List<PointPage> replys) {
        this.replys = replys;
    }

    public List<Evidence> getEvidences() {
        return evidences;
    }

    public void setEvidences(List<Evidence> evidences) {
        this.evidences = evidences;
    }

    public Long getReplyId() {
        return replyId;
    }

    public void setReplyId(Long replyId) {
        this.replyId = replyId;
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

    public Byte getIsEnd() {
        return isEnd;
    }

    public void setIsEnd(Byte isEnd) {
        this.isEnd = isEnd;
    }

    @Override
    public String toString() {
        return "ReplyPage{" +
                "replys=" + replys +
                ", evidences=" + evidences +
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
