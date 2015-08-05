$(document).ready(function() {

	//观点对象
	function ViewPoint(description, evidences){
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
	
	//监听发布按钮
	$("#postTopic").bind("click",function() {
			var evidenceArray = new Array();
			var picture = document.getElementsByClassName("url");//原图
			var handlePic = document.getElementsByClassName("imgUrl");//处理图
			var descDiv = document.getElementsByClassName("topic-desc-area");
			if(handlePic.length != descDiv.length)
				alert("页面出错！");
			else{
				for(var i=0; i<descDiv.length;i++){
					var evidenceObj = new Evidence(picture[i].innerHTML, handlePic[i].innerHTML, descDiv[i].value);
					evidenceArray[i] = evidenceObj;
				}
				var viewPoint = new ViewPoint($("#viewpointIpt")[0].value, evidenceArray);
			}
			
	    //回复话题
		//alert(JSON.stringify(viewPoint))
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
						 alert("发表成功")
					 }else
						 alert("发表失败，请先登录")

                 },
				 exception : function(data) {
					 alert("发表失败")
					 if(data.result == 3005){
					 }
				 }
             });
	});
});