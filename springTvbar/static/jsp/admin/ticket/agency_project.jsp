<%@ page language="java" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/jsp/commons/header.jsp"%>
<link rel="stylesheet" type="text/css"
	href="http://res.idol.yystatic.com/agency/css/agency/style.css">
<style>
.warning {
background: #ffebeb;
border-color: #ffbdbe;
}
.nav li{margin: 0 25px}
</style>
<div class="content">
	<div class="case-item-con">
		<div class="item">
			<label><span class="required">*</span>众筹类型：</label>
			<div class="field">
				<select name="" class="input-box"
					onchange="agenService.getServiceQulityByType($(this).val(),<@=index@>);">
					<option value="">预购类</option>
				</select>
			</div>
		</div>


	</div>
</div>


<div>
 <select><opion>预购类</opion></select>
 <input type="text" ></input>
   附件
 目标金额：<input type="text" ></input>
 

</div>

<%@ include file="/WEB-INF/jsp/commons/footer.jsp"%>