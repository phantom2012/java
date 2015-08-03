 (function() {
 	var page = {
 		eventBind : function() {
 			var header = $("#header");
 			var topicPostCon = $("#topic-post");
 				
 			//取消发表
 			header.on("click",".cancel-btn",function() {
 				topicTitle = $.trim(topicPostCon.find(".topic-title").val());
 				topicDesc = $.trim(topicPostCon.find(".topic-desc").val());
 				topicFrom = $.trim(topicPostCon.find(".teleplay-name").val());
 				if(topicTitle != "" || topicDesc != "" || topicFrom != ""){
 					//目前只支持两个按钮
					window.Ui.newConfirm.init({
						'title':'确定放弃发布话题？',
						'content':'已完成了部分编辑，点击<br />确定将放弃发布话题，返回原页面。',
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
 				topicTitle = $.trim(topicPostCon.find(".topic-title").val());
 				topicDesc = $.trim(topicPostCon.find(".topic-desc").val());
 				topicFrom = $.trim(topicPostCon.find(".teleplay-name").val());
 				if(topicTitle == "" || topicDesc == "" || topicFrom == ""){
 					window.Ui.newAlert.init({
						'content':"发布话题<br />需完成内容填写",
						'callBack':function(){
							
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