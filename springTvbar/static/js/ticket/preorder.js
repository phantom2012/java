var com=com||{};com.yy=com.yy||{};com.yy.agency=com.yy.agency||{};com.yy.agency.AgencyPreorder=function(){};!(function(b,a){var c;b.prototype={init:function(){c=this;c.initEvent()},url:{addAgencyPerson:"/agency/ticket/addAgencyPerson.action",updateAgencyPerson:"/agency/ticket/updateAgencyPerson.action",deleteAgencyPerson:"/agency/ticket/deleteAgencyPerson.action",addAgencyOrder:"/agency/ticket/addAgencyOrder.action",agencyOrder:"/agency/ticket/agencyOrder.action"},initEvent:function(){c.id("numDecrement").click(function(){var d=c.id("numTxt");var e=c.parseInt(d.val(),1);if(e>=2){d.val(e-1);c.numTxtChange(e-1)}});c.id("numIncrement").click(function(){var d=c.id("numTxt");var e=c.parseInt(d.val(),1);d.val(e+1);c.numTxtChange(e+1)});c.id("numTxt").on("input",function(){var d=c.parseInt(a(this).val(),1);a(this).val(d);c.numTxtChange(d)}).on("propertychange",function(){var d=c.parseInt(a(this).val(),1);a(this).val(d);c.numTxtChange(d)});c.id("submit").click(function(){var f=c.id("tel").val();var d=/^1\d{10}$/;if(f==""){a.alert("手机号码不能为空");return false}if(!d.test(f)){a.alert("手机号码格式不正确");return false}var e=c.id("email").val();if(e!=""&&e.indexOf("@")==-1){a.alert("邮箱格式不正确");return false}a.alert("您将购买<span style='color:red'> "+c.id("numTxt").val()+" </span>张票，共计<span style='color:red'> "+c.id("benefitTotalPrice").html()+" </span>元，确定支付订单？","ask",{fn:function(g,h){if(g.index==0){a.ajaxData(c.url.addAgencyOrder,{num:c.id("numTxt").val(),benefitId:c.id("benefitId").val(),tel:f,email:e,srcType:0},{success:function(i){if(i.data.isPaySuccess==1){window.location.href=c.url.agencyOrder}else{a.alert(getResultDesc(i.data.externalOrderIdResult),"error")}}})}}})})},numTxtChange:function(d){if(d<=1){d=1;c.id("numTxt").val(1);c.id("numDecrement").addClass("disabled ")}else{c.id("numDecrement").removeClass("disabled ")}var e=c.id("benefitRemain").val();if(e<=d){d=e;c.id("numTxt").val(e);c.id("numIncrement").addClass("disabled ")}else{c.id("numIncrement").removeClass("disabled ")}c.id("benefitTotalPrice").html(c.id("benefitPrice").val()*d)},parseInt:function(g,d){try{return parseInt(g)}catch(f){return d}},id:function(d){return a("[_id='"+d+"']")}}}(com.yy.agency.AgencyPreorder,jQuery));var preorder=new com.yy.agency.AgencyPreorder();preorder.init();