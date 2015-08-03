var callBackFun;

if(!window.uid && $.url)
	window.uid = $.url.param("uid");

window.loginUid = $.cookie('uid');

if(!window.console){
	window.console = {log : function(){}};
}
																										
//把表单元素组装成json对象
if($ || jQuery){
	if(!$.toJSON)
		$.toJSON = function(selector){
			var searchForm = null;
			if(selector instanceof jQuery){
				searchForm = selector;
			}else{
				searchForm = $('#'+selector);
			}
			var form = {};
			var text = searchForm.find("input[type=text]:enabled");
			var hidden = searchForm.find("input[type=hidden]");
		    var radio = searchForm.find("input[type=radio][checked=true]:enabled");
			var select = searchForm.find("select");
			var textArea = searchForm.find("textarea");
		    var rs = text.add(select).add(radio).add(hidden).add(textArea);
			rs.each( function() {
		         var self = $(this);
		         var name = self.attr('name');
		         if (form[name]) {
		            form[name] = form[name] + ',' + self.val();
		         }
		         else {
		            form[name] = self.val();
		         }
	     	});
	     	return form;
		};

}

//验证上传文件类型
function validUploadFlieType(value,type){
	var rxAccept = new RegExp('\\.('+(type?type:'')+')$','gi');
   	return value.match(rxAccept);
}


//定义图片位置
function setImagePosition(t){
	t = $(t);
	if(t.width()/1.5 > t.parent().width()){
		t.css({left:-t.parent().width()/2});
	}
	if(t.height()/1.5 > t.parent().height() && t.width()/1.5 > t.parent().width()){
		t.css({top:-t.parent().height()/2});
	}
	
}

//四舍五入,当小数为0时不显示
 function roundNum(f, c){
   	var t = Math.pow(10, c);
   	var tmp = (f * t)+0.000000001;
   	var result = Math.round(tmp) / t;
   	return result;
   }
function getRoundNum(f,c,d){
	if(c!=0 && !c){
		c = 2;
	}
	if(!d)d=c;
	var result = roundNum(f,c);
    return appendDigit(result,d);
}
//追加小数位
function appendDigit(result,c){
	result = result.toString();
	if(result.indexOf('.')==-1){
		if(c>0){
			result = result +".";
			for(var i=0;i<c;i++){
				result = result + "0";
			}
		}
	}else {
		var rsLen = result.split('.')[1].length;
		if(rsLen<c){
			for(var i=0;i<c - rsLen;i++){
				result = result + "0";
			}
		}
	}

	return result;
}
String.prototype.replaceAll  = function(s1,s2){   
	return this.replace(new RegExp(s1,"gm"),s2);   
} 

String.prototype.trim = function() 
{ 
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.len=function(){  
	  return this.replace(/[^\x00-\xff]/g,"**").length  
} 
String.prototype.replaceAt=function(index, c) {
    return this.substr(0, index) + c + this.substr(index, this.length);
}
//因为测试暂时写死地址
var fileUrlPath = 'http://static.m.yy.com/';//http://172.16.10.244:8081/';
var zoneHomePath = 'http://'+window.location.host+'/';
//var fileUrlPath = 'http://x.yy.com/';////http://172.16.10.244:8081/';

/**
 * 
 * @param {Object} path
 * return path 大图全路径，min 小图全路径 
 */
function getPhotoUrl(path){
	if(typeof(path) != 'string'){
        return {path:"",min:""};
	}
	if(!path || path.trim()=="")return {path:"",min:""};
	path = fileUrlPath + path;
	var index = path.lastIndexOf('.');
	var min = path.substr(0, index)+'_min.jpg';
//	alert(min)
	return {path:path,min:min};
}

/**
 * 渲染公共信息条
 * @param {Object} id
 * @param {Object} json
 */
function renderBaseInfo(id, json){
	$('#totalPv').text(json.total_pv);
	$('#todayPv').text(json.today_pv);
	if($.cookie('uid')!=window.uid){
		return;
	}
    var percent = roundNum(json.used_cap / json.total_cap * 100, 2) + '%';
    $('#capacity div.progress').css({
        width: percent
    });
	$('#capacity div.number').html(percent);
   	var total = roundNum(json.total_cap / 1073741824, 2);
    if (json.used_cap > 1048576 * 10) {
    	var used = roundNum(json.used_cap / 1073741824, 2);
		$('#sizeValue').html('&nbsp;' + used + 'GB / ' + total + 'GB');
	}else if (json.used_cap > 1024 * 10){
    	var used = roundNum(json.used_cap / 1048576, 2);
		$('#sizeValue').html('&nbsp;' + used + 'MB / ' + total + 'GB');
	}else {
    	var used = roundNum(json.used_cap / 1048576, 2);
		var t = 'MB';
		if(used == 0){
			t = 'GB';
		}
		$('#sizeValue').html('&nbsp;' + used + t+' / ' + total + 'GB');
	}
	$('#albumCount').text(json.album_count);
	$('#photoCount').text(json.photo_count);
	
	
	
	
}

function goBack(){
/*	if(window.urlPaths.length > 1){
		var rs = window.urlPaths.pop();
		if(rs)
			$('#pageContent').page(window.urlPaths[window.urlPaths.length -1]);;
	}*/
	var rs = window.urlPaths.pop();
		if(rs){
			var url;
			if(rs.indexOf('photoList')!=-1){
				url = 'albumList.html';
			}else if(rs.indexOf('photoShow')!=-1){
				url = 'photoList.html';
			}else if(rs.indexOf('upload')!=-1){
				url = 'photoList.html';
			}
			$('#pageContent').page(url);
		}
}

//function bindCopyPath(t){
//	var page = window.urlPaths[window.urlPaths.length -1];
//	var index = window.location.href.lastIndexOf('/');
//	var url = window.location.href;
//	if(url.indexOf('#photoShow') == 0){
//		url = url.substr(0, index);	
//	//	if(page){
//	//		var page = page.substring(page.lastIndexOf('/')+1, page.lastIndexOf('.'));
//	//		url += '/?page=' + page;
//	//	}
//	//	if(window.uid){
//	//		url += '&uid=' + window.uid;
//	//	}
//		if(page){
//			var page = page.substring(page.lastIndexOf('/')+1, page.lastIndexOf('.'));
//			url += '/#' + page;
//		}
//		if(window.albumId){
//			url += '&' + window.albumId;
//		}
//		if(window.photoId && page == 'photoShow'){
//			url += '&' + window.photoId;
//		}
//	}
//
//	//Create a new clipboard client
//	if(window.clip){
//		window.clip.destroy();
//	}
//    var clip = new ZeroClipboard.Client();
//    //防止Flash剪贴板ZeroClipboard修改IE页面标题的BUG
//    var docTitle = document.title;
//	clip.glue(t);
//	document.title = docTitle;
//    clip.setText(url);
//    clip.addEventListener('mousedown', function(){
//    	document.title = docTitle;
//    });
//    
//    //Add a complete event to let the user know the text was copied
//    clip.addEventListener('complete', function(client, text){
//        alert("已经复制地址:\n" + text);
//    });
//    window.clip = clip;
//}


function bindCopyText(t,content,id){
	//var content =$('#disCode').html();
    var clip = new ZeroClipboard.Client();
	clip.glue(t);
    clip.setText(content);
    clip.addEventListener('complete', function(client, text){
    	$.uiwidget.popupHide({id: id});
    	 top.$.messagebox({type:'success', msg:'复制成功！'});
    });
}


function wordCount(obj,maxlen,notice_id)
{
	var v = obj.value.trim();
	var len = v.length;
	
	var o = $(obj).parent().parent().find(".curcount").eq(0);
	if(!o) return;
	o.html(len);
	
	if(len > maxlen )
	{
		o.addClass("pop_warning");
		if(notice_id)
		{
			$("#"+notice_id+"").text("您已经输入"+len+"个字符（最多可输入"+maxlen+"个字符）");
			$("#"+notice_id+"").show();
		}
		
	}
	else
	{
		o.removeClass("pop_warning");
		if(notice_id)
		{
			$("#"+notice_id+"").text("");
			$("#"+notice_id+"").hide();
		}
	}
	
}

function wordCount2(obj,maxlen,notice_id)
{
	var v = obj.value.trim();
	//var len = v.length; // 未区分中文、英文长度的不同
	var len = strLength2(v);
	
	if(typeof(len) == 'undefined'){
		len = 0;
	}
	var minValue = Math.floor(len); //向上取整
	var maxValue = Math.ceil(len); //向下取整
	if( len >= maxlen ){
		len = maxValue;
	}else{
		len = minValue;
	}
	var noticeObj = $("#"+notice_id);
	if(!noticeObj) 
	{
		return;
	}
	if(maxlen >= len)
	{
		var last_len = maxlen - len;
		noticeObj.html("您还可以输入<span>"+last_len+"</span>字");
	}
	else
	{
		var last_len = len - maxlen;
		noticeObj.html("<font color='#FF0000'>已超出<span>"+last_len+"</span>字</font>");
	}
}

/**
 *Desc:计算长度，每个汉字占两个长度，英文字符每个占一个长度
 *return:字符串长度(按字节计算)
 */
function strLength(str)
{
	var len = 0;
  	for(var i=0;i<str.length;i++){
	    if(str.charCodeAt(i)>255)
	        len+=2;
	    else
	        len++;
	  }
	return len;
}

/**
 *Desc:计算长度，每个汉字占1个长度，英文字符每个占半个长度
 *return:字符串长度(按字节计算)
 */
function strLength2(str)
{
	var len = 0;
  	for(var i=0;i<str.length;i++){
	    if(str.charCodeAt(i)>255)
	        len = len + 1;
	    else
	        len = len + 0.5;
	  }
	return len;
}

function strLength3(str,index)
{
	var len = 0;
  	for(var i=0;i<str.length;i++){
	    if(str.charCodeAt(i)>255)
	        len = len + 1;
	    else
	        len = len + 0.5;
	        if(len >= index){
	          break ;	
	        }	        
	  }
	return i;
}

var defaulMap = {
		0:"说说这个相册的故事...（非必填）",
		1 : "请输入照片名称",
		2 : "请输入照片描述"	
	}
function cleanWord(obj,type)
{
	if(obj.value == defaulMap[type])
	{
		obj.style.color = "#000";
		obj.value="";
	}
}

function report(){
	
	var v = $('#reportBox textarea').val().trim();
	var len = v.length;
	if(len > 200){
		return;
	}
	var params =  $.toJSON('reportBox');
	params.photoId =  window.photoId;
	
	$.ajax({
        url: 'report.action',
        type: 'post',
        dataType: 'json',
		data: params,
        success: function(json){
			$.uiwidget.showMsgbox("举报成功", 2000);
        }
    });
	$.uiwidget.popupHide({id:'reportBox'});
}

document.onclick = function(e) {
	var evt = e || window.event;
	var evt_tag = evt.target || evt.srcElement;
	if (evt_tag.id != "move_to_btn" && evt_tag.className != "font_down_arrow") {
		isMoveOpen = false;
		$("#move_option").attr("class", "move_option");
		$("#move_to_ul").hide();
	}
}
function getElementLeft(element){
	var actualLeft = element.offsetLeft;
	var current = element.offsetParent;
	while (current !== null){
		actualLeft += current.offsetLeft;
		current = current.offsetParent;
	}
	return actualLeft;
}
function getElementTop(element){
	var actualTop = element.offsetTop;
	var current = element.offsetParent;
	while (current !== null){
		actualTop += current.offsetTop;
		current = current.offsetParent;
	}
	return actualTop;
}

var MyAlbum = (function() {
	var inner;
	window.albumFlag = true;
	var albumFlag = true;
	return inner = {
		
		CheckLogin : function(isLoginServ,isMyself) {// 判断是否登录
			if (isLoginServ && isMyself) {
				var _passport = jQuery.cookie('username');
				var _pwd = jQuery.cookie('accessToken');
				if (_pwd && _pwd != "" && _passport && _passport != "") {
					return true;
				}
			}
			return false;
		},
		Submit : function(pathURl, CallBack, responseDataType, Data) {// 提交数据
		//	alert(window.uid);
		//	$.param({uid:window.uid});

			if(albumFlag)
			{
				albumFlag = false;
				$.ajax( {
					type : "POST",
					url : pathURl,
					dataType : responseDataType,
					data : Data,
					success : function(responseText) {
						CallBack(responseText);
						albumFlag = true;
					}
				});
			}
		},
		PhotoManage : function(obj) {// 管理
			if (mode < 1)// 可开启
			{
				mode = 1;
				$("#photo_edit_div").show();
				$(".edit-mode").show();
				$(".edit-mode").parent().find("span").hide();
				$("#edit_mode_btn").hide();
				$("#exit_manage").show();
				isManage = true;// 设置为管理状态
			} else // 关闭
			{
				mode = 0;
				$("#photo_edit_div").hide();
				$(".edit-mode").hide();
				$(".edit-mode").parent().find("span").show();
				$("#edit_mode_btn").show();
				$("#exit_manage").hide();
				isManage = false;// 取消管理状态
			}

			$(".bg_img").click(function() {
				return !isManage;
			});
		},
		SelectIput : function(obj)// 勾选复选框
		{
			if (isManage) {
				var picCheckBox = $(obj).parent().next().find(
						"input[name='pic_checkbox']").get(0);

				if (picCheckBox.checked) {
					picCheckBox.checked = false;
				} else {
					picCheckBox.checked = true;
				}
			}
		},
		setAlbumCover : function(album_id, photo_id) {// 设为封面
			// 设置相册ID
			var albumid = "";
			if (album_id) {
				albumid = album_id;
			} else {
				albumid = albumId;
			}
			// 照片ID
			var PicId = "";
			if (photo_id) {
				PicId = photo_id;
			} else {
				var picInputs = $("input[name='pic_checkbox']");
				var coverInput = [];

				for ( var i = 0; i < picInputs.length; i++) {
					if (picInputs[i].checked) {
						coverInput.push(picInputs[i]);
					}
				}

				if (coverInput.length < 1) {
					alert("您还没有选择照片，请勾选一张做封面。");
					return false;
				}
				if (coverInput.length > 1) {
					alert("您勾选了多张照片，请勾选一张做封面。");
					return false;
				}

				PicId = coverInput[0].id;
			}

			if (albumid && PicId) {
				var url = "setCover.action?albumId=" + albumid + "&photoId="
						+ PicId;
				MyAlbum.Submit(url, function(responseData) {
					if (responseData.flag) {
						$('span[class=cover_flag]').remove();
						$('#'+PicId).append('<span class="cover_flag"></span>');
						$.uiwidget.showMsgbox("设置封面成功", 2000,null);
					}
				}, "json", "");// 提交保存
			}

		},
		delPhotos : function(photo_ids) {// 批量删除照片
			$.uiwidget.popupHide({id:'deletePhoto'});
			if (albumId == "")
				return;
			if (!photo_ids) {
				photo_ids = getSelIds("请先选择需要删除的照片。");
			}

			if (photo_ids != "") {
				var photo_id = photo_ids.split(",");
				var shanType ="";
				var mingType="";
				for(var i=0;i<photo_id.length;i++)
				{
					var temp = $("#"+photo_id[i]+" span").last().attr("class");
					switch(temp)
				    {
				    	case 'shan_flag':
				    		shanType = "闪亮秀";
				    		break;
				    	case 'ming_flag':
				    		mingType = "上麦名片";
				    		break;
				    	case 'cover_flag':
				    		break;
				   }
					
				}
				$('#photoType').text(shanType+" "+mingType);
				$.uiwidget.popupShow({id:'deletePhoto'});
			}

		},
		movePhotos : function(new_albumid, photo_ids, callBack) {// 批量移动照片
			if (!new_albumid)
				return;
			if (albumId == "")
				return;

			if (!photo_ids) {
				photo_ids = getSelIds("请先选择需要移动的照片。");
			}

			if (photo_ids != "") {
				MyAlbum.Submit("movePhoto.action?oldAlbumId=" + albumId
						+ "&newAlbumId=" + new_albumid, function(responseData) {
					if(responseData.flag == "3"){
						top.$.messagebox({title:'警告',type:'alert', msg:'KTV相册不能移进移出！'});
						return;
					}
					if (responseData.flag) {
						$.uiwidget.showMsgbox("移动成功", 2000,function(){
							if(callBack){
								callBack();
							}
							else{
								var str= new Array();   
								str=photo_ids.split(",");  
								for (i=0;i<str.length ;i++ )   
								{   
									$('#'+str[i]).parent().parent().remove(); 
								}
								var tempPhotoSize = $('.item').length;
								if(tempPhotoSize==0)
									$('#pageContent').page('photoList.html');
							}
								
						});
					} else {
						alert("抱歉，操作失败！请检查网络，稍候再试！");
					}
				}, "json", "ids=" + photo_ids);
			}

		},
		showAlbumList : function() {
			if (isMoveOpen) {
				isMoveOpen = false;
				$("#move_option").attr("class", "move_option");
			} else {
				isMoveOpen = true;
				$("#move_option").attr("class", "move_option_open");
			}

			$("#move_to_ul").toggle();
		}

	};					
						
})();

if(!window.uid)
	window.uid = $.url.param("uid");

/**
 * 判断是不是登录是不是自己
 * @return
 */
function isMySelf(){
	if($.cookie('uid') && $.cookie('uid')!="" && $.cookie('uid')==window.uid)
	{
		return true;
	}
	return false;
}

/**
 * 
 * @param {Object} text 原始串
 * @param {Object} width 容器宽度,单位px
 * @param {Object} suffix 省略符号
 * @param {Object} enWidth 英语字符的宽度，单位px
 * @param {Object} chWidth 中文字符的宽度，单位px
 */
function textOmitor(text, width,suffix,enWidth,chWidth){
	var e = 7,c = 12;
	var intCount = 0;
	var i = 0
	var flag =false;
	if(suffix)
		intCount +=10;
	if(enWidth) 
		e = enWidth;	
	if(chWidth)
		c = chWidth;
	for (; Math.min(i, text.length) != text.length; i++) {
		if (text.charCodeAt(i) > 255) {
			intCount += c;
		} else {
			intCount += e;
		}
		if (intCount > width) {
			flag = true;
			break;
		}
	}
	var result = text.substring(0, i);
	if(flag && suffix)
		result +="....";
	return result;
}

//打开音乐播放器，默认初始播放列表
function openMusicPlayWin(url,autoplay,listType){
	listType = listType||"0";
	var musicPlayerWin = navigator.playerWin; 
	
	if(listType=="0"){
		var songIds = url.split("?ids=")[1];
		if (!songIds) {
			$.uiwidget.showMsgbox("请选择歌曲！","1000",null,0);
			return ;
		}
	}
	
	if(autoplay==undefined)autoplay = true;
	if(!musicPlayerWin || musicPlayerWin.closed){
		var prefix = "&"; 
		if(url.indexOf("?")==-1){
			prefix = "?";
		}
		url += prefix+"autoplay="+autoplay+"&listType="+listType;
		var newURL = $.cookie('playerURL');
		var isAdd = true;
		if (!newURL) {
			newURL = url;
			isAdd = false;
		}
		musicPlayerWin = openZonePlayerWin(newURL);
		if(isAdd){
			musicPlayerWin.goToPlayerList(songIds,autoplay,listType);
		}
	}else {
		musicPlayerWin.goToPlayerList(songIds,autoplay,listType);
	}
	musicPlayerWin && musicPlayerWin.focus();
	return false;
}

//打开播放器窗口
function openZonePlayerWin(newURL){
	var WWidth = 1020;//395;
	var WHeight = 650;
	var WLeft = Math.ceil((window.screen.width-WWidth)/2);  
	var WTop =Math.ceil((window.screen.height- WHeight)/2); 
	var musicPlayerWin = window.open(newURL, 'yymusicbox', 'width='+WWidth+',height='+WHeight+',top='+WTop+',left='+WLeft+',scrollbars=1,resizable=no,status=1');
	navigator.playerWin = musicPlayerWin;
	return musicPlayerWin;
}
//获得弹出播放器的窗口
function getZonePlayerWin(){
	var newURL = $.cookie('playerURL');
	if(newURL){
		return openZonePlayerWin(newURL);
	}
	return null;
}
//去到听的播放列表
function goPlayerLisenList(url,autoplay){
	openMusicPlayWin(url,autoplay,"1");
}

//得到a标签的href文本
function getHref(href){
	if($.browser.msie){
		href = href.substring(href.lastIndexOf('/')+1, href.length);
	}
	return href;
}


function showIsSingerBack(isSinger){
	if(isSinger){
		window.location.href="/zone/"+getPerLoginPath()+"/";
	}
	else{
		$.uiwidget.popupShow({id:'myZoneBox'});
		$('#myZoneBox .warning_con').remove();
		$('#myZoneBox .warning_icon').after("<li class='warning_con'>你还没有<a href='/zone/singer/regsinger.html'>成为主播</a>，无法获得主播空间</li>");
	}
}
//flag有就代表公会
function getIconClassByLevel(level, flag){
	var lvlClass;
	var lvl = parseInt(level);
		if(lvl >= 1 && lvl <= 10){
			if(flag)
				lvlClass = 'gh_lv_gray';
			else
				lvlClass = 'lv_gray';
		}else if(lvl >= 11 && lvl <= 20){
			if(flag)
				lvlClass = 'gh_lv_white';
			else
				lvlClass = 'lv_white';
		}else if(lvl >= 21 && lvl <= 30){
			if(flag)
				lvlClass = 'gh_lv_green';
			else
				lvlClass = 'lv_green';
		}else if(lvl >= 31 && lvl <= 40){
			if(flag)
				lvlClass = 'gh_lv_blue';
			else
				lvlClass = 'lv_blue';
		}else if(lvl >= 41 && lvl <= 50){
			if(flag)
				lvlClass = 'gh_lv_purple';
			else
				lvlClass = 'lv_purple';
		}else if(lvl >= 51 && lvl <= 60){
			if(flag)
				lvlClass = 'gh_lv_yellow';
			else
				lvlClass = 'lv_yellow';
		}
	return lvlClass;
}

function getPerLoginPath()
{
	var path = $.cookie('yy_num');
	if(!path){
		$.ajax({
			url: 'getYYInfos.action',
			type: 'get',
			dataType: 'json',
			async:false,
			data: {uids:$.cookie('uid')},
			success: function(json){
				$.each(json, function(i, n){
					path = n.yy_num;
					if(path){
						$.cookie('yy_num',path, { expires: 1, path: '/', domain: 'yy.com' });
					}
					return path;
				});
			}
		});
	}
	return path;
}
//显示日期 n可以为正负，负表示几天前，正表示几天后
function showdate(n)  
{  
	var uom = new Date();
	uom.setDate(uom.getDate()+n);  
	uom = uom.getFullYear() + "-" +   (uom.getMonth()+1) + "-" + uom.getDate();  
	return uom;  
} 
/*
//F5刷新当前页面
$(document).keypress(function(e){
	if(e.keyCode == 116){
		if(window.urlPaths && window.urlPaths.length > 0){
			var pop = window.urlPaths.pop();
			if(pop.indexOf('/center') > 0 || pop.indexOf('/gh') > 0){
				$('#right').page(pop);
			}else{
				$('#pageContent').page(pop);
			}
		}
		return false;
	}
});
*/
//YY号
function regiesterInputCssChange(inputEle,defaultText,changeColor){
	
	changeColor = changeColor||"rgb(127, 127, 127)";
	inputEle.unbind("focus").focus(function(){
		var uidChangeFlag = inputEle.data("changeFlag");
        if (!uidChangeFlag) 
            $(this).val("");
        $(this).css("color", "");
    }).unbind("blur").blur(function(){
		var uidChangeFlag = inputEle.data("changeFlag");
        if (!uidChangeFlag){
			$(this).val(defaultText);
			$(this).css("color", changeColor);
		} 
    }).unbind("change").change(function(){
        if ($.trim($(this).val()) != "") 
            inputEle.data("changeFlag",true)
        else 
           inputEle.data("changeFlag",false)
    });
}

/** 
* 数组去重复 
*/  
function undulpicate(array){  
    for(var i=0;i<array.length;i++) {  
        for(var j=i+1;j<array.length;j++) {  
            //注意 ===  
            if(array[i]===array[j]) {  
                array.splice(j,1);  
                j--;  
            }  
        }  
    }  
    return array;  
}       

/**
 * 公共弹出歌曲评论
 * @param {Object} songId
 * @param {Object} uid
 * @param {Object} index
 */
function popSongComments(songId, uid, index,type){
	$.uiwidget.popupShow({id:'comment_warp'});
	window.songIndex = index;
	if(window.songIndex == null){
		$('#comment_warp div.comment_title a').text("");
		$('#comment_title_text').text('评论');
		$('#btm_opr_bar').hide();
		window.songCommentPop.addCommentUrl= 'addBlogComment.action';
		window.songCommentPop.getDataUrl='getBlogCommentList.action';
		window.songCommentPop.deleteCommentUrl='deleteBlogComment.action';
		window.songCommentPop.type = type;
	}else{
		$('#btm_opr_bar').show();
		var song = window.songList[window.songIndex];
		$('#comment_warp div.comment_title a').text(song.name);
		$('#comment_title_text').html('&nbsp;&nbsp;的评论');
		window.songCommentPop.addCommentUrl= 'addSongComment.action';
		window.songCommentPop.getDataUrl='listSongComment.action'
		window.songCommentPop.getCountUrl='getSongCommentTotalCount.action'
		window.songCommentPop.deleteCommentUrl='deleteSongComment.action'
	}
//	$('#comment_title').attr('href', song.);
	window.songCommentPop.initSongComments(songId, uid);
}          
//转义<>字符
function arrowFilter(s){
    if(!s)return "";
    var html = "";
    var buffer = "";
    for (var i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        switch (c) {
        case '<':
            buffer += "&lt;";
            break;
        case '>':    
			buffer += "&gt;";
            break;
        case '&':
			buffer += "&amp;";
            break;
        case '"':
			buffer += "&quot;";
            break;
        case "'":
			buffer += "\'";
            break;
        default:
            buffer +=c;
        }
    }
    html = buffer.toString();
    return html;
	//return s.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", "\'");
}

function suitableImage(iW, iH, cW, cH, flag){
			if(iW <= cW && iH <= cH){
				return {w:iW,h:iH};
			}
            var w = iW / cW;
            var h = iH / cH;
            if (w > h) {
                var zoom = cW / iW;
                if (flag) {
                    w = iH * zoom;
                    h = cW
                }
                else {
                    w = cW;
                    h = iH * zoom
                }
                
            }
            else {
                var zoom = cH / iH;
                if (flag) {
                    w = cH;
                    h = iW * zoom
                }
                else {
                    w = iW * zoom;
                    h = cH
                }
            }
			return {w:w,h:h};
        }

/**
 * 判断是否登录
 * @return
 */
function check_isLogin(){
	if(!$.cookie('uid')){
		return false;
	}
	return true;
}

/**
 * 没有登录弹出登录窗
 * @return
 */
function checkLogin_ShowLoginBox(){
	if(!$.cookie('uid')){
		showLoginBox('/zone/zoneLogin.html');
		return false;
	}
	return true;
}
//格式化数字
function formatNumberByComma(num)
{
	if(isNaN(num))return num;
	var numArry = String(num).split(".");
    var ss=numArry[0];
    
    var strFormat="";
    while(ss.length>3)
    {
        strFormat=","+ss.substring(ss.length-3,ss.length)+strFormat;
        ss=ss.substring(0,ss.length-3);
    }
    if(ss.length>0)
    {
        strFormat=ss+strFormat;
        if(numArry[1]){
        	strFormat+="."+numArry[1];
        }
    }
    return strFormat;
}

/**
 *   弹出窗口
     1>sFlag=="0" :用window.open()打开
	    sFlag=="1" :用showModalDialog()打开
	  2>sURL :打开窗口的链接地址
 */
function openWindow(sFlag,sURL,sWidth,sHeight,scrollbars){
	OpenDivBox.LayerClose.open(sURL);
}

function openWindowTitle(sURL,sWidth,sHeight,title,divId){
	OpenDivBoxTitle.LayerClose.openWin(sURL,sWidth,sHeight,title,divId);
}


/**
 * 娱乐套件-选车牌公用弹窗入口
 * 
 * @param cardType 车牌大类
 * @param subType 车牌子类
 * @param fromFlag 弹窗来源 mallPage、carportPage、client
 * @param firstChooseCard 是否是第一次选牌 true/false
 * @param totalCarCount 当前车的总个数(用于判断是否是第一辆车选牌)
 * @param carTypeFromMall 从商城买车时,车的id
 * 
 * @return
 */
function openCardNumber(cardType,subType,fromFlag,firstChooseCard,totalCarCount,carTypeFromMall){
	if(!totalCarCount){
		totalCarCount = 0;
	}
	var sUrl = "/zone/entertain/carNumber.html?cardType="+cardType+"&cardSubType="+subType+"&fromFlag="+fromFlag+"&firstChooseCard="+firstChooseCard+"&totalCarCount="+totalCarCount+"&carTypeFromMall="+carTypeFromMall;
	var sFlag = "0";
	var sWidth = 650;
	var sHeight = 600;
	window.card_type = 3;
	openWindow(sFlag,sUrl,sWidth,sHeight);
}

var OpenDivBox = {
		
};
OpenDivBox.LayerClose = {
	"open" : function(url) {
		if(!$("#openDivBox")[0]){
			$(document.body).append('<div id="openDivBox" class="pop_box" style="width:630px;">'
					+'<div class="pop_title">'
					+'<div class="pop_title_left">'
					+'<div class="pop_title_right">'
					+'<div class="pop_title_midle">操作提示</div>'
					+'<span class="pop_close" title="关闭" onclick="$.uiwidget.popupHide({id:\'openDivBox\'});document.getElementById(\'openDivBoxfrm\').src=\'about:blank\';"></span>'
					+'</div>'
					+'</div>'
					+'</div>'
					+'<div class="pop_content" style="width:628px;padding:0;">'
					+'<iframe id="openDivBoxfrm"'
					+' src=""  frameborder="0" width="628" height="448" scrolling="no">'
					+'</iframe>'
					+'</div>');
		}
		OpenDivBox.LayerClose.show_div();
		OpenDivBox.LayerClose.loadLogin(url);
	},
	"openWin" : function(url,width,height) {
		if(!width){
			width = "630";
		}
		if(!height){
			height = "448";
		}
		var width2 = width - 2;
		if(!$("#openDivBox")[0]){
			$(document.body).append('<div id="openDivBox" class="pop_box" style="width:'+width+'px;">'
					+'<div class="pop_title">'
					+'<div class="pop_title_left">'
					+'<div class="pop_title_right">'
					+'<div class="pop_title_midle">操作提示</div>'
					+'<span class="pop_close" title="关闭" onclick="$.uiwidget.popupHide({id:\'openDivBox\'});document.getElementById(\'openDivBoxfrm\').src=\'about:blank\';"></span>'
					+'</div>'
					+'</div>'
					+'</div>'
					+'<div class="pop_content" style="width:'+width2+'px;padding:0;">'
					+'<iframe id="openDivBoxfrm"'
					+' src=""  frameborder="0" width="'+width2+'" height="'+height+'" scrolling="no" style="z-index:30000">'
					+'</iframe>'
					+'</div>');
		}

		OpenDivBox.LayerClose.show_div();
		OpenDivBox.LayerClose.loadLogin(url);
	},
	"show_div" : function() {
		$.uiwidget.popupShow({id:"openDivBox"});
	},
	"loadLogin" : function(url) {
		document.getElementById("openDivBoxfrm").src=url;
	},
	"end" : ""	
};


var OpenDivBoxTitle = {
		
};
OpenDivBoxTitle.LayerClose = {	
	"openWin" : function(url,width,height,title,divId) {
		if(!width){
			width = "630";
		}
		if(!height){
			height = "448";
		}
		if(!title){
			title = '操作提示';
		}
		if(!divId){
			divId = "OpenDivBoxTitle";
		}
		var width2 = width - 2;
		if(!$("#"+divId)[0]){
			$(document.body).append('<div id="'+divId+'" class="pop_box" style="width:'+width+'px;">'
					+'<div class="pop_title">'
					+'<div class="pop_title_left">'
					+'<div class="pop_title_right">'
					+'<div class="pop_title_midle">'+title+'</div>'
					+'<span class="pop_close" title="关闭" onclick="$.uiwidget.popupHide({id:\''+divId+'\'});document.getElementById(\''+divId+'frm\').src=\'about:blank\';"></span>'
					+'</div>'
					+'</div>'
					+'</div>'
					+'<div class="pop_content" style="width:'+width2+'px;padding:0;">'
					+'<iframe id="'+divId+'frm"'
					+' src=""  frameborder="0" width="'+width2+'" height="'+height+'" scrolling="no" style="z-index:30000">'
					+'</iframe>'
					+'</div>');
		}

		OpenDivBoxTitle.LayerClose.show_div(divId);
		OpenDivBoxTitle.LayerClose.loadLogin(divId,url);
	},
	"show_div" : function(divId) {
		$.uiwidget.popupShow({id:divId});
	},
	"loadLogin" : function(divId,url) {
		document.getElementById(divId+"frm").src=url;
	},
	"end" : ""	
};


/***
 * 社区TAB切换时需要回调的方法
 * @param tag
 * @return
 */
function call_hasWay(tag){
	var tag_id = tag.replace( /^#tag_/, '' );
	$('#star_board_tag a').removeClass('here');
	if(window.name == "profile"){
		$('#board_myWeibo').addClass('here');
	}else{
		$('#'+tag_id).addClass('here');
	}
	if(!window.isCookie && singerTag == true){
		$.ajax({
			url:'addZonePV.action',
			dataType:'json',
			type:'post',
			data:{uid : window.uid},
			success:function(json){}
		});
	}
	//不是第一次请求页面的时候，第一次ftl生成了页面
	if(window.isFtlLoaded == "otherLoadTimes"){
		$('#pageContent').empty();
	}else{
		if(tag_id == "perHome"){
			window.isFtlLoaded = "otherLoadTimes";
			return;
		}
	}
	fun_jumpPage(tag);
	return false;
}

/**
 * 跳转到相片的具体的页面
 * @return
 */
function hashJump_photoShow(){
	//是否要重新load整个页面
	if(window.isLoaderPhoto == false){
		return;
	}
	//设置为false下次,换图片的时候就不需要整个页面load
	window.isLoaderPhoto = false;
	var hash = location.hash;
	$('#star_board_tag a').removeClass('here');
    $('#star_board_tag a[id=album]').addClass('here');
    var temp = hash.split("/");
	if(!window.albumId || !window.photoId){
		window.albumId = temp[1];
		window.photoId = temp[2];
	}
	var hasPage = '../album/photoShow.html';
	var initConent = '<div id="pageContent"></div>';
	$('#initPage').html(initConent);
	$('#pageContent').page(hasPage);
	page = null;
	return;
}
