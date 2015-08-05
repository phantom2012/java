<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" type="text/css" href="http://res1.idol.yystatic.com/agency/css/jRating.jquery.css" />
<script type="text/javascript" src="http://res1.idol.yystatic.com/agency/js??jquery/jRating.jquery.js,agency/order/orderComment.js?v=20150428"></script>
<script type="text/html" id="comment_template">
    <!-- 评分 -->
    <div class="popup-box w522" style="display:block;position: relative">
        <a href="javascript:void(0)" class="close" onclick="$.uiwidget.popupHide({id:'popUpBox'});"></a>
        <div class="popup-title">评分</div>
        <div class="popup-content">
            <div class="grade-con">
                <div class="basicComment" data-average="<@=item.graded@>" data-id="<@=item.order_id@>"></div>
                <div>
                   <@if(item.star_comment != ''){@>
                     <p>我的留言：<@=item.star_comment@></p>
                   <@}@>
                   <@if(item.agency_comment != ''){@>
                     <p>对方回复：<@=item.agency_comment@></p>
                   <@}@>
                   <@if(item.add_comment != ''){@>
                     <p>我的留言：<@=item.add_comment@></p>
                   <@}@>
                   <@if(item.agency_add_comment != ''){@>
                     <p>对方回复：<@=item.agency_add_comment@></p>
                   <@}@>
                </div>                           
                <p class="leave-message">留言：<textarea id="commentText" name="" <@if(item.isTextDisabled){@> disabled="disabled" <@}@> ></textarea></p>
                <p class="btn-con"><a href="javascript:void(0)" onclick="orderComment.appendIdolComment();" class="btn orange"><@=item.buttonText@></a></p>
            </div>
        </div>
    </div>
</script>
<script type="text/javascript">
var post_url = "http://idol.yy.com/agency/" ;
var orderComment = new com.yy.agency.OrderComment() ;
orderComment.order = order ;
orderComment.init() ;
</script>