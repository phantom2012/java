package com.yy.ent.tvbar.common.model.info;

import com.yy.ent.cherroot.entity.EntityBean;
import com.yy.ent.cherroot.entity.annotation.Column;
import com.yy.ent.cherroot.entity.annotation.Entity;

import java.util.Date;

@Entity(table = "evidence")
public class Evidence extends EntityBean {
    @Column(name = "evidenceId", isPK = true)
    private Integer evidenceId;

    @Column(name = "topicId")
    private Integer topicId;

    @Column(name = "replyId")
    private Long replyId;

    @Column(name = "picture")
    private String picture;

    @Column(name = "handlePic")
    private String handlePic;

    @Column(name = "description")
    private String description;

    @Column(name = "creatorId")
    private String creatorId;

    @Column(name = "createTime")
    private Date createTime;

    @Column(name = "enable")
    private Byte enable;

    public Integer getEvidenceId() {
        return evidenceId;
    }

    public void setEvidenceId(Integer evidenceId) {
        this.evidenceId = evidenceId;
    }

    public Integer getTopicId() {
        return topicId;
    }

    public void setTopicId(Integer topicId) {
        this.topicId = topicId;
    }

    public Long getReplyId() {
        return replyId;
    }

    public void setReplyId(Long replyId) {
        this.replyId = replyId;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getHandlePic() {
        return handlePic;
    }

    public void setHandlePic(String handlePic) {
        this.handlePic = handlePic;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public Byte getEnable() {
        return enable;
    }

    public void setEnable(Byte enable) {
        this.enable = enable;
    }
}