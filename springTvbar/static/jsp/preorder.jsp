<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/commons/header.jsp"%>

<img src="${item.picture }" style="width: 160px; height: 160px">
<div class="project-box">
	<div class="box-top">
		<span class="box-name">${item.title }</span> <a href="#" id="type"></a>
	</div>
	<p class="box-city" id="city">服务城市：</p>
	<p class="box-info">${item.content }</p>
	<div class="box-bottom">
		<span class="box-num">近一个月预订数：${item.total }</span>
	</div>
	<select name="quality">
		<c:forEach items="${list }" var="option">
			<option value="${option.quality }">${option.describtion }-${option.price }</option>
		</c:forEach>
	</select> <a href="javascript:order()">我要订购</a>
</div>
<script type="text/javascript">
	$("#city").append(
			$.agencySelectFromCode('${item.city }', 'city', '&nbsp;|&nbsp;'));
	$("#type").append($.agencySelectFromCode('${item.type }', 'business'));
	
	function order() {
		var action = "/agency/order.action";
		$.ajaxData(action, "id=${item.service_id }&quality=0", {
			success : function(r) {
			}
		});
	}
</script>

<%@ include file="/WEB-INF/jsp/commons/footer.jsp"%>