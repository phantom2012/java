function goDirect(index){
	var urls = ['/admin/client/programIndex.action','/admin/client/giftIndex.action','/admin/client/onShowGirlIndex.action'];
	$.ajax({
		url: '/admin/client/checkLimit.action',
		type: 'get',
		data: {'t':new Date().getTime()},
		dataType: 'text',
		success: function(data){
			if(data=='1'){
				showMessage('禁止数据录入!');
				return;
			} else{
				location.href= urls[index]+'?t='+new Date().getTime();
			}
		},
		error:function(msg){
		}
	});
}

function verifyMenu(){
	var index = $.cookie('admin-menu-index');
	if(index){
		$('.submenu').eq(index.split(',')[0]).addClass('active open');
		$('.submenu').eq(index.split(',')[0]).find('li').eq(index.split(',')[1]).addClass('active');
	}
} 

function isLogin(){
	var flag = false;
	var yyuid = $.cookie('yyuid');
	if(yyuid && yyuid != ''){
		flag = true;
	}
	return flag;
}

// 初始化用户状态
function initUserStatus() {
	var logined = isLogin();
    if (logined) {
    	$('#username').html($.cookie('username'));
    } else {
    	location.href= 'http://admin.1931.com';
    }
}

$(function(){
	$("a[data-index]").on('click',function(){
		var index = $(this).attr('data-index');
		var href = $(this).attr('data-href');
		var valid = $(this).attr('data-valid');
		if(index){
			$.cookie('admin-menu-index',index,{expires:1,path:'/admin/',domain: '1931.com'});
		}
		if(href){
			location.href = href+"?t="+new Date().getTime();
		}
		if(valid){
			goDirect(valid)
		}
	});
	
	initUserStatus();  
	
	verifyMenu();
	
});