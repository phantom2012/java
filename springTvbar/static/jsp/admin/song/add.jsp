<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>偶像成长后台</title>
	<meta charset="UTF-8" />
	<%@ include file="../../commons/taglibs.jsp"%>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="stylesheet" href="/lib/bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" href="/lib/bootstrap/css/bootstrap-responsive.min.css" />
	<link rel="stylesheet" href="/lib/bootstrap/css/colorpicker.css" />
	<link rel="stylesheet" href="/lib/bootstrap/css/datepicker.css" />
	<link rel="stylesheet" href="/lib/bootstrap/css/uniform.css" />
	<link rel="stylesheet" href="/lib/bootstrap/css/select2.css" />
	<link rel="stylesheet" href="/lib/bootstrap/css/unicorn.main.css" />
	<link rel="stylesheet" href="/lib/bootstrap/css/unicorn.grey.css" class="skin-color" />
	<link rel="stylesheet" href="/css/admin/style.css" class="skin-color" />
	<link rel="stylesheet" href="/css/admin/videoPlay.css" class="skin-color" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<style type="text/css">
	#floatBg{ position:fixed; _position:absolute; display:none; z-index:1000; top:0px; left:0px; width: 100%; height: 100%; background-color:rgb(0, 0, 0);filter:alpha(opacity=50); opacity:0.5;}
		#float-warp{
	position:fixed;_position:absolute; display:none; z-index:1001; width:820px; top:50%; left:50%; margin: -315px 0 0 -410px; background:#000;
}

#float-warp.float-warp-w1000{
	width:1000px; margin-left:-500px;
}

#focus_box{ width:100%; height:370px; overflow:hidden#; position:relative;}
#focus_box .focus_item{ position:absolute; top:0px; left:0px; display:none;}
#focus_box .focus_item.first{ display:block;}
#focus_box .focus_item img{ width:1000px; height:370px;}
#focus_box #focus_sel { position:absolute; bottom:15px; width:1000px; height:12px; font-size:0px; line-height:0px; text-align:center; overflow:hidden;}
#focus_box #focus_sel span{ display:inline-block; margin:0px 3px; width:10px; height:10px; vertical-align:text-top; border: solid 1px #777; background:#fff;filter:Alpha(opacity=50); opacity:0.5; border-radius:2px; cursor:pointer;}
#focus_box #focus_sel span.action{border: solid 1px #fa86a9; background:#f29dba; filter:Alpha(opacity=100); opacity:1;}

#float-warp .float-title { height:50px;}
#float-warp .float-title #float-close-btn {float:right; display: block;  width: 50px; height: 50px; background: url("http://res.agency.yystatic.com/agency/images/1931v2/closebg_05f6735.png") center center no-repeat #404040;  cursor: pointer;}

#float-warp .float-title .float-title-content { padding:5px 0 0 15px; font-size:24px; line-height:40px; font-family:"Microsoft YaHei", "\5fae\8f6f\96c5\9ed1";}
#float-warp .float-title .float-title-content .float-title-type { color:#ff7200;}
#float-warp .float-title .float-title-content .float-title-text { color:#fff;}
#float-warp .float-title .float-title-content .float-title-time { font-size:12px; font-family:"Arial"; color:#747474; margin-left:10px;}

#float-warp .float-bottom { padding:0px 20px;}
#float-warp .float-bottom{ margin-top:10px; height:80px;}
#float-warp .float-bottom .btn-zan{ float:left; padding:45px 16px 0; color:#ff5f9d; font-size:22px; text-align:center; font-family:"Arial"; background:url(http://res0.agency.yystatic.com/agency/images/1931v2/zanbg_79f4f16.png) no-repeat center 5px;}
#float-warp .float-bottom .btn-zan:hover{ text-decoration:none; background-position:center -95px}

#float-warp .float-bottom .share-view{ float:right; margin-top:25px; width:300px;}
#float-warp .float-bottom .share-view dl{ float:right}
#float-warp .float-bottom .share-view dl dt{ float:left; font-family:"Microsoft YaHei", "\5fae\8f6f\96c5\9ed1"; font-size:14px;}
#float-warp .float-bottom .share-view dl dd{ float:left; margin-left:15px;}

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
			<a href="/admin/songIndex.action" class="tip-bottom">歌曲管理</a> <a href="#" class="current">歌曲-新增</a>
		</div>
		<div class="container-fluid">
			<div class="row-fluid">
				<div class="span12">
					<div class="widget-box">
						<div class="widget-title">
							<span class="icon">
								<i class="icon-facetime-video"></i>
							</span>
							<h5>请先上传歌曲</h5>
						</div>
						<div class="widget-content nopadding">


							 <form id="pcvideoForm" name="pcvideoForm" enctype="multipart/form-data" class="form-horizontal">
								<div class="control-group">
									<label class="control-label">PC歌曲</label>
									<div class="controls">
										<input id="pcvideo" name="zcaudio" type="file" /><font color='red'>*</font>
									</div>
									<div class="controls">
										<button type="button" class="btn btn-primary" id='pc_add'>上传</button>
										<button type="reset" class="btn btn-primary " id="pcres">重置</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div class="row-fluid">
				<div class="span12">
					<div class="widget-box">
						<div class="widget-title">
							<span class="icon">
								<i class="icon-facetime-video"></i>
							</span>
							<h5>添加歌曲</h5>
						</div>
						<div class="widget-content nopadding">
							<form id="videoForm" name="videoForm" enctype="multipart/form-data" class="form-horizontal">
								<input type="hidden" name="members" id="members" value=""/>
								<input type="hidden" name="filesize" id="filesize" value=""/>
								<div class="control-group">
									<label class="control-label">pc歌曲地址</label>
									<div class="controls">
									<input type="text" name="url" id="pcurl" value="" readonly/>
									<button type="button" class="btn btn-primary" id="pcPreView">预览</button>
									<font color='red'>*</font>									</div>
								</div>
								<div class="form-actions">
									<button type="button" class="btn btn-primary" id='video_add_submit'>添加</button>
									<button type="reset" class="btn btn-primary">重置</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<!-- header start -->
			<%@ include file="../common/footer.jsp"%>
			<!-- header end -->

		</div>
	</div>
	<script src="/lib/bootstrap/js/jquery.min.js"></script>
	<script src="/js/jquery/jquery.form.js"></script>
	<script src="/lib/bootstrap/js/jquery.cookie.js"></script>
	<script src="/js/admin/global.js"></script>
	<script src="/lib/bootstrap/js/bootstrap.min.js"></script>
    <script src="/lib/bootstrap/js/unicorn.js"></script>
	<script src="/lib/bootstrap/js/jquery.bootstrap.teninedialog.min.js"></script>
	<script src="/js/json2.js"></script>
	<script src="/js/jquery/jquery.jplayer.min.js"></script>
	<script src="/js/admin/tools.js"></script>
	<script src="/js/admin/song.js"></script>
	<script type="text/javascript">
		$(function(){
			//添加pc歌曲
			$('#pc_add').on('click',function(){
			
				if (!$('#pcvideo').val()) {
					showMessage("请先选择歌曲");
					return;
				}
				var message = '确认上传pc歌曲?';
				showConfirmForm(message,uploadMusic,$('#pcvideoForm'),function(data){
					$('#pcurl').val(data.data.url);
					$('#filesize').val(data.data.size);
				});
			});
			//添加mobile歌曲
			$('#mobile_add').on('click',function(){
				
				if (!$('#mobilevideo').val()) {
					showMessage("请先选择歌曲");
					return;
				}
				var message = '确认上传mobile歌曲?';
				
				showConfirmForm(message,uploadMusic,$('#mobilevideoForm'),function(data){
					$('#mobileurl').val(data.data.url);
				});
			});

		});
	</script>
</body>
</html>
