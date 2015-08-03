 (function() {
 	var page = {
 		eventBind : function() {
 			var i=0;
 			var topicDescCon = $("#Content");
 			var selectNode;

 			$.ajax({
                 url:"http://tvbar.yy.com/tvbar/queryGroups.action",
                 type:"post",
                 async:false,
                 success: function (data) {
                	 var obj = JSON.parse(data).data;
                	 for(var i= 0; i < obj.length; i++){
                		 selectNode +=' <option value ="'+obj[i].groupId + '">'+obj[i].title +'</option>';
                	 }
                 }
             });
 			
 			 $.ajax({
                 url:"http://tvbar.yy.com/tvbar/queryEventDetail.action",
                 type:"post",
                 async:false,
                 success: function (data) {
                	 var obj = JSON.parse(data).data;
                	 for(var i= 0; i < obj.length; i++){
                		var eventHtml = '<div class="connectList">'+
                						' <div class="eventId" hidden="true">'+obj[i].eventId + '</div>'+
                						' 事件描述： <div class="EventDesc">'+obj[i].description +'</div> 关联的小组：';
                		
                		for(var j = 0; j < obj[i].groups.length; j++){
                			eventHtml += 
                					     '<div class="groupList">' + 		
                					     '<div class="groupId" hidden="true">' + obj[i].groups[j].groupId + '</div>' +
                						 '<div class="groupTitle" >' + obj[i].groups[j].title + '</div>' + 
                						 '<input type="button" class="cancel" value="取消关联"></input>'+
                						 '</div>';
                		}
           				 eventHtml +=  ' <br/><select class="eventList" >'+
           			  					selectNode+
           			  					' </select>'+
           			  					'<br/> <input type="button" class="connecting" value="关联"></input>'+
           			  					'<h3>---------------------------</h3>';
           				$("#Content").append(eventHtml);
                	 }
                 }
             });
 			 
 			topicDescCon.on("click",".connecting", function() {
 				var t = $(this);
 				var parobj = t.parents(".connectList");
 				eventId = parobj.find(".eventId")[0].innerHTML;
 				groupId = parobj.find(".eventList")[0].value;
 				$.ajax({
 	                 url:"http://tvbar.yy.com/tvbar/connectEventGroup.action",
 	                 type:"post",
 	                 data: {eventId:eventId, groupId:groupId},
 	                 success: function (data) {
 	                	location.reload();
 	                 }
 	             });
 			});
 			
 			topicDescCon.on("click",".cancel", function() {
 				var t = $(this);
 				var parobj = t.parents(".connectList");
 				eventId = parobj.find(".eventId")[0].innerHTML;
 				
 				var parobj2 = t.parents(".groupList");
 				groupId = parobj2.find(".groupId")[0].innerHTML;
 				
 				$.ajax({
 	                 url:"http://tvbar.yy.com/tvbar/cancelEventGroup.action",
 	                 type:"post",
 	                 data: {eventId:eventId, groupId:groupId},
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