 (function() {
 	var page = {
 		eventBind : function() {
			var header = $("#header");
 			var i=0;
 			var order = 0;
 			var topicDescCon = $("#topic-desc-con"),
 				replyContent = $("#replyContent"),
 				viewpointContent = $("#viewpointContent"),
 				replyHead = $("#reply-head"),
 				viewpointHead = $("#viewpoint-head");

			//取消发表
			header.on("click",".cancel-btn",function() {
				topicTitle = $.trim(replyContent.find(".viewpoint").val());
				topicDesc = $.trim(replyContent.find(".topic-desc-area").val());
				if(topicTitle != "" || topicDesc != ""){
					//目前只支持两个按钮
					window.Ui.newConfirm.init({
						'title':'确定放弃发布回复？',
						'content':'已完成了部分编辑，点击<br />确定将放弃回复，返回到原话题。',
						'callBack':{
							'cancel':function(){
								//console.log("取消");
							},
							'define':function(){
								history.back(-1);
							}
						}
					});
				}else
					history.back(-1);
			});

 			//观点对象
 			function ViewPoint(description, evidences){
 				//alert(pointId)
 				this.userId = uid;
 				this.pointId = pointId;
 				this.topicId = topicId;
 				this.description = description;
 				this.evidences = evidences;
 			}
 			
 			//证据对象
 			function Evidence(picture, handlePic, description) {
 				this.creatorId = uid;
 				this.pointId = pointId;
 				this.topicId = topicId;
 				this.picture = picture;//原图
 				this.handlePic = handlePic;//处理图
 		        this.description = description;
 		    }

 			function compress(event, file, callback){
 			    var reader = new FileReader();
 			    reader.onload = function (e) {
 			        var image = $('<img/>');
 			        image.on('load', function () {
 			        	
 			        	var iwidth = 700;
 			        	var iheight = 700;
 			        	var tmpWidth = this.width;
 		 			    var tmpHeight = this.height;
 		 			    if(tmpWidth>0 && tmpHeight>0){    
 		 			      if(tmpWidth/tmpHeight>= iwidth/iheight){    
 		 			          if(tmpWidth>iwidth){      
 		 			              this.width=iwidth;    
 		 			              this.height=(tmpHeight*iwidth)/tmpWidth;    
 		 			          }else{    
 		 			              this.width=tmpWidth;      
 		 			              this.height=tmpHeight;    
 		 			          }    
 		 			      }else{    
 		 			          if(tmpHeight>iheight){      
 		 			              this.height=iheight;    
 		 			              this.width=(tmpWidth*iheight)/tmpHeight;            
 		 			          }else{    
 		 			              this.width=tmpWidth;      
 		 			              this.height=tmpHeight;    
 		 			          }    
 		 			      }    
 		 			    }    
 		 			    
 			             var canvas = document.createElement('canvas');
 			             canvas.width = this.width;
 			             canvas.height = this.height;
 			             var context = canvas.getContext('2d');
 			             context.clearRect(0, 0, this.width, this.height);
 			             context.drawImage(this, 0, 0, this.width, this.height);
 			             var data = canvas.toDataURL('image/jpeg');
 			             callback(data);
 			         });
 			          image.attr('src', e.target.result);
 			       };
 			     reader.readAsDataURL(file);
 			}
 			
 			//监听发布按钮
 			$("#postTopic").bind("click",function() {
 					var evidenceArray = new Array();
 					var picture = document.getElementsByClassName("url");//原图
 					var handlePic = document.getElementsByClassName("imgUrl");//处理图
 					var descDiv = document.getElementsByClassName("topic-desc-area");
 					if(handlePic.length != descDiv.length)
 						window.Ui.newAlert.init({
							'content':"页面出错了~",
							'callBack':function(){
							}
						});
 					else{
 						for(var i=0; i<descDiv.length;i++){
 							//alert(picture[i].innerHTML);
 							if(!(handlePic[i].innerHTML=="" && descDiv[i].value=="")){
 								var evidenceObj = new Evidence(picture[i].innerHTML, handlePic[i].innerHTML, descDiv[i].value);
 								evidenceArray[i] = evidenceObj;
 							}
 						}
 						var viewPoint = new ViewPoint($("#viewpointIpt")[0].value, evidenceArray);
 					}
 					
 			    //回复话题
 				//alert(JSON.stringify(viewPoint))
 					if($("#viewpointIpt")[0].value != ""){
 					 $.ajax({
 			                 url:"http://tvbar.yy.com/tvbar/replyTopic.action",
 			                 data: {
 								 uid:uid,
 								 point: JSON.stringify(viewPoint)
 							 },
 			                 type:"post",
 			                dataType : 'json',
 							 success: function (json) {
 								 var data = json.data;
 								 if(data.result == 1){
 									 location.href = 'http://tvbar.yy.com/topicPage.action?uid='+uid+'&topicId='+topicId;
 									window.Ui.newAlert.init({
 										'content':"发布成功",
 										'callBack':function(){
 										}
 									});
 								 }else
 									window.Ui.newAlert.init({
 										'content':"发表失败，登录后才能完成操作，长按二维码关注公众账号后即可登录。",
 										'callBack':function(){
 										}
 									});
 			                 },
 							 exception : function(data) {
 								 window.Ui.newAlert.init({
 										'content':"发表失败",
 										'callBack':function(){
 										}
 									});
 								 if(data.result == 3005){
 								 }
 							 }
 			             });
 					}else{
 						 window.Ui.newAlert.init({
								'content':"观点还没写呢",
								'callBack':function(){
								}
							});
 					}
 			});
 			
 			
 			
 			//输入观点获取焦点跳转
 			$("#viewpointIpt").on("focus",function() {
 				$("#viewPointUl").find("li").remove();
 				 $.ajax({
 		                 url:"http://tvbar.yy.com/tvbar/agreeHotPoint.action",
 		                 data: {topicId:topicId},
 		                 type:"post",
 		                 success: function (data) {
 		                	var obj = JSON.parse(data).data;
 		                	for(var i = 0, selectValue= 97; i < obj.viewPoints.length; i++, selectValue++){
 		                		$("#viewPointUl").append("<li><span class='radio'></span><span>"+ String.fromCharCode(selectValue) + '、</span><span id="'+obj.viewPoints[i].pointId+'">'+obj.viewPoints[i].description +"</span></li>");
 		                	}
 		                 }
 		             });
 				replyContent.css("display","none");
 				viewpointContent.css("display","block");
 				replyHead.css("display","none");
 				viewpointHead.css("display","block");
 			});
 			// 添加
 			$("#add-btn").on("click",function() {
 				var newNodeHtml = [
 					'<div class="item-con upload">',
 					' <textarea  class="topic-desc-area" placeholder="输入简短的话题描述" maxlength="256"></textarea>',
 					' <div class="upload-img">',
 					'  <div class="img"></div>',
 					'  <form><input type="file" name="pic" class="upload-btn" accept="image/*"></form>',
 					'<div class="imgUrl" hidden="true" ></div>',
 					'<div class="url" hidden="true" ></div>',
 					'<div class="order" hidden="true" >'+ ++order +'</div>',
 					' </div>',
 					' <div class="delete-img">删除图片</div>',
 					' <div class="delete-btn"><div class="delete"><span></span></div></div>',
 					'</div>'
 				].join("");
 				$("#topic-desc-con").append(newNodeHtml);
 			});

 			// 删除
 			topicDescCon.on("click",".delete-btn",function() {
 				$(this).parents(".item-con").remove();
 			});

 			// 删除上传的照片
 			topicDescCon.on("click",".delete-img",function() {
 				var t = $(this);
 				var parobj = t.parents(".item-con")
 				uploadBtn = parobj.find(".upload-btn");
 				//uploadBtn.wrap("<form></form>");// 创建一个空的form表单，用于清空
 				uploadBtn.parents("form")[0].reset();
 				t.css("display","none");
 				parobj.height(66);
 				var imgDiv = parobj.find(".imgUrl")[0];
 				imgDiv.innerHTML="";
 				parobj.find(".img").css("backgroundImage","");
 				parobj.find(".img").css("display","none");
 				uploadBtn.css("display","block");
 			});

 			// 上传照片
 			topicDescCon.on("change",".upload-btn",function() {
 				var uploadResult = 0;
 				
 				
 				var imgUrl,_this = $(this);
 				
 				var parobj = _this.parents(".item-con");
 				var order = parobj.find(".order")[0].innerHTML;
 				fileObj = document.getElementsByClassName("upload-btn")[order].files[0]; // 获取文件对象
 				
 				if (fileObj == undefined || fileObj == null) {
 					return;
 				}
 				//文件后缀名检查
 				if(fileObj.type.indexOf("image")>=0){
 					var uploadLoading = $("#uploadLoading");
 					uploadLoading.css("display","block");
	 			    compress(event, fileObj, function(base64Img){
	 			 　　　　　　$.ajax({
	 			 　　　　　　'url' : 'http://tvbar.yy.com/tvbar/uploadImage.action',
	 				　  //  'url' : 'http://mmyzlinyingjie.oicp.net/tvbar/uploadImage.action',
	 			 　　　　　　'type' : 'post',
	 			 　　　　　　'data' : {'uid' : base64Img},
	 			 　　    	  'success' : function(response){
	 			 　　　　	              var obj = eval('(' + response + ')'); 
	 		 				          if(obj.result == 1){
	 		 				        	    uploadResult = 1;
	 		 				          		alert(obj.data);
	 		 				          		_this.parents("form")[0].reset();
	 		 				          }else{
	 			 				          	imgUrl = obj.data[0].handlePic;
	 			 				          	url =  obj.data[0].url;
	 				 		 				parobj.height(90);// 需要显示删除照片的按钮
	 				 		 				parobj.find(".delete-img").css("display","block");
	 				 		 				parobj.find(".img").css("backgroundImage","url("+imgUrl+")");
	 				 		 				parobj.find(".img").css("display","block");				 		 				
	 				 		 				parobj.find(".imgUrl")[0].innerHTML = imgUrl;
	 				 		 				parobj.find(".url")[0].innerHTML = url;
	 								        i+=1;
	 								        _this.css("display","none");
	 								        uploadLoading.css("display","none");
	 		 				          	   }
	 		 				          }  
	 			 　　　　　   
	 			 　　　　　});
	 			 		//$('imgData').value = base64Img;// 写到form元素待提交服务器
	 			 		//console.log(base64Img);
	 			 　　　});
 				}else{
 					alert("只能上传图片~~")
 				}
 			});
 			//输入或者选择观点页面
 			var viewpointIpt = $("#viewpointIpt2");
 			//选择观点
 			$("#viewpoint-list").on("click","li",function() {
 				var t = $(this);
 				t.siblings("li").removeClass("on");
 				t.addClass("on");
 				var vp = t.find("span").eq(2).text();
				pointId = t.find("span").eq(2).attr("id");
 				viewpointIpt.val(vp);
 			});
 			//输入观点
 			viewpointIpt.on("input",function() {
 				//console.log(
 				var vp = $(this).val();
 				var vpLis = $("#viewpoint-list li");
 				var liNode;
 				for(var i=0;i<vpLis.length;i++){
 					liNode = $(vpLis[i]);
 					if(vp == liNode.find("span").eq(2).text()){
 						liNode.addClass("on");
 					}
 					else{
 						liNode.removeClass("on");
 					}
 				}
 			});
 			$("#goback").click(function() {
 				viewpointContent.css("display","none");
 				replyContent.css("display","block");
 				viewpointHead.css("display","none");
 				replyHead.css("display","block");
 			});
 			$("#vpSubmit").click(function() {
 				var vp = viewpointIpt.val();
 				$("#viewpointIpt").val(vp);
 				if(vp == ""){
					window.Ui.newAlert.init({
							'content':"请填写你的观点",
							'callBack':function(){
							}
						});
 				}else{
	 				viewpointContent.css("display","none");
	 				replyContent.css("display","block");
	 				viewpointHead.css("display","none");
	 				replyHead.css("display","block");
 				}
 			});
 		},
 		init : function() {
 			this.eventBind();
 		}
	 }
	 $(function() {
	 	page.init();
	 });
 })();