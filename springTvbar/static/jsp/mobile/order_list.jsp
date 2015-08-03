<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%
String randomuid = "20150603-001";
//String randomuid = UUID.randomUUID().toString();
%>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta content="telephone=no" name="format-detection" />
    <meta content="email=no" name="format-detection" />
	<title>我的订单</title>
	<link rel="stylesheet" href="http://res0.idol.yystatic.com/agency/mobile/css/??main.css,frozen.css">
<style type="text/css">
.ttool {
  height: 45px;
  line-height: 45px;
  font-size: 0.9em;
  box-shadow: 1px 0 2px transparent;
  background: #292929 center top no-repeat;
}
.ttool .page-title {
    width: 100%;
    text-align: center;
    line-height: 45px;
    font-size: 1.8rem;
    color: #f1f2f1; }
 .ttool .back-btn {
    background: url(http://res0.idol.yystatic.com/agency/mobile/images/back.png) no-repeat;
    background-size: auto 16px;
    display: block;
    width: 18px;
    height: 16px;
    top: 15px;
    position: absolute;
    left: 12px; }
</style>	
</head>
<body>
<div class="ttool">
    <a href="javascript:void(0)" class="back-btn" _id="backBtn"></a>

    <div class="page-title">我的订单</div>
   
</div>
	<section class="order-item">
	<c:forEach items="${agencyOrders}" var="item" begin="0" varStatus="status">
		<div class="item-main" id="item_${item.id}">
			<div class="state">订单状态：
			<c:choose>
			     <c:when test="${item.status==0}">
			     		<span>新订单</span>
			     </c:when>
			       <c:when test="${item.status==1}">
			       		<span>待支付</span>
			     </c:when>
			       <c:when test="${item.status==2}">
			       		<span>失败</span>
			     </c:when>
			       <c:when test="${item.status==3}">
			       		<span>成功</span>
			     </c:when>
			     <c:when test="${item.status ==4}">
						<span>已发货</span>
				 </c:when>
				 <c:when test="${item.status ==5}">
						<span>待抽奖</span>
				 </c:when>
				 <c:when test="${item.status ==6}">
						<span>未中奖</span>
				 </c:when>
				 <c:when test="${item.status ==7}">
						<span>中奖</span>
				 </c:when>
			</c:choose>
			<div class="delete" _orderId="${item.id}" onclick="deleteOrder(this)">删除</div></div>
			<c:set var="pid">id${item.pid}</c:set>
			<c:set var="personid">id${item.personId}</c:set>
			<c:set var="bid">id${item.benefitId}</c:set>
			<div class="order-name">
				<div class="cover" style="background-image: url(${AgencyProject[pid].coverImg})"><a href="javascript:;" class="play"></a></div><div class="intro"><span>项目回报：</span>${AgencyBenefit[bid].content}</div>
			</div>
			<div class="price" id="${item.id}_priceCon">单价：<span>${item.price}元</span><div class="open-detail" onclick="document.getElementById('${item.id}_priceCon').style.display='none';document.getElementById('${item.id}_detailCon').style.display='block';">详情</div></div>
			<div class="detail-con clearfix" id="${item.id}_detailCon">
				<p class="orderid"><fmt:formatDate value="${item.createTime}" pattern="yyyy年MM月dd日" /> &nbsp;&nbsp;订单号：${item.id}</p>
				<div class="th"><span>单价</span><span></span><span>数量</span><span></span><span>应付金额</span></div>
				<div class="tc"><span>${item.price}元</span><span>×</span><span>${item.num}</span><span>=</span><span>${item.price*item.num}元</span></div>
				
				<c:choose>
					<c:when test="${item.status ==4 or (item.status ==7 and not empty item.personId)}">
					 	<address>
							<div>收货地址：</div>
							<div>
								<p>${AgencyPerson[personid].name}&nbsp;&nbsp;${AgencyPerson[personid].tel}</p>
								<p>${fn:replace(item.address,'##',' ')}</p>
							</div>
						</address>  
					</c:when>
					<c:when test="${item.status ==7}">
						<address>
							<a href="/agency/mobile/address.action">填写收货地址</a>
						</address>
					</c:when>
				</c:choose>
				<div class="retract" onclick="document.getElementById('${item.id}_detailCon').style.display='none';document.getElementById('${item.id}_priceCon').style.display='block';">收起</div>
			</div>
		</div>
	</c:forEach>	
		
		
	</section>
<script type="text/javascript" src="http://res0.idol.yystatic.com/agency/mobile/js/commons/??common.js,dialog.js"></script>	
<script type="text/javascript">
var wrapFrozenConfirmButton = function (content) {
    $.dialog({
        content: content,
        button: ['OK']
    });
};
function deleteOrder(btn)
{
	var orederId = $(btn).attr("_orderId");
	$.dialog({
        content: '确认删除订单吗？',
        button: ['确认','取消'],
        callback:function(behavior,btnIndex)
        {
        	if(btnIndex==0)
        	{
        		$("#item_"+orederId).remove();
        	}
        	
        }
    });
	
	
}	
</script>
</html>