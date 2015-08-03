<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/commons/header.jsp" %>
	<link rel="stylesheet" href="http://res.idol.yystatic.com/agency/??css/agency/pupup.css?20150512" />
	<script type="text/javascript">
	function convertDesc(str){
		return str.replace(/(^\s*)|(\s*$)/g, "").split(" ").join("&nbsp;|&nbsp;");
	}
	</script>
	<style type="text/css">
			.wrap .col-aside .agency-bottom .agency-artist .name {
          	cursor: default }
          .wrap .col-aside .agency-bottom .agency-artist .name:hover {
            	color: #000; }
	</style>
    <div class="wrap">
    	<div class="col-aside">
	    	<div class="agency-company">
	    	    <img style="width:134px;height: 134px;" src="${info.log_pic }" class="logo">
	    		<p class="name">${fn:escapeXml(info.company_name)}</p>
	    		<!-- <p class="num">公司编号: <span>${info.company_id }</span></p> -->
	    		<c:choose>
	    				<c:when test="${info.type eq 0 }">
	    					<p class="time">成立时间: <span>${fn:substring(info.build_time,0,10)}</span></p>
						</c:when>
	    				<c:otherwise>
	    					<p class="time">性别: <span>
								${info.sex eq 0 ? '男':'女' }
							</span></p>
						</c:otherwise>
	    			</c:choose>
	    	</div>
	    	<div class="agency-bottom">
	    		<div class="agency-contact">
	    			<div class="aside-title"><em class="icon-1"></em>联系方式</div>
	    			<script type="text/ajax" url="/agency/queryContacts.action?id=${info.company_id }">
							<@window.inWhiteList=(data.inWhiteList==1) @>
							<p class="yy">YY:&nbsp;<span><@=data.yy @></span>&nbsp;&nbsp;<!-- (陈小姐) --></p>
			    			<p class="tel">TEL:&nbsp;<span><@=data.tel @></span>&nbsp;&nbsp;<!-- (王先生) --></p>
			    			<p class="mail">EMAIL:&nbsp;<span><@=data.email @></span></p>
					</script>
	    		</div>
	    		<div class="agency-city">
	    			<div class="aside-title"><em class="icon-2"></em>服务城市</div>
	    			<p class="p-list" id="service_city">&nbsp;<!-- <span>北京&#47;<span>上海</span>&#47;<span>广州</span> --></p>
	    			
	    		</div>
	    		<div class="agency-experience">
	    			<div class="aside-title"><em class="icon-3"></em>经营范围</div>
	    			<p class="p-list" id="business_range">&nbsp;<!-- <span>音乐制作</span>&#47;<span>造型</span>&#47;<span>编辑</span>&#47;<span>视频</span> --></p>
	    		</div>
	    		<div class="agency-info">
	    			<c:choose>
	    				<c:when test="${info.type eq 0 }"><c:set var="type">公司</c:set></c:when>
	    				<c:otherwise><c:set var="type">个人</c:set></c:otherwise>
	    			</c:choose>
	    			<div class="aside-title"><em class="icon-4"></em>${type }简介</div>
						<c:choose>
                               	<c:when test="${fn:length(info.description) lt 100 }">
                               	<c:set var="tmp">${fn:escapeXml(info.description)}</c:set>
                               	</c:when>
                               	<c:otherwise>
                                  <c:set var="tmp">${fn:escapeXml(fn:substring(info.description,0,100)) }...
				  				 <a href="javascript:" onclick="$('#smallContent').toggle();$('#fullContent').toggle();" >查看更多</a></c:set>
                               	</c:otherwise>
                              </c:choose>
	    			<p class="info-txt" id="smallContent">&nbsp;&nbsp;${tmp }</p>
					<p class="info-txt" style="display:none" id="fullContent">&nbsp;&nbsp;${fn:escapeXml(info.description)}<a href="javascript:" onclick="$('#smallContent').toggle();$('#fullContent').toggle();" >收起更多</a></p>
	    		</div>
	    		<div class="agency-artist" id="contractors">
	    			<div class="aside-title"><em class="icon-5"></em>合作艺人</div>
	    			<c:forEach items="${fn:split(info.contractors,',')}" var="name">
	    				<p class="name">${fn:escapeXml(name)}</p>
	    			</c:forEach>
	    		</div>
	    	</div>
	    </div>
	    <div class="col-main">
	   	    <section>
	   	    	<div class="main-title"><p>成功案例</p></div>
	   	    	<div id="trigger" class="scrollable-trigger"></div>
		    	<div class="swiper-wrapper" id="swiperTop">
		    		<ul class="panel">
		    			
		    		<c:forEach var="item" items="${companyCaseList }" varStatus="s">
			    		<c:choose>
			    			<c:when test="${item.type eq 0 }">
				    			<li>
				    				<a href="#" class="video-item" _url="${item.vedio_url }"
				    				_info="${item.content }" _title="${item.title }" _time="${fn:substring(item.record_time,0,10) }">
				    				<img style="width:230px;height: 230px" src="${item.picture_url }"><div class="play-icon"></div></a>
				    			</li>
			    			</c:when>
			    			
							<c:otherwise>
				    			<li>
				    				<a href="#" _id="param${item.case_id }" class="photo-item"><img style="width:230px;height: 230px" src="${item.picture_url }"></a>
				    			</li>
							</c:otherwise>		    			
			    		</c:choose>
		    		</c:forEach>
		    		</ul>
		    	</div>
		    	<c:if test="${fn:length(companyCaseList)>3}">
			    	<a href="javascript:void(0);" title="下翻" class="swiper-next" id="swiperNext"></a>
			    	<a href="javascript:void(0);" title="上翻" class="swiper-prev" id="swiperPrev"></a>
		    	</c:if>
	   	    </section>
	   	    <section>
	   	    	<!-- <div class="main-title"><p>服务项目</p></div> -->
<!-- 分类过滤开始  -->	   	    	
<script type="text/html" id="servicetype_item_template">
<a href="javascript:void(0);" data-type="0" onclick="" class="on">全部<i></i></a>
<@for(var i = 0 ; i < list.length ; i++){@>
  <a href="javascript:void(0);" data-type="<@=list[i].c@>" onclick="" ><@=list[i].n@><i></i></a>
<@}@>
</script>
<script type="text/javascript" src="http://res1.idol.yystatic.com/agency/js/agency/home.js?v=201506081812"></script>
	   	    	<div class="main-title nav-con" id="serviceType">
	   	    	    <p>服务项目</p>	   	    	  
	   	    	</div>
<script type="text/javascript">
	var business_range_str = '${info.business_range}' ;
	var homeHandler = new com.yy.agency.Home() ;
	homeHandler.initCompany() ;
</script>	   	    	
<!-- 分类过滤结束  -->	
	   	    	<div class="project-list">
	   	    		<ul>
	   	    		<c:forEach var="item" items="${companyServiceList }" varStatus="s">
	   	    			<li data-type="${item.type }">
	   	    				<img style="width:160px;height:180px" src="${item.picture }" >
	   	    				<div class="project-box">
	   	    					<div class="box-top">
		   	    					<span class="box-name">${item.title }</span>
		   	    					<a  id="type${s.index }" style="cursor: default"></a>
		   	    				</div>
		   	    				<p class="box-city" id="city${s.index }">服务城市：</p>
		   	    				<p class="box-city" id="price_describtion${s.index }">服务档次：</p>
		   	    				<p class="box-info">${fn:substring(fn:escapeXml(item.content),0,130) }<c:if test="${fn:length(item.content) gt 130}">...</c:if></p>
		   	    				<div class="box-bottom">
		   	    					<a href="javascript:preorder(${item.service_id },${s.index})">我要订购</a>
		   	    					<span class="box-num">近30天订购数：${item.total }</span>
		   	    				</div>
	   	    				</div>
	   	    			</li>
	   	    			 <script type="text/javascript">
							$("#city${s.index }").append($.agencySelectFromCode('${item.city }','city','&nbsp;|&nbsp;'));
							$("#type${s.index }").append($.agencySelectFromCode('${item.type }','business'));
							$("#price_describtion${s.index }").append(convertDesc('${fn:escapeXml(item.price_describtion) }'));
						</script>
	   	    			</c:forEach>
	   	    		</ul>
	   	    	</div>
	   	    	<!-- <a href="javascript:void(0);" title="下翻" class="swiper-more">更多</a> -->
	   	    </section>
	    </div>
    </div>
    
    <script id="popup" type="text/html">
    <div class="popup-box popup-big">
    	<div class="title">订购项目<a href="javascript:$.uiwidget.popupHide({id:'popUpBox'});" class="popup-close"></a></div>
    	<div class="popup-msg">
			<img src="<@=data.item.picture@>" style="height:160px;width:160px">
			<div class="project-box">
				<div class="box-top">
					<span class="box-name"><@=data.item.title@></span>
					<a><@=$.agencySelectFromCode(data.item.type, 'business')@></a>
				</div>
				<p class="box-city">服务城市：<@=$.agencySelectFromCode(data.item.city, 'city', '&nbsp;|&nbsp;')@></p>
				<p class="box-info">服务内容：<@=data.item.content@></p>
				<div class="box-bottom">
					<span class="box-num">近30天订购数：<@=data.item.total@></span>
					<div id="_city" class="pop-choose">
						<span>选择服务城市：</span>
						<@var citys=data.item.city.split(',');window.city=citys[0];@>
						<@for(var i=0;i<citys.length;i++){@>
							<a href="javascript:selectCity('<@=citys[i]@>')"
								city='<@=citys[i]@>'
							<@if(i==0){@>class="on"<@}@>
							><@=$.agencySelectFromCode(citys[i])@></a>
						<@}@>
					</div>
					<div id="_price" class="pop-choose">
						<span>选择服务价格：</span>
						<@window.quality=data.qualitys[0].quality@>
						<@for(var i=0;i<data.qualitys.length;i++){@>
							<a href="javascript:selectQuality('<@=data.qualitys[i].quality@>')"
								quality='<@=data.qualitys[i].quality@>'
							<@if(i==0){@>class="on"<@}@>
							><@=data.qualitys[i].real_price@>-<@=data.qualitys[i].describtion@></a>
						<@}@>
					</div>
				</div>
			</div>
    	</div>
    	<div class="rules">
			<input id="_checkbox" type="checkbox" name="checkbox1" value="checkbox"><label for='_checkbox'>我已阅读并同意条款</label><a href="javascript:" onclick="document.all.fullContent2.style.display=(document.all.fullContent2.style.display=='none')?'-webkit-box':'none';this.innerText=(document.all.fullContent2.style.display=='none')?'展开':'收起'" id="tipBtn">收起</a>
		</div>
		<p id="fullContent2">
            服务条款：
            <span> 
当你使用该众筹产品的时候，意味着你同意通过该众筹活动所筹集的礼物不进入蓝钻结算体系，而成为你的艺人发展专属基金，用于你的专属原创歌曲制作、形象包装、MV拍摄、市场推广等活动。YY娱乐将抽取其专属礼物价值的15%-25%（根据服务档位和服务类型有所不同）作为渠道服务费，除此以外，该费用任何一方均无权支配做其他用途。通过该众筹产品所筹集到的资金，以此完成的相关作品，其著作权属于欢聚传媒。艺人应服从该平台规则，积极努力通关任务。如使用过程中遇到问题，可随时向官方寻求帮助。YY娱乐对该众筹活动拥有最终解释权利。            </span>
        </p>
    	<a href="javascript:order(<@=data.item.service_id@>)" class="ok">我要订购</a>
    </div>
    
    </script>
    <div style="display: none" id="popUpBox"></div>
    
    <script type="text/javascript">
			$("#service_city").append("<span>"+$.agencySelectFromCode('${info.service_city}','city','</span>&#47;<span>')+"</span>");
			$("#business_range").append("<span>"+$.agencySelectFromCode('${info.business_range}','business','</span>&#47;<span>')+"</span>");
			var index=-1;
			var inWhiteList=false;
			function preorder(id,i){
				index=id;
				if(!isLogin()){
					showLoginBox();
					return;
				}
				//if(inWhiteList){
					$.ajaxData("/agency/preorder.action?id="+id,'',{success:function(r){
						r.$=$;
						r.window=window;
						r.document=document;
						var html=template("popup",r);
						$("#popUpBox").html(html);
						$.uiwidget.popupShow({id:'popUpBox'});
					}});
				//}else{
				//	$.alert('你不是众筹成功艺人不能订购');
				//}
			}
			function selectQuality(num){
				quality=num;
				$("#_price").find("a").removeClass('on');
				$("#_price").find("a[quality='"+quality+"']").addClass('on');
			}
			function selectCity(num){
				city=num;
				$("#_city").find("a").removeClass('on');
				$("#_city").find("a[city='"+city+"']").addClass('on');
			}
			var quality;
			var city;
			function order(id){
				if($("#_checkbox").attr('checked')!='checked'){
					$.alert('请选择同意条款');
					return;
				}
				$.uiwidget.popupHide({id:'popUpBox'});
				var action = "/agency/order.action";
				$.ajaxData(action, {id:id,quality:quality,city:city}, {
					success : function(r) {
						$.alert("下单成功","success");
					}
				});
			}
			
	</script>
    <script type="text/javascript" src="http://res0.idol.yystatic.com/agency/??js/agency/jquery.switchable[all].min.js,js/agency/video.Photo.js,js/agency/index.js?20150428"></script>
<script type="text/javascript">

$(function(){
 	var video = videoPlayer(".video-item");
 	//图片
 	<c:forEach var="item" items="${companyCaseList }" varStatus="s">
 		<c:if test="${item.type eq 1}">
 			var photos${item.case_id}=[];
 		</c:if>
	</c:forEach>
 	
	
	
 	<c:forEach var="item" items="${companyCasePics }" varStatus="s">
 		photos${item.case_id}.push({info:'${item.content}',img:'${item.picture_url}'});
	</c:forEach>
	
	params={};
 	<c:forEach var="item" items="${companyCaseList }" varStatus="s">
 		<c:if test="${item.type eq 1}">
 		params['param${item.case_id}']={
	 				title:'${item.title}',
	 				time:'${fn:substring(item.record_time,0,10) }',
	 				photos:photos${item.case_id}
	 		};
 		</c:if>
	</c:forEach>
	
	photoPlayer(".photo-item",params);
 })
</script>

<%@ include file="/WEB-INF/jsp/commons/footer.jsp" %>
<script>
//登录成功回调
loginCfg.loginCallBack=loginCfg.logoutCallBack = function() {
	location.reload();
};
</script>