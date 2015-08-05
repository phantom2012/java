<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/commons/header.jsp" %>
<link rel="stylesheet" type="text/css" href="http://res1.idol.yystatic.com/agency/css/agency/merge.css?201506051135">
<script type="text/html" id="servicetype_item_template">
<a href="javascript:void(0);" data-type="0" onclick="" class="on">全部<i></i></a>
<@for(var i = 0 ; i < list.length ; i++){@>
  <a href="javascript:void(0);" data-type="<@=list[i].c@>" onclick="" ><@=list[i].n@><i></i></a>
<@}@>
</script>
<script type="text/javascript" src="http://res1.idol.yystatic.com/agency/js/??agency/home.js,commons/common.js"></script>
    <div class="mg-title">
		<h1>专业机构服务平台</h1>
		<p>为您提供最专业的音乐制作服务</p>
	</div>
	<div class="nav-con" id="serviceType">
		<!-- <a href="javascript:void(0);" class="on">全部<i></i></a>
		<a href="javascript:void(0);" >音乐制作<i></i></a>
		<a href="javascript:void(0);" >造型设计<i></i></a> -->
	</div>
	<script type="text/javascript">
	var homeHandler = new com.yy.agency.Home() ;
	homeHandler.init() ;
	</script>
	<div class="wrap">
		<div class="mg-main" id="mainBody">
		
		<c:forEach items="${companyInfoList}" var="item" varStatus="s">
			<div  class="mg-list" data-type="${item.business_range}" style="cursor:pointer" onclick="toCompany('${item.company_id }')">
				<img style="width:320px;height:220px;-webkit-user-select:none;" src="${item.index_pic }" >
<%-- 				<a href="/agency/classicalCaseList.action?id=${item.company_id }" class="example-btn">了解案例</a>
 --%>				<div class="mg-section1">
					<div class="mg-top">
						<img src="${item.log_pic }" alt="" style="width:48px;height:41px;">
						<div class="mg-msg">
							<p class="mg-p1" title="${fn:escapeXml(item.company_name)}">
							<c:choose>
							  <c:when test="${fn:length(item.company_name) > 7}">${fn:escapeXml(fn:substring(item.company_name ,0 ,7)) }...</c:when>
							  <c:otherwise>${fn:escapeXml(item.company_name)}</c:otherwise>
							</c:choose>						
							</p>
							<p class="mg-p2" _id="city">${item.service_city }</p>
						</div>
						<%-- <a href="/agency/htmlized/home/company_${item.company_id }.html" class="go-index">机构主页</a> --%>
					</div>
					<div class="mg-bottom">
						<p class="mg-p3" _id="business">${item.business_range }</p>
						<p class="mg-p4">近30天订购数<span>${item.total }</span></p>
					</div>
				</div>
				<div class="mg-section2">
					<p>合作艺人</p>	
					<p class="mg-p5" title="${fn:replace(item.contractors,',','/')}" style="overflow:hidden;height:36px">
					 ${fn:replace(item.contractors,',','/')}   				
	    			</p>	    		
				</div>
			</div>
		</c:forEach>
		
			<script type="text/javascript">
				$("[_id='city']").each(function(){
					var $this=$(this);
					$this.html($.agencySelectFromCode($this.html(),'city','/'))
				});
				$("[_id='business']").each(function(){
					var $this=$(this);
					var htmlStr = $.agencySelectFromCode($this.html(),'business','/') ;
					$this.html(htmlStr)
					$this.attr("title" , htmlStr) ;
				});
				function toCompany(id){
					location.href='/agency/htmlized/home/company_'+id+'.html';
				}				
				!function(){
					try{
						var $mgp5 = $(".mg-section2 p.mg-p5") ;
						var mgp5width =  $mgp5.width();
						var fontSize =  $mgp5.css("font-size").substring(0,$mgp5.css("font-size").indexOf("px")) ;					
						var mgp5height = $mgp5.height() ;
						var mgp5lineHeight = $mgp5.css("line-height").substring(0,$mgp5.css("line-height").indexOf("px"))
						//算出可以放多少个中英文字
						var counts = Math.floor(mgp5width/fontSize*mgp5height/mgp5lineHeight) ;						
						$mgp5.each(function(i ,item){
							var $this=$(this);							
							var htmlStr = $this.text().trim() ;						
							var strLen =  strLength3(htmlStr , counts) ;							
							if(htmlStr.length > strLen ){
								var htmlStr = htmlStr.substring(0,strLen) ;
								$this.text(htmlStr.substring(0 ,htmlStr.lastIndexOf("/"))) ;		
							}									
						});
					}
					catch(e){
						
					}	
				}();						
			</script>
		</div>
	</div>
<%@ include file="/WEB-INF/jsp/commons/footer.jsp" %>
