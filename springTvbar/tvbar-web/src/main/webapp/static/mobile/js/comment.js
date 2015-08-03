 $(function () {
	var i = 1; //设置当前页数
    //根据页数读取数据  
    function getData(jsonUrl,id,pagenumber,element) {
        $('.load').show(); 
        i++; //页码自动增加，保证下次调用时为新的一页。
        $.ajax({  
            type: "get",  
            url: jsonUrl+"?groupId="+id+"&&pageIndex="+pagenumber,  
 
            dataType: "json",  
            timeout: 10000,
            success: function (data) {
                $('.load').hide();  
                if (data.data.topics.length > 0 ) {
                    insertDiv(id,element,data.data.topics);
                }else{
                    $(window).unbind('scroll');
                }  
            },  
            error: function () {  
                console.log('error')  
            }  
        });  
    }  
  
    //生成数据html,append到div中  
    function insertDiv(id,element,json) { 
        var $mainDiv = $(element);  
        var html = '';  
        for (var i = 0; i < json.length; i++) {  
            html += '<div class="item" _uid="'+userId+'" _topicId="'+json[i].topicId+ '">';
            html += ' <div class="reply-topic"><span class="th">话题：</span>'+json[i].title+'<em class="triangle"></em></div>';  
            html += ' <div class="thead"><div class="pic"><img src="'+json[i].creatorIcon+'" alt=""></div><p><span class="name">'+json[i].creatorName+'</span><span class="action">发布了话题</span></p><p class="date">'+json[i].createTime+'</p></div>';
			html += ' <div class="tbody"><p>'+json[i].description+'</p></div> ';
			html += ' <div class="tfoot"><span class="tag"></span></div>';
            html += '</div>';
            for(var j=0,viewpoints=json[i].viewPoints;j<viewpoints.length;j++){
            	html += '<div class="item" _uid="'+userId+'" _topicId="'+json[i].topicId+ '">';
	            html += ' <div class="reply-topic"><span class="th">话题：</span>'+json[i].title+'<em class="triangle"></em></div>';  
	            html += ' <div class="thead"><div class="pic"><img src="'+viewpoints[j].creatorIcon+'" alt=""></div><p><span class="name">'+viewpoints[j].creatorName+'</span><span class="action">回复了话题</span></p><p class="date">'+json[i].createTime+'</p></div>';
	            html += '<div class="tbody"><p><span class="icon s-viewport">观点</span>'+viewpoints[j].description+'</p><div class="pic-list"><a href="">';
				for(var k=0,evidences=viewpoints[j].evidences;k<3;k++){
					if(evidences[k]==null) break;
					html += '<img src="'+evidences[k].handlePic+'" alt="">';
				}
				html += '<span class="tip">共'+evidences.length+'张图</span></a></div></div>';
                html += ' <div class="tfoot"><span class="support-num">支持<i>'+viewpoints[j].zanCount+'</i></span><span class="tag"></span></div>';
                html += '</div>'; 
            }
        }  
        $mainDiv.append(html);  
    }  
  
    //==============核心代码=============  
    var winH = $(window).height(); //页面可视区域高度   
  
    var scrollHandler = function (jsonUrl,groupId,nowPage,element,callback) {
        var pageH = $(document.body).height();  
        var scrollT = $(window).scrollTop(); //滚动条top   
        var aa = (pageH - winH - scrollT) / winH;
        i=nowPage;  
        if (pageH-winH-scrollT<200) {
            getData(jsonUrl,groupId,i,element);
            if( typeof callback === 'function' )
            	callback(i);
        }
    }  
    //定义鼠标滚动事件  
    window.scrollHandler=scrollHandler;  
});  