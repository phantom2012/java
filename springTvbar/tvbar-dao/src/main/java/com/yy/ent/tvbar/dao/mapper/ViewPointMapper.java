package com.yy.ent.tvbar.dao.mapper;

import com.yy.ent.tvbar.common.model.domain.ViewPoint;
import java.util.List;

public interface ViewPointMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table view_point
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Integer pointid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table view_point
     *
     * @mbggenerated
     */
    int insert(ViewPoint record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table view_point
     *
     * @mbggenerated
     */
    ViewPoint selectByPrimaryKey(Integer pointid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table view_point
     *
     * @mbggenerated
     */
    List<ViewPoint> selectAll();

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table view_point
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(ViewPoint record);
}