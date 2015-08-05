package com.yy.ent.tvbar.common.model.info;

import com.yy.ent.cherroot.entity.EntityBean;
import com.yy.ent.cherroot.entity.annotation.Column;
import com.yy.ent.cherroot.entity.annotation.Entity;

@Entity(table = "reply_hot_req")
public class ReplyHotReq extends EntityBean {
    @Column(name = "replyId", isPK = true)
    private Long replyId;

    @Column(name = "userId", isPK = true)
    private String userId;

    @Column(name = "type", isPK = true)
    private Integer type;

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

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Byte getEnable() {
        return enable;
    }

    public void setEnable(Byte enable) {
        this.enable = enable;
    }

    @Override
    public String toString() {
        return "ReplyHotReq{" +
                "replyId=" + replyId +
                ", userId='" + userId + '\'' +
                ", type=" + type +
                ", enable=" + enable +
                '}';
    }
}