 (function() {
 	var page = {
 			
 		eventBind : function() {
 			var header = $("#header");
 			var topicPostCon = $("#topic-post");
 				//topicTitle = $.trim(topicPostCon.find(".topic-title").val());
 				//topicDesc = $.trim(topicPostCon.find(".topic-desc").val());
 				//topicFrom = $.trim(topicPostCon.find(".teleplay-name").val());
			topicTitle = topicPostCon.find(".topic-title");
			topicDesc = topicPostCon.find(".topic-desc");
			topicFrom = topicPostCon.find(".teleplay-name");
			var divresult = document.getElementsByClassName("imgUrl");
			var divresult2 = document.getElementsByClassName("url");
			

			//删除图片
			topicPostCon.on("click",".delete-img",function() {
 				var t = $(this);
 				var parobj = t.parents(".item-con")
 				uploadBtn = parobj.find(".upload-btn");
 				//uploadBtn.wrap("<form></form>");// 创建一个空的form表单，用于清空
 				uploadBtn.parents("form")[0].reset();
 				t.css("display","none");
 				parobj.height(66);
 				divresult.innerHTML = "";
 				parobj.find(".img").css("backgroundImage","");
 				parobj.find(".img").css("display","none");
 				uploadBtn.css("display","block");
 			});
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
	 			
			//上传图片
			topicPostCon.on("change",".upload-btn",function() {
 				
 				var imgUrl,_this = $(this);
 				fileObj = document.getElementsByClassName("upload-btn")[0].files[0]; // 获取文件对象
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
			 			 		 			var parobj = _this.parents(".item-con");
			 			 		 			parobj.height(90);// 需要显示删除照片的按钮
			 			 		 			parobj.find(".delete-img").css("display","block");
			 			 		 		    //alert(parobj.find(".img").size());
			 			 		 			parobj.find(".img").css("backgroundImage","url("+imgUrl+")");
			 			 		 			parobj.find(".img").css("display","block");
			 							    divresult.innerHTML = imgUrl;
			 							    divresult2.innerHTML = url;
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
			
 			//取消发表
 			header.on("click",".cancel-btn",function() {
 				if(topicTitle.val() != "" || topicDesc.val() != "" ){//|| topicFrom.val() != ""
 					//目前只支持两个按钮
					window.Ui.newConfirm.init({
						'title':'确定放弃发布话题？',
						'content':'已完成了部分编辑，点击<br />确定将放弃发布话题，返回原页面。',
						'callBack':{
							'cancel':function(){
								//console.log("取消");
							},
							'define':function(){
								history.back(-1);
							}
						}
					});
 				}
				else{
					history.back(-1);
				}
 			});

 			//发表
 			header.on("click",".right-btn",function() {
 				if(topicTitle.val() == "" || topicDesc.val() == "" || topicFrom.val() == ""){
 					window.Ui.newAlert.init({
						'content':"发布话题<br />需完成内容填写",
						'callBack':function(){
							
						}
					});
 				}
				else
				{
					//alert(divresult.innerHTML);
					$.ajax({
						url : '/tvbar/postTopic.action',
						type : 'post',
						data : {
							groupId : groupId,
							userId : userId,
							type : 1,
							title : topicTitle.val(),
							description : topicDesc.val(),
							souName : topicFrom.val(),
							topicPic : divresult2.innerHTML,
							handlePic: divresult.innerHTML
						},
						dataType : 'json',
						success : function(json) {
							var data = json.data;
							console.log(data)
							if(data.result == 1){
								location.href = 'http://tvbar.yy.com/groupPage.action?uid='+userId+'&groupId='+groupId;
								window.Ui.newAlert.init({
									'content':"发表成功",
									'callBack':function(){
									}
								});
							}else
								window.Ui.newAlert.init({
									'content':"发布失败，登录后才能完成操作，长按二维码关注公众账号后即可登录。",
									'callBack':function(){
									}
								});

						},
						exception : function(data) {
							alert("发表失败")
							if(data.result == 3005){
							}
						}
					});
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