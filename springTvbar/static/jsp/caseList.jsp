<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/commons/header.jsp"%>

<ul class="panel">
	<c:forEach var="item" items="${companyCaseList }" varStatus="s">
		<li><a href="/agency/classicalCase.action?id=${item.case_id }"><img
				src="${item.picture_url }"></a>
				<h1>${item.title }</h1>
				<h2>${item.content }</h2>
		</li>
	</c:forEach>
</ul>

<%@ include file="/WEB-INF/jsp/commons/footer.jsp"%>
