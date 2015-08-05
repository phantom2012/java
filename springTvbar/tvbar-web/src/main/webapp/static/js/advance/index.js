var com = com||{}; com.yy = com.yy||{} ; com.yy.ent = com.yy.ent||{} ;
com.yy.ent.TicketIndex = function(){
	
} ;
!function(obj , $){	
   var _this ;
   obj.prototype = { 
     setContext : function(c){
	   _this =  c ;    
     },
     init : function(){
    	  this.getBenefitSupports() ; 
    	  $("#projectIndexTabBnt").on("click" ,function(){
               $(this).addClass("on");
               $("#projectIndexTab").show() ;
               $("#supportTabBnt").removeClass("on"); 
               $("#supportTab").hide() ;
          });
            $("#supportTabBnt").on("click" ,function(){
               $(this).addClass("on");
               $("#projectIndexTab").hide() ;
               $("#projectIndexTabBnt").removeClass("on"); 
               $("#supportTab").show() ;
          });
          $("#moreBnt").click(function(){
                $(this).hide() ;
                $("#removeMore").show() ;
               $("li" , $("#agencyReportUl")).show() ;
          });
            $("#removeMore").click(function(){
                $(this).hide() ;
                $("#moreBnt").show() ;
                console.log( $("#agencyReportUl li:gt(4)"));
                $("#agencyReportUl li:gt(4)").hide();
          });
          $("#supportHim").on("click",function(){
             $("html,body").animate({scrollTop:$(".left-main").offset().top-30},1000);
          });  
     }  
     ,
     //查询各个回报的信息，也会做静态化处理     
     getBenefitSupports : function(){
		    $.ajax({
				url : post_url + 'ticket/queryProjectSupports.action',
				type : 'post',				
				data : {
					projectId : projectId				
				},
				dataType : 'json',
				success : function(json) {
                     if(json && json.result == 0 && json.data){
                    	  var data = json.data ;
                    	  for(var key in data){                    		                  		
                    		$("#supporter"+key).html(template("supporterTemplate" ,{item:data[key]})) ;  
                    	  }                    	  
                     }                     
				}
			});     
     } 
     ,
     //查询分页的  TODO 
     getProjectOrderPage : function(){
    	 
     }     
   } ;
}(com.yy.ent.TicketIndex, jQuery) ;
