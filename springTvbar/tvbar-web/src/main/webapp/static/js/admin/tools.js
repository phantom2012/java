var sxxz = {
	sx_data: ['猴','鸡','狗','猪','鼠','牛','虎','兔','龙','蛇','马','羊'],
	xz_data:"魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手", 
	xz_seps:[20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22],
	get : function(year, month, day) {
		if (typeof year == 'undefined' || typeof month == 'undefined' || typeof day == 'undefined') {
			return '';
		}
		if (year == '' || month == '' || day == '') {
			return '';
		}
		if ((month < 0 || month > 12) || (day < 0 || day > 31)) return '';
		month--;
		var sx = /^\d{4}$/.test(year.toString())?(this.sx_data[year%12]):'';
		var xz = this.xz_data.substr(((day >= this.xz_seps[month] ? (month+1) : month) % 12) * 2, 2)+'座';
		//return '生肖：'+sx+'   星座：'+xz;
		return xz;
	}
};

var toDate = function(str){
	 var obj = new Object();
	 if(typeof str == 'string'){
		 var res = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);
		 if(res && res.length>3){
			obj.year = parseInt(res[1]);
			obj.month = parseInt(res[2],10);
			obj.day = parseInt(res[3],10);
		 }
	 }
	return obj;
};

var appendZero = function(num) {
	var temp = parseInt(num);
	if (temp < 10) {
		return '0'+temp;
	}
	return temp;
}

function getMap() {
    var map_ = new Object();  
    map_.put = function(key, value) {  
         map_[key+'_'] = value;  
    };  
    map_.get = function(key) {  
         return map_[key+'_'];  
    };  
    map_.remove = function(key) {  
         delete map_[key+'_'];  
    };  
    map_.kset = function() {  
		 var ret = "";  
		 for(var p in map_) {  
		     if(typeof p == 'string' && p.substring(p.length-1) == "_") {  
		     	ret += ",";  
		        ret += p.substring(0,p.length-1);  
		     }  
		 }  
		 if(ret == "") {  
		 	return ret.split(",");  
		 } else {  
		     return ret.substring(1).split(",");  
		 }  
    };
    map_.vset = function() {
    	var ret = "";  
		 for(var p in map_) {  
		     if(typeof p == 'string' && p.substring(p.length-1) == "_") {  
		         ret += ",";  
		         ret += map_[p.substring(0,p.length-1)+"_"];  
		     }  
		 }  
		 return ret;
    }; 
    return map_;  
}

function showMessage(message){
	 $.teninedialog({
        title:'系统提示',
        content:message
    });			
}

function showLoading(){
	var div = $('#loading');
	if(!div.html()){
		$("body").append("<div id='loading' class='loading'>处理中...</div>");
	}
}

function hideLoading(){
	var div = $('#loading');
	if(div.html()){
		$('#loading').remove();
	}
}

function showConfirm(message,callback){
	var args = arguments;
	$.teninedialog({
        title:'系统提示',
        content:message,
        showCloseButton:true,
        otherButtons:["确定","取消"],
        otherButtonStyles:['btn-primary','btn-primary'],
        bootstrapModalOption:{keyboard: true},                   
        clickButton:function(sender,modal,index){
            if(index==0){
            	if(args.length<2) showMessage('参数数量非法!');
            	if(args.length==2) callback();
            	if(args.length==3) callback(args[2]);
            	if(args.length==4) callback(args[2],args[3]);
            	if(args.length==5) callback(args[2],args[3],args[4]);
            	if(args.length>5) showMessage('最多只支持3个参数!');
            }
            $(this).closeDialog(modal);
        }
    });
}
function showConfirmForm(message,callback,form,successFun){
	$.teninedialog({
        title:'系统提示',
        content:message,
        showCloseButton:true,
        otherButtons:["确定","取消"],
        otherButtonStyles:['btn-primary','btn-primary'],
        bootstrapModalOption:{keyboard: true},                   
        clickButton:function(sender,modal,index){
            if(index==0){
            	callback(form,successFun);
            	/*if(args.length==2)callback(args[0],args[1]);
            	if(args.length==3)callback(args[0],args[1],args[2]);
            	if(args.length==4)callback(args[0],args[1],args[2],args[3]);*/
            }
            $(this).closeDialog(modal);
        }
    });
}
