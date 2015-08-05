package com.yy.ent.tvbar.dao.mapper;

import com.yy.ent.tvbar.common.model.domain.Event;
import java.util.List;

public interface EventMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table event
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Integer eventid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table event
     *
     * @mbggenerated
     */
    int insert(Event record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table event
     *
     * @mbggenerated
     */
    Event selectByPrimaryKey(Integer eventid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table event
     *
     * @mbggenerated
     */
    List<Event> selectAll();

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table event
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(Event record);
}