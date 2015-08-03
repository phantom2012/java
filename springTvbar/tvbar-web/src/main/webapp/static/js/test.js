$.ajax (
    {
        url: post_url+'admin/adminSaveServiceItems.action',
        type:'post',
        data:{title:"sdf",des:"sdfsd",sour:1},
        dataType:'json',
        autoAlert:true,
        success:function(json){
            if(json.result == 0 ){
                location.href = obj.attr("data-href") ;
            }
            else{
                $.alert("±£¥Ê ß∞‹£°") ;
            }
        }
    }
);
