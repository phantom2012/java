var callBackFun;if(!window.uid&&$.url){window.uid=$.url.param("uid")}window.loginUid=$.cookie("uid");if(!window.console){window.console={log:function(){}}}if($||jQuery){if(!$.toJSON){$.toJSON=function(e){var b=null;if(e instanceof jQuery){b=e}else{b=$("#"+e)}var a={};var j=b.find("input[type=text]:enabled");var g=b.find("input[type=hidden]");var d=b.find("input[type=radio][checked=true]:enabled");var h=b.find("select");var c=b.find("textarea");var f=j.add(h).add(d).add(g).add(c);f.each(function(){var k=$(this);var l=k.attr("name");if(a[l]){a[l]=a[l]+","+k.val()}else{a[l]=k.val()}});return a}}}function validUploadFlieType(c,b){var a=new RegExp("\\.("+(b?b:"")+")$","gi");return c.match(a)}function setImagePosition(a){a=$(a);if(a.width()/1.5>a.parent().width()){a.css({left:-a.parent().width()/2})}if(a.height()/1.5>a.parent().height()&&a.width()/1.5>a.parent().width()){a.css({top:-a.parent().height()/2})}}function roundNum(e,g){var d=Math.pow(10,g);var b=(e*d)+1e-9;var a=Math.round(b)/d;return a}function getRoundNum(b,g,e){if(g!=0&&!g){g=2}if(!e){e=g}var a=roundNum(b,g);return appendDigit(a,e)}function appendDigit(a,e){a=a.toString();if(a.indexOf(".")==-1){if(e>0){a=a+".";for(var b=0;b<e;b++){a=a+"0"}}}else{var d=a.split(".")[1].length;if(d<e){for(var b=0;b<e-d;b++){a=a+"0"}}}return a}String.prototype.replaceAll=function(b,a){return this.replace(new RegExp(b,"gm"),a)};String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")};String.prototype.len=function(){return this.replace(/[^\x00-\xff]/g,"**").length};String.prototype.replaceAt=function(a,b){return this.substr(0,a)+b+this.substr(a,this.length)};var fileUrlPath="http://static.m.yy.com/";var zoneHomePath="http://"+window.location.host+"/";function getPhotoUrl(c){if(typeof(c)!="string"){return{path:"",min:""}}if(!c||c.trim()==""){return{path:"",min:""}}c=fileUrlPath+c;var a=c.lastIndexOf(".");var b=c.substr(0,a)+"_min.jpg";return{path:c,min:b}}function renderBaseInfo(f,b){$("#totalPv").text(b.total_pv);$("#todayPv").text(b.today_pv);if($.cookie("uid")!=window.uid){return}var e=roundNum(b.used_cap/b.total_cap*100,2)+"%";$("#capacity div.progress").css({width:e});$("#capacity div.number").html(e);var d=roundNum(b.total_cap/1073741824,2);if(b.used_cap>1048576*10){var c=roundNum(b.used_cap/1073741824,2);$("#sizeValue").html("&nbsp;"+c+"GB / "+d+"GB")}else{if(b.used_cap>1024*10){var c=roundNum(b.used_cap/1048576,2);$("#sizeValue").html("&nbsp;"+c+"MB / "+d+"GB")}else{var c=roundNum(b.used_cap/1048576,2);var a="MB";if(c==0){a="GB"}$("#sizeValue").html("&nbsp;"+c+a+" / "+d+"GB")}}$("#albumCount").text(b.album_count);$("#photoCount").text(b.photo_count)}function goBack(){var a=window.urlPaths.pop();if(a){var b;if(a.indexOf("photoList")!=-1){b="albumList.html"}else{if(a.indexOf("photoShow")!=-1){b="photoList.html"}else{if(a.indexOf("upload")!=-1){b="photoList.html"}}}$("#pageContent").page(b)}}function bindCopyText(a,c,d){var b=new ZeroClipboard.Client();b.glue(a);b.setText(c);b.addEventListener("complete",function(e,f){$.uiwidget.popupHide({id:d});top.$.messagebox({type:"success",msg:"复制成功！"})})}function wordCount(e,c,d){var b=e.value.trim();var a=b.length;var f=$(e).parent().parent().find(".curcount").eq(0);if(!f){return}f.html(a);if(a>c){f.addClass("pop_warning");if(d){$("#"+d+"").text("您已经输入"+a+"个字符（最多可输入"+c+"个字符）");$("#"+d+"").show()}}else{f.removeClass("pop_warning");if(d){$("#"+d+"").text("");$("#"+d+"").hide()}}}function wordCount2(d,c,e){var j=d.value.trim();var g=strLength2(j);if(typeof(g)=="undefined"){g=0}var h=Math.floor(g);var f=Math.ceil(g);if(g>=c){g=f}else{g=h}var a=$("#"+e);if(!a){return}if(c>=g){var b=c-g;a.html("您还可以输入<span>"+b+"</span>字")}else{var b=g-c;a.html("<font color='#FF0000'>已超出<span>"+b+"</span>字</font>")}}function strLength(c){var a=0;for(var b=0;b<c.length;b++){if(c.charCodeAt(b)>255){a+=2}else{a++}}return a}function strLength2(c){var a=0;for(var b=0;b<c.length;b++){if(c.charCodeAt(b)>255){a=a+1}else{a=a+0.5}}return a}function strLength3(d,b){var a=0;for(var c=0;c<d.length;c++){if(d.charCodeAt(c)>255){a=a+1}else{a=a+0.5}if(a>=b){break}}return c}var defaulMap={0:"说说这个相册的故事...（非必填）",1:"请输入照片名称",2:"请输入照片描述"};function cleanWord(b,a){if(b.value==defaulMap[a]){b.style.color="#000";b.value=""}}function report(){var b=$("#reportBox textarea").val().trim();var a=b.length;if(a>200){return}var c=$.toJSON("reportBox");c.photoId=window.photoId;$.ajax({url:"report.action",type:"post",dataType:"json",data:c,success:function(d){$.uiwidget.showMsgbox("举报成功",2000)}});$.uiwidget.popupHide({id:"reportBox"})}document.onclick=function(b){var a=b||window.event;var c=a.target||a.srcElement;if(c.id!="move_to_btn"&&c.className!="font_down_arrow"){isMoveOpen=false;$("#move_option").attr("class","move_option");$("#move_to_ul").hide()}};function getElementLeft(a){var c=a.offsetLeft;var b=a.offsetParent;while(b!==null){c+=b.offsetLeft;b=b.offsetParent}return c}function getElementTop(a){var c=a.offsetTop;var b=a.offsetParent;while(b!==null){c+=b.offsetTop;b=b.offsetParent}return c}var MyAlbum=(function(){var a;window.albumFlag=true;var b=true;return a={CheckLogin:function(d,c){if(d&&c){var f=jQuery.cookie("username");var e=jQuery.cookie("accessToken");if(e&&e!=""&&f&&f!=""){return true}}return false},Submit:function(c,f,e,d){if(b){b=false;$.ajax({type:"POST",url:c,dataType:e,data:d,success:function(g){f(g);b=true}})}},PhotoManage:function(c){if(mode<1){mode=1;$("#photo_edit_div").show();$(".edit-mode").show();$(".edit-mode").parent().find("span").hide();$("#edit_mode_btn").hide();$("#exit_manage").show();isManage=true}else{mode=0;$("#photo_edit_div").hide();$(".edit-mode").hide();$(".edit-mode").parent().find("span").show();$("#edit_mode_btn").show();$("#exit_manage").hide();isManage=false}$(".bg_img").click(function(){return !isManage})},SelectIput:function(d){if(isManage){var c=$(d).parent().next().find("input[name='pic_checkbox']").get(0);if(c.checked){c.checked=false}else{c.checked=true}}},setAlbumCover:function(e,h){var d="";if(e){d=e}else{d=albumId}var c="";if(h){c=h}else{var j=$("input[name='pic_checkbox']");var k=[];for(var g=0;g<j.length;g++){if(j[g].checked){k.push(j[g])}}if(k.length<1){alert("您还没有选择照片，请勾选一张做封面。");return false}if(k.length>1){alert("您勾选了多张照片，请勾选一张做封面。");return false}c=k[0].id}if(d&&c){var f="setCover.action?albumId="+d+"&photoId="+c;MyAlbum.Submit(f,function(l){if(l.flag){$("span[class=cover_flag]").remove();$("#"+c).append('<span class="cover_flag"></span>');$.uiwidget.showMsgbox("设置封面成功",2000,null)}},"json","")}},delPhotos:function(g){$.uiwidget.popupHide({id:"deletePhoto"});if(albumId==""){return}if(!g){g=getSelIds("请先选择需要删除的照片。")}if(g!=""){var f=g.split(",");var d="";var h="";for(var e=0;e<f.length;e++){var c=$("#"+f[e]+" span").last().attr("class");switch(c){case"shan_flag":d="闪亮秀";break;case"ming_flag":h="上麦名片";break;case"cover_flag":break}}$("#photoType").text(d+" "+h);$.uiwidget.popupShow({id:"deletePhoto"})}},movePhotos:function(c,e,d){if(!c){return}if(albumId==""){return}if(!e){e=getSelIds("请先选择需要移动的照片。")}if(e!=""){MyAlbum.Submit("movePhoto.action?oldAlbumId="+albumId+"&newAlbumId="+c,function(f){if(f.flag=="3"){top.$.messagebox({title:"警告",type:"alert",msg:"KTV相册不能移进移出！"});return}if(f.flag){$.uiwidget.showMsgbox("移动成功",2000,function(){if(d){d()}else{var h=new Array();h=e.split(",");for(i=0;i<h.length;i++){$("#"+h[i]).parent().parent().remove()}var g=$(".item").length;if(g==0){$("#pageContent").page("photoList.html")}}})}else{alert("抱歉，操作失败！请检查网络，稍候再试！")}},"json","ids="+e)}},showAlbumList:function(){if(isMoveOpen){isMoveOpen=false;$("#move_option").attr("class","move_option")}else{isMoveOpen=true;$("#move_option").attr("class","move_option_open")}$("#move_to_ul").toggle()}}})();if(!window.uid){window.uid=$.url.param("uid")}function isMySelf(){if($.cookie("uid")&&$.cookie("uid")!=""&&$.cookie("uid")==window.uid){return true}return false}function textOmitor(l,a,m,d,f){var g=7,j=12;var k=0;var b=0;var h=false;if(m){k+=10}if(d){g=d}if(f){j=f}for(;Math.min(b,l.length)!=l.length;b++){if(l.charCodeAt(b)>255){k+=j}else{k+=g}if(k>a){h=true;break}}var n=l.substring(0,b);if(h&&m){n+="...."}return n}function openMusicPlayWin(b,e,c){c=c||"0";var h=navigator.playerWin;if(c=="0"){var f=b.split("?ids=")[1];if(!f){$.uiwidget.showMsgbox("请选择歌曲！","1000",null,0);return}}if(e==undefined){e=true}if(!h||h.closed){var d="&";if(b.indexOf("?")==-1){d="?"}b+=d+"autoplay="+e+"&listType="+c;var g=$.cookie("playerURL");var a=true;if(!g){g=b;a=false}h=openZonePlayerWin(g);if(a){h.goToPlayerList(f,e,c)}}else{h.goToPlayerList(f,e,c)}h&&h.focus();return false}function openZonePlayerWin(d){var b=1020;var a=650;var f=Math.ceil((window.screen.width-b)/2);var c=Math.ceil((window.screen.height-a)/2);var e=window.open(d,"yymusicbox","width="+b+",height="+a+",top="+c+",left="+f+",scrollbars=1,resizable=no,status=1");navigator.playerWin=e;return e}function getZonePlayerWin(){var a=$.cookie("playerURL");if(a){return openZonePlayerWin(a)}return null}function goPlayerLisenList(a,b){openMusicPlayWin(a,b,"1")}function getHref(a){if($.browser.msie){a=a.substring(a.lastIndexOf("/")+1,a.length)}return a}function showIsSingerBack(a){if(a){window.location.href="/zone/"+getPerLoginPath()+"/"}else{$.uiwidget.popupShow({id:"myZoneBox"});$("#myZoneBox .warning_con").remove();$("#myZoneBox .warning_icon").after("<li class='warning_con'>你还没有<a href='/zone/singer/regsinger.html'>成为主播</a>，无法获得主播空间</li>")}}function getIconClassByLevel(d,b){var a;var c=parseInt(d);if(c>=1&&c<=10){if(b){a="gh_lv_gray"}else{a="lv_gray"}}else{if(c>=11&&c<=20){if(b){a="gh_lv_white"}else{a="lv_white"}}else{if(c>=21&&c<=30){if(b){a="gh_lv_green"}else{a="lv_green"}}else{if(c>=31&&c<=40){if(b){a="gh_lv_blue"}else{a="lv_blue"}}else{if(c>=41&&c<=50){if(b){a="gh_lv_purple"}else{a="lv_purple"}}else{if(c>=51&&c<=60){if(b){a="gh_lv_yellow"}else{a="lv_yellow"}}}}}}}return a}function getPerLoginPath(){var a=$.cookie("yy_num");if(!a){$.ajax({url:"getYYInfos.action",type:"get",dataType:"json",async:false,data:{uids:$.cookie("uid")},success:function(b){$.each(b,function(c,d){a=d.yy_num;if(a){$.cookie("yy_num",a,{expires:1,path:"/",domain:"yy.com"})}return a})}})}return a}function showdate(b){var a=new Date();a.setDate(a.getDate()+b);a=a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate();return a}function regiesterInputCssChange(b,c,a){a=a||"rgb(127, 127, 127)";b.unbind("focus").focus(function(){var d=b.data("changeFlag");if(!d){$(this).val("")}$(this).css("color","")}).unbind("blur").blur(function(){var d=b.data("changeFlag");if(!d){$(this).val(c);$(this).css("color",a)}}).unbind("change").change(function(){if($.trim($(this).val())!=""){b.data("changeFlag",true)}else{b.data("changeFlag",false)}})}function undulpicate(c){for(var b=0;b<c.length;b++){for(var a=b+1;a<c.length;a++){if(c[b]===c[a]){c.splice(a,1);a--}}}return c}function popSongComments(e,b,a,c){$.uiwidget.popupShow({id:"comment_warp"});window.songIndex=a;if(window.songIndex==null){$("#comment_warp div.comment_title a").text("");$("#comment_title_text").text("评论");$("#btm_opr_bar").hide();window.songCommentPop.addCommentUrl="addBlogComment.action";window.songCommentPop.getDataUrl="getBlogCommentList.action";window.songCommentPop.deleteCommentUrl="deleteBlogComment.action";window.songCommentPop.type=c}else{$("#btm_opr_bar").show();var d=window.songList[window.songIndex];$("#comment_warp div.comment_title a").text(d.name);$("#comment_title_text").html("&nbsp;&nbsp;的评论");window.songCommentPop.addCommentUrl="addSongComment.action";window.songCommentPop.getDataUrl="listSongComment.action";window.songCommentPop.getCountUrl="getSongCommentTotalCount.action";window.songCommentPop.deleteCommentUrl="deleteSongComment.action"}window.songCommentPop.initSongComments(e,b)}function arrowFilter(e){if(!e){return""}var d="";var a="";for(var b=0;b<e.length;b++){var f=e.charAt(b);switch(f){case"<":a+="&lt;";break;case">":a+="&gt;";break;case"&":a+="&amp;";break;case'"':a+="&quot;";break;case"'":a+="'";break;default:a+=f}}d=a.toString();return d}function suitableImage(d,g,a,e,c){if(d<=a&&g<=e){return{w:d,h:g}}var b=d/a;var f=g/e;if(b>f){var j=a/d;if(c){b=g*j;f=a}else{b=a;f=g*j}}else{var j=e/g;if(c){b=e;f=d*j}else{b=d*j;f=e}}return{w:b,h:f}}function check_isLogin(){if(!$.cookie("uid")){return false}return true}function checkLogin_ShowLoginBox(){if(!$.cookie("uid")){showLoginBox("/zone/zoneLogin.html");return false}return true}function formatNumberByComma(a){if(isNaN(a)){return a}var d=String(a).split(".");var b=d[0];var c="";while(b.length>3){c=","+b.substring(b.length-3,b.length)+c;b=b.substring(0,b.length-3)}if(b.length>0){c=b+c;if(d[1]){c+="."+d[1]}}return c}function openWindow(c,d,e,a,b){OpenDivBox.LayerClose.open(d)}function openWindowTitle(c,d,b,e,a){OpenDivBoxTitle.LayerClose.openWin(c,d,b,e,a)}function openCardNumber(a,j,d,b,g,h){if(!g){g=0}var c="/zone/entertain/carNumber.html?cardType="+a+"&cardSubType="+j+"&fromFlag="+d+"&firstChooseCard="+b+"&totalCarCount="+g+"&carTypeFromMall="+h;var k="0";var e=650;var f=600;window.card_type=3;openWindow(k,c,e,f)}var OpenDivBox={};OpenDivBox.LayerClose={open:function(a){if(!$("#openDivBox")[0]){$(document.body).append('<div id="openDivBox" class="pop_box" style="width:630px;"><div class="pop_title"><div class="pop_title_left"><div class="pop_title_right"><div class="pop_title_midle">操作提示</div><span class="pop_close" title="关闭" onclick="$.uiwidget.popupHide({id:\'openDivBox\'});document.getElementById(\'openDivBoxfrm\').src=\'about:blank\';"></span></div></div></div><div class="pop_content" style="width:628px;padding:0;"><iframe id="openDivBoxfrm" src=""  frameborder="0" width="628" height="448" scrolling="no"></iframe></div>')}OpenDivBox.LayerClose.show_div();OpenDivBox.LayerClose.loadLogin(a)},openWin:function(b,d,a){if(!d){d="630"}if(!a){a="448"}var c=d-2;if(!$("#openDivBox")[0]){$(document.body).append('<div id="openDivBox" class="pop_box" style="width:'+d+'px;"><div class="pop_title"><div class="pop_title_left"><div class="pop_title_right"><div class="pop_title_midle">操作提示</div><span class="pop_close" title="关闭" onclick="$.uiwidget.popupHide({id:\'openDivBox\'});document.getElementById(\'openDivBoxfrm\').src=\'about:blank\';"></span></div></div></div><div class="pop_content" style="width:'+c+'px;padding:0;"><iframe id="openDivBoxfrm" src=""  frameborder="0" width="'+c+'" height="'+a+'" scrolling="no" style="z-index:30000"></iframe></div>')}OpenDivBox.LayerClose.show_div();OpenDivBox.LayerClose.loadLogin(b)},show_div:function(){$.uiwidget.popupShow({id:"openDivBox"})},loadLogin:function(a){document.getElementById("openDivBoxfrm").src=a},end:""};var OpenDivBoxTitle={};OpenDivBoxTitle.LayerClose={openWin:function(c,e,a,f,b){if(!e){e="630"}if(!a){a="448"}if(!f){f="操作提示"}if(!b){b="OpenDivBoxTitle"}var d=e-2;if(!$("#"+b)[0]){$(document.body).append('<div id="'+b+'" class="pop_box" style="width:'+e+'px;"><div class="pop_title"><div class="pop_title_left"><div class="pop_title_right"><div class="pop_title_midle">'+f+'</div><span class="pop_close" title="关闭" onclick="$.uiwidget.popupHide({id:\''+b+"'});document.getElementById('"+b+'frm\').src=\'about:blank\';"></span></div></div></div><div class="pop_content" style="width:'+d+'px;padding:0;"><iframe id="'+b+'frm" src=""  frameborder="0" width="'+d+'" height="'+a+'" scrolling="no" style="z-index:30000"></iframe></div>')}OpenDivBoxTitle.LayerClose.show_div(b);OpenDivBoxTitle.LayerClose.loadLogin(b,c)},show_div:function(a){$.uiwidget.popupShow({id:a})},loadLogin:function(a,b){document.getElementById(a+"frm").src=b},end:""};function call_hasWay(a){var b=a.replace(/^#tag_/,"");$("#star_board_tag a").removeClass("here");if(window.name=="profile"){$("#board_myWeibo").addClass("here")}else{$("#"+b).addClass("here")}if(!window.isCookie&&singerTag==true){$.ajax({url:"addZonePV.action",dataType:"json",type:"post",data:{uid:window.uid},success:function(c){}})}if(window.isFtlLoaded=="otherLoadTimes"){$("#pageContent").empty()}else{if(b=="perHome"){window.isFtlLoaded="otherLoadTimes";return}}fun_jumpPage(a);return false}function hashJump_photoShow(){if(window.isLoaderPhoto==false){return}window.isLoaderPhoto=false;var d=location.hash;$("#star_board_tag a").removeClass("here");$("#star_board_tag a[id=album]").addClass("here");var b=d.split("/");if(!window.albumId||!window.photoId){window.albumId=b[1];window.photoId=b[2]}var a="../album/photoShow.html";var c='<div id="pageContent"></div>';$("#initPage").html(c);$("#pageContent").page(a);page=null;return};