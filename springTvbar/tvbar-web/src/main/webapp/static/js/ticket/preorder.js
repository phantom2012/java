;
var com = com || {};
com.yy = com.yy || {};
com.yy.agency = com.yy.agency || {};
com.yy.agency.AgencyPreorder = function () {
};
!(function (obj, $) {
    var _this;
    obj.prototype = {
        init: function () {
            _this = this;
            _this.initEvent();
            //initAddress();
        },
        url:{
            addAgencyPerson:"/agency/ticket/addAgencyPerson.action",
            updateAgencyPerson:"/agency/ticket/updateAgencyPerson.action",
            deleteAgencyPerson:"/agency/ticket/deleteAgencyPerson.action",
            addAgencyOrder:"/agency/ticket/addAgencyOrder.action",
            agencyOrder:"/agency/ticket/agencyOrder.action"
        },

        initEvent:function(){
            _this.id("numDecrement").click(function(){
                var txt = _this.id("numTxt");
                var num=_this.parseInt(txt.val(),1);
                if(num>=2){
                    txt.val(num-1);
                    _this.numTxtChange(num-1);
                }
            });
            _this.id("numIncrement").click(function(){
                var txt = _this.id("numTxt");
                var num=_this.parseInt(txt.val(),1);
                txt.val(num+1);
                _this.numTxtChange(num+1);
            });
            _this.id("numTxt").on("input",function(){
                var num=_this.parseInt($(this).val(),1);
                $(this).val(num);
                _this.numTxtChange(num);
            }).on("propertychange",function(){
                var num=_this.parseInt($(this).val(),1);
                $(this).val(num);
                _this.numTxtChange(num);
            });

            _this.id("submit").click(function () {
                var tel = _this.id("tel").val();
                var b = /^1\d{10}$/;
                // 如果格式不正确
                if(tel==""){
                    $.alert("手机号码不能为空");
                    return false;
                }
                if (!b.test(tel)) {
                    $.alert("手机号码格式不正确");
                    return false;
                }
                var email = _this.id("email").val();
                if(email!=""&&email.indexOf("@")==-1){
                    $.alert("邮箱格式不正确");
                    return false;
                }
                $.alert("您将购买<span style='color:red'> "+_this.id("numTxt").val()+" </span>张票，共计<span style='color:red'> "+_this.id("benefitTotalPrice").html()+" </span>元，确定支付订单？","ask",{fn:function(btn,content){
                    if(btn.index==0){
                        //确定按钮
                        //add and pay
                        $.ajaxData(_this.url.addAgencyOrder, {
                            num: _this.id("numTxt").val(),
                            benefitId: _this.id("benefitId").val(),
                            tel: tel,
                            email: email,
                            srcType: 0
                        }, {
                            success: function (json) {
                                if (json.data.isPaySuccess == 1) {
                                    //成功
                                    window.location.href = _this.url.agencyOrder;
                                } else {
                                    $.alert(getResultDesc(json.data.externalOrderIdResult), "error");
                                }
                            }
                        });
                    }
                }})
            });
        },
        numTxtChange:function(num) {
            if (num <= 1) {
                num=1;
                _this.id("numTxt").val(1);
                _this.id("numDecrement").addClass("disabled ");
            } else {
                _this.id("numDecrement").removeClass("disabled ");
            }
            var remain = _this.id("benefitRemain").val();
            if(remain<=num){
                num=remain;
                _this.id("numTxt").val(remain);
                _this.id("numIncrement").addClass("disabled ");
            }else{
                _this.id("numIncrement").removeClass("disabled ");
            }
            _this.id("benefitTotalPrice").html(_this.id("benefitPrice").val()*num);
        },
        parseInt:function(str,def){
            try{
                return parseInt(str)
            }catch(e){
                return def;
            }
        },
        id:function(_id){
            return $("[_id='"+_id+"']");
        }
    }
}(com.yy.agency.AgencyPreorder, jQuery));

var preorder=new com.yy.agency.AgencyPreorder();
preorder.init();