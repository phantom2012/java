 (function() {
 	var page = {
 		eventBind : function() {
 			var i=0;
 			var topicDescCon = $("#Content");
 			var selectNode;

 			$.ajax({
                 url:"http://tvbar.yy.com/tvbar/queryEvent.action",
                 type:"post",
                 async:false,
                 success: function (data) {
                	 var obj = JSON.parse(data).data;
                	 for(var i= 0; i < obj.length; i++){
                		 selectNode +=' <option value ="'+obj[i].eventId + '">'+obj[i].description +'</option>';
                	 }
                 }
             });
 			
 			 $.ajax({
                 url:"http://tvbar.yy.com/tvbar/queryTopic.action",
                 type:"post",
                 async:false,
                 success: function (data) {
                	 var obj = JSON.parse(data).data;
                	 for(var i= 0; i < obj.length; i++){
           				var newNodeHtml = [
           			  					'<div class="connectList">',
           			  					' <div class="topicId" hidden="true">'+obj[i].topicId + '</div>',
           			  					' 话题标题： <div class="topicTitle">'+obj[i].title + '</div>',
           			  					' 话题描述： <div class="topicDesc">'+obj[i].description +'</div>',
           			  					' 对应事件：<div class="topicEvent">'+obj[i].eventDesc +'</div>',
           			  					' <select class="eventList" >',
           			  					selectNode,
           			  					' </select>',
           			  					'<br/> <input type="button" class="connecting" value="关联"></input>',
           			  					'<h3>---------------------------</h3>'
           			  				].join("");
           				$("#Content").append(newNodeHtml);
                	 }
                 }
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