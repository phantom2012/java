;
var com = com || {};
com.yy = com.yy || {};
com.yy.agency = com.yy.agency || {};
com.yy.agency.AgencyOrder = function () {
};
!(function (obj, $) {
    var _this;
    obj.prototype = {
        init: function () {
            _this = this;
            _this.initEvent();
        },
        url:{
            adminDeliveredAgencyOrder:"/agency/admin/adminDeliveredAgencyOrder.action",
            adminQueryAgencyContact:"/agency/admin/adminQueryAgencyContact.action",
        },
        initEvent:function(){
            //取消
            $(".canle-btn").click(function(){
                _this.id("popup-box").hide();
            });
            _this.id("waitSetAddress").click(function(){
                var orderId = $(this).attr("_orderid");
                $.ajaxData(_this.url.adminQueryAgencyContact,{orderId:orderId},{success:function(json){
                    var message = "手机：" + json.data.tel;
                    if(json.data.email){
                        message = "<br>邮箱：" + json.data.email;
                    }
                    $.alert(message,"success");
                }});
            });

            _this.id("setExpressId").click(function(){
                _this.id("submitExpressId").attr("_orderid",$(this).attr("_orderid"))
                _this.id("popup-box").bPopup();
            });

            _this.id("submitExpressId").click(function(){
                var orderId = $(this).attr("_orderid");
                var expressId = _this.id("expressId").val();
                if(expressId==""){
                    $.alert("请输入快递单号","error");
                    return;
                }


                $.ajaxData(_this.url.adminDeliveredAgencyOrder,{
                    orderId:orderId,
                    expressId:expressId
                },{success:function(json){
                    var setExpressId = $("[_id=setExpressId][_orderid=" + orderId + "]");
                    var newExpressId = setExpressId.closest("tbody").find("[_id=newExpressId]");
                    var newStatus = setExpressId.closest("tbody").find("[_id=newStatus]");
                    setExpressId.hide();
                    newStatus.html("已发货");
                    newExpressId.html("快递号："+expressId);
                    $(".bClose").click();
                }});
            });
        },
        id:function(_id){
            return $("[_id='"+_id+"']");
        }
    }
}(com.yy.agency.AgencyOrder, jQuery));
var order=new com.yy.agency.AgencyOrder();
order.init();