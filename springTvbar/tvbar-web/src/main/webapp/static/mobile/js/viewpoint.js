 (function() {
 	var page = {
 		eventBind : function() {
 			var viewpointIpt = $("#viewpointIpt");

 			//选择观点
 			$("#viewpoint-list").on("click","li",function() {
 				var t = $(this);
 				t.siblings("li").removeClass("on");
 				t.addClass("on");
 				var vp = t.find("span").eq(2).text();
 				viewpointIpt.val(vp);
 			});

 			//确定
 			$(".right-btn").bind("click",function() {
 				var url="http://tvbar.yy.com/tvbar/static/mobile/html/reply.html?name=" + escape($("#viewpointIpt")[0].value);
 				window.location.href = encodeURI(url);
 			});
 			
 			//发表
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
 		},
 		init : function() {
 			this.eventBind();
 		}
	 }

	 $(function() {
	 	page.init();
	 });
 })();