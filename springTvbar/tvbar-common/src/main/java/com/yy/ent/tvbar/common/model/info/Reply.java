package com.yy.ent.tvbar.common.model.info;

import com.yy.ent.cherroot.entity.EntityBean;
import com.yy.ent.cherroot.entity.annotation.Column;
import com.yy.ent.cherroot.entity.annotation.Entity;

import java.util.Date;

@Entity(table = "reply")
public class Reply extends EntityBean{
    @Column(name = "replyId", isPK = true)
    private Long replyId;

    @Column(name = "userId", isPK = true)
    private String userId;

    @Column(name = "pointId", isPK = true)
    private Integer pointId;

    @Column(name = "topicId")
    private Integer topicId;

    @Column(name = "createTime")
    private Date createTime;

    @Column(name = "zanCount")
    private Integer zanCount;

    @Column(name = "opposeCount")
    private Integer opposeCount;

    @Column(name = "enable")
    private Byte enable;

    public Long getReplyId() {
        return replyId;
    }

    public void setReplyId(Long replyId) {
        this.replyId = replyId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getPointId() {
        return pointId;
    }

    public void setPointId(Integer pointId) {
        this.pointId = pointId;
    }

    public Integer getTopicId() {
        return topicId;
    }

    public void setTopicId(Integer topicId) {
        this.topicId = topicId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
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
}