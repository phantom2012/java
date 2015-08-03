package com.yy.ent.tvbar.action.test;

public class Test{
    private String name;
    private Integer topCh;
    private String descrption;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getTopCh() {
        return topCh;
    }

    public void setTopCh(Integer topCh) {
        this.topCh = topCh;
    }

    public String getDescrption() {
        return descrption;
    }

    public void setDescrption(String descrption) {
        this.descrption = descrption;
    }

    public Test(String name,Integer topCh, String descrption){
        this.name = name;
        this.topCh = topCh;
        this.descrption = descrption;
    }

    @Override
    public String toString() {
        return "Test{" +
                "name='" + name + '\'' +
                ", topCh=" + topCh +
                ", descrption='" + descrption + '\'' +
                '}';
    }
}