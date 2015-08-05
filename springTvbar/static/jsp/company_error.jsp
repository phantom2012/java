<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/commons/header.jsp" %>
<link rel="stylesheet" type="text/css" href="http://res1.idol.yystatic.com/agency/css/agency/merge.css?20150428">
	<script type="text/javascript">
	$.alert("${error_msg}",'error',{fn:function(btn){
		location.href="/agency/index.html";
	}});
	</script>
<div class="mg-title"><h1><a href="/agency/index.html" class="go-index">点击返回服务平台首页</a></h1></div>
<%@ include file="/WEB-INF/jsp/commons/footer.jsp" %>
