var com = com||{}; com.yy = com.yy||{} ; com.yy.ent = com.yy.ent||{} ;
com.yy.ent.AgenService = function(){
	this.index = 0 ;
	this.pics = [] ;
	this.imgEditor;
	this.vedioEditor;
	this.toDelCaseList = [] ;
	this.isUpdate = false ;
} ;
!function(obj , $){ 	 
obj.prototype = {   
    init : function(){
	  //先append一个空的案例
      if($("#isFirstTime").val()==1){
    	  var e = {data:{context:this}} ;       
    	  this.appendCaseItem(e , 0) ;
      }      
	  this.initClassicCase() ;
	  var context = this ;
	  $("ul.nav li.canClick a").on("click" ,function(e){
		  //如果是点我的首页的话要判断机构的状态，如果是发布态的时候才能点击	    
	     if(comStatus!=4&&$(e.target).attr("data-href").indexOf("company.action")!=-1 ){
	    	 $.alert("发布后才能跳转我的首页！") ;
	    	 return ;
	     }	     
		  if(context.isUpdate){
				$.messagebox(
			    {
			      title:'跳转确认',//弹窗标题
			      type:'ask', //弹窗类型
			      msg:'尚未保存修改，跳转其他页面将会丢失当前修改，是否继续跳转？',//消息内容
			      buttons:"",//按钮配置
			      fn:function(o){//按钮回调函数
			    	  if(o.index == 0){
			    		  location.href = $(e.target).attr("data-href") ;				    		  
			    	  }	                                 
			      }
			    }) ;		
		  }
		  else{
				location.href = $(e.target).attr("data-href") ;		
		  }		  
	  }) ;
	  $("input , textarea").live("input" ,{context:this},this.checkForUpdate) ;
	  $("input , textarea").live("change" ,{context:this}, this.checkForUpdate) ;
	  $("input[name='record_time']").live("focus" ,{context:this}, this.checkForUpdate) ;	  
 } 
,
 checkForUpdate:function(e){
	  e.data.context.isUpdate = true ;	  
	  $("input , textarea").die("input").die("change");
	  $("input[name='record_time']").die("focus");	
}
,
initClassicCase : function(){
	    //填充剩余可以填多少字的提示
        $(this.pics).each(function(i , item){
        	  wordCount2($("textarea:[name='content']" ,$("#caseItemForm"+i))[0],200,'recomWordNotice'+i);
        	}) ;       
	    $("#saveCaseItemNext").on("click" ,	{context:this , obj : $("#saveCaseItemNext") , type:1} ,this.saveAndUpdateCaseItem) ;
	    $("#saveCaseItemPre").on("click" ,	{context:this,obj : $("#saveCaseItemPre") ,type:0} ,this.saveAndUpdateCaseItem) ;
	    $("#appendCaseItem").on("click" ,{context:this} ,this.appendCaseItem) ;
	    var context = this ;
	    KindEditor.ready(function(K) {
			var imgEditor = K.editor({
				allowFileManager : false,
			  uploadJson : post_url+'admin/uploadCaseFile.action'
			});
			var vedioEditor = K.editor({
				allowFileManager : false,			  
		        uploadJson : post_url+'admin/uploadCaseVedio.action'
		   });
		   context.imgEditor=imgEditor;
		   context.vedioEditor=vedioEditor;
		});
}
,
 singleImgHandler : function(index){
	 var imgEditor = this.imgEditor ;
	 var form =  $("#caseItemForm"+index) ;
	 var context = this ;
	 $("[name='J_selectVedio']" , form).removeClass('warning');
	 $("[name='J_selectImage']" , form).removeClass('warning');
	 $("[name='J_selectImages']" , form).removeClass('warning');
     imgEditor.loadPlugin('image', function() {
		   imgEditor.plugin.imageDialog({
				showRemote : false,
				clickFn : function(url, title, width, height, border, align) {
					context.isUpdate = true ;
					$("input:[name='head_pic_url']" , form ).val(url);
					$("input:[name='type']" , form).val(0);	
					imgEditor.hideDialog();		
					$("div:[name='J_selectImage'] .alUploadImg" , form).attr("src" , url ).show();
					$("div:[name='J_selectImage'] .upload-btn" , form).hide();
				// 如果是编辑状态下点击上传的话，要把插入到图片表中去，然后再更改form表单里面的picture_id的值 ，如果是新增状态下的话就不用这一步
				/*	var caseId = $("input:[name='case_id']" , form).val() ;
				    if(caseId && caseId != ""){					  
					   $.ajax (
			            {
						url: post_url+'admin/adminChangeAlbumImg.action',
						type:'post',
			            autoAlert:true,
						data:{case_id:caseId,url:url,type:$("input:[name='type']" , form).val(),picture_id:$("input:[name='picture_id']" , form).val()},
						dataType:'json',
						success:function(json){	
							
						}
					   }
				     );
				   }	*/			   
				}
			});
		});   	
}
,
multiImgHandler : function(index){
	var imgEditor = this.imgEditor ;
	var context = this ;
	var form =  $("#caseItemForm"+index) ;
	$("[name='J_selectVedio']" , form).removeClass('warning');
	$("[name='J_selectImage']" , form).removeClass('warning');
	$("[name='J_selectImages']" , form).removeClass('warning');
	imgEditor.loadPlugin('multiimage', function() {		
		var caseId = $("input:[name='case_id']" , form).val() ;
		  //如果caseId不为空，上传图片的时候就带上caseId
		  /*if(caseId && caseId != ""){
			 var reqParam = {caseId:caseId} ;
		  }	*/	  
		imgEditor.plugin.multiImageDialog({
		  //reqParam : reqParam ,	
		  initImgUrls:context.pics[index],
		  clickFn : function(urlList) {
				context.isUpdate = true ;
			  	var div = $('#albums');
				div.html('');
				imgEditor.hideDialog();
				if(urlList.length > 0){
					$("input:[name='type']" , form).val(1);	
				}
				context.pics[index].length=0;				
				$("input:[name='pic_urls']" , form).remove();
				$(urlList).each(function(i,item){																		
				 context.pics[index].push({url:item.url,id:item.id});
				 form.append('<input type="hidden" name="pic_urls" value="'+item.url+'" />') ;
			    });	
				//如果没有设置封面的话，就默认拿第一张图片
			   if(urlList.length > 0 && $("input:[name='head_pic_url']" , form).val() == "" ){						
				$("input:[name='head_pic_url']" , form).val(urlList[0].url);
				$("input:[name='picture_id']" , form).val(urlList[0].id) ;	
				$("div:[name='J_selectImages'] .alUploadImg" , form).attr("src" , urlList[0].url).show();
				$("div:[name='J_selectImages'] .upload-btn" , form).hide();	
				//如果caseId 存在的话 就要换图片
			     /* if(caseId && caseId != ""){				   
		          $.ajax(
		            {
					url: post_url+'admin/adminChangeAlbumImg.action',
					type:'post',
		            autoAlert:true,
		            data:{case_id:caseId,url:urlList[0].url,type:$("input:[name='type']" , form).val(),picture_id:urlList[0].id},
					dataType:'json',
					success:function(json){	
		            	if(json.result == 0){
		            		 $("input:[name='picture_id']" , form).val(urlList[0].id) ;	
		            	}		            	
					}
				   }
			     );
		     }	 */
			}
			//如果图片都删完的话就显示+
			if(urlList.length == 0){
				$("input:[name='head_pic_url']" , form).val("");
				$("input:[name='picture_id']" , form).val("") ;	
	 			$("div:[name='J_selectImages'] .alUploadImg" , form).hide();
	 			$("div:[name='J_selectImages'] .upload-btn" , form).show(); 
			}			
			}
		,
		//urlData 就是上传完之后服务返回给客户端的json字符串
		removeFn : function(url ,data){
			   context.isUpdate = true ;
			   //删掉的时候把图集的数组中的某一个元素也删掉
			   var isAlbum = (url == $("input:[name='head_pic_url']" , form).val()) ;			 	   
			   //if(caseId && caseId != ""){
			   var albumId = -1 ;		   
	    	   var arr = context.pics[index] ;
	    	   if(arr.length > 0 ){
	    		   context.removePic(arr , url) ;
	    		  if(isAlbum){
	    		   if(arr.length > 0){
					   albumId = arr[0].id ;
					   $("input:[name='head_pic_url']" , form).val(arr[0].url);
					   $("input:[name='picture_id']" , form).val(arr[0].id) ;	
					   $("div:[name='J_selectImages'] .alUploadImg" , form).attr("src" , arr[0].url).show();
					   $("div:[name='J_selectImages'] .upload-btn" , form).hide();	
				   }
				   else{
					   $("input:[name='head_pic_url']" , form).val("") ;
				   }						   
	    	      }			  
				   } 
				   /*  $.ajax(
				            {
							url: post_url+'admin/adminDelCaseImg.action',
							type:'post',
				            autoAlert:true,
							data:{picture_id:data.id ,  albumId : albumId ,case_id:caseId},
							dataType:'json',
							success:function(json){	
								if(json.result == 0){
									//如果删掉的是封面图片就置封面图片为空
								      if(url == $("input:[name='head_pic_url']" , form).val() ){
								    	   $("input:[name='head_pic_url']" , form).val("") ;
								    	   //如果更改了封面id
								    	   if(albumId != -1){
								    		   $("input:[name='picture_id']" , form).val(albumId) ;	
								    	   }								    	   
								       }	
								}								
							}
						   }
					     ); */
			   /* }
			    else{
			    	//如果删掉的是封面图片就置封面图片为空
			       if(isAlbum){
			    	   $("input:[name='head_pic_url']" , form).val("") ;
			       }		    
			    } */			    
		} 
		,
		imgClickFn:function(url,data){
			context.isUpdate = true ;
			var tobeAlbum = $("div.ke-item:[data-id='"+data.id+"']");
			//把它的兄弟节点的封面字体去掉
			$(tobeAlbum.siblings()).each(function(i,item){
				$("div.ke-name",$(item)).text($(item).attr("data-id")) ;
			});			
			$("div.ke-name",tobeAlbum).text(data.id+"封面");			
			$("input:[name='head_pic_url']" , form).val(url);
			$("input:[name='picture_id']" , form).val(data.id) ;	
			$("div:[name='J_selectImages'] .alUploadImg" , form).attr("src" , url ).show();
			$("div:[name='J_selectImages'] .upload-btn" , form).hide();
		   /* if(caseId && caseId != ""){				   
		     $.ajax(
		            {
					url: post_url+'admin/adminChangeAlbumImg.action',
					type:'post',
		            autoAlert:true,
		            data:{case_id:caseId,url:url,type:$("input:[name='type']" , form).val(),picture_id:data.id},
					dataType:'json',
					success:function(json){
						if(json.result == 0){
		            		 $("input:[name='picture_id']" , form).val(data.id) ;	
		            	}	
					}
				   }
			     );
		     } */	 
		}						
		});
	});
}
,
vedioHandler : function(index){
	   var vedioEditor = this.vedioEditor ;
	   var form = $("#caseItemForm"+index) ;
	   var context = this ;
	   //把warning去掉
	   $("[name='J_selectVedio']" , form).removeClass('warning');
	   $("[name='J_selectImage']" , form).removeClass('warning');
	   $("[name='J_selectImages']" , form).removeClass('warning');
	   vedioEditor.loadPlugin('image', function() {
		   vedioEditor.plugin.imageDialog({
					showRemote : false,
					clickFn : function(url, title, width, height, border, align) { 
			           context.isUpdate = true ;
						vedioEditor.hideDialog(); 						
						$("input:[name='vedio_url']" , form).val(url);
					   var caseId = $("input:[name='case_id']" , form).val() ;
					   $("input:[name='type']" , form).val(0);	
					   $("div:[name='J_selectVedio'] .alUploadImg" , form).attr("src" , "http://res.idol.yystatic.com/agency/images/agency/uploadVedioSuccess.jpg" ).show();
					   $("div:[name='J_selectVedio'] .upload-btn" , form).hide();
						   /* if(caseId && caseId != ""){						 
						   $.ajax(
				            {
							url: post_url+'admin/adminChangeVedioUrl.action',
							type:'post',
				            autoAlert:true,
							data:{case_id:caseId,url:url},
							dataType:'json',
							success:function(json){	
								 
							}
						   }
					     );
					   }	*/		
					}
				});
			});      
}
,
handleErrorImg : function(i , obj){	
	var arr = this.pics[i] ;
	var form = $("#caseItemForm"+i) ;
     if(arr.length > 0){
    	 //默认取第一张图片
           $(obj).attr("src" , arr[0].url);
           $("input:[name='picture_id']" , form).val(arr[0].id) ;
           //如果出现这种情况说明该经典案例引用了不存在的图片 
            $.ajax(
		            {
					url: post_url+'admin/adminChangeAlbumImg.action',
					type:'post',
		            autoAlert:true,
		            data:{case_id:$("input:[name='case_id']" , form).val(),url:arr[0].url,type:$("input:[name='type']" , form).val(),picture_id:arr[0].id},
					dataType:'json',
					success:function(json){								
					}
				   }
			   );
    	 
     }
     //如果图片集为空
     else{    	
    	 $("[name='J_selectImages'] .upload-btn" , form).show() ;
    	 $("[name='J_selectImages'] .alUploadImg" , form).hide() ;    	 
     }
}
,
saveAndUpdateCaseItem : function(e){
	var context = e.data.context ;
	var obj = e.data.obj ;
	var option = {} ;
	option.handleError = function($this,msg){	
			$this.addClass('warning');
			$this.next('span.error').remove();
			if(msg != "" && typeof msg != "undefined")
			 $this.after('<span class="error">'+msg+'</span>');
			$this.focus(function(){
				$this.removeClass('warning');
				$this.next('span.error').remove();
			});			
	}
	option.selfValitor = function(i , item){
		   var b = true ;
		   //如果是上传视频的话
	       var type = $("input[name='type']" , item).val() ;
		   if(type == '0') {
			     if($("input[name='vedio_url']" , item).val() == ""){
			    	 b = false ;
			    	 $("[name='J_selectVedio']" , item).addClass('warning');
			    	 $.alert("请上传视音频！") ;
			     }
			     else{
			    	   if($("input[name='head_pic_url']" , item).val() == ""){
					    	 b = false ;
					    	 $("[name='J_selectImage']" , item).addClass('warning');
					    	 $.alert("请上传视音频封面图片！") ;
					     }			
			     }		       
		   }
		   else if(type == '1'){	
			   //图集已经被清空
			   if(context.pics[i].length == 0 ){
				     b = false ;
				 	 $("[name='J_selectImages']" , item).addClass('warning');
			    	 $.alert("请上传图片！") ;
			   }
			   else{
				   if($("input[name='head_pic_url']" , item).val() == ""){
				    	 b = false ;
				    	 $("[name='J_selectImages']" , item).addClass('warning');
				    	 $.alert("请设置图册封面图片！") ;
				    }			 
			   } 	      
		   }
		   else{
				$("[name='J_selectVedio']" , item).addClass('warning');
				$("[name='J_selectImage']" , item).addClass('warning');
				$("[name='J_selectImages']" , item).addClass('warning');
			    $.alert("请上传视音频或者照片！") ;			 
			    b = false ;
		   }
		   return b ;
	}	
	var b = $.validateMultiForm("form" , option) ;	
	if(!b) return ;
	if(e.data.type == 0){
		context.sendSaveRequest(e.data.type ,obj) ;
	}
	else if(e.data.type == 1){
		$.messagebox(
	    {
	      title:'发布确认',//弹窗标题
	      type:'ask', //弹窗类型
	      msg:'是否确定正式发布信息？',//消息内容
	      buttons:"",//按钮配置
	      fn:function(o){//按钮回调函数
	    	  if(o.index == 0){
	    		  context.sendSaveRequest(e.data.type,obj) ;		    		  
	    	  }	                                 
	      }
	    }) ;		
	}	
	return false ;
}
,
 sendSaveRequest : function(type,obj){
	 var forms = $("form");
		var data = [] ;
		for(var i = 0 ; i < forms.length ; i++){
			data.push(this.jsonArrayToJsonObject($(forms[i]).serializeArray())) ;		
		}	
		$.ajax (
			    {
						url: post_url+'admin/adminSaveCaseItems.action',
						type:'post',
			            autoAlert:true,
						data:{data:JSON.stringify(data) , type:type , toDelCaseList:JSON.stringify(this.toDelCaseList)},
						dataType:'json',
						success:function(json){	
							if(json.result == 0 ){								
							   	location.href = obj.attr("data-href") ;							   							   		
							}
							else{
								if(type == 1 ){
									 $.alert("保存并发布失败！") ;	
								}
								else {
									 $.alert("保存失败！") ;	
								}						   
							}				
						}
					}
				);
}
,
appendCaseItem : function(e , i){
	if($("form").length == 6){
	   $.alert("最多能新增6项经典案例") ;
	   return ;	
	}	
	var context = e.data.context ;
	var i = context.pics.length ;
	context.pics.push([]);
	var htmlStr = template('case_item_template', {i: i});
	$("div.case-item-list").append(htmlStr) ;
}
,
choseVeiodOrPicBnt : function(i , type , obj){
	var form = $("#caseItemForm"+i);
	//拿到上传类型的值type ,如果type的值有的话，说明已经上传过其中一种，其实不能再上传另一种
	var uploadType = $("input[name='type']" , form) ;
	if(uploadType.val() == ""){
		if(type == 0 ){
			$('div.upload-item-vedio',form).show();
			$('div.upload-item-img',form).hide();		
		}
		else{
			$('div.upload-item-vedio',form).hide();
			$('div.upload-item-img',form).show();
		}
		$(obj).addClass('active').siblings('a').removeClass('active');
	}
}
,
delCaseItem : function(index){
	   var context = this ;
	   context.isUpdate = true ;
	   var $form = $("#caseItemForm"+index);
	    $.messagebox(
	    {
	      title:'刪除确认',//弹窗标题
	      type:'ask', //弹窗类型
	      msg:'是否确认删除？',//消息内容
	      buttons:"",//按钮配置
	      fn:function(o){//按钮回调函数
	    	  if(o.index == 0){	    		          		
	  	     	$form.remove();
	  	     	if($("form").length == 0){
	  	     		var htmlStr = template('case_item_template', {i: 0});
	  	     		$("div.case-item-list").append(htmlStr) ;
	  	     		//把多图的url清掉
	  	     		context.pics[index].length = 0 ;
	  	     	}
	  	     	var caseId = $("input[name='case_id']" , $form).val() ;
	  	     	if(caseId != ""){
		        	//保存要删除的列表
	    		    context.toDelCaseList.push(caseId) ;
		       	 }		
	    	  }	                                 
	      }
	    }) ;   
}
,
handlePirceRelateQua : function(priceList , qualityList){
	 $(priceList).each(function(i,item){		
		 for(var i = 0 ; i < qualityList.length ; i++ ){
			  if(item.quality == qualityList[i].quality ){
				  item.checked = true ;
			      break ;  
			  }
			  else{
				  item.checked = false ;
			  }	  
		 }  
	 });
}
,
jsonArrayToJsonObject : function(array){
	var obj = {} ;
	if(array && array.length && array.length > 0 ){
	    for(var i = 0 ; i < array.length ; i++){
	    	    if(typeof obj[array[i].name] != 'undefined' )
	    	    {
	    	    	if(obj[array[i].name] instanceof Array){
	    	    		obj[array[i].name].push(array[i].value) ;
	    	    	}
	    	    	else{
	    	    		var temp = obj[array[i].name] ;
		    	    	obj[array[i].name] = [] ;
		    	    	obj[array[i].name].push(temp) ;
		    	    	obj[array[i].name].push(array[i].value) ;		    	    	
	    	    	}   	    	
	    	    	
	    	    }
	    	    else{
	    	    	obj[array[i].name] = array[i].value ;	
	    	    }         	
	    }	    
	}
	return obj ;
}
,
putAll : function(all,sub){
	for(var key in sub){
		all[key] = sub[key] ;
	}	
}
,
removePic : function(arr , url ){
	for(var i in arr){
		if(arr[i].url == url){
			arr.remove(i) ;
		}		
	}
}
}
}(com.yy.ent.AgenService, jQuery) ;

//删除数组的某元素方法
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
