<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!doctype html> 
<html> 
<head> 
    <meta charset="utf-8"> 
	<title>成员-登录</title>
	<script type="text/javascript" src="http://res.idol.yystatic.com/agency/js/??jquery/jquery.min.js,jquery/jquery.cookie.min.js,commons/aysnAddFile.js,commons/login.js"></script>
	<%@ include file="../commons/taglibs.jsp"%>
</head>
<body>
<script type="text/javascript">

	aysnAddUdbFile();
	
	loginCfg.loginCallBack = function() {
		location.href = '/agency/admin/adminIndex.action';
	}
	
	loginCfg.logoutCallBack = function() {
	}

	// 打开udb登录框
	function openUdbSdk(){
		var error = false;
		try {
			showLoginBox();
			if (!error) {
				clearInterval(loginTimer);
			}
		} catch (e) {
			error = true;
		}
	} 
	var loginTimer = window.setInterval(openUdbSdk,300);  
</script>
</body>
</html>