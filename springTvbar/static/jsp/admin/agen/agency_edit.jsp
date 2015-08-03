<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>机构录入页面</title>
<link rel="stylesheet" href="http://res.idol.yystatic.com/agency/html/editor/themes/default/default.css" />
</head>
<body>
	<input type="button" id="J_selectImage" value="批量上传" />
	<input type="text" id="url" value="" /> <input type="button" id="insertfile" value="单文件上传" />
		<div id="J_imageView"></div>
<!-- 引入服务项目tab -->	
<%@include file="servicesItem.jsp" %>	
	
<script src="http://idol.yy.com/agency/html/editor/kindeditor-min.js"></script>
<script src="http://res.idol.yystatic.com/agency/html/editor/lang/zh_CN.js"></script>
<script type="text/javascript" src="http://res.idol.yystatic.com/agency/??js/jquery/jquery.min.js,js/admin/index.js"></script>
<script type="text/javascript">
  var post_url = "http://idol.yy.com/agency/" ;
  var agenService  =  new com.yy.ent.AgenService() ;
  agenService.init() ;  
</script>
</body>
</html>