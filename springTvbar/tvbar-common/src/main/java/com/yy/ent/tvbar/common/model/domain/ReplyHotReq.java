package com.yy.ent.tvbar.common.model.domain;

public class ReplyHotReq {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column reply_hot_req.replyId
     *
     * @mbggenerated
     */
    private Integer replyid;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column reply_hot_req.userId
     *
     * @mbggenerated
     */
    private String userid;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column reply_hot_req.type
     *
     * @mbggenerated
     */
    private Integer type;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column reply_hot_req.enable
     *
     * @mbggenerated
     */
    private Byte enable;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column reply_hot_req.replyId
     *
     * @return the value of reply_hot_req.replyId
     *
     * @mbggenerated
     */
    public Integer getReplyid() {
        return replyid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column reply_hot_req.replyId
     *
     * @param replyid the value for reply_hot_req.replyId
     *
     * @mbggenerated
     */
    public void setReplyid(Integer replyid) {
        this.replyid = replyid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column reply_hot_req.userId
     *
     * @return the value of reply_hot_req.userId
     *
     * @mbggenerated
     */
    public String getUserid() {
        return userid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column reply_hot_req.userId
     *
     * @param userid the value for reply_hot_req.userId
     *
     * @mbggenerated
     */
    public void setUserid(String userid) {
        this.userid = userid == null ? null : userid.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column reply_hot_req.type
     *
     * @return the value of reply_hot_req.type
     *
     * @mbggenerated
     */
    public Integer getType() {
        return type;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column reply_hot_req.type
     *
     * @param type the value for reply_hot_req.type
     *
     * @mbggenerated
     */
    public void setType(Integer type) {
        this.type = type;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column reply_hot_req.enable
     *
     * @return the value of reply_hot_req.enable
     *
     * @mbggenerated
     */
    public Byte getEnable() {
        return enable;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column reply_hot_req.enable
     *
     * @param enable the value for reply_hot_req.enable
     *
     * @mbggenerated
     */
    public void setEnable(Byte enable) {
        this.enable = enable;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table reply_hot_req
     *
     * @mbggenerated
     */
    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        ReplyHotReq other = (ReplyHotReq) that;
        return (this.getReplyid() == null ? other.getReplyid() == null : this.getReplyid().equals(other.getReplyid()))
            && (this.getUserid() == null ? other.getUserid() == null : this.getUserid().equals(other.getUserid()))
            && (this.getType() == null ? other.getType() == null : this.getType().equals(other.getType()))
            && (this.getEnable() == null ? other.getEnable() == null : this.getEnable().equals(other.getEnable()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table reply_hot_req
     *
     * @mbggenerated
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getReplyid() == null) ? 0 : getReplyid().hashCode());
        result = prime * result + ((getUserid() == null) ? 0 : getUserid().hashCode());
        result = prime * result + ((getType() == null) ? 0 : getType().hashCode());
        result = prime * result + ((getEnable() == null) ? 0 : getEnable().hashCode());
        return result;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table reply_hot_req
     *
     * @mbggenerated
     */
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", replyid=").append(replyid);
        sb.append(", userid=").append(userid);
        sb.append(", type=").append(type);
        sb.append(", enable=").append(enable);
        sb.append("]");
        return sb.toString();
    }
}