<%@ page pageEncoding="utf-8"%>
<div style="margin-top:100px">

 <div id="serviceShowArea">
 
 </div> 
  <div>
   <button id="appendServiceItem">增添</button>
 </div>
 <div>
   <button id="saveServiceItem">保存并下一步</button>
 </div>
</div>


<script id="service_item_template" type="text/html">
<@
    for(var i= 0 ; i < list.length ; i ++){
@>
 <form style="margin-bottom:50px" id="serviceItemForm<@=index@>" data-service-id="<@=list[i].service_id@>">
  服务标题<input type ="text"  name="title" value="<@=list[i].title@>"/> 
<@if(index>0){@>
<button type="button" onclick="agenService.delServiceItem(<@=index@>)">删除</button>
<@}@> <br/>
  <div id="uploadfile" >上传图片</div>
  <input type="hidden" name="picture" value="<@=list[i].service_id@>"/>
 服务城市<input type ="text" name="city" value="<@=list[i].city@>"/> <br/>
 服务类型<select value="2" onchange="agenService.getServiceQulityByType($(this).val(),<@=index@>);">
     <@for(var key1 in cityList){@>        
           <option  value="<@=key1@>" <@if(key1 == list[i].type){@> selected="selected" <@}@> ><@=cityList[key1]@></option>    
     <@}@>
      </select>
 <br/>
 服务内容<input type ="text"  name="content" value="<@=list[i].content@>"/> <br/>
  服务价格 <div id="priceArea<@=index@>">
       <@for(var key2 in list[i].priceList){@>        
           <label><input type ="checkbox" <@if(list[i].priceList[key2].checked){@> checked="checked" <@}@>  name="quality" value="<@=list[i].priceList[key2].quality@>"/><@=list[i].priceList[key2].describtion@>-<@=list[i].priceList[key2].price@></label>    
     <@}@>
</div>
<input type="hidden" name="service_id" value="<@=list[i].service_id@>"/>
 </form>
<@
 index++;}
@>
</script>
<script id="service_price_template" type="text/html">
 <label><input type ="checkbox" checked="checked" name="quality" value="<@=item.quality@>"/><@=item.describtion@>-<@=item.price@></label>
</script>

<link rel="stylesheet" href="http://res.idol.yystatic.com/agency/??css/commons/jquery.ext.select.css," />