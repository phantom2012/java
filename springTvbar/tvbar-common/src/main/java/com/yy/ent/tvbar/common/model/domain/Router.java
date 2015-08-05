package com.yy.ent.tvbar.common.model.domain;

public class Router {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column router.id
     *
     * @mbggenerated
     */
    private Integer id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column router.intercept
     *
     * @mbggenerated
     */
    private String intercept;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column router.type
     *
     * @mbggenerated
     */
    private Byte type;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column router.type_id
     *
     * @mbggenerated
     */
    private Integer typeId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column router.sortord
     *
     * @mbggenerated
     */
    private Integer sortord;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column router.id
     *
     * @return the value of router.id
     *
     * @mbggenerated
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column router.id
     *
     * @param id the value for router.id
     *
     * @mbggenerated
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column router.intercept
     *
     * @return the value of router.intercept
     *
     * @mbggenerated
     */
    public String getIntercept() {
        return intercept;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column router.intercept
     *
     * @param intercept the value for router.intercept
     *
     * @mbggenerated
     */
    public void setIntercept(String intercept) {
        this.intercept = intercept == null ? null : intercept.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column router.type
     *
     * @return the value of router.type
     *
     * @mbggenerated
     */
    public Byte getType() {
        return type;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column router.type
     *
     * @param type the value for router.type
     *
     * @mbggenerated
     */
    public void setType(Byte type) {
        this.type = type;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column router.type_id
     *
     * @return the value of router.type_id
     *
     * @mbggenerated
     */
    public Integer getTypeId() {
        return typeId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column router.type_id
     *
     * @param typeId the value for router.type_id
     *
     * @mbggenerated
     */
    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column router.sortord
     *
     * @return the value of router.sortord
     *
     * @mbggenerated
     */
    public Integer getSortord() {
        return sortord;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column router.sortord
     *
     * @param sortord the value for router.sortord
     *
     * @mbggenerated
     */
    public void setSortord(Integer sortord) {
        this.sortord = sortord;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table router
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
        Router other = (Router) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getIntercept() == null ? other.getIntercept() == null : this.getIntercept().equals(other.getIntercept()))
            && (this.getType() == null ? other.getType() == null : this.getType().equals(other.getType()))
            && (this.getTypeId() == null ? other.getTypeId() == null : this.getTypeId().equals(other.getTypeId()))
            && (this.getSortord() == null ? other.getSortord() == null : this.getSortord().equals(other.getSortord()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table router
     *
     * @mbggenerated
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getIntercept() == null) ? 0 : getIntercept().hashCode());
        result = prime * result + ((getType() == null) ? 0 : getType().hashCode());
        result = prime * result + ((getTypeId() == null) ? 0 : getTypeId().hashCode());
        result = prime * result + ((getSortord() == null) ? 0 : getSortord().hashCode());
        return result;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table router
     *
     * @mbggenerated
     */
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", intercept=").append(intercept);
        sb.append(", type=").append(type);
        sb.append(", typeId=").append(typeId);
        sb.append(", sortord=").append(sortord);
        sb.append("]");
        return sb.toString();
    }
}