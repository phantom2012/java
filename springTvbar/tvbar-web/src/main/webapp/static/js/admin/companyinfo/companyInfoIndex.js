var com = com || {};
com.yy = com.yy || {};
com.yy.agency = com.yy.agency || {};
com.yy.agency.CompanyInfo = function() {
};
(function(obj, $) {
	obj.prototype = {
		/**
		 * 初始化
		 * @param options
		 * pics:多选图片初始化
		 * service_city:城市初始化数据
		 * business_range:经营范围初始化数据
		 * sex:男女
		 */
		init : function(options) {
			var _this = this;
			options=options||{};
			_this._initEditor(options.pics||[]);
			_this.bindEven(options.service_city,options.business_range,options.type||0,options.sex||0);
			_this.bindForm();
		},
		_initEditor:function(pics){
			KindEditor.ready(function(K) {
				var editor = K.editor({
					allowFileManager : true,
					uploadJson : '/agency/admin/adminUploadLogo.action',
					fileManagerJson : '/agency/admin/adminUploadLogo.action'
				});
				K('#logoSource').click(function() {
					editor.loadPlugin('image', function() {
						editor.plugin.imageDialog({
							showRemote : false,
							clickFn : function(url, title, width, height, border, align) {
								K('#log_pic').val(url);
								$('#log_pic').blur();
								editor.hideDialog();
								$('#logoSource').attr("src",url);
								$.alert('图片上传成功','success');
							}
						});
					});
				});
				
				var editor2 = K.editor({
				    uploadJson : '/agency/admin/adminUploadAlbum.action',
				    imageUploadLimit:5				    
				});
				
				K('#uploadAlbum').click(function() {
					editor2.loadPlugin('multiimage', function() {
						editor2.plugin.multiImageDialog({
							initImgUrls:pics,
							removeFn:function(url,data){
								//data为服务器返回字段,url,id,error
								if(!data||data.error!=0){
									//alert("请选择已经上传的图片设置封面");
									return;
								}
								var action='/agency/admin/adminDeleteCompanyPicture.action';
								var form=data;
								$.ajaxData(action,form,{
									success : function(msg) {
										//alert("删除成功");
										if($.reg.number(msg.data)){
											alert("由于删除了封面,默认设置图片序号为["+msg.data+"]为封面");
										}
									}
								});
								$("#albums input[value='"+url+"']").remove();
							},
							imgClickFn:function(url,data){
								//未上传默认图片后缀
								if(!data||data.error!=0){
									alert("请选择已经上传的图片设置封面");
									return;
								}
								//没有公司表示新建的
								if(!$("#companyId").val()){
									$("#banner_pic_url").val(url);
									return;
								}
								var action='/agency/admin/adminAlbumCover.action';
								var form=data;
								$.ajaxData(action,form,{
									success : function(msg) {
										alert("设置封面成功");
										$("#banner_pic_id").val(msg.data);
									}
								});
							},
							clickFn : function(urlList) {
								var div = K('#albums');
								div.html('');
								pics.length=0;
								K.each(urlList, function(i, data) {
									div.append('<input type="hidden" name="imgs" value="'+data.url+'">');
									pics.push(data);
								});
								editor2.hideDialog();
							}
						});
					});
				});
				
				
				var editor3 = K.editor({
					allowFileManager : true,
					uploadJson : '/agency/admin/adminUploadIndexPic.action'
				});
				K('#indexPicSource').click(function() {
					editor3.loadPlugin('image', function() {
						editor3.plugin.imageDialog({
							showRemote : false,
							clickFn : function(url, title, width, height, border, align) {
								K('#index_pic').val(url);
								$('#index_pic').blur();
								editor3.hideDialog();
								$('#indexPicSource').attr("src",url);
								$.alert('图片上传成功','success');
							}
						});
					});
				});
				
			});
		},
		bindEven : function(service_city,business_range,type,sex) {
			var _this=this;
			$("#serviceCity").agencySelect({maxLimit:5,initCodes:service_city,name:'service_city'});
			$("#businessRange").agencySelect({type:'business',splits:['A-N','O-Z'],maxLimit:5,initCodes:business_range,name:'business_range'});
			
			
			$(".name-input a.delete").live("click",
				function(){
					$(this).parent().remove();
				}		
			);
			$("#add").click(
				function(){
					$(".name-input").append('<span class="input-item"><input type="text" name="contractors" value="" placeholder="" class="input-box"><a href="javascript:void(0)" class="delete">删除</a></span>');
				}		
			);
			var needAdd=2-$(".name-input span").size();
			for(var i=0;i<needAdd;i++){
				$("#add").click();
			}
			
			$("#company").click(function(){
				$("#type").val(0);
				
				$("#person").removeClass("active");
				$("#company").addClass("active");
				
				$("#headerPic").html("公司logo");
				$("#log_pic").attr('msg',"公司logo不能为空")
				$("#nameTxt").html("公司名称");
				$("#sex").hide();
				$("#build_time").show();
				$("#build_time input").attr('check','notBlank');
				$("#companyTxt").html("公司简介");
			});
			$("#person").click(function(){
				$("#type").val(1);

				$("#company").removeClass("active");
				$("#person").addClass("active");
				
				$("#headerPic").html("个人头像");
				$("#log_pic").attr('msg',"个人头像不能为空")
				$("#nameTxt").html("姓名");
				$("#sex").show();
				$("#build_time").hide();
				$("#build_time input").removeAttr('check');
				$("#companyTxt").html("个人简介");
			});
			
			if(type==0){
				$("#company").click();
			}else{
				$("#person").click();
			}
			
			$("#description").blur(function(){
				var $this=$(this);
				_this.descriptionRemain($this);
			}).keyup(function(){
				var $this=$(this);
				_this.descriptionRemain($this);
			}).keydown(function(){
				var $this=$(this);
				_this.descriptionRemain($this);
			});
			$("#description").keyup();
			$("select[name='sex']").val(sex);
			
		},
		descriptionRemain : function($input) {
			var txt0='还可输入<span>';
			var txt1='已超出<span>';
			var txt='</span>/200字';
			var num=200-$.chineseLength($input.val());
			var msg;
			if(num>=0){
				msg=txt0+num+txt;
			}else{
				msg=txt1+(0-num)+txt;
			}
			$("#descriptionRemain").html(msg);	
		},
		bindForm : function() {
			$('#logoSubmit').click(function(){
				if($("logoSource").val()){
					$("logoForm").submit();
				}else{
					alert("请选择上传的logo图片");
				}
			});
			var _confirm=$('#submit').attr("_confirm")==1;
			if(_confirm){
				$("#submit0").click(function(){
					$.alert("是否确定保存并正式发布信息？","ask",{fn:function(btn){
						if(btn.index==0){
							$("#submit").click();
						}
					}});
				});
			}
			$('#submit').ajaxForm('infoForm',{
				success : function(msg) {
					//$.alert("提交成功");
					var link=$("#nextView").attr('link');
					if(!link){
						link=$("#nextView").attr('href');
					}
					if(_confirm){
						location.reload();
					}else{
						location.href=link;
					}
				},
				handleError:function($this,msg){
					$this.addClass('warning');
					$this.next('span.error').remove();
					$this.after('<span class="error">'+msg+'</span>');
				},
				handleOk:function($this){
					$this.removeClass('warning');
					$this.next('span.error').remove();
				}
			});
		}
	};
})(com.yy.agency.CompanyInfo, jQuery);
