 (function() {
 	var page = {
 		eventBind : function() {
 			var i=0;
 			var topicDescCon = $("#Content");
 			var selectNode;
 			var accessToken = document.getElementById("access_token");
 			var type = document.getElementById("type");
 			

 			$.ajax({
                 url:"http://mmyzlinyingjie.oicp.net/tvbar/getAccessToken.action",
                 type:"post",
                 async:false,
                 crossDomain: true,
                 success: function (data) {
                	 var obj = JSON.parse(data).data;
                	 accessToken.innerHTML = obj;
                 }
             });
			 
// 			topicDescCon.on("click",".upload-btn",function() {
// 				alert(456);
// 				var fileObj  = document.getElementById("media");
// 				var form = new FormData();
// 				//form.append("media", fileObj.files[0]); // 文件对象
// 				form.append("access_token", accessToken.innerHTML);
// 				form.append("type","image");
// 			
// 	 			$.ajax({
// 	                // url:"http://mmyzlinyingjie.oicp.net/tvbar/getAccessToken.action",
// 	 				url:"https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=ACCESS_TOKEN",
// 	                 type:"post",
//
// 	                processData:false,
// 	               contentType:false,
// 	                 data:form,
// 	                 crossDomain: true,
// 	                 success: function (data) {
// 	                	 var obj = JSON.parse(data).data;
// 	                	 accessToken.innerHTML = obj;
// 	                 }
// 	             });
// 			});
 			
 			 
 			topicDescCon.on("click",".upload-btn",function() {
 				alert(123);
 				var imgUrl,_this = $(this);
 				fileObj = document.getElementsByClassName("upload")[0].files[0]; // 获取文件对象
 				if (fileObj == undefined || fileObj == null) {
 					return;
 				}
 				// FormData 对象
 				var form = new FormData();
 				form.append("media", fileObj); // 文件对象
 				form.append("access_token", accessToken.innerHTML);
 				form.append("type","image");
 				datafrom = form;
 				// XMLHttpRequest 对象
 				var xhr = new XMLHttpRequest();
 				xhr.open("post", "https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=ACCESS_TOKEN", true);
 				function state_Change() {  
 				    // 接收响应数据
 				    // 判断对象状态是否交互完成，如果为4则交互完成
 				    if(xhr.readyState == 4) {  
 				         // 判断对象状态是否交互成功,如果成功则为200
 				        if(xhr.status == 200) {  
 				            // 接收数据,得到服务器输出的纯文本数据
 				          var response = xhr.responseText;   				  
 				          var obj = eval('(' + response + ')'); 
 				          
 				          alert(obj);
 				        }  
 				    }  
 				} 
 				xhr.onreadystatechange = state_Change;
 				xhr.send(datafrom);
 			});
 			
 			topicDescCon.on("click",".connecting", function() {
 				var t = $(this);
 				var parobj = t.parents(".connectList");
 				topicId = parobj.find(".topicId")[0].innerHTML;
 				eventId = parobj.find(".eventList")[0].value;
 				$.ajax({
 	                 url:"http://tvbar.yy.com/tvbar/connectEventTopic.action",
 	                 type:"post",
 	                 data: {topicId:topicId, eventId:eventId},
 	                 success: function (data) {
 	                	location.reload();
 	                 }
 	             });
 			});
 			
 			topicDescCon.on("mouseleave","#eventList", function() {
 	             	$("#eventList option").remove();
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