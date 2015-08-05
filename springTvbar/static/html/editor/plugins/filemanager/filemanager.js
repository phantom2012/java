KindEditor.plugin("filemanager",function(d){var e=this,f="filemanager",c=d.undef(e.fileManagerJson,e.basePath+"php/file_manager_json.php"),h=e.pluginsPath+f+"/images/",g=e.lang(f+".");function b(i,j,k){return i+" ("+Math.ceil(j/1024)+"KB, "+k+")"}function a(i,j){if(j.is_dir){i.attr("title",j.filename)}else{i.attr("title",b(j.filename,j.filesize,j.datetime))}}e.plugin.filemanagerDialog=function(m){var x=d.undef(m.width,650),v=d.undef(m.height,510),r=d.undef(m.dirName,""),A=d.undef(m.viewType,"VIEW").toUpperCase(),u=m.clickFn;var q=['<div style="padding:10px 20px;">','<div class="ke-plugin-filemanager-header">','<div class="ke-left">','<img class="ke-inline-block" name="moveupImg" src="'+h+'go-up.gif" width="16" height="16" border="0" alt="" /> ','<a class="ke-inline-block" name="moveupLink" href="javascript:;">'+g.moveup+"</a>","</div>",'<div class="ke-right">',g.viewType+' <select class="ke-inline-block" name="viewType">','<option value="VIEW">'+g.viewImage+"</option>",'<option value="LIST">'+g.listImage+"</option>","</select> ",g.orderType+' <select class="ke-inline-block" name="orderType">','<option value="NAME">'+g.fileName+"</option>",'<option value="SIZE">'+g.fileSize+"</option>",'<option value="TYPE">'+g.fileType+"</option>","</select>","</div>",'<div class="ke-clearfix"></div>',"</div>",'<div class="ke-plugin-filemanager-body"></div>',"</div>"].join("");var y=e.createDialog({name:f,width:x,height:v,title:e.lang(f),body:q}),t=y.div,p=d(".ke-plugin-filemanager-body",t),o=d('[name="moveupImg"]',t),C=d('[name="moveupLink"]',t),w=d('[name="viewServer"]',t),B=d('[name="viewType"]',t),j=d('[name="orderType"]',t);function s(F,D,E){var G="path="+F+"&order="+D+"&dir="+r;y.showLoading(e.lang("ajaxLoading"));d.ajax(d.addParam(c,G+"&"+new Date().getTime()),function(H){y.hideLoading();E(H)})}var i=[];function l(F,D,G,H){var E=d.formatUrl(D.current_url+G.filename,"absolute"),I=encodeURIComponent(D.current_dir_path+G.filename+"/");if(G.is_dir){F.click(function(J){s(I,j.val(),H)})}else{if(G.is_photo){F.click(function(J){u.call(this,E,G.filename)})}else{F.click(function(J){u.call(this,E,G.filename)})}}i.push(F)}function n(D,F){d.each(i,function(){this.unbind()});C.unbind();B.unbind();j.unbind();if(D.current_dir_path){C.click(function(G){s(D.moveup_dir_path,j.val(),F)})}function E(){if(B.val()=="VIEW"){s(D.current_dir_path,j.val(),z)}else{s(D.current_dir_path,j.val(),k)}}B.change(E);j.change(E);p.html("")}function k(M){n(M,k);var K=document.createElement("table");K.className="ke-table";K.cellPadding=0;K.cellSpacing=0;K.border=0;p.append(K);var J=M.file_list;for(var G=0,H=J.length;G<H;G++){var F=J[G],L=d(K.insertRow(G));L.mouseover(function(N){d(this).addClass("ke-on")}).mouseout(function(N){d(this).removeClass("ke-on")});var D=h+(F.is_dir?"folder-16.gif":"file-16.gif"),E=d('<img src="'+D+'" width="16" height="16" alt="'+F.filename+'" align="absmiddle" />'),I=d(L[0].insertCell(0)).addClass("ke-cell ke-name").append(E).append(document.createTextNode(" "+F.filename));if(!F.is_dir||F.has_file){L.css("cursor","pointer");I.attr("title",F.filename);l(I,M,F,k)}else{I.attr("title",g.emptyFolder)}d(L[0].insertCell(1)).addClass("ke-cell ke-size").html(F.is_dir?"-":Math.ceil(F.filesize/1024)+"KB");d(L[0].insertCell(2)).addClass("ke-cell ke-datetime").html(F.datetime)}}function z(M){n(M,z);var K=M.file_list;for(var H=0,J=K.length;H<J;H++){var G=K[H],E=d('<div class="ke-inline-block ke-item"></div>');p.append(E);var I=d('<div class="ke-inline-block ke-photo"></div>').mouseover(function(N){d(this).addClass("ke-on")}).mouseout(function(N){d(this).removeClass("ke-on")});E.append(I);var L=M.current_url+G.filename,D=G.is_dir?h+"folder-64.gif":(G.is_photo?L:h+"file-64.gif");var F=d('<img src="'+D+'" width="80" height="80" alt="'+G.filename+'" />');if(!G.is_dir||G.has_file){I.css("cursor","pointer");a(I,G);l(I,M,G,z)}else{I.attr("title",g.emptyFolder)}I.append(F);E.append('<div class="ke-name" title="'+G.filename+'">'+G.filename+"</div>")}}B.val(A);s("",j.val(),A=="VIEW"?z:k);return y}});