package com.yy.ent.tvbar.common.util;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.log4j.Logger;

/**
 * 
 * 分页工具类
 * 
 * @author Allen.Li
 *
 */
public class PagerHelper extends TagSupport {

	private static final long serialVersionUID = -6398439094756891410L;
	
	private static Logger log = Logger.getLogger(PagerHelper.class);
	
	private int count;        //总记录数
	private int pageSize;     //每页记录数
	private int displayNum;   //显示页数
	private int pageIndex;    //当前页数
	private String cssName;   //css名称
	private String actionName;//Action名称
	
	@Override
	public int doStartTag() throws JspException {
	  JspWriter out = pageContext.getOut();
	  int pageCount,start,end;
	  String url = "";
	  if (pageSize<=0) pageSize = 1;
	  pageCount = ((count+pageSize-1) / pageSize);
	  if (pageIndex >= pageCount) pageIndex = pageCount;
	  if (pageIndex < 1) pageIndex = 1;
	  if(pageIndex <= displayNum){
		  start = 1;
		  end = 2*displayNum;
	  }else{
		  start = pageIndex - displayNum;
		  end = pageIndex + displayNum;
	  }
	  if (end >= pageCount)  end = pageCount;
	  try {
		  if(pageCount>1){
			  out.print("<div class='"+cssName+"'><ul>");
			  url = actionName+ setPage(actionName) + (((pageIndex - 1) == 0) ? pageIndex:(pageIndex - 1));
			  if(pageIndex>(displayNum+1)){
				  out.print("<li><a href='"+(actionName + setPage(actionName) + 1)+"' rel='prev' title='首页'>首页</a></li>");
			  }
			  if(pageIndex>1){
				  out.print("<li><a href='"+url+"' rel='prev' title='上一页'>上一页</a></li>");
			  }
			  for(int i = start; i <= end; i++){
			    if(i != pageIndex){//非当前页
			    	url = actionName+ setPage(actionName) + i;
			        out.print("<li><a href='"+url+"' title='第"+i+"页'>"+ i + "</a></li>");
			    }else{//当前页
			        out.print("<li class='active'><a href='javascript:void(0)'>"+i+"</a></li>");
			    }
			  }
			  if(pageIndex < pageCount){
				  url = actionName+ setPage(actionName) + (((pageIndex + 1) > pageCount) ? pageIndex: (pageIndex + 1));
				  out.print("<li><a href='"+url+"' rel='next' title='下一页'>下一页</a></li>");
			  }
			  if(pageIndex != pageCount && end != pageCount){
				  url =actionName+ setPage(actionName) + pageCount;
				  out.print("<li><a href='"+url+"' title='第"+pageCount+"页'>末页</a></li>");
			  }
			  out.print("</ul></div>");
		  	}
	  } catch (IOException e) {
		  log.warn(e);
	  } 
      return super.doStartTag();
	}
	
	public String setPage(String actionName) {
		if (actionName.contains("?")) {
			return "&page=";
		}
		return "?page=";
	}
	
	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public String getCssName() {
		return cssName;
	}

	public void setCssName(String cssName) {
		this.cssName = cssName;
	}

	public String getActionName() {
		return actionName;
	}

	public void setActionName(String actionName) {
		this.actionName = actionName;
	}
	
	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public int getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}
	
	public int getDisplayNum() {
		return displayNum;
	}

	public void setDisplayNum(int displayNum) {
		this.displayNum = displayNum;
	}
	
}
