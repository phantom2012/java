var singers = getMap();

function selectAnchor(obj,isAdd) {
	$(obj).remove();
	var id = $(obj).attr('data-id');
    var name = $(obj).text();
    var flag = isAdd==0? 1 : 0;
	var html = '<button class="girl-cell" data-id="'+id+'" onclick="selectAnchor(this,'+flag+')">'+name+'</button>';;
	if(isAdd == 0) {
		singers.remove(id);
		$('#member_new').append(html);
	} else {
		singers.put(id,id);
		$('#member_old').append(html);
	}
}

function videoDel(id){
    $.ajax({
        type : "POST",
        data : {
           "vid":id
        },
        url:"/admin/videoDel.action",
        dataType:"json",
        success:function(data){
        	if (data.code != '0') {
        		$("#li_"+id).remove();
				showMessage('删除成功!');
			}
        }
    });
}

function videoRead(uid,id){
	$.ajax({
	      type : "get",
	      url : "/admin/videoRead.action",
	      data : "vid=" + id+"&uid="+uid,
	      async : false,
	      dataType:"json",
	      success : function(data){
	    	  video = data.data;
	    	  if (video) {
	    		 $('#thumb').attr('src',getRandomYYStaticPath(video.thumb));
	    		 if(video.thumb2 && video.thumb2!=''){
	    			$('#thumb2').attr('src',getRandomYYStaticPath(video.thumb2));
	    			$('#div_thumb2').show(); 
	    		 }
	    		 if(video.thumb3 && video.thumb3!=''){
		    			$('#thumb3').attr('src',getRandomYYStaticPath(video.thumb3));
		    			$('#div_thumb3').show(); 
		    		 }
	    		 $('#duration').val(video.info.duration);
	    		 $('#name').val(video.name);
	    		 $('#description').val(video.description);
	    		 $('#pc_video_url').text(video.url);
	    		 $('#mobile_video_url').text(video.mobile_url);
			 $('#photoFile').val('');
			 $('#photo2File').val('');
			 $('#photo3File').val('');
	    		 var members = video.members; 
	    		 var html = '';
		    	 for(var p in members){  
		    		 singers.put(p,p);
					 html += '<button class="girl-cell" onclick="selectAnchor(this,0)" data-id="'+p+'">'+members[p]+'</button>';  
		    	 }
		    	 $('#member_old').html(html);
		    	 html = '';
		    	 var others = video.others;
		    	 for(var p in others){
					html += '<button class="girl-cell" onclick="selectAnchor(this,1)" data-id="'+p+'">'+others[p]+'</button>';    		 
		    	 }
		    	 $('#member_new').html(html);
		    	 $('#vid').val(id);
		    	 $('#videoEditModal').modal();
	    	  }
	      }
	 });
}

function videoEdit(){
	var options = {
        url : '/admin/videoEdit.action',
        async: true,
        dataType: 'json',
        type : 'POST',
        contentType : "application/x-www-form-urlencoded; charset=utf-8",
        success : function(data){
           if(data.code != '0'){
           		showMessage('修改成功!');
           	    $('#videoEditModal').modal('hide');
           }
        },
        error : function(e){
           showMessage('系统异常');
        }
    };
	$('#videoEditForm').ajaxSubmit(options);
}


function videoFormValid(){
	var photoFile = $('#photoFile').val();
	var pcurl = $('#pcurl').val();
	var mobileurl = $('#mobileurl').val();
	var name = $('#name').val();
	var duration = $('#duration').val();
	var description = $('#description').val();
	if( !pcurl ||!mobileurl || !photoFile  || !name || !duration || !description){
		showMessage('带*号为必填项请选择!');
		return false;
	}
	return true;
}


function videoAdd() {
	var options = {
        url : '/admin/videoUpAdd.action',
        async: true,
        dataType: 'json',
        type : 'POST',
        contentType : "application/x-www-form-urlencoded; charset=utf-8",
        success : function(data){
        	hideLoading();
           if(data.result != '0'){
        	  showMessage('添加成功!');
        	  location.href = '/admin/videoIndex.action?t='+new Date().getTime();
           }else{
        	  showMessage(data.data);
           }
           
        },
        error : function(e){
        	showMessage('系统异常');
        }
    };
	if (videoFormValid()) {
		showLoading();
		$('#videoForm').ajaxSubmit(options);
	}
}

function videoUpload(form,successFun){
	var options = {
	        url : '/admin/uploadVideo.action',
	        async: true,
	        dataType: 'json',
	        type : 'POST',
            contentType : "application/x-www-form-urlencoded; charset=utf-8",
	        success : function(data){
	           if(data.result == '0'){
	        	   successFun(data);
	           }else{
	        	   showMessage(data.msg);
	           }
	           
	        },
	        error : function(e){
	        	showMessage('系统异常');
	        }
	 };
	$(form).ajaxSubmit(options);
}

function playvideo(url){
	var floatwin = checkDom();
	var floatBg =  floatwin.floatBg;
	var floatWarp = floatwin.floatWarp;
	
	if ($("#jquery_jplayer_1").size()){
        $("#jquery_jplayer_1").jPlayer("setMedia", {
			m4v: url
			//m4v: "http://godmusic.bs2dl.yy.com/godmusic_1408431029352_h264.mp4"
		}).jPlayer("play");
	}else{
		var _html = [
		    createShowTitle(),
			createShowBox(),
			createShowBottom()
		].join("");
		floatWarp.html(_html);
		$("#jquery_jplayer_1").jPlayer({
			ready: function () {
				$(this).jPlayer("setMedia", {
					m4v: url
				}).jPlayer("play");
			},
			swfPath: "http://res.tvbar.yystatic.com/tvbar/swf/Jplayer.swf",
			supplied: "m4v",
			size: {
				width: "800px",
				height: "450px",
				cssClass: "jp-video-450p"
			},
			smoothPlayBar: true,
			keyEnabled: true
		});
	}
	floatBg.show();
	floatWarp.fadeIn(500);
	$('#float-close-btn').click(function(){
		closeFloat();
	})
}

function createShowBox(){
	return [
		'<div id="jp_container_1" class="jp-video">',
           ' <div class="jp-type-single">',
                '<div id="jquery_jplayer_1" class="jp-jplayer"></div>',
                '<div class="jp-gui">',
                    '<div class="jp-video-play">',
                       ' <a href="javascript:;" class="jp-video-play-icon" tabindex="1">play</a>',
                    '</div>',
                    '<div class="jp-interface">',
                        '<div class="jp-progress">',
                           ' <div class="jp-seek-bar">',
                                '<div class="jp-play-bar"></div>',
                            '</div>',
                        '</div>',
                        '<div class="jp-time">',
                            '<span class="jp-current-time"></span><span class="jp-duration"></span>',
                        '</div>',
                        '<div class="jp-controls-holder">',
                            '<ul class="jp-controls">',
                                '<li><a href="javascript:;" class="jp-play" tabindex="1">play</a></li>',
                                '<li><a href="javascript:;" class="jp-pause" tabindex="1">pause</a></li>',
                                '<li><a href="javascript:;" class="jp-mute" tabindex="1" title="mute">mute</a></li>',
                                '<li><a href="javascript:;" class="jp-unmute" tabindex="1" title="unmute">unmute</a></li>',
                            '</ul>',
                            '<div class="jp-volume-bar">',
                                '<div class="jp-volume-bar-value"></div>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>',
	   	'</div>'
	].join("");
}

function createShowTitle(){
	return [
		'<div class="float-title">',
            '<a href="javascript:void(0);" id="float-close-btn"></a>',
            '<div class="float-title-content"><span class="float-title-type">视频测验：</span><span class="float-title-text">视频测验</span><span class="float-title-time"></span></div>',
        '</div>'
	].join("");
}

function createShowBottom(){
	return [
		'<div class="float-bottom">',
			'<a class="btn-zan" _type="1" _id="{id}" _zan="{zan}" href="javascript:void(0);" >1</a>',
			'<div class="share-view">',
				'<dl>',
					'<dt>分享给好友</dt>',
					'<dd><a class="share-btn share-weibo" title="1931女子偶像组合 {type}" href="javascript:void(0);"></a></dd>',
					'<dd><a class="share-btn share-qzone" title="1931女子偶像组合 {type}" href="javascript:void(0);"></a></dd>',
				'</dl>',
			'</div>',
		'</div>'
	].join("");
}
function checkDom(){
	var floatBg = $("#floatBg");
	var floatWarp = $("#float-warp");
	
	if (!floatBg.size()){
		$("body").append('<div id="floatBg"></div>');
		floatBg = $("#floatBg");
	}
	
	if (!floatWarp.size()){
		$("body").append('<div id="float-warp"></div>');
		floatWarp = $("#float-warp");
	}
	return {
		"floatBg" : floatBg,
		"floatWarp" : floatWarp
	};
}

function closeFloat(){
	$("#float-warp").fadeOut(500,function(){
		if ($("#jquery_jplayer_1").size()){
			$("#jquery_jplayer_1").jPlayer("stop");
		}
		
		if ($("#photoshowbox").size()){
			photo.colseCallBack();
		}
		
		$("#floatBg").hide();
	});
}


