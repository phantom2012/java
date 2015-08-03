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
		<ul class="nav">
			<li class="first canClick"><a href="javascript:void(0)"  data-href="/agency/admin/adminCompanyinfo.action">公司/个人简介</a></li>
			<li class="canClick"><a href="javascript:void(0)" data-href="/agency/admin/adminForwardService.action">服务项目</a></li>
			<li><a class="active">经典案例</a></li>		
		   	<li class="canClick"><a href="javascript:void(0)" data-href="/agency/company.action?id=${requestScope['com.yy.ageny.companyId'] }">我的首页</a></li>		
		</ul>
		<input type="hidden" id="isFirstTime" value="${isFirst}"/>
		<div class="case-item-con">
			<div class="case-item-list">				
						<c:forEach items="${list}" var="item" begin="0" varStatus="status">
							<form id="caseItemForm${status.index}">
							<div class="case-item">								
									<input type="hidden" name="case_id" value="${item.classicalCase.case_id}"/>
									<input type="hidden" name="vedio_url"  value="${item.classicalCase.vedio_url}" />
									<input type="hidden" name="head_pic_url"  value="${item.head_pic_url}" />									
									<input type="hidden" name="head_pic_url_from_db"  value="${item.head_pic_url}" />
									<input type="hidden" name="picture_id"  value="${item.classicalCase.picture_id}" />
									<%-- 把db的图片集保存一份  --%>
									 <c:forEach  items="${item.pics}" var="pic" varStatus="status1">
									  <c:if test="${item.classicalCase.type eq 1}">									
									    <input type="hidden" name="pic_urls"  value="${pic.picture_url}" />
									    <input type="hidden" name="pic_urls_from_db"  value="${pic.picture_url}" />
									  </c:if>
									 </c:forEach>
									<%-- --%>
									<div class="item-con">
										<div class="item">
											<label><span class="required">*</span>案例标题：</label>
											<div class="field">
												<input type="text" name="title" check="notBlank" msg="案例标题不能为空" value="${item.classicalCase.title}" placeholder=""
													class="input-box">
												<!-- <span class="error">请输入案例标题</span> -->
											</div>
										</div>
										<div class="item">
											<label><span class="required">*</span>时间：</label>
											<div class="field">
												<input type="text" name="record_time" check="notBlank" msg="时间不能为空" value="<fmt:formatDate value="${item.classicalCase.record_time}" pattern="yyyy-MM-dd HH:mm:ss"/>"
													onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'%y-%M-%d %H:%m:%s'});"
													placeholder="" class="input-box">
											</div>
										</div>
										<div class="item">
											<label><span class="required">*</span>服务内容：</label>
											<div class="field">
												<textarea name="content" check="notBlank,maxLength(200)" msg="" class="tarea-servecon" onpropertychange="recomLanguageCheck(${status.index},this)" oninput="recomLanguageCheck(${status.index},this)" onkeyup="recomLanguageCheck(${status.index},this)">${item.classicalCase.content}</textarea>
											</div>
										</div>
										<div class="item">
											<div class="words-number" id="recomWordNotice${status.index}">
												您还可输入<span>200</span>字
											</div>
										</div>
									</div>
									<div class="upload-con">
										<div class="item">
											<label><span class="required">*</span>上传类型：</label>
											<div class="field">
												<a href="javascript:void(0)"
													onclick="agenService.choseVeiodOrPicBnt(${status.index},0,this)"
													class="type  <c:if test="${item.classicalCase.type eq 0}">active</c:if> ">视频</a><a href="javascript:void(0)"
													onclick="agenService.choseVeiodOrPicBnt(${status.index},1,this)"
													class="type <c:if test="${item.classicalCase.type eq 1}">active</c:if>  ">照片</a>
											</div>
										</div>										
										  	<div <c:if test="${item.classicalCase.type eq 1}">style="display:none"</c:if> class="upload-item upload-item-vedio">
											<div class="upload-box-con">											
												<!-- 已上传 -->
												<div name="J_selectVedio" style="cursor:pointer" onclick="agenService.vedioHandler(${status.index})" class="upload-box">
												  <c:if test="${item.classicalCase.type eq 1}">	
												   <div class="upload-btn">
													<img src="http://res.idol.yystatic.com/agency/images/agency/upload2.png"
														align="absmiddle" class="">
												   </div>
												   	<img width="167" height="193" style="display: none" class="alUploadImg" />
												  </c:if>
												  <c:if test="${item.classicalCase.type eq 0}">
												    <c:choose>
													<c:when test="${empty item.classicalCase.vedio_url}">
													    <div class="upload-btn">
													      <img src="http://res.idol.yystatic.com/agency/images/agency/upload2.png"
														    align="absmiddle" class="">
												        </div>
														<img width="167" height="193" style="display: none"
															class="alUploadImg" />
													</c:when>
													<c:when test="${not empty item.classicalCase.vedio_url}">
														<div class="upload-btn" style="display: none">
															<img src="http://res.idol.yystatic.com/agency/images/agency/upload2.png"
																align="absmiddle" class="" />
														</div>
														<img width="167" height="193" src="http://res.idol.yystatic.com/agency/images/agency/uploadVedioSuccess.jpg"
															class="alUploadImg" />
													</c:when>
												   </c:choose>												  
												  </c:if>
												</div>
												<p>视频仅限MP4，音频仅限MP3，视频不能超过40M</p>
											</div>
											<div class="upload-box-con">
												<div name="J_selectImage" style="cursor:pointer" onclick="agenService.singleImgHandler(${status.index})" class="upload-box">
												 <c:if test="${item.classicalCase.type eq 1}">	
												 <div class="upload-btn">
													<img src="http://res.idol.yystatic.com/agency/images/agency/upload2.png"
														align="absmiddle" class="">
												 </div>											
													<img width="167" height="193" style="display: none" class="alUploadImg" />
												 </c:if>
											<c:if test="${item.classicalCase.type eq 0}">
												<c:choose>
													<c:when test="${empty item.head_pic_url}">
														<div class="upload-btn">
															<img src="http://res.idol.yystatic.com/agency/images/agency/upload2.png" align="absmiddle" class="" />
														</div>
														<img width="167" height="193" style="display: none"
															class="alUploadImg" />
													</c:when>
													<c:when test="${not empty item.head_pic_url}">
														<div class="upload-btn" style="display: none">
															<img src="http://res.idol.yystatic.com/agency/images/agency/upload2.png"
																align="absmiddle" class="" />
														</div>
														<img width="167" height="193" src="${item.head_pic_url}"
															class="alUploadImg" />
													</c:when>
												</c:choose>
											</c:if>
										</div>
												<p>专辑封面图格式仅限jpg、png</p>
											</div>
										</div>
										  <div  <c:if test="${item.classicalCase.type eq 0}">style="display:none"</c:if> class="upload-item upload-item-img">
											<div class="upload-box-con">
												<div name="J_selectImages" style="cursor:pointer" onclick="agenService.multiImgHandler(${status.index})" class="upload-box">
													 <c:if test="${item.classicalCase.type eq 0}">	
												 <div class="upload-btn">
													<img src="http://res.idol.yystatic.com/agency/images/agency/upload2.png"
														align="absmiddle" class="">
												 </div>											
													<img width="167" height="193" style="display: none" class="alUploadImg" />
												 </c:if>
												  <c:if test="${item.classicalCase.type eq 1}">
												    <div class="upload-btn" style="display: none">
													<img src="http://res.idol.yystatic.com/agency/images/agency/upload2.png" 
														align="absmiddle" class="">
												 </div>											
													<img width="167" height="193" onerror="agenService.handleErrorImg(${status.index} , this)" src="${item.head_pic_url}" class="alUploadImg" />
												  </c:if>	
												</div>
												<p>经典案例相册格式仅限jpg、png</p>
											</div>
										</div>								    									
									</div>								
								<a href="javascript:void(0)" onclick="agenService.delCaseItem(${status.index})" class="item-delete">删除</a>	 							  
							</div>
							<input type="hidden" name="type"  value="${item.classicalCase.type}" />
							</form>
						</c:forEach>					
			</div>
			<a href="javascript:void(0)" id="appendCaseItem" class="add-item-btn">增添</a><span
				class="add-tips">(最多填6项)</span>
			<div class="notice">请先填写完毕后再保存!</div>
		   <c:choose>
		   	<c:when test="${comStatus eq 4}">
		   	<div class="submit">				
				<a href="javascript:void(0)" id="saveCaseItemNext" data-href="/agency/admin/adminForwardClassic.action" class="next">保存并发布</a>
			</div>
		   	</c:when>
		   	<c:otherwise>
		   	<div class="submit">
				<a href="javascript:void(0)" data-href="/agency/admin/adminForwardService.action" id="saveCaseItemPre" class="prev">保存并跳转至上一步</a>
				<a href="javascript:void(0)"  data-href="/agency/company.action?id=${requestScope['com.yy.ageny.companyId'] }" id="saveCaseItemNext" class="next">保存并发布</a>
			</div>
		   	</c:otherwise>
		   </c:choose>			
		</div>
	</div>
	<div class="popup-box">
		<a href="javascript:void(0)" class="close"></a>
		<p>上传失败！图片大小超过500K，请重新上传</p>
		<a href="javascript:void(0)" class="btn">确定</a>
	</div>
<script id="case_item_template" type="text/html">
 <form id="caseItemForm<@=i@>">
							<div class="case-item">
								
									<input type="hidden" name="case_id" value=""/>
									<input type="hidden" name="vedio_url" value="" />
									<input type="hidden" name="head_pic_url" value="" />					
									<input type="hidden" name="picture_id" value="" />
									<div class="item-con">
										<div class="item">
											<label><span class="required">*</span>案例标题：</label>
											<div class="field">
												<input type="text" name="title" value="" check="notBlank" msg="案例标题不能为空" placeholder=""
													class="input-box">
												<!-- <span class="error">请输入案例标题</span> -->
											</div>
										</div>
										<div class="item">
											<label><span class="required">*</span>时间：</label>
											<div class="field">
												<input type="text" name="record_time" value="" check="notBlank" msg="时间不能为空"
													onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'%y-%M-%d %H:%m:%s'});"
													placeholder="" class="input-box">
											</div>
										</div>
										<div class="item">
											<label><span class="required">*</span>服务内容：</label>
											<div class="field">
												<textarea name="content" check="notBlank,maxLength(200)" msg="" class="tarea-servecon" onpropertychange="recomLanguageCheck(<@=i@>,this)" oninput="recomLanguageCheck(<@=i@>,this)" onkeyup="recomLanguageCheck(<@=i@>,this)"></textarea>
											</div>
										</div>
										<div class="item">
											<div class="words-number" id="recomWordNotice<@=i@>">
												您还可输入<span>200</span>字
											</div>
										</div>
									</div>
									<div class="upload-con">
										<div class="item">
											<label><span class="required">*</span>上传类型：</label>
											<div class="field">
												<a href="javascript:void(0)"
													onclick="agenService.choseVeiodOrPicBnt(<@=i@>,0,this)"
													class="type  active ">视频</a><a href="javascript:void(0)"
													onclick="agenService.choseVeiodOrPicBnt(<@=i@>,1,this)"
													class="type">照片</a>
											</div>
										</div>										
										  	<div  class="upload-item upload-item-vedio">
											<div class="upload-box-con">											
												<!-- 已上传 -->
												<div name="J_selectVedio" style="cursor:pointer" onclick="agenService.vedioHandler(<@=i@>)" class="upload-box">
													<div class="upload-btn">
															<img src="http://res.idol.yystatic.com/agency/images/agency/upload2.png"
																align="absmiddle" class="" />
												    </div>
                                                    <img width="167" height="193" style="display: none"
															class="alUploadImg" />	
												</div>
												<p>视频仅限MP4，音频仅限MP3，视频不能超过40M</p>
											</div>
											<div class="upload-box-con">
												<div name="J_selectImage" style="cursor:pointer" onclick="agenService.singleImgHandler(<@=i@>)" class="upload-box">													
														<div class="upload-btn">
															<img src="http://res.idol.yystatic.com/agency/images/agency/upload2.png"
																align="absmiddle" class="" />
														</div>
														<img width="167" height="193" style="display: none"
															class="alUploadImg" />											
										</div>
												<p>专辑封面图格式仅限jpg、png</p>
											</div>
										</div>
										  <div  style="display:none" class="upload-item upload-item-img">
											<div class="upload-box-con">
												<div name="J_selectImages" style="cursor:pointer" onclick="agenService.multiImgHandler(<@=i@>)" class="upload-box">
													 	
												 <div class="upload-btn">
													<img src="http://res.idol.yystatic.com/agency/images/agency/upload2.png"
														align="absmiddle" class="">
												 </div>											
													<img width="167" height="193" style="display: none" class="alUploadImg" />												 
												  	
												</div>
												<p>经典案例相册格式仅限jpg、png</p>
											</div>
										</div>								    									
									</div>								
									<a href="javascript:void(0)" onclick="agenService.delCaseItem(<@=i@>)" class="item-delete">删除</a> 							  
							</div>
				             <input type="hidden" name="type"/>
							</form>					
</script>
<script type="text/javascript"
		src="http://res.idol.yystatic.com/agency/??js/commons/common.js,js/commons/arttemplate.js,js/json2.js,js/commons/selectServiceData.js,js/admin/classic_case.js?v=20150424"></script>
<script type="text/javascript">
  var post_url = "http://idol.yy.com/agency/" ;
  var comStatus = '${comStatus}' ; 
  var agenService  =  new com.yy.ent.AgenService() ;  
  <c:forEach items="${list}" var="item" varStatus="status" > 
   agenService.pics.push([]);
   <c:forEach  items="${item.pics}" var="pic" varStatus="status1">
    <c:if test="${item.classicalCase.type eq 1}">agenService.pics[${status.index}].push({url:"${pic.picture_url}",id:${pic.picture_id}});</c:if>
   </c:forEach>
  </c:forEach>	   
  function recomLanguageCheck( i,obj) {	
		wordCount2(obj,200,'recomWordNotice'+i);	
	}
  agenService.init(); 
</script>
<%@ include file="/WEB-INF/jsp/commons/footer.jsp"%>