package com.yy.ent.tvbar.common.model;

/**
 * 分页参数
 * 
 * @author suzhihua
 * @date 2015年4月17日 上午10:43:15
 */
public class Page {
    private Integer page = 1;
    private Integer pagesize = 15;
    private String sortname;
    private String sortorder = "asc";

    public Page(Integer page, Integer pagesize, String sortname, String sortorder) {
        super();
        setPage(page);
        setPagesize(pagesize);
        setSortname(sortname);
        setSortorder(sortorder);
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        if (page != null) this.page = page;
    }

    public Integer getPagesize() {
        return pagesize;
    }

    public void setPagesize(Integer pagesize) {
        if (page != null) this.pagesize = pagesize;
    }

    public String getSortname() {
        return sortname;
    }

    public void setSortname(String sortname) {
        this.sortname = sortname;
    }

    public String getSortorder() {
        return sortorder;
    }

    public void setSortorder(String sortorder) {
        if ("asc".equalsIgnoreCase(sortorder) || "desc".equalsIgnoreCase(sortorder)) this.sortorder = sortorder;
    }

    @Override
    public String toString() {
        return "Page [page=" + page + ", pagesize=" + pagesize + ", sortname=" + sortname + ", sortorder=" + sortorder + "]";
    }

}
