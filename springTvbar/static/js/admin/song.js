var singers=getMap();function selectAnchor(e,c){$(e).remove();var f=$(e).attr("data-id");var b=$(e).text();var a=c==0?1:0;var d='<button class="girl-cell" data-id="'+f+'" onclick="selectAnchor(this,'+a+')">'+b+"</button>";if(c==0){singers.remove(f);$("#member_new").append(d)}else{singers.put(f,f);$("#member_old").append(d)}}function uploadMusic(c,b){var a={url:"/admin/uploadMusic.action",async:true,dataType:"json",type:"POST",contentType:"application/x-www-form-urlencoded; charset=utf-8",success:function(d){if(d.result=="0"){b(d)}else{showMessage(d.msg)}},error:function(d){showMessage("系统异常")}};$(c).ajaxSubmit(a)};