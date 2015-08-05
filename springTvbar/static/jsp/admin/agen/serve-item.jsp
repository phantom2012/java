<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/commons/header.jsp" %>
<link rel="stylesheet" href="http://res.idol.yystatic.com/agency/css/agency/style.css"/>
<style>
.warning {
background: #ffebeb;
border-color: #ffbdbe;
}
.nav li{margin: 0 25px}
</style>
    <div class="content">    	
    	<ul class="nav">
    		<li class="first canClick"><a href="javascript:void(0)" data-href="/agency/admin/adminCompanyinfo.action">公司/个人简介</a></li>
    		<li><a  class="active">服务项目</a></li>
    		<!--这里要判断下如果是服务项目都还没填完的话不能点击  -->
    		<li class="canClick"><a href="javascript:void(0)" data-href="/agency/admin/adminForwardClassic.action">经典案例</a></li>
    		<li class="canClick"><a href="javascript:void(0)" data-href="/agency/company.action?id=${requestScope['com.yy.ageny.companyId'] }">我的首页</a></li>
    	</ul>    
    	<div  class="serve-item-con">
        	<div id="serviceShowArea" class="serve-item-list">
        	</div>
        	<a href="javascript:void(0)" class="add-item-btn" id="appendServiceItem">增添</a>
            <div class="notice">请先填写完毕后再保存!</div>
               <c:choose>
		   	<c:when test="${comStatus eq 4}">
		   	   <div class="submit">
                <a href="javascript:void(0)" data-href="/agency/admin/adminForwardService.action" class="next" id="saveServiceItem">保存并发布</a>
            </div> 
            </c:when>
            <c:otherwise>
               <div class="submit">
                 <a href="javascript:void(0)" data-href="/agency/admin/adminCompanyinfo.action" id="saveServiceItemPre" class="prev">保存并跳转至上一步</a><a href="javascript:void(0)" data-href="/agency/admin/adminForwardClassic.action" class="next" id="saveServiceItemNext">保存并下一步</a>
            </div> 
            </c:otherwise>
            </c:choose>                  
        </div>
       </div>    
<script id="service_item_template" type="text/html">
<@for(var i= 0 ; i < list.length ; i ++){@>
				<form style="margin-bottom:50px" id="serviceItemForm<@=index@>" data-service-id="<@=list[i].service_id@>">
                <input type="hidden" name="service_id" value="<@=list[i].service_id@>"/>                 
                <input type="hidden" name="type" value="<@=list[i].type@>"/>  
                <div class="serve-item">
                 <div class="photo-con" style="cursor:pointer" onclick="agenService.singleImgHandler(<@=index@>)">
                        <div class="upload-btn">
                       <@if(typeof list[i].picture =="undefined" ||list[i].picture==""){@>
                        <img name = "selectImage" class="defaultUploadImg" src="http://res.idol.yystatic.com/agency/images/agency/upload2.png" alt="" align="absmiddle">
                        <img width="200" height="202" class="targetUploadImg" style="margin-top:-48px;display:none" src="<@=list[i].picture@>"/>
                       <@}else{@>  
                        <img name = "selectImage" class="defaultUploadImg" style="display:none" src="http://res.idol.yystatic.com/agency/images/agency/upload2.png" alt="" align="absmiddle">                     
                        <img width="200" height="202" class="targetUploadImg"  style="margin-top:-48px" src="<@=list[i].picture@>"/>
                         <@}@>   
                      </div>                        
                        <p>仅限jpg、png格式，图片大小不得超过500k </p>
                    </div>                     
                    <div class="item-con">
                        <div class="item">
                            <label><span class="required">*</span>服务标题：</label>
                            <div class="field"><input type="text" check="notBlank" msg="服务标题不能为空" name="title" value="<@=list[i].title@>" placeholder="" class="input-box"></div>
                        </div>
                        <div class="item">
                            <label><span class="required">*</span>服务城市：</label>
                            <div class="field cityitem">
                                <input type="text" name="city" check="notBlank" msg="服务城市不能为空" value="<@=list[i].city@>" placeholder="" class="input-box">
                                <div class="city-select-box">
                                    <div class="title">服务城市 （最多5个）</div>
                                    <div class="tab">
                                        <a href="javascript:void(0)" class="active">热门</a>
                                        <a href="javascript:void(0)">ABCDEF</a>
                                        <a href="javascript:void(0)">GHIJ</a>
                                        <a href="javascript:void(0)">KLMN</a>
                                        <a href="javascript:void(0)">PQRSTUVW</a>
                                        <a href="javascript:void(0)">XYZ</a>
                                    </div>
                                
                                    <div class="selected">
                                        <p>已选城市：</p>
                                        <div class="selected-list"><span class="city">北京<em class="delete"></em></span><span class="city">北京<em class="delete"></em></span><span class="city">北京<em class="delete"></em></span><span class="city">北京<em class="delete"></em></span><span class="city">北京<em class="delete"></em></span><a href="javascript:void(0)" class="clear">[清空]</a></div>
                                    </div>
                                    <div class="btn-con"><a href="javascript:void(0)" class="btn">确定</a><a href="javascript:void(0)" class="btn">取消</a></div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <label><span class="required">*</span>服务类型：</label>
                            <div class="field" >
                                <select name="" class="input-box" onchange="agenService.getServiceQulityByType($(this).val(),<@=index@>);">
									<@for(var key1 in cityList){@>        
           								<option  value="<@=key1@>" <@if(key1 == list[i].type){@> selected="selected" <@}@> ><@=cityList[key1]@></option>    
     								<@}@>
                                </select>
                            </div>
                        </div>
                        <div class="item">
                            <label><span class="required">*</span>服务价格：</label>
                            <div class="field" onclick="$(this).removeClass('warning');" id="priceArea<@=index@>" >                            
                             <@for(var key2 in list[i].priceList){@>        
                               <input type ="checkbox" <@if(list[i].priceList[key2].checked){@> checked="checked" <@}@>  name="quality" value="<@=list[i].priceList[key2].quality@>"/><@=list[i].priceList[key2].describtion@>-<@=list[i].priceList[key2].price@>    
                              <@}@>
                            </div>
                        </div>
                        <div class="item">
                           <label><span class="required">*</span>服务内容：</label>
                            <div class="field"><textarea name="content" check="notBlank,maxLength(200)" msg="" class="tarea-servecon" onpropertychange="recomLanguageCheck(<@=index@>,this)" oninput="recomLanguageCheck(<@=index@>,this)" onkeyup="recomLanguageCheck(<@=index@>,this)"><@=list[i].content@></textarea>
                           
                            </div>
                        </div>
                        <div class="item">
                            <div id="recomWordNotice<@=index@>" class="words-number">还可输入<span>200</span>字 </div>
                        </div>                         
                    </div>				
               		<a href="javascript:void(0)" class="item-delete" onclick="agenService.delServiceItem(<@=index@>)">删除</a>				
                </div>
<input type="hidden" name="picture" check="notBlank" msg="请上传图片！" value="<@=list[i].picture@>"/>
 		</form>
<@
 index++; 
}
@>  
</script> 
<script id="service_price_template" type="text/html">
<input type ="checkbox" checked="checked" name="quality" value="<@=item.quality@>"/><@=item.describtion@>-<@=item.price@>
</script>
<script type="text/javascript" src="http://res.idol.yystatic.com/agency/??js/commons/common.js,js/commons/arttemplate.js,js/json2.js,js/commons/selectServiceData.js?v=201506051136,js/admin/index.js?v=201506051136"></script>
<script type="text/javascript">
  var post_url = "http://idol.yy.com/agency/" ;
  var comStatus = '${comStatus}' ; 
  var agenService  =  new com.yy.ent.AgenService() ;
  agenService.init();
  function recomLanguageCheck( i,obj) {	
		wordCount2(obj,200,'recomWordNotice'+i);	
	}
</script>
<%@ include file="/WEB-INF/jsp/commons/footer.jsp" %>