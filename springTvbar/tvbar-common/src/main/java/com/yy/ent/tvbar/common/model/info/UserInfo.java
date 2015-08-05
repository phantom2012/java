package com.yy.ent.tvbar.common.model.info;

import com.yy.ent.cherroot.entity.EntityBean;
import com.yy.ent.cherroot.entity.annotation.Column;
import com.yy.ent.cherroot.entity.annotation.Entity;

import java.util.Date;

@Entity(table = "user_info")
public class UserInfo extends EntityBean{
    @Column(name = "userId", isPK = true)
    private String userId;
    
    @Column(name = "openId")
    private String openId;

    @Column(name = "nick")
    private String nick;

    @Column(name = "icon")
    private String icon;

    @Column(name = "name")
    private String name;

    @Column(name = "sex")
    private String sex;

    @Column(name = "tel")
    private String tel;

    @Column(name = "weixinNum")
    private String weixinNum;

    @Column(name = "weixinPic")
    private String weixinPic;

    @Column(name = "signature")
    private String signature;

    @Column(name = "createTime")
    private Date createTime;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getNick() {
        return nick;
    }

    public void setNick(String nick) {
        this.nick = nick;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getWeixinNum() {
        return weixinNum;
    }

    public void setWeixinNum(String weixinNum) {
        this.weixinNum = weixinNum;
    }

    public String getWeixinPic() {
        return weixinPic;
    }

    public void setWeixinPic(String weixinPic) {
        this.weixinPic = weixinPic;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "userId='" + userId + '\'' +
                ", nick='" + nick + '\'' +
                ", icon='" + icon + '\'' +
                ", name='" + name + '\'' +
                ", sex='" + sex + '\'' +
                ", tel='" + tel + '\'' +
                ", weixinNum='" + weixinNum + '\'' +
                ", weixinPic='" + weixinPic + '\'' +
                ", signature='" + signature + '\'' +
                ", createTime=" + createTime +
                '}';
    }
}