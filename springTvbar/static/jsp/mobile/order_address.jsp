<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%
String randomuid = UUID.randomUUID().toString();
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
	<title>收货地址</title>
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

    <div class="page-title">收货地址</div>
   
</div>
	<section class="edit-address">
		<form action="" method="get" accept-charset="utf-8">
			<ul>
				<li><input type="text" name="name" value="" placeholder="收件人"></li>
				<li><input type="tel" name="tel" value="" placeholder="手机号码" maxlength="11"></li>
				<li>
				<select name="s_province" id="s_province" onchange="this.className = 'active';" >
				</select>
				<select name="s_city" id="s_city" onchange="this.className = 'active';">
				</select>
				<select name="s_county" id="s_county" onchange="this.className = 'active';">
				</select>
				</li>
				<li><input type="text" name="address" value="" placeholder="详细地址"></li>
				<li><input type="tel" name="zip" value="" placeholder="邮政编码" maxlength="6"></li>
			</ul>
		</form>
		<div class="submit">新增</div>
	</section>

	<section class="address-list">
		<c:forEach var="item" items="${agencyPersons}" varStatus="status">
		<div class="address-item" id="${item.id}">
			<div class="item-main">
				<address>
					<p _id="${item.id}" _name="${item.name}" _tel="${item.tel}">${item.name}  ${item.tel} </p>
					<p _id="${item.id}" _address="${item.address}">${fn:replace(item.address,'##',' ')}</p>
				</address>
				<div class="handle clearfix">
					<span active  onclick="this.children[0].className = 'radio active';"><span class="radio" ></span><span class="txt">使用地址</span></span>
					<div class="btn delete" personid="${item.id}" _id="${item.id}">删除</div>
					<div class="btn edit" _id="${item.id}">编辑</div>
				</div>
			</div>
		</div>
		</c:forEach>
	</section>
</body>
<script type="text/javascript" src="http://res0.idol.yystatic.com/agency/mobile/js/commons/??common.js,dialog.js"></script>
<script type="text/javascript" src="http://res1.idol.yystatic.com/agency/js/??advance/area.js"></script>
<script type="text/javascript">
_init_area();

var myalert = function(content,callbackFn){
	$.dialog({
		title:'错误',
        content: content,
        button: ['确认'],
        callback:function(behavior,btnIndex)
        {
        	if(btnIndex==0)
        	{
        		callbackFn&&callbackFn();
        	}
        	
        }
    });
	
}

$(".edit").live("click",function(){
	var id = $(this).attr("_id");
	var name = $("[_id='"+id+"'][_name]").attr("_name");
	$("input[name='name']").val(name);
	var tel = $("[_id='"+id+"'][_tel]").attr("_tel");
	$("input[name='tel']").val(tel);
	var address = $("[_id='"+id+"'][_address]").attr("_address").split("##");
    $("#s_province").val(address[0]).trigger('change');
    $("#s_city").val(address[1]).trigger('change');
    $("#s_county").val(address[2]).trigger('change');
    $("input[name='address']").val(address[3]);
	$(".submit").text("保存");
	
});

$(".delete").live("click",function(){
	var divId = $(this).attr("_id");
	$.dialog({
		title:'温馨提示',
        content: '确认要删除收货地址吗？',
        button: ['确认','取消'],
        callback:function(behavior,btnIndex)
        {
        	if(btnIndex==0)
        	{
        		
        		//$.ajax();
        		$("#"+divId).remove();
        	}
        	
        }
    });
});



$(".submit").click(function(){
	var name = $("input[name='name']").val();
	var tel = $("input[name='tel']").val();
	var province = $("#s_province");
	var city = $("#s_city");
	var county = $("#s_county");
	var address = $("input[name='address']").val();
	var zip = $("input[name='zip']").val();
	if(isEmpty(name)||isEmpty(tel)||isEmpty(address)||isEmpty(zip))
	{
		myalert('收件信息不完整！');
		return false;
		
	}
	if(isEmpty(province.val()) || province.val() == "省份"){
		myalert('请选择省份！');
		return false;
    }
	if(isEmpty(city.val()) || city.val() == "地级市"){
		myalert('请选择城市！');
		return false;
    }
	if(isEmpty(county.val()) || county.val() == "市、县级市"){
		myalert('请选择区域！');
		return false;
    }
	if(!isZip(zip))
	{
		myalert('邮编格式不合法！');
		return false;
	}
	if(!isPhone(tel))
	{
		myalert('手机号码格式不合法！');
		return false;
	}
	if(minChar(2, name)||maxChar(12, name)||!checkInvalidSpecialChars(name)){
		myalert('请输入2-12个汉字、英文或数字!');
		return false;
	}
	if(!checkInvalidChar(address)){
		myalert('详细地址只能包含数字、字母、汉字、#、-、（）及其组合!');
		return false;
	}
	
	if(maxChar(30, address)){
		myalert('地址最多允许输入30个字符!');
		return false;
	}
	var person = {name:name,tel:tel,p:province.val(),c:city.val(),y:county.val(),address:address,zip:zip,id:12};
	var templateHtml = template(person);
	$(".address-list").append(templateHtml);
	
	
	
	
});
function template(person)
{
	var template = ['<div class="address-item" id="@{item.id}">',
						'<div class="item-main">',
						'<address>',
							'<p _id="@{item.id}" _name="@{item.name}" _tel="@{item.tel}">@{item.name}  @{item.tel} </p>',
							'<p _id="@{item.id}" _address="@{item.address}">@{addressOrc}</p>',
						'</address>',
						'<div class="handle clearfix">',
							'<span active  onclick="this.children[0].className = \'radio active\';"><span class="radio" ></span><span class="txt">使用地址</span></span>',
							'<div class="btn delete" personid="@{item.id}" _id="@{item.id}">删除</div>',
							'<div class="btn edit" _id="@{item.id}">编辑</div>',
						'</div>',
					  '</div>',
					'</div>'
	                ];	
	var templateHtml = template.join("");
	templateHtml = templateHtml.replaceAll("@{item.id}",person.id);
	templateHtml = templateHtml.replaceAll("@{item.name}",person.name);
	templateHtml = templateHtml.replaceAll("@{item.tel}",person.tel);
	var addressWrap = person.p+"##"+person.c+"##"+person.y+"##"+person.address;
	templateHtml = templateHtml.replaceAll("@{item.address}",addressWrap);
	var addressOrc = addressWrap.replaceAll("##","");
	templateHtml = templateHtml.replace("@{addressOrc}",addressOrc);
	return templateHtml;
}

function checkInvalidSpecialChars(d) {
    var f = /([\u4e00-\u9fa5]|[a-z]|[A-Z]|[0-9])+/;
    for (var e = 0; e < d.length; e++) {
        if (!f.test(d.charAt(e))) {
            return false
        }
    }
    return true
}
function maxChar(c, d) {
    return d.length > c ? true : false
}
function minChar(c, d) {
    return d.length < c ? true : false
}
function trim(b) {
    return b.replace(/^\s+/, "").replace(/\s+$/, "")
}
function isEmpty(b) {
    if (b == "" || b == null || b.length == 0) {
        return true
    } else {
        return false
    }
}
function checkInvalidChar(d) {
    var f = /[\u4e00-\u9fa5]|[a-z]|[A-Z]|[0-9]|[#]|[-]|[(]|[)]|[（]|[）]|[ ]/;
    for (var e = 0; e < d.length; e++) {
        if (!f.test(d.charAt(e))) {
            return false
        }
    }
    return true;
}
function isZip(zip){
    var bValidate = RegExp(/^[0-9]{6}$/).test(zip);
    if (bValidate) {
        return true;
    }
    return false;
}

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

String.prototype.replaceAll = function(s1,s2)
{
　　return this.replace(new RegExp(s1,"gm"),s2);
}

</script>

</html>