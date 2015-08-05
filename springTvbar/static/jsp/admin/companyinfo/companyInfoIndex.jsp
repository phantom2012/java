<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/commons/header.jsp"%>
<link rel="stylesheet" type="text/css" href="http://res0.idol.yystatic.com/agency/css/agency/style.css?20150428">
	<style>
		.nav li{margin: 0 25px}
	</style>
	<div class="content">
    	<ul class="nav">
    		<li class="first"><a href="/agency/admin/adminCompanyinfo.action" class="active">公司/个人简介</a></li>
    		<c:if test="${info eq null}">
    			<c:set var="formUrl">adminInsertCompanyinfo</c:set>
    			<li><a id="nextView" href="javascript:$.alert('请先填写公司/个人简介')" link="/agency/admin/adminForwardService.action">服务项目</a></li>
    			<li><a href="javascript:$.alert('请先填写公司/个人简介')" link="/agency/admin/adminForwardClassic.action">经典案例</a></li>
    			<li><a href="javascript:$.alert('请先填写公司/个人简介')">我的首页</a></li>
			</c:if>
			
			<c:if test="${info ne null}">
				<c:set var="formUrl">adminUpdateCompanyinfo</c:set>
				<li><a id="nextView" href="/agency/admin/adminForwardService.action">服务项目</a></li>
    			<li><a href="/agency/admin/adminForwardClassic.action">经典案例</a></li>
    			<li><a href="/agency/company.action?id=${info.company_id }">我的首页</a></li>
    		</c:if>
    	</ul>
    	
    	<form id="infoForm" action="/agency/admin/${formUrl}.action" method="post"> 
    	<div class="about-con">
    		<input type="hidden" name="type" id="type">
    		<div class="item">
    			<label>类型：</label>
    			<div class="field"><a href="javascript:;" class="type active" id="company" >公司</a><a href="javascript:;" class="type" id="person">个人</a></div>
    		</div>
    		<div class="item">
    			<label><span class="required">*</span><span id="headerPic">个人头像</span>：</label>
    			<div class="field">
    			<c:if test="${info.log_pic ne null and info.log_pic ne ''}"><c:set var="picUrl">${info.log_pic }</c:set> </c:if>
    			<c:if test="${info.log_pic eq null or info.log_pic eq ''}"><c:set var="picUrl">http://res0.idol.yystatic.com/agency/images/agency/upload.png</c:set> </c:if>
    			<img id="logoSource" src="${picUrl }" style="width:134px;height:134px" alt="" align="absmiddle">
    			<span class="tips">仅限jpg、png格式，图片大小不得超过500k</span>
    			<input type="hidden" name="log_pic" id="log_pic" value='${info.log_pic }' check="notBlank" msg="个人头像不能为空"></div>
    		</div>
    		<div class="item">
    			<label><span class="required">*</span><span id="headerPic">宣传图片</span>：</label>
    			<div class="field">
    			<c:if test="${info.index_pic ne null and info.index_pic ne ''}"><c:set var="picUrl">${info.index_pic }</c:set> </c:if>
    			<c:if test="${info.index_pic eq null or info.index_pic eq ''}"><c:set var="picUrl">http://res0.idol.yystatic.com/agency/images/agency/upload.png</c:set> </c:if>
    			<img id="indexPicSource" src="${picUrl }" style="width:320px;height:220px" alt="" align="absmiddle">
    			<span class="tips">仅限jpg、png格式，图片大小不得超过1M，用于聚合页机构展示图片</span>
    			<input type="hidden" name="index_pic" id="index_pic" value='${info.index_pic }' check="notBlank" msg="宣传图片不能为空"></div>
    		</div>
    		<div class="item">
    			<label><span class="required">*</span><span id="nameTxt">姓名</span>：</label>
    			<div class="field"><input type="text" name="company_name" value='${fn:escapeXml(info.company_name) }' check="notBlank" msg="不能为空" placeholder="" class="input-box"><!-- <span class="error">请输入姓名</span> --></div>
    		</div>
    		<div class="item"  id="sex">
    			<label><span class="required">*</span>性别：</label>
    			<div class="field" >
	    			<select name="sex" class="input-box">
	    				<option value="0">男</option>
	    				<option value="1">女</option>
	    			</select>
    			</div>
    		</div>
    		<div class="item" id="build_time">
    			<label><span class="required">*</span>成立时间：</label>
    			<div class="field" >
	    			<input type="text" name="build_time" check="notBlank" msg="成立时间不能为空" value='<fmt:formatDate value="${info.build_time }" pattern="yyyy-MM-dd"/>' onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'%y-%M-%d'});" placeholder="" class="input-box">
    			</div>
    		</div>
    		<div class="item">
    			<label><span class="required">*</span>服务城市：</label>
    			<div class="field cityitem">
	    			<input type="text" id="serviceCity" check="notBlank" msg="服务城市不能为空" value="${info.service_city }" placeholder="" class="input-box">
    			</div>
    		</div>
    		<div class="item">
    			<label><span class="required">*</span>经营范围：</label>
    			<div class="field" >
		    			<input type="text" id="businessRange" check="notBlank" msg="经营范围不能为空" value="${info.business_range }" placeholder="" class="input-box">
	    			<!-- <select name="" class="input-box">
	    				<option value=""></option>
	    				<option value=""></option>
	    				<option value=""></option>
	    			</select> -->
    			</div>
    		</div>
    		<div class="split-line"></div>
    		<div class="item">
    			<label><span class="required">*</span>YY：</label>
    			<div class="field"><!-- <a href="javascript:void(0)" class="link">联系人</a> --><input type="text" name="contact_yy" check="notBlank,number" msg="YY号不能为空,YY号只能为数字" value="${info.contact_yy }" placeholder="" class="input-box-small"></div>
    		</div>
    		<div class="item">
    			<label><span class="required">*</span>Tel：</label>
    			<div class="field"><!-- <a href="javascript:void(0)" class="link">联系人</a> --><input type="text" name="contact_tel" check="notBlank,number" msg="电话不能为空,Tel只能为数字" value="${info.contact_tel }" placeholder="" class="input-box-small"></div>
    		</div>
    		<div class="item">
    			<label><span class="required">*</span>E-mail：</label>
    			<div class="field"><!-- <a href="javascript:void(0)" class="link">联系人</a> --><input type="text" name="contact_email" check="notBlank,email" msg="email不能为空,EMAIL输入不正确" value="${info.contact_email }" placeholder="" class="input-box-small"></div>
    		</div>
    		<div class="split-line"></div>
    		<div class="item">
    			<p class="magbom"><label><span class="required">*</span><span id="companyTxt">公司简介</span>：</label></p>
    			<div class="field"><textarea id="description" style="color:#000" check="notBlank,maxLength(200)" msg="简介不能为空,长度不能超过200" class="tarea-brief gray" name="description">${fn:escapeXml(info.description) }</textarea>
    			<div class="words-number" id="descriptionRemain">还可输入<span>0</span>/200字 </div>
    			</div>
    		</div>
    		<div class="item">
    			<p class="magbom"><label>合作艺人：</label></p>
    			<div class="field">
    				<div class="hz-box">
    					<div class="name-input">
    					<c:forEach items="${fn:split(info.contractors,',') }" var="item">
    						<span class="input-item"><input type="text" name="contractors" value="${fn:escapeXml(item) }" placeholder="" class="input-box"><a href="javascript:void(0)" class="delete">删除</a></span>
    					</c:forEach>
<!--     						<span class="input-item"><input type="text" name="contractors" value="" placeholder="" class="input-box"><a href="javascript:void(0)" class="delete">删除</a></span>
 -->    					</div>
 							
    					<a href="javascript:void(0)" id="add" class="add">增添</a>
    				</div>
    			</div>
    		</div>
    		<div class="notice">请先填写完毕后再保存!</div>
    		<c:choose>
    			<c:when test="${info ne null and info.status eq 4 }">
    				<div class="submit"><a href="javascript:void(0)" id="submit0" class="next">保存并发布</a></div>
    				<div class="submit"><a href="javascript:void(0)" id="submit" style="display:none" _confirm="1" class="next">保存并发布</a></div>
    			</c:when>
    			<c:otherwise>
    				<div class="submit"><a href="javascript:void(0)" id="submit" class="next">保存并下一步</a></div>
    			</c:otherwise>
    		</c:choose>
    		
    	</div>
    	</form> 
    	
    </div>
    <div class="popup-box">
    	<a href="javascript:void(0)" class="close"></a>
    	<p>上传失败！图片大小超过500K，请重新上传 </p>
    	<a href="javascript:void(0)" class="btn">确定</a>
    </div>
	
	
	<script type="text/javascript" src="http://res.idol.yystatic.com/agency/??js/admin/companyinfo/companyInfoIndex.js?20150428"></script>
	<script type="text/javascript">
	var pics=[];
	<c:forEach items="${pics }" var="pic">
	pics.push({url:"${pic.picture_url}",id:${pic.picture_id}});
	</c:forEach>
	
		$(document).ready(function() {
			var js = new com.yy.agency.CompanyInfo();
			js.init({
				pics:pics,service_city:'${info.service_city }',
				business_range:'${info.business_range }',
				type:'${info.type }',
				sex:'${info.sex }'
			});
		});
		

	</script>
	
	



<%@ include file="/WEB-INF/jsp/commons/footer.jsp"%>