<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/commons/header.jsp" %>
<link rel="icon" href="http://res.idol.yystatic.com/images/favicon.ico" type="image/x-icon" />
<link rel="stylesheet" type="text/css"  href="http://res1.idol.yystatic.com/agency/css/advance/cart.css" />
<style>
	.header .header-con{font-size: 14px;  width: 980px;}
</style>
			<a href="http://idol.yy.com/agency/ticket/projectIndex.action?projectId=${agencyProject.id}&bid=${agencyBenefit.id}" class="back-btn">&lt;返回</a>

			<section class="cart-address">
                <p class="title">收货信息（手机号必须填写，邮箱选填）</p>
				<div class="choose-box">
					<ul>
						<li>
							<span class="required">*</span><span class="type">手机号码：</span><input value="${agencyContact.tel}" type="text" _id="tel" maxlength="11" placeholder="请输入手机号码" class="input-box"><%--<a href="javascript:void(0)" class="save-btn">保存</a>--%><%--<a href="javascript:void(0)" class="canle-btn">取消</a>--%>
						</li>
						<li>
							<span class="required" style="color: #fff">*</span><span class="type">邮箱：</span><input value="${agencyContact.email}" _id="email" type="text" placeholder="请输入邮箱地址" class="input-box"><%--<a href="javascript:void(0)" class="save-btn">保存</a>--%><%--<a href="javascript:void(0)" class="canle-btn">取消</a>--%>
						</li>
					</ul>
				</div>
			</section>
			<section class="cart-main">
				<div class="cart-order">
					<div class="order-list">
						<table class="tb-void">
	        				<colgroup>
								<col width="396">
								<col width="226">
								<col width="100">
								<col width="144">
								<col width="114">
							</colgroup>
							<thead>
								<tr>
									<th class="name">项目名称</th>
									<th>内容回报</th>
									<th>单价</th>
									<th>购买数量</th>
									<th>合计</th>
								</tr>
							</thead>
							<tbody>
						        <tr>
						            <td>
						            	<a target="_blank" href="http://idol.yy.com/agency/ticket/projectIndex.action?projectId=${agencyProject.id}&bid=${agencyBenefit.id}" class="video-item" _url="${agencyProject.attachment}">
							            	<img src="${agencyProject.coverImg}">
							            	<div class="play-icon"></div>
						            	</a>
						            	<p class="info">${agencyProject.title}</p>
						            </td>
						            <td><p class="info">${agencyBenefit.content}</p></td>
						        	<td class="money">${agencyBenefit.real_price}元</td>
						            <td>
							            <div class="quantity-form">
							            	<a href="javascript:void(0);" _id="numDecrement" class="decrement disabled">-</a>
							                <input autocomplete="off" type="text" _id="numTxt" class="itxt" value="1">
							                <a href="javascript:void(0);" _id="numIncrement" class="increment">+</a>
							            </div>
							            <p class="num-tip">剩余数量：${agencyBenefit.num-agencyBenefit.currentNum}</p>
						            </td>
						            <td><span _id="benefitTotalPrice">${agencyBenefit.real_price}</span>元</td>
						        </tr>
						    </tbody>
						</table>
						<input type="hidden" _id="benefitId" value="${agencyBenefit.id}">
						<input type="hidden" _id="benefitRemain" value="${agencyBenefit.num-agencyBenefit.currentNum}">
						<input type="hidden" _id="benefitPrice" value="${agencyBenefit.real_price}">
					</div>
					<div class="order-bottom">
						<p class="order-tip">配送费用：免运费&nbsp;&nbsp;<span>|</span>&nbsp;&nbsp;预计回报发送时间：项目成功结束后15天内</p>
						<p class="becareful">请注意：确认支付后收货地址将不能修改</p>
						<div class="clearfix"></div>
						<p class="pay-box">应付金额：<span _id="benefitTotalPrice">${agencyBenefit.real_price}</span>元<a href="javascript:void(0)" _id="submit" class="ok-btn">确定</a></p>
					</div>
				</div>
			</section>
		</div>
		<script type="text/javascript" src="http://res0.idol.yystatic.com/agency/js/??advance/area.js,advance/address-api.js,ticket/preorder.js,agency/jquery.bpopup.min.js,agency/error_code.js"></script>

<%@ include file="/WEB-INF/jsp/commons/footer.jsp" %>