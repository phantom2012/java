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
				<div class="uesr-info">
					<div class="my-img">
						<img src="${data.imLogo}">
					</div>
					<div class="my-info">
						<p class="name">${data.nick}</p>
						<a href="#" class="address-btn">我地收货地址</a>
					</div>
				</div>
				<div class="home-order">
					<div class="order-title">已付款订单记录</div>
					<div class="order-list">
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
							<tbody>
						        <tr class="tr-th">
						            <td colspan="6">
						                <p class="tcol1"><fmt:formatDate value="${item.createTime}" pattern="yyyy年MM月dd日" /></p>
						                <p class="tcol2"><fmt:formatDate value="${item.createTime}" pattern="HH:mm:ss" /></p>
						                <p class="tcol3">订单号：${item.id}	</p>
						                <p class="tcol4">订单状态：<span class="ftx-01">
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
						            </td>
						        </tr>
						        <tr>
						            <td>
										<c:set var="pid">id${item.pid}</c:set>
										<c:set var="bid">id${item.benefitId}</c:set>
										<c:set var="personid">id${item.personId}</c:set>
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
											<c:when test="${item.status ==4 or (item.status ==7 and not empty item.personId)}">
												<a href="javascript:void(0)" target="_blank" _orderId="${item.id}" _id="showAddress" _address="${AgencyPerson[personid].address}"
												   _zip="${AgencyPerson[personid].zip}"
												   _tel="${AgencyPerson[personid].tel}"
												   _name="${AgencyPerson[personid].name}">查看收货地址</a>
											</c:when>
											<c:when test="${item.status ==7}">
												<a href="javascript:void(0)" _orderId="${item.id}" _id="addAddress">填写收货地址</a>
											</c:when>
										</c:choose>
									</td>
						        </tr>
						    </tbody>
							</c:forEach>
						</table>
					</div>
				</div>
			</section>
		</div>

<div class="popup-box" _id="popup-box1">
	<p class="title">我的收货地址</p>
	<a href="javascript:void(0)" class="close-btn bClose"></a>
	<div class="address-list myaddress">
		<table class="tb-void" _id="addressWrapper">
			<colgroup>
				<col width="82">
				<col width="136">
				<col width="360">
				<col width="102">
				<col width="262">
			</colgroup>
			<thead>
			<tr>
				<th>收件人</th>
				<th>手机号码</th>
				<th>地址</th>
				<th>邮编</th>
				<th>操作</th>
			</tr>
			</thead>
			<c:forEach var="item" items="${agencyPersons}" varStatus="status">
				<tbody _addressId="${item.id}" >
				<tr>
					<td _id="addressActivate" <c:if test="${status.index eq 0}">class="on"</c:if>>${item.name}</td>
					<td>${item.tel}</td>
					<td><p _address="${item.address}">${fn:replace(item.address,'##',' ')}</p></td>
					<td>${item.zip}</td>
					<td><a href="javascript:void(0)" _id="addressEdit">编辑</a><a href="javascript:void(0)" _id="addressDel">删除</a></td>
				</tr>
				</tbody>
			</c:forEach>
		</table>
	</div>
	<div class="add-box" style="display:none;">
		<ul class="info" id="info">
			<li>
				<div class="label" id="label-1">
					<span class="required">*</span><span class="type">收件人：</span><input type="text" id="myName" placeholder="请输入收件人"><span class="error-tip">请完善信息</span>
				</div>
			</li>
			<li>
				<div class="label" id="label-2">
					<span class="required">*</span><span class="type">手机号码：</span><input type="text" id="myTel" placeholder="请输入内容（必填）"><span class="error-tip">请输入正确的11位数手机号码</span>
				</div>
			</li>
			<li>
				<div class="label" id="label-3">
					<span class="required">*</span><span class="type">所在地：</span>
					<label class="province">省</label>
					<select id="s_province" name="s_province" class="s_province"></select>
					<label class="city">市</label>
					<select id="s_city" name="s_city" class="s_city"></select>
					<label class="county">区</label>
					<select id="s_county" name="s_county" class="s_county"></select>
					<input type="text" id="myAdress" placeholder="详细地址">
					<span class="error-tip">请完善信息</span>
				</div>
			</li>
			<li>
				<div class="label" id="label-4">
					<span class="required">*</span><span class="type">邮政编码：</span><input type="text" id="myCode" placeholder="请输入邮政编码"><span class="error-tip">请完善信息</span>
				</div>
			</li>
		</ul>
		<a href="javascript:void(0)" class="save-btn">保存</a>
		<a href="javascript:void(0)" class="canle-btn">取消</a>
	</div>

	<a href="javascript:void(0)" class="add-btn" _id="addNewAddress">新增地址</a>
	<a href="javascript:void(0)" class="add-btn" _id="useAddress">确定</a>
</div>


<div class="popup-box" _id="popup-box2" style="width:680px">
	<p class="title" style="width:680px">我的收货地址</p>
	<a href="javascript:void(0)" class="close-btn bClose"></a>
	<div class="address-list" >
		<table class="tb-void">
			<colgroup>
				<col width="82">
				<col width="136">
				<col width="360">
				<col width="102">
			</colgroup>
			<thead>
			<tr>
				<th>收件人</th>
				<th>手机号码</th>
				<th>地址</th>
				<th>邮编</th>
			</tr>
			</thead>
				<tbody>
				<tr>
					<td _id="myAddressName"></td>
					<td _id="myAddressTel"></td>
					<td><p _id="myAddressAddress"></p></td>
					<td _id="myAddressZip"></td>
				</tr>
				</tbody>
		</table>
	</div>

</div>
		<script type="text/javascript" src="http://res1.idol.yystatic.com/agency/js/??advance/area.js,advance/address-api.js,ticket/agencyorder.js,agency/jquery.bpopup.min.js"></script>

<%@ include file="/WEB-INF/jsp/commons/footer.jsp" %>