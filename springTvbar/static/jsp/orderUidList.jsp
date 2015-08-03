<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/commons/header.jsp"%>
<link rel="stylesheet" type="text/css"  href="http://res1.idol.yystatic.com/agency/css/agency/order.css?20150428" />
<div class="wrap">
        <div class="nav-con">
            <div class="title">欢迎你，<span id="nick"></span></div>
            <div class="user-info">
                <p><span>账户余额：</span><span class="money">${accountBalance-noSettlement.sum }</span><span>元</span></p>
                <p><span>冻结金额：</span><span class="money">${noSettlement.sum }</span><span>元</span></p>
               <!--  <a href="">提现</a> -->
            </div>
            <ul class="nav">
                <li style="width:166px"  <c:if test="${status eq null}">class="on"</c:if>><a href="/agency/queryServiceOrderList.action">所有订单<span>（${counts.all }）</span></a></li>
                <li style="width:166px" <c:if test="${fn:contains(status,',0,')}">class="on"</c:if>><a href="/agency/queryServiceOrderListByStaus.action?status=0">新订单<span>（${counts.status0 }）</span></a></li>
                <li style="width:166px" <c:if test="${fn:contains(status,',1,')}">class="on"</c:if>><a href="/agency/queryServiceOrderListByStaus.action?status=1">进行中<span>（${counts.status1 }）</span></a></li>
                <li style="width:166px" <c:if test="${fn:contains(status,',2,') or fn:contains(status,',5,')}">class="on"</c:if>><a href="/agency/queryServiceOrderListByStaus.action?status=2,5">待确认<span>（${counts.status2+counts.status5 }）</span></a></li>
                <li style="width:166px" <c:if test="${fn:contains(status,',3,')}">class="on"</c:if>><a href="/agency/queryServiceOrderListByStaus.action?status=3">已确认<span>（${counts.status3 }）</span></a></li>
                <li style="width:166px" <c:if test="${fn:contains(status,',4,')}">class="on"</c:if>><a href="/agency/queryServiceOrderListByStaus.action?status=4">争议订单<span>（${counts.status4 }）</span></a></li>
            </ul>
        </div>
        <style type="text/css">
        	.wrap .order-list ul li .order-info .order-end a{
        		margin:7px auto;
        		width:80px;
        	}
        	
        </style>
        <div class="order-list">
        	<div class="title"><p class="detail">服务详情</p><p class="last">交易操作</p><p>交易状态</p><p>价格</p></div>
            <ul>
            <c:forEach var="item" items="${orderList }" varStatus="s">
                <li>
                    <div class="title">
                       ${fn:substring(item.trade_time,0,10) }<span> 订单号：${item.order_id }</span>
                        <p class="user" style="text-decoration: none">${fn:escapeXml(item.company_name) }</p>
                        <a href="javascript:order.contact('${item.company_id }')"></a>
                    </div>
                    <div class="order-info">
                        <div class="info-1">
                            <img src="${item.picture }" style="width:112px;height:130px">
                            <div class="order-txt">
                                <p class="info-name">${fn:escapeXml(item.title) }</p>
                                <p>服务城市：<span id="city${s.index}"></span></p>
                                <p>服务类型：<span id="type${s.index}"></span></p>
                                <p>服务档次：<span>${item.describtion}</span></p>
                                <p id="smallContent${s.index}" style="display:-webkit-box">
                                    服务内容：
                                    <span>
                                    <c:choose>
                                    	<c:when test="${fn:length(item.content) lt 100 }">
                                    	${fn:escapeXml(item.content)}
                                    	</c:when>
                                    	<c:otherwise>
                                       ${fn:escapeXml(fn:substring(item.content,0,100)) }...<a href="javascript:" onclick="$('#smallContent${s.index}').toggle();$('#fullContent${s.index}').toggle();" >查看更多</a>
                                    	</c:otherwise>
                                    </c:choose>
                                    </span>
                                </p>
                                <p id="fullContent${s.index}" style="display:none;">
                                    服务内容：
                                    <span> 
                                       ${fn:escapeXml(item.content) }<a href="javascript:" onclick="$('#smallContent${s.index}').toggle();$('#fullContent${s.index}').toggle();" >收起更多</a>
                                    </span>
                                </p>
                            </div>
                            <div class="price"><p>${item.real_price }</p></div>
                            <div class="order-status">
                                <p>
						           <c:choose>
						           	<c:when test="${item.status eq -1}">已取消订单</c:when>
						           	<c:when test="${item.status eq 0}">新订单</c:when>
						           	<c:when test="${item.status eq 1}">进行中</c:when>
						           	<c:when test="${item.status eq 2}">待确认</c:when>
						           	<c:when test="${item.status eq 3}">已确认</c:when>
						           	<c:when test="${item.status eq 4}">争议订单</c:when>
						           	<c:when test="${item.status eq 5}">待官方确认</c:when>
						           </c:choose>                     
                               </p>
                                <a href="javascript:order.queryHistory('${item.order_id }')">订单变更记录</a>
                            </div>
                             <div class="order-end"><table><tr><td>
                             <c:set var="startArbitration" value="true"/>
                             <c:choose>
                             	<c:when test="${-1 eq item.status }">
                             			<a href="javascript:void(0)">交易结束</a>
                             	</c:when>
                             	<c:when test="${0 eq item.status }">
                                	<a href="javascript:void(0)">待机构受理</a>
                                	<a href="javascript:order.cancelOrder('${item.order_id }')" class="arbitration-btn">取消订单</a>
                             	</c:when>
                             	<c:when test="${1 eq item.status }">
                             		<c:if test="${startArbitration }">
          		                   		<a href="javascript:order.arbitration('${item.order_id }')" class="download-btn">发起仲裁</a>
                             		</c:if>
                                	<a href="javascript:void(0)" >待上传作品</a>
                                	<c:if test="${item.has_record ne -1 }">
                                		 <a href="javascript:order.arbitrationResult('${item.order_id }')" class="arbitration-btn">仲裁结果</a>
                                	</c:if>
	                                <%-- <a href="javascript:order.arbitration('${item.order_id }')" class="ok-btn">发起仲裁</a> --%>
                             	</c:when>
                             	<c:when test="${2 eq item.status }">
                             		<c:if test="${startArbitration }">
          		                   		<a href="javascript:order.arbitration('${item.order_id }')" class="download-btn">发起仲裁</a>
                             		</c:if>
                             		<a href="javascript:order.browseWorks('${item.order_id }')" class="download-btn">作品下载</a>
	                                <a href="javascript:order.confirmOrder('${item.order_id }')"  class="ok-btn">确定收货</a>
	                                <!-- <p>（还剩6天12小时）</p> -->
<%-- 	                                <a href="javascript:order.arbitration('${item.order_id }')" class="ok-btn">发起仲裁</a>
	                               --%> 
                                	<c:if test="${item.has_record ne -1 }">
                                		 <a href="javascript:order.arbitrationResult('${item.order_id }')" class="arbitration-btn">仲裁结果</a>
                                	</c:if>
                            	</c:when>
                             	<c:when test="${3 eq item.status }">
                             	  <c:if test="${'' ne item.graded}">
                             	  <div class="basicComment1" style="margin-left:12px" data-average="${item.graded}" data-id="${item.order_id }"></div>
                             	  </c:if>
                             		<a href="javascript:order.browseWorks('${item.order_id }')" class="download-btn">作品下载</a>
	                              	<a href="javascript:" onclick="orderComment.getIdolComment(${item.order_id });" class="download-btn">评价</a>
                                	<!-- <p>（还剩6天12小时）</p> -->
	                                <a href="javascript:void(0)" >已完成</a>
	                                <c:if test="${item.has_record ne -1 }">
                                		 <a href="javascript:order.arbitrationResult('${item.order_id }')" class="arbitration-btn">仲裁结果</a>
                                	</c:if>
                             	</c:when>
                             	<c:when test="${4 eq item.status }">
                             		<c:if test="${item.has_work ne -1 }">
                                		 <a href="javascript:order.browseWorks('${item.order_id }')" class="download-btn">作品下载</a>
                                	</c:if>
	                                <a href="javascript:order.arbitration('${item.order_id }')" class="ok-btn">查看仲裁</a>
                           		</c:when>
                             	<c:when test="${5 eq item.status }">
                             		<c:if test="${startArbitration }">
          		                   		<a href="javascript:order.arbitration('${item.order_id }')" class="download-btn">发起仲裁</a>
                             		</c:if>
                             		<a href="javascript:void(0)" class="">待官方确认</a>
                             		<a href="javascript:order.browseWorks('${item.order_id }')" class="download-btn">作品下载</a>
                             		<c:if test="${item.has_record ne -1 }">
                                		 <a href="javascript:order.arbitrationResult('${item.order_id }')" class="arbitration-btn">仲裁结果</a>
                                	</c:if>
                             	</c:when>
                             </c:choose>
                             </td></tr></table></div>
                        </div>
                    </div>
                    <script type="text/javascript">
					$(document).ready(function(){
						$("#city${s.index}").html($.agencySelectFromCode('${item.order_city }','city','/'));
						$("#type${s.index}").html($.agencySelectFromCode('${item.type }','business','/'));
					});
					
					
			</script>
                </li>
                </c:forEach>
            </ul>
        </div>
    </div>
    <div id="popUpBox"></div>
    <script type="text/html" id="arbitrationResultBox">
	<!-- 仲裁结果 -->
	<@	
	var list0=[];
	var list1=[];
	for(var i=0;i<list.length;i++){
		if(list[i].owner_type=='0'){
			list0.push(list[i]);
		}else{
			list1.push(list[i]);
		}
	}
	@>
	<div class="popup-box w638" style="display:block;position: relative">
        <a href="javascript:void(0)" _id="close" class="close"></a>
        <div class="popup-title">仲裁结果</div>
        <div class="popup-content">
            <div class="arbitration">
                <div class="top-detail">
                    <p>订单编号：<@=id@></p>
                    <p class="sum">仲裁金额：<@=record.money@></p>
                    <p class="desc">仲裁说明：<@=record.result_desc@></p>
                    <p class="tab"><a _id="tab1" href="javascript:order.tab(1)">经纪公司仲裁材料</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a _id="tab0" href="javascript:order.tab(0)"  class="active">艺人仲裁材料</a></p>
                   <!--<a href="javascript:void(0)" _id="arbitrationConfirm" class="btn confirm">确认仲裁结果</a>-->
                </div>
               <table _id="show1" style="display:none">
                    <thead>
                        <tr>
                            <th width="125">*材料名称：</th>
                            <th width="236">*上传附件：</th>
                            <th width="126">操作</th>
                            <th>仲裁说明</th>
                        </tr>
                    </thead>
					<tbody>
						<@for(var i=0;i<list1.length;i++){@>
							<@=#order.templateHtml('addArbitrationTr2',list1[i])@>
						<@}@>
					</tbody>
				</table>
				<table _id="show0">
                    <thead>
                        <tr>
                            <th width="125">*材料名称：</th>
                            <th width="236">*上传附件：</th>
                            <th width="126">操作</th>
                            <th>仲裁说明</th>
                        </tr>
                    </thead>
					<tbody>
						<@for(var i=0;i<list0.length;i++){@>
							<@=#order.templateHtml('addArbitrationTr2',list0[i])@>
						<@}@>
					</tbody>
				</table>
            </div>
        </div>
    </div>
	</script>
    <script type="text/html" id="addArbitrationTr2">
	<!-- 仲裁申请对方 tr -->
 			<tr>
                            <td><textarea readonly="readonly" name="" class="inputname"><@=info_name@> </textarea></td>
                            <td colspan="2">
                                <p><a href="<@=info_link@>" class="download">下载</a></p>
                            </td>
                             <td><textarea readonly="readonly" name="" class="remark"><@=info_desc@></textarea></td>
                        </tr>
	</script>
    <script type="text/html" id="addArbitrationTr">
	<!-- 仲裁申请new tr -->
 						<tr>
                            <td><textarea check="notBlank" msg="请填写材料名称" name="info_name" class="inputname"><@=info_name@></textarea></td>
                            <td>
                                <p class="uploadcon"><img src="http://res1.idol.yystatic.com/agency/images/agency/upload3.png" alt="" onclick="order.uploadArbitrationFile(this,'<@=id@>')">
								<input value="<@=info_link@>" check="notBlank" msg="请上传附件" type="hidden" name="info_link"/>
								<input value="<@=info_id@>"  type="hidden" name="info_id"/>
								</p>
                                <p>仅限zip、rar </p>
                            </td>
                            <td>
                                <p><span style="cursor:pointer" onclick="javascript:order.deleteArbitrationFile(this,'<@=info_id@>')" class="delete">删除</span></p>
                                <p><a href="javascript:order.newArbitrationFile()" class="add">新增</a></p>
                                <@if(info_link){@>
								<p><a href="<@=info_link@>" class="add">下载</a></p>
                                <@}@>
                            </td>
                            <td><textarea check="notBlank" msg="请填写仲裁说明"  name="info_desc" class="remark"><@=info_desc@></textarea></td>
                        </tr>
	</script>
    <script type="text/html" id="arbitrationBox">
	<!-- 仲裁申请 -->
	<@	
	var list0=[];
	var list1=[];
	for(var i=0;i<list.length;i++){
		if(list[i].owner_type=='0'){
			list0.push(list[i]);
		}else{
			list1.push(list[i]);
		}
	}
	@>
	<div class="popup-box w638" style="display:block;position: relative">
		<span style="cursor:pointer;" onclick='order.newArbitrationFile()' _id="add0" class="submit">新增</span>
        <a href="javascript:void(0)" class="close" _id="arbitrationClose"></a>
        <div class="popup-title">仲裁申请</div>
        <div class="popup-content">
            <div class="arbitration">
                <div class="top-detail">
                    <p>订单编号：<@=id@></p>
                    <p class="tab"><a _id="tab1" href="javascript:order.tab(1)">经纪公司仲裁材料</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a _id="tab0" href="javascript:order.tab(0)"  class="active">艺人仲裁材料</a></p>
                </div>
				 <table _id="show1" style="display:none">
                    <thead>
                        <tr>
                            <th width="125">*材料名称：</th>
                            <th width="236">*上传附件：</th>
                            <th width="126">操作</th>
                            <th>仲裁说明</th>
                        </tr>
                    </thead>
					<tbody>
						<@for(var i=0;i<list1.length;i++){@>
							<@=#order.templateHtml('addArbitrationTr2',list1[i])@>
						<@}@>
					</tbody>
				</table>
				<form _id="show0" id="arbitrationForm" action="/agency/uploadArbitrationUids.action?id=<@=id@>" method="post"> 
                <table>
                    <thead>
                        <tr>
                            <th width="125">*材料名称：</th>
                            <th width="236">*上传附件：</th>
                            <th width="126">操作</th>
                            <th>仲裁说明</th>
                        </tr>
                    </thead>
					<tbody _id='new'>
					<@if(list0.length==0){@>
						<@=#order.templateHtml('addArbitrationTr')@>
					<@}@>
                    </tbody>
					<@if(list0.length!=0){@>
                    <tbody _id='old'>
                        <tr>
                            <td colspan="5" class="state">已上传 </td>
                        </tr>
					<@for(var i=0;i<list0.length;i++){@>
						<@=#order.templateHtml('addArbitrationTr',list0[i])@>
					<@}@>
					<@}@>
                    </tbody>
                </table>
                <p class="submit-con"><a _id="arbitrationClose" href="javascript:void(0)" class="btn gray">取消</a><a _id="arbitrationComplete" href="javascript:void(0)" class="btn orange">确定</a></p>
				</form>            
			</div>
        </div>
    </div>
	</script>
    <script type="text/html" id="browseBox">
	<!-- 作品浏览 -->
    <div class="popup-box w638" style="display:block;position: relative">
          <a href="javascript:void(0)" class="close" _id="close"></a>
        <div class="popup-title">作品浏览</div>
        <div class="popup-content">
            <div class="worksbrowse">
                <table>
                    <thead>
                        <tr>
                            <th width="125">作品名称：</th>
                            <th width="236">作品描述：</th>
                            <th width="126">下载作品</th>
                            <th>备注</th>
                        </tr>
                    </thead>
                    <tbody>
						<@if(list.length==0){@>
							<tr><td colspan="4">无作品</td></tr>
						<@}@>
						<@for(var i=0;i<list.length;i++){@>
                        <tr>
                            <td><div class="name"><@=list[i].work_name@></div></td>
                            <td><div class="desc"><@=list[i].work_desc@></div></td>
                            <td>
                                <p><a href="<@=list[i].work_link@>" class="download">下载</a></p>
                                <!--<p class="count"><span>200M</span> / 1G</p>-->
                            </td>
                             <td><div class="remark"><@=list[i].work_remark@></div></td>
                        </tr>
						<@}@>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
	</script>
    <script type="text/javascript"
		src="http://res2.idol.yystatic.com/agency/js/agency/order/orderUidList.js?20150428"></script>
	<script>
	var order=new com.yy.agency.OrderUidList();
	order.init();
	</script>
	<%@ include file="/WEB-INF/jsp/comment/orderUidListComment.jsp"%>
<%@ include file="/WEB-INF/jsp/commons/footer.jsp"%>
