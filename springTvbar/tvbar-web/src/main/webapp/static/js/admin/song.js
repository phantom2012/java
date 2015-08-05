var singers = getMap();

function selectAnchor(obj,isAdd) {
    $(obj).remove();
    var id = $(obj).attr('data-id');
    var name = $(obj).text();
    var flag = isAdd==0? 1 : 0;
    var html = '<button class="girl-cell" data-id="'+id+'" onclick="selectAnchor(this,'+flag+')">'+name+'</button>';;
    if(isAdd == 0) {
        singers.remove(id);
        $('#member_new').append(html);
    } else {
        singers.put(id,id);
        $('#member_old').append(html);
    }
}

function uploadMusic(form,successFun){
    var options = {
        url : '/admin/uploadMusic.action',
        async: true,
        dataType: 'json',
        type : 'POST',
        contentType : "application/x-www-form-urlencoded; charset=utf-8",
        success : function(data){
            if(data.result == '0'){
                successFun(data);
            }else{
                showMessage(data.msg);
            }

        },
        error : function(e){
            showMessage('系统异常');
        }
    };
    $(form).ajaxSubmit(options);
}


