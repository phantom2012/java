<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>偶像成长后台</title>
		<meta charset="UTF-8" />
		<%@ include file="../../commons/taglibs.jsp"%>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="/lib/bootstrap/css/bootstrap.min.css" />
		<link rel="stylesheet" href="/lib/bootstrap/css/bootstrap-responsive.min.css" />
		<link rel="stylesheet" href="/lib/bootstrap/css/uniform.css" />
		<link rel="stylesheet" href="/lib/bootstrap/css/select2.css" />
		<link rel="stylesheet" href="/lib/bootstrap/css/unicorn.main.css" />
		<link rel="stylesheet" href="/lib/bootstrap/css/unicorn.grey.css" class="skin-color" />
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>
		<style>
			.pagination ul{
				display:block;
				text-align:center;
			}
			.pagination ul>li{
				display:inline-block;
			}
		</style>
	</head>
<body>
	
	<!-- header start -->
       <%@ include file="../common/header.jsp"%>
       <!-- header end -->
        
	<!-- sidebar start -->        
       <%@ include file="../common/sidebar.jsp"%>
	<!-- sidebar end -->        
	
	<div id="content">
		<div id="breadcrumb">
			<!-- <a href="#" title="Go to Home" class="tip-bottom"><i class="icon-home"></i> Home</a> -->
			<a href="#">偶像成长后台</a>
			<a href="#" class="current">视频管理</a>
		</div>
		<div class="container-fluid">
			<div class="row-fluid">
				<div class="span12">
					<div class="widget-box">
						<div class="widget-title">
							<span class="icon">
								<i class="icon-facetime-video"></i>
							</span>
							<h5>视频列表</h5>
							<div class="buttons">
								<a href="/admin/videoNew.action" class="btn btn-mini" title="Icon Title"><i class="icon-plus"></i>新增</a>
							</div>
						</div>
						<div class="widget-content">
						    <div>
								<input type="checkbox" id='all' value='all' name='singer'/>全部
								<c:forEach items="${members}" var="member">
						   			<input type="checkbox" id='${member.id}' value='${member.id}' name='singer'/>${member.name}
						   		</c:forEach>
								<br/><br/>
								<span>您当前选择的选手：<font color="blue">${singerName}</font></span>
							</div>
							<br/>
							<ul class="thumbnails">
								<c:forEach var="video" items="${videos}" varStatus="status">
									<li class="span2" id="li_${video.id}">
										<a href="#" class="thumbnail">
											<img src="${util:hashImgPath(video.thumb)}" alt="" style="width:230px;height:230px"/>
										</a>
										<div class="actions">
											<a href="#" data-edit-uid="${video.uid}" data-edit-id="${video.id}" class=''><i class="icon-pencil icon-white"></i></a>
											<a title="" href="#" data-delete-id="${video.id}" data-delete-name='${video.name}'><i class="icon-remove icon-white"></i></a>
										</div>
									</li>
								</c:forEach> 
							</ul>
							<util:spilt pageSize="${size}" count="${total}" pageIndex="${page}" actionName="${url}"  displayNum="5" cssName="pagination alternate"></util:spilt>
						</div>
					</div>
				</div>
			</div>
			
			<div id="videoEditModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	            <div class="modal-header">
	                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
	                <h3 id="myModalLabel">视频修改</h3>
	            </div>
	            <div class="modal-body">
	                <div class="widget-content nopadding">
	                   <form id="videoEditForm" method="post" enctype="multipart/form-data">
	                       <input type="hidden" name="vid" id="vid" value=""/>
						   <input type="hidden" name="members" id="members" value=""/>
		               	   <div class="control-group">
								<div class="controls">
								&nbsp;封面(列表)<img src="" alt="" id="thumb" style="width:150px;height:100px"/>
							    </div>
								<div class="controls" id='div_thumb2' style='display:none'>
								&nbsp;封面(热推)<img src="" alt="" id="thumb2" style="width:150px;height:100px"/>
							    </div>
							    <div class="controls" id='div_thumb3' style='display:none'>
								&nbsp;封面(推广位)<img src="" alt="" id="thumb3" style="width:150px;height:100px"/>
							    </div>
							</div>
		               		<div class="control-group">
								<div class="controls">
								&nbsp;&nbsp;标题：<input type="text" name="name" id="name" value=''/>
								</div>
							</div>
							<div class="control-group">
								<div class="controls">
								&nbsp;&nbsp;时长：<input type="text" name="duration" id="duration" value=''/>
								</div>
							</div>
							<div class="control-group">
								<div class="controls">
								&nbsp;&nbsp;PC视频地址：<span id='pc_video_url'></span><br/>
								&nbsp;&nbsp;手机视频地址：<span id='mobile_video_url'></span>
								</div>
							</div>
							<div class="control-group">
								<div class="controls">
								&nbsp;&nbsp;封面(列表)：<input id="photoFile" name="photoFile" type="file" />
								</div>
							</div>
							<div class="control-group">
								<div class="controls">
								&nbsp;&nbsp;封面(热推)：<input id="photo2File" name="photo2File" type="file" />
								</div>
							</div>
							<div class="control-group">
								<div class="controls">
								&nbsp;&nbsp;封面(推广位)：<input id="photo3File" name="photo3File" type="file" />
								</div>
							</div>
							<div class="control-group">
								<div class="controls">
								&nbsp;&nbsp;简介：<textarea name="description" id="description"></textarea>
								</div>
							</div>
							<div class="control-group">
								<div class="controls">
									&nbsp;&nbsp;成员(<font color="red">置顶最好不超过3个</font>)：<div id='member_old'></div>
								</div>
							</div>
							<div class="control-group">
								<div class="controls">
									&nbsp;&nbsp;指定更多<div id='member_new'></div>
								</div>
							</div>
						</form>
	            	</div>
	            </div>
	            <div class="modal-footer">
	                <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
	                <button class="btn btn-primary" id='video_edit_submit'>保存</button>
	            </div>
            </div>
            
			<!-- header start -->
	        <%@ include file="../common/footer.jsp"%>
	        <!-- header end -->
			
		</div>
	</div>
    <script src="/js/jquery/jquery.min.js"></script>
    <script src="/js/jquery/jquery.form.js"></script>
	<script src="/lib/bootstrap/js/jquery.cookie.js"></script>
    <script src="/js/admin/global.js"></script>
	<script src="/lib/bootstrap/js/bootstrap.js"></script>
    <script src="/lib/bootstrap/js/unicorn.js"></script>
	<script src="/lib/bootstrap/js/jquery.bootstrap.teninedialog.min.js"></script>
    <script src="/js/commons/pathUtil.js"></script>
    <script src="/js/json2.js"></script>
    <script src="/js/admin/global.js"></script>
	<script src="/js/admin/tools.js"></script>
	<script src="/js/admin/video.js"></script>
    <script>
       	$(function(){
			$("a[data-delete-id]").on('click',function(){
				var id = $(this).attr('data-delete-id');
				var name = $(this).attr('data-delete-name');
				var message = '确认删除视频['+name+']?';
				showConfirm(message,videoDel,id);
       		});
			$("a[data-edit-id]").on('click',function(){
				singers = getMap();
				var id = $(this).attr('data-edit-id');
                var uid = $(this).attr('data-edit-uid');
				videoRead(uid,id);
       		});
			$('#video_edit_submit').on('click',function(){
				var ids = singers.vset();
				if (!ids) {
					showMessage("请选择成员!");
					return;
				}
				ids = ids.substring(1,ids.length);
				$('#members').val(ids);
				var message = '确认修改视频?';
				showConfirm(message,videoEdit);
			});
			$(":checkbox").click(function(){
				$("input[name='singer']").attr("checked",false);
				$(this).attr("checked",true);
				var id = $(this).attr('id');
				if(id=='all'){
					location.href="/admin/videoIndex.action";
				} else {
					location.href="/admin/videoIndex.action?prjId="+id
				}
			});
       	});
      </script>
</body>
</html>