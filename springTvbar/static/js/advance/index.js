var com=com||{};com.yy=com.yy||{};com.yy.ent=com.yy.ent||{};com.yy.ent.TicketIndex=function(){};!function(b,a){var c;b.prototype={setContext:function(d){c=d},init:function(){this.getBenefitSupports();a("#projectIndexTabBnt").on("click",function(){a(this).addClass("on");a("#projectIndexTab").show();a("#supportTabBnt").removeClass("on");a("#supportTab").hide()});a("#supportTabBnt").on("click",function(){a(this).addClass("on");a("#projectIndexTab").hide();a("#projectIndexTabBnt").removeClass("on");a("#supportTab").show()});a("#moreBnt").click(function(){a(this).hide();a("#removeMore").show();a("li",a("#agencyReportUl")).show()});a("#removeMore").click(function(){a(this).hide();a("#moreBnt").show();console.log(a("#agencyReportUl li:gt(4)"));a("#agencyReportUl li:gt(4)").hide()});a("#supportHim").on("click",function(){a("html,body").animate({scrollTop:a(".left-main").offset().top-30},1000)})},getBenefitSupports:function(){a.ajax({url:post_url+"ticket/queryProjectSupports.action",type:"post",data:{projectId:projectId},dataType:"json",success:function(e){if(e&&e.result==0&&e.data){var f=e.data;for(var d in f){a("#supporter"+d).html(template("supporterTemplate",{item:f[d]}))}}}})},getProjectOrderPage:function(){}}}(com.yy.ent.TicketIndex,jQuery);