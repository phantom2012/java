<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/commons/header.jsp" %>
<link rel="icon" href="http://res.idol.yystatic.com/images/favicon.ico" type="image/x-icon" />
<style>
	.header .header-con{font-size: 14px;  width: 980px;}
	.myaddress .tb-void tbody td:first-child.on {
		background: url(http://res0.idol.yystatic.com/agency/images/advance/choose.png) left center no-repeat;
	}
	.myaddress .tb-void tbody td:first-child{
		text-indent: 22px;
		background: url(http://res2.idol.yystatic.com/agency/images/advance/no-choose.png) left center no-repeat;
	}
</style>
<link rel="stylesheet" type="text/css"  href="http://res1.idol.yystatic.com/agency/??css/advance/home.css" />

<section class="home-main">
	<div class="home-order">
		<div><p class="tcol1">订单合计：${total}</p><a href="/agency/admin/adminExportAgencyOrder.action?pid=${param.pid}&status=${param.status}">导出</a></div>
		<div class="order-list">
			<table class="tb-void"></table>
			<table class="tb-void">
				<colgroup>
					<col width="396">
					<col width="226">
					<col width="80">
					<col width="60">
					<col width="130">
					<col width="88">
				</colgroup>
				<thead>
				<tr>
					<th class="name">项目名称</th>
					<th>内容回报</th>
					<th>单价</th>
					<th class="center">购买数量</th>
					<th class="center">支持金额</th>
					<th>操作</th>
				</tr>
				</thead>
				<c:forEach items="${agencyOrders}" var="item">

					<c:set var="pid">id${item.pid}</c:set>
					<c:set var="bid">id${item.benefitId}</c:set>
					<c:set var="personid">id${item.personId}</c:set>
					<c:set var="nick">id${item.uid}</c:set>
					<tbody>
					<tr class="tr-th">
						<td colspan="6">
							<p class="tcol1"><fmt:formatDate value="${item.createTime}" pattern="yyyy年MM月dd日" /></p>
							<p class="tcol2"><fmt:formatDate value="${item.createTime}" pattern="HH:mm:ss" /></p>
							<p class="tcol3">订单号：${item.id}	</p>
							<p class="tcol4">订单状态：<span class="ftx-01" _id="newStatus">
											<%--0-新订单,1待支付,2支付失败,3支付成功,4已发货,,5待抽奖,6未中奖,7中奖--%>
											<c:choose>
												<c:when test="${item.status ==0}">
													新订单
												</c:when>
												<c:when test="${item.status ==1}">
													待支付
												</c:when>
												<c:when test="${item.status ==2}">
													支付失败
												</c:when>
												<c:when test="${item.status ==3}">
													待发货
												</c:when>
												<c:when test="${item.status ==4}">
													已发货
												</c:when>
												<c:when test="${item.status ==5}">
													待抽奖
												</c:when>
												<c:when test="${item.status ==6}">
													未中奖
												</c:when>
												<c:when test="${item.status ==7}">
													中奖</span> <span>待发货
												</c:when>
											</c:choose>
										</span></p>
							<p class="tcol1">支持者：${nickMap[nick]}	</p>
						</td>
					</tr>
					<tr>
						<td>
							<a href="http://idol.yy.com/agency/ticket/projectIndex.action?projectId=${item.pid}&bid=${item.benefitId}" target="_blank" class="video-item" _url="${AgencyProject[pid].attachment}">
								<img src="${AgencyProject[pid].coverImg}">
								<div class="play-icon"></div>
							</a>
							<p class="info">${AgencyProject[pid].title}</p>
						</td>
						<td><p class="info">${AgencyBenefit[bid].content}</p></td>
						<td class="money">${item.real_price}元</td>
						<td class="center">${item.num}</td>
						<td class="center">${item.num*item.real_price}元</td>
						<td>
								<%--0-新订单,1待支付,2支付失败,3支付成功,4已发货,,5待抽奖,6未中奖,7中奖--%>
							<c:choose>
								<c:when test="${item.status ==4}">
									<a href="javascript:void(0)" style="cursor: default">
										已发货
									</a>
								</c:when>
								<c:when test="${item.status ==7 and not empty item.personId}">
									<a href="javascript:void(0)"  _orderId="${item.id}" _id="setExpressId">
										设为发货
									</a>
								</c:when>
								<c:when test="${item.status ==7 and empty item.personId}">
									<a href="javascript:void(0)"  _orderId="${item.id}" _id="waitSetAddress">
										待设置地址
									</a>
								</c:when>
								<c:otherwise>
									<a href="javascript:void(0)" style="cursor: default">
										无需处理
									</a>
								</c:otherwise>
							</c:choose>
						</td>
					</tr>

					<c:if test="${not empty AgencyPerson[personid]}">
					<tr class="tr-th">
						<td colspan="6">
							<p class="tcol1">地址：${fn:replace(AgencyPerson[personid].address,'##',' ')} (${AgencyPerson[personid].name} 收) ${AgencyPerson[personid].tel}</p>
							<p class="tcol1">邮编：${AgencyPerson[personid].zip}</p>
							<c:if test="${not empty item.expressId}">
								<p class="tcol1">快递号：${item.expressId}</p>
							</c:if>
							<p class="tcol1" _id="newExpressId"></p>
						</td>
					</tr>
					</c:if>
					</tbody>
				</c:forEach>
			</table>
		</div>
	</div>
</section>
</div>

<div class="popup-box" _id="popup-box">
	<p class="title">设为发货/填写快递单号</p>
	<a href="javascript:void(0)" class="close-btn bClose"></a>
	<div class="add-box">
		<ul class="info" id="info">
			<li>
				<div class="label" id="label-1">
					<span class="required">*</span><span class="type">快递单号：</span><input type="text" _id="expressId" placeholder="请输入快递单号"><span class="error-tip">请完善信息</span>
				</div>
			</li>
		</ul>
	</div>

	<a href="javascript:void(0)" class="add-btn" _id="submitExpressId">确定</a>
</div>

<script type="text/javascript" src="http://res1.idol.yystatic.com/agency/js/??advance/area.js,advance/address-api.js,admin/ticket/adminagencyorder.js,agency/jquery.bpopup.min.js"></script>

<%@ include file="/WEB-INF/jsp/commons/footer.jsp" %>