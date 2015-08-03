;
var com = com || {};
com.yy = com.yy || {};
com.yy.agency = com.yy.agency || {};
com.yy.agency.AgencyOrder = function () {
};
!(function (obj, $) {
    var _this;
    var isAddressEdit=false;
    var addressEditId;
    var isAddAddress=false;
    obj.prototype = {
        init: function () {
            _this = this;
            _this.initEvent();
            _this.initHaoYe();
        },
        url:{
            addAgencyPerson:"/agency/ticket/addAgencyPerson.action",
            updateAgencyPerson:"/agency/ticket/updateAgencyPerson.action",
            deleteAgencyPerson:"/agency/ticket/deleteAgencyPerson.action",
            addAddressAgencyOrder:"/agency/ticket/addAddressAgencyOrder.action",
        },
        initEvent:function(){
            _this.id("addressActivate").live("click",function(){
                isAddressEdit=true;
                var tbody = $(this).closest("[_addressid]");
                var id=tbody.attr("_addressId");
                _this.id("addressActivate").removeClass("on");
                $(this).addClass("on");
            });

            _this.id('addAddress').click(function(){
                var $this = $(this);
                isAddAddress=true;
                if($this.attr("isSet")==1){
                    _this.showAddress($this);
                }else{
                    var first = _this.id("addressWrapper").find("[_id=addressActivate]").eq(0);
                    if(first.size()==0){
                        _this.id("addNewAddress").click();
                    }else{
                        _this.id("useAddress").show();
                        if(isAddAddress){
                            _this.id("useAddress").show();
                        }
                    }
                    _this.id("useAddress").attr("_orderid",$this.attr("_orderid"));
                    _this.id('popup-box1').bPopup();
                }
            });
            _this.id("useAddress").click(function(){
                var $this = $(this);
                var orderId = $this.attr("_orderid");
                var on=$(".on[_id=addressActivate]")
                var tbody = on.closest("[_addressid]");
                var tds = tbody.find("td");
                var addressId=tbody.attr("_addressId");

                $.ajaxData(_this.url.addAddressAgencyOrder,{
                    personId:addressId,
                    orderId:orderId
                },{success:function(json){
                    var addAddress = $("[_id=addAddress][_orderid=" + orderId + "]");
                    addAddress.html("查看收货地址");
                    addAddress.attr("isSet",1);
                    addAddress.attr("_address",tds.eq(2).find("p").html());
                    addAddress.attr("_zip",tds.eq(3).html());
                    addAddress.attr("_tel",tds.eq(1).html());
                    addAddress.attr("_name",tds.eq(0).html());

                    $(".close-btn").click();
                    $.alert("填写收货地址成功","success");
                }});

            });
            _this.id('showAddress').click(function(){
                var $this = $(this);
                _this.showAddress($this);
            });

            _this.id("addressEdit").live("click",function(){
                isAddressEdit=true;
                var tbody = $(this).closest("[_addressid]");
                addressEditId=tbody.attr("_addressId");
                tbody.find("[_id=addressActivate]").click();
                var tds = tbody.find("td");
                $("#myName").val(tds.eq(0).html());
                $("#myTel").val(tds.eq(1).html());
                $("#myCode").val(tds.eq(3).html());

                var address=tds.eq(2).find("p").attr("_address").split("##");
                $("#s_province").val(address[0]).trigger('change');
                $("#s_city").val(address[1]).trigger('change');
                $("#s_county").val(address[2]).trigger('change');
                $("#myAdress").val(address[3]);

                tbody.find("[_id=addressActivate]").click();
                _this.id("addNewAddress").hide();
                _this.id("useAddress").hide();
                $('.popup-box .add-box').show();

                var f1=myAddress.validateName($("#label-1 .error-tip"),$("#myName"));
                var f2=myAddress.validateTel($("#label-2 .error-tip"),$("#myTel"));
                var f3=myAddress.validateDetail($("#label-3 .error-tip"),$("#myAdress"),$(".province"),$(".city"),$(".county"));
                var f4=myAddress.validateCode($("#label-4 .error-tip"),$("#myCode"));
            });

            _this.id("addressDel").live("click",function(){
                var tbody = $(this).closest("[_addressid]");
                var id=tbody.attr("_addressId");
                $.alert("确定删除地址?","ask",{fn:function(btn,content){
                    if(btn.index==0){
                        //确定按钮
                        $.ajaxData(_this.url.deleteAgencyPerson, {id:id},{success:function(json){
                            tbody.remove();
                            if(addressEditId==id){
                                isAddressEdit=false;
                            }
                            $.alert("删除地址成功","success");
                        }});
                    }
                }})
            });
        },
        initHaoYe:function(){
            $(function(){
                //初始化地址
                _init_area();

                //查看收货信息
                $(".address-btn").click(function(){
                    isAddAddress=false;
                    _this.id("useAddress").hide();
                    var first = _this.id("addressWrapper").find("[_id=addressActivate]").eq(0);
                    if(first.size()==0){
                        _this.id("addNewAddress").click();
                    }
                    _this.id('popup-box1').bPopup();
                })
                //新增
                _this.id("addNewAddress").click(function(){
                    isAddressEdit=false;
                    $("#myName").val("");
                    $("#myTel").val("");
                    $("#myAdress").val("");
                    $("#myCode").val("");

                    $("#s_province").val("").trigger('change');;
                    $("#s_city").val("").trigger('change');;
                    $("#s_county").val("").trigger('change');;

                    _this.id("addNewAddress").hide();
                    _this.id("useAddress").hide();
                    $('.popup-box .add-box').show();
                })
                //点击保存的时候做验证
                $(".save-btn").on("click",function(){
                    var f1=myAddress.validateName($("#label-1 .error-tip"),$("#myName"));
                    var f2=myAddress.validateTel($("#label-2 .error-tip"),$("#myTel"));
                    var f3=myAddress.validateDetail($("#label-3 .error-tip"),$("#myAdress"),$(".province"),$(".city"),$(".county"));
                    var f4=myAddress.validateCode($("#label-4 .error-tip"),$("#myCode"));
                    if(f1&&f2&&f3&f4){
                        //submit
                        var data = {
                            name: $("#myName").val(),
                            tel: $("#myTel").val(),
                            email: "",
                            region: "",
                            address: $(".province").html() +"##"+ $(".city").html() +"##"+$(".county").html() +"##"+$("#myAdress").val(),
                            zip: $("#myCode").val()
                        };
                        if(isAddressEdit){
                            data.id=addressEditId;
                            $.ajaxData(_this.url.updateAgencyPerson, data,{success:function(json){
                                var tbody = $("[_addressId=" + addressEditId + "]");
                                var tds = tbody.find("td");
                                tds.eq(0).html($("#myName").val());
                                tds.eq(1).html($("#myTel").val());
                                tds.eq(2).find("p").html(data.address.replaceAll("##"," "));
                                tds.eq(3).html($("#myCode").val());
                                $(".canle-btn").click();
                                tbody.find("[_address]").attr("_address",data.address);
                                tbody.attr("_addressId",json.data);
                                $.alert("地址编辑成功","success");
                            }});
                        }else{
                            $.ajaxData(_this.url.addAgencyPerson, data,{success:function(json){
                                $(".canle-btn").click();
                                $.alert("地址新增成功","success");
                                var html="<tbody _addressId=\""+json.data+"\">" +
                                    "        <tr>" +
                                    "            <td _id=\"addressActivate\">"+data.name+"</td>" +
                                    "            <td>"+data.tel+"</td>" +
                                    "        <td><p _address=\""+data.address+"\">"+data.address.replaceAll("##"," ")+"</p></td>" +
                                    "            <td>"+data.zip+"</td>" +
                                    "            <td><a href=\"javascript:void(0)\" _id=\"addressEdit\">编辑</a><a href=\"javascript:void(0)\"  _id=\"addressDel\">删除</a></td>" +
                                    "        </tr>" +
                                    "    </tbody>";
                                var colgroup = _this.id("addressWrapper").find("colgroup");
                                colgroup.after(html);
                                $("[_addressId="+json.data+"]").find("[_id=addressActivate]").click();
                            }});
                        }
                    }
                })
                //取消
                $(".canle-btn").click(function(){
                    _this.id("addNewAddress").show();
                    if(isAddAddress){
                        _this.id("useAddress").show();
                    }
                    $('.popup-box .add-box').hide();
                })

                //省市区绑定事件
                $("#s_province").on("change", function() {
                    var o;
                    var opt = $(this).find('option');
                    opt.each(function(i) {
                        if (opt[i].selected == true) {
                            o = opt[i].innerHTML;
                        }
                    })
                    $('.province').html(o);
                    $("#s_city").trigger('change');
                }).trigger('change');

                $("#s_city").on("change", function() {
                    var o;
                    var opt = $(this).find('option');
                    opt.each(function(i) {
                        if (opt[i].selected == true) {
                            o = opt[i].innerHTML;
                        }
                    })
                    $('.city').html(o);
                    $("#s_county").trigger('change');
                }).trigger('change');
                $("#s_county").on("change", function() {
                    var o;
                    var opt = $(this).find('option');
                    opt.each(function(i) {
                        if (opt[i].selected == true) {
                            o = opt[i].innerHTML;
                        }
                    })
                    $('.county').html(o);
                }).trigger('change');


            })
        },
        showAddress:function($this) {
            _this.id('popup-box2').bPopup();
            _this.id("myAddressAddress").html($this.attr('_address').replaceAll("##", " "));
            _this.id("myAddressTel").html($this.attr('_tel'));
            _this.id("myAddressZip").html($this.attr('_zip'));
            _this.id("myAddressName").html($this.attr('_name'));
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
}(com.yy.agency.AgencyOrder, jQuery));
var order=new com.yy.agency.AgencyOrder();
order.init();