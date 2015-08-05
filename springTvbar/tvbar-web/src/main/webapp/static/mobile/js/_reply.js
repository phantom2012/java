 (function() {
 	var page = {
 		eventBind : function() {
 			var topicDescCon = $("#topic-desc-con"),
 				replyContent = $("#replyContent"),
 				viewpointContent = $("#viewpointContent"),
 				replyHead = $("#reply-head"),
 				viewpointHead = $("#viewpoint-head");

 			var header = $("#reply-head");
 			var topicPostCon = $("#topic-reply");
 				
 			//取消发表
 			header.on("click",".cancel-btn",function() {
 				topicTitle = $.trim(topicPostCon.find(".viewpoint").val());
 				topicDesc = $.trim(topicPostCon.find(".topic-desc-area").val());
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
								history.back();
							}
						}
					});
 				}
 			});

 			//发表
 			header.on("click",".right-btn",function() {
 				topicTitle = $.trim(topicPostCon.find(".viewpoint").val());
 				topicDesc = $.trim(topicPostCon.find(".topic-desc-area").val());
 				if(topicTitle == "" || topicDesc == ""){
 					window.Ui.newAlert.init({
						'content':"话题回复<br />需先填写观点",
						'callBack':function(){
							
						}
					});
 				}
 			});

 			//输入观点获取焦点跳转
 			$("#viewpointIpt").on("focus",function() {
 				//window.location.href = "viewpoint.html";
 				replyContent.css("display","none");
 				viewpointContent.css("display","block");
 				replyHead.css("display","none");
 				viewpointHead.css("display","block");
 			});

 			//添加
 			$("#add-btn").on("click",function() {
 				var newNodeHtml = [
 					'<div class="item-con upload">',
 					' <textarea  class="topic-desc-area" placeholder="输入简短的话题描述" maxlength="70"></textarea>',
 					' <div class="upload-img">',
 					'  <div class="img"></div>',
 					'  <form><input type="file" name="pic" class="upload-btn" accept="image/*"></form>',
 					' </div>',
 					' <div class="delete-btn"><div class="delete"><span></span></div></div>',
 					'</div>'
 				].join("");
 				$("#topic-desc-con").append(newNodeHtml);
 			});

 			//删除
 			topicDescCon.on("click",".delete-btn",function() {
 				$(this).parents(".item-con").remove();
 			});

 			//删除上传的照片
 			topicDescCon.on("click",".delete-img",function() {
 				var t = $(this);
 				var parobj = t.parents(".item-con")
 				    uploadBtn = parobj.find(".upload-btn");
 				//uploadBtn.wrap("<form></form>");//创建一个空的form表单，用于清空
 				uploadBtn.parents("form")[0].reset();
 				t.css("display","none");
 				parobj.height(66);
 			});

 			//上传照片
 			topicDescCon.on("change",".upload-btn",function() {
 				var t = $(this);
 				var parobj = t.parents(".item-con");
 				parobj.height(90);//需要显示删除照片的按钮
 				parobj.find(".delete-img").css("display","block");
 			});

 			//输入或者选择观点页面
 			var viewpointIpt = $("#viewpointIpt2");

 			//选择观点
 			$("#viewpoint-list").on("click","li",function() {
 				var t = $(this);
 				t.siblings("li").removeClass("on");
 				t.addClass("on");
 				var vp = t.find("span").eq(2).text();
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
 				viewpointContent.css("display","none");
 				replyContent.css("display","block");
 				
 				viewpointHead.css("display","none");
 				replyHead.css("display","block");
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