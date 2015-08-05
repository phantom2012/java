package com.yy.ent.tvbar.common.model.domain;

import java.util.Date;

public class Reply {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column reply.replyId
     *
     * @mbggenerated
     */
    private Integer replyid;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column reply.userId
     *
     * @mbggenerated
     */
    private String userid;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column reply.pointId
     *
     * @mbggenerated
     */
    private Integer pointid;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column reply.topicId
     *
     * @mbggenerated
     */
    private Integer topicid;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column reply.createTime
     *
     * @mbggenerated
     */
    private Date createtime;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column reply.zanCount
     *
     * @mbggenerated
     */
    private Integer zancount;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column reply.opposeCount
     *
     * @mbggenerated
     */
    private Integer opposecount;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column reply.enable
     *
     * @mbggenerated
     */
    private Byte enable;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column reply.replyId
     *
     * @return the value of reply.replyId
     *
     * @mbggenerated
     */
    public Integer getReplyid() {
        return replyid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column reply.replyId
     *
     * @param replyid the value for reply.replyId
     *
     * @mbggenerated
     */
    public void setReplyid(Integer replyid) {
        this.replyid = replyid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column reply.userId
     *
     * @return the value of reply.userId
     *
     * @mbggenerated
     */
    public String getUserid() {
        return userid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column reply.userId
     *
     * @param userid the value for reply.userId
     *
     * @mbggenerated
     */
    public void setUserid(String userid) {
        this.userid = userid == null ? null : userid.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column reply.pointId
     *
     * @return the value of reply.pointId
     *
     * @mbggenerated
     */
    public Integer getPointid() {
        return pointid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column reply.pointId
     *
     * @param pointid the value for reply.pointId
     *
     * @mbggenerated
     */
    public void setPointid(Integer pointid) {
        this.pointid = pointid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column reply.topicId
     *
     * @return the value of reply.topicId
     *
     * @mbggenerated
     */
    public Integer getTopicid() {
        return topicid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column reply.topicId
     *
     * @param topicid the value for reply.topicId
     *
     * @mbggenerated
     */
    public void setTopicid(Integer topicid) {
        this.topicid = topicid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column reply.createTime
     *
     * @return the value of reply.createTime
     *
     * @mbggenerated
     */
    public Date getCreatetime() {
        return createtime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column reply.createTime
     *
     * @param createtime the value for reply.createTime
     *
     * @mbggenerated
     */
    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column reply.zanCount
     *
     * @return the value of reply.zanCount
     *
     * @mbggenerated
     */
    public Integer getZancount() {
        return zancount;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column reply.zanCount
     *
     * @param zancount the value for reply.zanCount
     *
     * @mbggenerated
     */
    public void setZancount(Integer zancount) {
        this.zancount = zancount;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column reply.opposeCount
     *
     * @return the value of reply.opposeCount
     *
     * @mbggenerated
     */
    public Integer getOpposecount() {
        return opposecount;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column reply.opposeCount
     *
     * @param opposecount the value for reply.opposeCount
     *
     * @mbggenerated
     */
    public void setOpposecount(Integer opposecount) {
        this.opposecount = opposecount;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column reply.enable
     *
     * @return the value of reply.enable
     *
     * @mbggenerated
     */
    public Byte getEnable() {
        return enable;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column reply.enable
     *
     * @param enable the value for reply.enable
     *
     * @mbggenerated
     */
    public void setEnable(Byte enable) {
        this.enable = enable;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table reply
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
        Reply other = (Reply) that;
        return (this.getReplyid() == null ? other.getReplyid() == null : this.getReplyid().equals(other.getReplyid()))
            && (this.getUserid() == null ? other.getUserid() == null : this.getUserid().equals(other.getUserid()))
            && (this.getPointid() == null ? other.getPointid() == null : this.getPointid().equals(other.getPointid()))
            && (this.getTopicid() == null ? other.getTopicid() == null : this.getTopicid().equals(other.getTopicid()))
            && (this.getCreatetime() == null ? other.getCreatetime() == null : this.getCreatetime().equals(other.getCreatetime()))
            && (this.getZancount() == null ? other.getZancount() == null : this.getZancount().equals(other.getZancount()))
            && (this.getOpposecount() == null ? other.getOpposecount() == null : this.getOpposecount().equals(other.getOpposecount()))
            && (this.getEnable() == null ? other.getEnable() == null : this.getEnable().equals(other.getEnable()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table reply
     *
     * @mbggenerated
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getReplyid() == null) ? 0 : getReplyid().hashCode());
        result = prime * result + ((getUserid() == null) ? 0 : getUserid().hashCode());
        result = prime * result + ((getPointid() == null) ? 0 : getPointid().hashCode());
        result = prime * result + ((getTopicid() == null) ? 0 : getTopicid().hashCode());
        result = prime * result + ((getCreatetime() == null) ? 0 : getCreatetime().hashCode());
        result = prime * result + ((getZancount() == null) ? 0 : getZancount().hashCode());
        result = prime * result + ((getOpposecount() == null) ? 0 : getOpposecount().hashCode());
        result = prime * result + ((getEnable() == null) ? 0 : getEnable().hashCode());
        return result;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table reply
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
        sb.append(", pointid=").append(pointid);
        sb.append(", topicid=").append(topicid);
        sb.append(", createtime=").append(createtime);
        sb.append(", zancount=").append(zancount);
        sb.append(", opposecount=").append(opposecount);
        sb.append(", enable=").append(enable);
        sb.append("]");
        return sb.toString();
    }
}