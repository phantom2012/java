package com.yy.ent.tvbar.common.model.page;


import com.yy.ent.commons.base.dto.Property;
import com.yy.ent.tvbar.common.model.info.Evidence;
import org.apache.commons.beanutils.BeanUtils;

import java.util.Date;
import java.util.List;

//观点页
public class ViewPointPage {
    //证据列表
    public List<Property> evidences;

    public List<Property> getEvidences() {
        return evidences;
    }

    public void setEvidences(List<Property> evidences) {
        this.evidences = evidences;
    }

    private Integer pointId;

    private String title;

    private Integer topicId;

    private String creatorId;

    private String createTime;

    private String creatorName;

    private Integer zanCount;

    private Integer opposeCount;

    private Byte enable;

    private String viewPic;

    private Byte isEnd;

    public Byte getIsEnd() {
        return isEnd;
    }

    public void setIsEnd(Byte isEnd) {
        this.isEnd = isEnd;
    }

    public ViewPointPage(Object souObj) throws Exception{
        BeanUtils.copyProperties(this, souObj);
    }

    public Integer getPointId() {
        return pointId;
    }

    public void setPointId(Integer pointId) {
        this.pointId = pointId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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
}