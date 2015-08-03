<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
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
    <a href="/agency/mobile/orderList.action" class="back-btn" _id="backBtn"></a>
    <div class="page-title">订单详情</div>
</div>

	<div class="virtual-address-edit">
		<p>收货信息(手机号和邮箱，需至少填写一项)</p>
		<ul>
			<li><input type="tel" name="phoneNumber" value="${agencyContact.tel}" placeholder="手机号码" maxlength="11"></li>
			<li><input type="text" name="email" value="${agencyContact.email}" placeholder="邮箱"></li>
		</ul>
	</div>

	<section class="order-detail">
		<div class="order-main">
			<div class="order-name">
				<div class="cover" style="background-image: url(http://res0.idol.yystatic.com/agency/mobile/images/banner-demo.jpg)"><a href="javascript:;" class="play"></a></div><div class="intro"><span>项目回报：</span>您将以抢鲜价得到1931演唱会《逆流而上》门票1张；将以抢鲜价得到1931演唱会将以抢鲜价得到1931演唱会门票1张</div>
			</div>
			<div class="price">单价：<span>${agencyBenefit.real_price}元</span></div>
			<div class="count clearfix">
				购买数量：
				<div class="right">
					<div class="count-handle">
						<span operation="sub">-</span><input type="tel" id="orderNumInput" value="1" ><span operation="add">+</span>
					</div>
					<p >(剩余数量：<span id="hasNum">${agencyBenefit.num-agencyBenefit.currentNum}</span>)</p>
				</div>
			</div>
		</div>
	</section>

	<section class="deliver">
		<div class="deliver-main">
			<p>配送费用：免运费</p>
			<p>预计回报发送时间：项目成功结束后15天内</p>
			<p class="notice">请注意，确认支付后收货地址将不能修改</p>
		</div>
	</section>

	<section class="btm-handle">共<span id="goodsNum">1</span>件，应付金额<span id="totalPay">${agencyBenefit.real_price}</span>元<input type="button" id="confirmPay" value="确认支付"></section>
<script type="text/javascript" src="http://res0.idol.yystatic.com/agency/mobile/js/commons/??common.js,dialog.js"></script>	
<script type="text/javascript">

function isPhone(aPhone) {
    var bValidate = RegExp(/^(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/).test(aPhone);
    if (bValidate) {
        return true;
    }
    return false;
}

function isEmail(aEmail) {
    var bValidate = RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(aEmail);
    if (bValidate) {
        return true;
    }
    return false;
}


$(function(){
	var price = parseFloat("${order.price}");
	var orderNumInput = $("#orderNumInput"),hasNum = $("#hasNum");
	var goodsNum = $("#goodsNum"),totalPay = $("#totalPay");
	$("[operation]").click(function(){
		var operation = $(this).attr("operation");
		var orderNum = orderNumInput.val();
		if(!isNaN(orderNum))
		{
			if(operation=="sub")
			{
				if(orderNum<=0){
					return false;
				}
				orderNum--;
				orderNumInput.val(orderNum);
				hasNum.text(parseInt(hasNum.text())+1);
			}
			else if(operation=="add")
			{
				orderNum++;
				orderNumInput.val(orderNum);
				hasNum.text(hasNum.text()-1);
			}
			goodsNum.text(orderNum);
			totalPay.text(orderNum*price);
		}
		
		
	});
	
	orderNumInput.keyup(function(){
		var num = $(this).val();
		if(!isNaN(num)){
			goodsNum.text(num);
			totalPay.text(num*price);
			hasNum.text(parseInt(hasNum.text())-parseInt(num));
		}
	});
	
	$("#confirmPay").click(function(){
		var phoneNumber = $("input[name='phoneNumber']").val();
		var email = $("input[name='email']").val();
		if(!isPhone(phoneNumber)){
			$.dialog({
				title:'错误',
				content:'请输入正确的手机号码！',
				button:['ok']
			});
			return false;
		}
		if(!isEmail(email)){
			$.dialog({
				title:'错误',
				content:'请输入正确的邮箱地址！',
				button:['ok']
			});
			return false;
		}
		
		$.dialog({
			title:'提示',
	        content: '确认支付吗？',
	        button: ['确认','取消'],
	        callback:function(behavior,btnIndex)
	        {
	        	
	        	if(btnIndex==0)
	        	{
	        		alert("支付");
	        	}
	        	else if(btnIndex==1)
	        	{
	        		alert("取消");
	        	}
	        	
	        }
	    });
	});
	
	
	
	
	
});

</script>
</body>
</html>