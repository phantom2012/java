var com = com||{}; com.yy = com.yy||{} ; com.yy.ent = com.yy.ent||{} ;
com.yy.ent.AgenService = function(){
	this.index = 0 ;
	this.priceList ;
	this.editor;
	this.canForwarCase = true ;
	this.toDelList = [] ;
	this.isUpdate = false ;
} ;
!function(obj , $){ 
obj.prototype = {
    init : function(){ 
	  this.initServiceItem();
	  var context = this ;
	  $("ul.nav li.canClick a").on("click" ,function(e){
		  //如果是点我的首页的话要判断机构的状态，如果是发布态的时候才能点击	    
	     if(comStatus!=4&&$(e.target).attr("data-href").indexOf("company.action")!=-1 ){
	    	 $.alert("发布后才能跳转我的首页！") ;
	    	 return ;
	     }
	     if(!context.canForwarCase&&$(e.target).attr("data-href")!="/agency/admin/adminCompanyinfo.action"){
	    	 $.alert("请先填写服务项目！") ;
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
	  $("input , textarea,select").live("change" ,{context:this}, this.checkForUpdate) ;
	  $("input[name='city']").live("focus",{context:this}, this.checkForUpdate) ;
	  this.initKindEditor();
 } 
,
initKindEditor : function(){
	var context = this ;
    KindEditor.ready(function(K) {
				var editor = K.editor({
					allowFileManager : true,
				    uploadJson : post_url+'admin/uploadServicePic.action'
				});	
				context.editor = editor ;
			});
}
,
checkForUpdate:function(e){
	  e.data.context.isUpdate = true ;	
	  $("input , textarea,select").die("change");
	  $("input[name='city']").die("focus");
}
,
singleImgHandler : function(index){
	 var context = this ;
	 var imgEditor = this.editor ;
	 var form = $("#serviceItemForm"+index) ;
	 $(".photo-con" , form).removeClass('warning');
     imgEditor.loadPlugin('image', function() {
		   imgEditor.plugin.imageDialog({
				showRemote : false,
				clickFn : function(url, title, width, height, border, align) {
					context.isUpdate = true ;	
					$("input:[name='picture']" , form ).val(url);
					imgEditor.hideDialog();		
					$("img.targetUploadImg" , form).attr("src" , url ).show();
					$("img.defaultUploadImg" , form).hide();				
				 /*  var service_id = $("input:[name='service_id']" , form).val() ;
				   if(service_id && service_id != ""){					 
					   $.ajax (
			            {
						url: post_url+'admin/adminChangeServiceImg.action',
						type:'post',
			            autoAlert:true,
						data:{service_id:service_id,picture:url},
						dataType:'json',
						success:function(json){	
							
						}
					   }
				     );
				   } */				   
				}
			});
		});   	
}
,
initServiceItem : function(){
	    var context = this ;
	    $("#saveServiceItemNext").on("click" ,	{context:this ,obj:  $("#saveServiceItemNext"),type:0} ,this.saveAndUpdateServiceItem) ;
	    $("#saveServiceItemPre").on("click" ,	{context:this,obj:  $("#saveServiceItemPre"),type:1} ,this.saveAndUpdateServiceItem) ;
	    $("#saveServiceItem").on("click" ,	{context:this ,obj:  $("#saveServiceItem"),type:2} ,this.saveAndUpdateServiceItem) ;
	    $("#appendServiceItem").on("click" ,{context:this} ,this.appendServiceItem) ; 	   	    
    	$.ajax (
				{
					url: post_url+'admin/adminGetServiceItems.action',
					type:'GET',
				    autoAlert:true,
					data:{					
					},
					dataType:'json',
					success:function(json){
						if(json.result == 0 && json.data){
							var list = json.data.serviceContentList ;
							context.priceList = json.data.priceList ;					
						 if(list.length == 0 ){
							 //这里控制服务项目能否跳转
						     context.canForwarCase = false ;
							 var nothing = {type:1} ;
							 //增加默认的服务类型，以及服务类型对应的各个档次的价格
							 nothing.priceList = context.priceList[1];
							 $(nothing.priceList).each(function(i,item){
								//默认都选上 
							    item.checked = true ;
							 });
							 list.push(nothing);							
						   }
						   else{
							   //把相应的价格复原
		                        $(list).each(function(i,item){
		                        	  item.priceList  = context.handlePirceRelateQua(json.data.priceList[item.type] , json.data.contentQualityChoseList[item.service_id]) ;
		                        	  item.code =  item.city ;
		                        	  item.city = $.agencySelectFromCode(item.city,"city",",");		                        	 
		                          }); 		                                             
						   }					  
							var htmlStr = template('service_item_template', {list:list,index:0,cityList:$$selectServiceData});							
							context.index = list.length - 1 ;
							$("#serviceShowArea").html(htmlStr);						
							$(list).each(function(i,item){
								   var $form = $("#serviceItemForm"+i) ;
								   $("input[name='city']", $form).agencySelect({maxLimit:5,initCodes:item.code,name:'service_city'});
								   wordCount2($("textarea[name='content']", $form)[0],200,'recomWordNotice'+i) ;
							}) ;						
						}						
					}
				}
			);
}
,
saveAndUpdateServiceItem : function(e){
	var context = e.data.context ;
	var obj = e.data.obj ;
	var type = e.data.type ;
	var option = {} ;
	option.handleError = function($this,msg){		
			if($this.attr("name") == "picture"){
				var $form = $this.closest("form");
				$(".photo-con" , $form).addClass('warning');
				$.alert(msg) ;
			}
			else{
				  $this.addClass('warning');
					$this.next('span.error').remove();
				    if(msg != "" && typeof msg != "undefined")
					$this.after('<span class="error">'+msg+'</span>');
					$this.focus(function(){
						$this.removeClass('warning');
						$this.next('span.error').remove();
				});		
			}    
	}
	option.selfValitor = function(i , item){
		   //针对质量价格特殊处理下
	       var b = false ;	
	       var qus = $("input[name='quality']",item) ;
	       $(qus).each(function(i, item){
	    	   if($(item).attr("checked")){
	    		   b = true ;
	    		   return false ;
	    	   }	    	   
	       });
	       if(!b){
	    	   $.alert("请选服务价格！") ;
		       $("#priceArea"+i).addClass("warning"); 
	       }           
		   return b ;
	}	
	var b = $.validateMultiForm("form" , option) ;	
	if(!b) return ;	
	if(type==2){
		$.messagebox(
	    {
	      title:'保存发布确认',//弹窗标题
	      type:'ask', //弹窗类型
	      msg:'是否确定保存并正式发布信息？',//消息内容
	      buttons:"",//按钮配置
	      fn:function(o){//按钮回调函数
	    	  if(o.index == 0){
	    		  context.sendSaveRequest(obj) ;	    		  
	    	  }	                                 
	      }
	    }) ;     	
	}
	else{
		context.sendSaveRequest(obj) ;
	}
	return false ;			
}
,
sendSaveRequest:function(obj){
	var context = this ;
	var forms = $("form",$("#serviceShowArea"));
	var data = [] ;
	for(var i = 0 ; i < forms.length ; i++){
		data.push(context.jsonArrayToJsonObject($(forms[i]).serializeArray())) ;		
	}
	//把中文城市转成编号的方式
	$(data).each(function(i,item){
		 item.city = $.agencySelectFromName(item.city,"city",",");
	});    
	$.ajax (
		    {
					url: post_url+'admin/adminSaveServiceItems.action',
					type:'post',
					data:{data:JSON.stringify(data) , toDelList:JSON.stringify(context.toDelList)},
					dataType:'json',
					autoAlert:true,
					success:function(json){	
						if(json.result == 0 ){
							location.href = obj.attr("data-href") ;
						}
						else{
						   $.alert("保存失败！") ;	
						}						
					}
				}
			);
}
,
appendServiceItem : function(e ,i){
	var context = e.data.context ;
	var list = [] ;
	var nothing = {type:1} ; 
	nothing.priceList = context.priceList[1];
	 $(nothing.priceList).each(function(i,item){
		//默认都选上 
	    item.checked = true ;
	 });
	list.push(nothing);
	var index ;
	if(typeof i != "undefined"){
		index = i ;
	}
	else{
		index = ++context.index ;
	}
	var htmlStr = template('service_item_template', {list:list,index:index,cityList:$$selectServiceData});
	$("#serviceShowArea").append(htmlStr) ;
	$("input[name='city']").agencySelect({maxLimit:5,initCodes:'',name:'service_city'});
}
,
delServiceItem : function(index){
     	var $form = $("#serviceItemForm"+index) ; 
     	var context = this ;      
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
	    			context.appendServiceItem({data:{context:context}} , 0);
	    		} 
	    		var serviceId = $form.attr("data-service-id") ;
	  	     	if(serviceId != ""){
		        	//保存要删除的列表
	    		    context.toDelList.push(serviceId) ;
		       	 }		
	    	  }	                                 
	      }
	    }) ;   	  
}
,
getServiceQulityByType : function(type,index){
	$.ajax (
	{
		url: post_url+'admin/adminGetServiceQuality.action',
		type:'get',
	    autoAlert:true,
		data:{
			type : type					
		},
		dataType:'json',
		success:function(json){
			//把价钱render出来
		    if(json.result == 0 && json.data){
		    	var htmlStr = "" ;
		        $(json.data).each(function(i,item){
		            htmlStr += template("service_price_template" ,{item:item}) ;			        
		        });	
		      $("#priceArea"+index).html(htmlStr) ;  
		      $("input:[name='type']" , $("#serviceItemForm"+index)).val(type);
		    }		    
		}					
	}
);
}
,
handlePirceRelateQua : function(priceList , qualityList){
	 var result = [];
	 //克隆js对象
	 for(var key in priceList){
		 var obj = {} ;
		 this.putAll(obj , priceList[key])
		 result.push(obj) ;
		 }	 
	 $(result).each(function(i,item){		
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
	 return result ;
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
}
}(com.yy.ent.AgenService, jQuery) ;