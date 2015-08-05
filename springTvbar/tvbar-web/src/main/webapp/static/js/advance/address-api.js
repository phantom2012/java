var myAddress = myAddress || {};

myAddress.defaultName = "请输入收件人";
myAddress.defaultDetail = "详细地址";
myAddress.defaultTel = "请输入内容（必填）";
myAddress.defaultCode = "请输入邮政编码";


/**
 * 再次获得焦点时候，找到提示信息位置,报错消失
 * 入参：报错位置
 */
myAddress.fcus = function(index) {
	index.css("display", "none");
};

/**
 * 手机号码输入框再次获得焦点时候，输入框中值为原数据的话置空，否则找到提示信息位置,报错消失
 * 入参：报错位置
 */
myAddress.tel_fcus = function(index) {
    var value = $("#addr-tel").val(); // 获得表单里面的值
    var hidden_tel = $("#hidden-tel").val();
    if (hidden_tel == value) {
		// 输入框中值为原数据,输入框置空
    	$("#addr-tel").val("");
	}
	index.css("display", "none");
};

/**
 * 固话号码输入框再次获得焦点时候，输入框中值为原数据的话置空，否则找到提示信息位置,报错消失
 * 入参：报错位置
 */
myAddress.teleNum_fcus = function(index) {
    var value = $("#addr-phone").val(); // 获得表单里面的值
    var hidden_teleNum = $("#hidden-teleNum").val();
    if (hidden_teleNum == value) {
		// 输入框中值为原数据,输入框置空
    	$("#addr-phone").val("");
	}
	index.css("display", "none");
};

/**
* 表单校验，让出错的语句显示在指定的位置
* 入参：报错位置对象，报错内容
*/
// 找到错误的信息的现实位置,显示错误信息
myAddress.onerr = function(index, text) {
    index.css("display", "inline");
    index.addClass("errortip");
    index.html(text);
};

/**
 * 检验收货人名称
 * 入参：报错位置对象，收货人表框对象
 */
myAddress.validateName = function(index, nameObject) {
    //var d = $(this).defaultValue;
    index.removeClass("oktip");
    var name = nameObject.val(); // 获得表单里面的值
    // 如果获得收货人名称为空 则报错提示输入名称
    if (isEmpty(name) ||isEmpty(trim(name))|| myAddress.defaultName == name) {
        // nameObject.val(myAddress.defaultName);
        // nameObject.css("color","#bbb");
        myAddress.onerr(index, "姓名不能为空");
        return false;
    } else {
    	name=trim(name);
        if (minChar(2, name)) {
            // 如果获得字符长度小于2
            myAddress.onerr(index, "请输入2-12个汉字、英文或数字");
            return false;
        }
        if (maxChar(12, name)) {
            // 如果获得字符长度大于12
            myAddress.onerr(index, "请输入2-12个汉字、英文或数字");
            return false;
        }
        if (!checkInvalidSpecialChars(name)) {
            // 如果获得字符长度大于12
            myAddress.onerr(index, "请输入2-12个汉字、英文或数字");
            return false;
        }
    }
    index.html("");
    index.removeClass("errortip");
    index.removeClass("hide");
    index.show();
    index.addClass("oktip");
    return true;
};

/**
 * 检验详细地址
 * 入参：报错位置对象，详细地址表框对象
 */
myAddress.validateDetail = function(index, nameObject,province,city,county) {
    //var d=nameObject.attr("value");
    var value = $.trim(nameObject.val()); // 获得表单里面的值
    if(isEmpty(province.html()) || province.html() == "省份"){
        myAddress.onerr(index, "请选择省份");
        return false;
    }else  if(isEmpty(city.html()) || city.html() == "地级市"){
        myAddress.onerr(index, "请选择城市");
        return false;
    }else  if(isEmpty(county.html()) || county.html() == "市、县级市"){
        myAddress.onerr(index, "请选择区域");
        return false;
    }
    if (isEmpty(value) || myAddress.defaultDetail == value) {
        // nameObject.val(myAddress.defaultDetail);
        // nameObject.css("color","#bbb");
        myAddress.onerr(index, "详细地址不能为空");
        return false;
    } else {
        if (!checkInvalidChar(value)) {
            // 如果详细地址包含非法字符
            myAddress.onerr(index, "详细地址只能包含数字、字母、汉字、#、-、（）及其组合");
            return false;
        }
        if (maxChar(30, value)) {
            // 如果获得字符长度大于30
            myAddress.onerr(index, "最多允许输入30个汉字");
            return false;
        }
    }
    index.hide();
    return true;
};
function checkInvalidChar(value){
    return true;
}
/**
 * 检验手机号码
 * 入参：报错位置对象，手机号码表框对象
 */
myAddress.validateTel = function(index, nameObject) {
    //var d=nameObject.defaultValue;
	index.removeClass("oktip");
    var value = nameObject.val(); // 获得表单里面的值
    var hidden_tel = $("#hidden-tel").val()||"";
    // 如果获得手机号为空 则报错提示输入手机号
    if (isEmpty(value) || myAddress.defaultTel == value) {
    	if (hidden_tel.length > 0) {
			// 原来有值
    		// nameObject.val(hidden_tel);
		} else {
	        // nameObject.val(myAddress.defaultTel);
	        // nameObject.css("color","#bbb");
	        myAddress.onerr(index, "手机号码不能为空");
	        return false;
		}
    } else if(hidden_tel == value){
    	// 没有修改
    } else {
        var b = /^1\d{10}$/;
        // 如果格式不正确
        if (!b.test(value)) {
            myAddress.onerr(index, "手机号码格式不正确");
            return false;
        }
    }
    index.html("");
    index.removeClass("errortip");
    index.removeClass("hide");
    index.show();
    index.addClass("oktip");
    return true;
};

/**
 * 检验邮政编码
 * 入参：报错位置对象，邮政编码表框对象
 */
myAddress.validateCode = function(index, nameObject) {
    //var d=nameObject.attr("value");
	index.removeClass("oktip");
    var value = nameObject.val(); // 获得表单里面的值
    if (isEmpty(value) || myAddress.defaultCode == value) {
	        myAddress.onerr(index, "邮政编码不能为空");
	        return false;
    }else {
        if (value.length != 6) {
            // 如果长度不符合
            myAddress.onerr(index, "请输入6位邮政编码");
            return false;
        }
        var b1 = /[0-9]/;
        if (!b1.test(value)) {
            // 如果格式不正确
            myAddress.onerr(index, "邮政编码格式不正确");
            return false;
        }
    }

    index.html("");
    index.removeClass("errortip");
    index.removeClass("hide");
    index.addClass("oktip");
    return true;
};
function checkInvalidSpecialChars(d) {
    var f = /([\u4e00-\u9fa5]|[a-z]|[A-Z]|[0-9])+/;
    for (var e = 0; e < d.length; e++) {
        if (!f.test(d.charAt(e))) {
            return false
        }
    }
    return true
}
function maxChar(c, d) {
    return d.length > c ? true : false
}
function minChar(c, d) {
    return d.length < c ? true : false
}
function trim(b) {
    return b.replace(/^\s+/, "").replace(/\s+$/, "")
}
function isEmpty(b) {
    if (b == "" || b == null || b.length == 0) {
        return true
    } else {
        return false
    }
}
function checkInvalidChar(d) {
    var f = /[\u4e00-\u9fa5]|[a-z]|[A-Z]|[0-9]|[#]|[-]|[(]|[)]|[（]|[）]|[ ]/;
    for (var e = 0; e < d.length; e++) {
        if (!f.test(d.charAt(e))) {
            return false
        }
    }
    return true
}
