var com = com||{}; com.yy = com.yy||{} ; com.yy.ent = com.yy.ent||{} ;
com.yy.ent.Share = function(){
	  this.shareImgUrl  = "" ;
	  this.tryTimes  = 0  ;
	  this.MAXTRYTIMES  = 16 ;
	  //微博参数
	  this.weiboParam = {} ;
	  //微信参数
	  this.weixinParam = {} ;
} ;
!function(obj , $){	
	
	 var _this ;
	 
	 obj.prototype = { 
	       init : function(weixinParam,weiboParam){
		       _this = this ;
		       //初始化微博参数
		       this.initWeiboParam(weiboParam);
		       this.initWeixinParam(weixinParam) ;		          
		       this.getWeixinImg() ;	      
	      }	
	      ,
	    //weiboParam={title:标题,url:分享的路径,pic:分享的图片,bnt:要加事件的按钮的id}
	      initWeiboParam : function(param){
	    	   this.weiboParam.title = param.title || document.title ;
	    	   this.weiboParam.url = param.title || location.href ;
	    	   this.weiboParam.pic = param.pic || $('link[rel="icon"]').attr("href");	
	    	   if(param && param.bnt){
		       $("#"+param.bnt).on("click" , function(){
				    	 _this.shareToWeibo(_this.weiboParam) ;   
				 });
		       }    
	      }	
	       ,
	     //分享到微博   {title , url }
	      shareToWeibo : function(params){		  
		    window.open("http://service.weibo.com/share/share.php?title=" + encodeURIComponent(params.title) + "&url=" + encodeURIComponent(params.url)  +"&pic="+encodeURIComponent(params.pic) +"&source=bookmark&appkey=2992571369&ralateUid=");
	      }
	      ,
	      //{post_url:获取微信图片的后端url,req_param:请求参数，json字符串,gen_url_key:后端生成url的key,bnt:分享微信的按钮id,code_block:包含微信二维码图片的元素jq选择器}
	      initWeixinParam : function(param){
	    	  this.weixinParam.post_url = param.post_url || "http://idol.yy.com/agency/share/getCommonQRCodeUrl.action" ;
	    	  this.weixinParam.req_param = param.req_param || "" ;
	    	  this.weixinParam.gen_url_key = param.gen_url_key || "" ;
	    	  this.weixinParam.bnt = param.bnt || "shareToWeixin" ;
	    	  this.weixinParam.code_block = param.code_block || ".codeof2d" ;
	    	  this.weixinParam.base_url = param.base_url || "http://idol.bs2dl.yy.com/" ;
	    	  this.weixinParam.filename = param.filename || "" ;
	    	  this.weixinParam.shareUrl = param.shareUrl || "" ;
	      }	   
	      ,
	     //生成微信图片
	     generateWeixinShareImg : function(){
	     	$.ajax (
	 	    {
	 				url: _this.weixinParam.post_url,
	 				type:'get',	          
	 				data:{req : _this.weixinParam.req_param, key: _this.weixinParam.gen_url_key ,fileName :  _this.weixinParam.filename , shareUrl : _this.weixinParam.shareUrl  } ,
	 				dataType:'json',
	 				success:function(json){	
	 					if(json.result == 0 ){								
	 					  $(_this.weixinParam.code_block+' img').attr('src', json.data+"?fileinformation="+new Date().getTime());					 
	 					}							
	 				}				
	 			}
	 		);    
	     } 
	     ,
	     getShareImgUrl : function() {      
	       return _this.weixinParam.base_url + _this.weixinParam.filename + ".png" ; 		
	 	}
	     ,
	     getWeixinImg : function(){
	     	  $('#'+_this.weixinParam.bnt).mouseenter(function() {    		   
	 	            $(_this.weixinParam.code_block).show(); 	           
	 	      });
	 	     $('#'+_this.weixinParam.bnt).mouseleave(function() {	          	            
	             $(_this.weixinParam.code_block).hide();      
	          }); 
	         $(_this.weixinParam.code_block+' img').attr("src", _this.getShareImgUrl());
	         $(_this.weixinParam.code_block+' img').off("error").on("error" ,function(){        	
	             if(_this.tryTimes == (_this.MAXTRYTIMES - 1)){
	             	 $(_this.weixinParam.code_block+' img').attr("src", _this.getShareImgUrl());
	             }
	             else{
	             	 if(_this.tryTimes < _this.MAXTRYTIMES){
	                	   _this.generateWeixinShareImg();
	                   }
	                   else{
	                   	$(_this.weixinParam.code_block+' img').off("error") ;
	                   	location.reload();
	                   }            
	             }          
	             _this.tryTimes++ ;
	          }); 
	     }  
	 } ;
}(com.yy.ent.Share, jQuery) ;