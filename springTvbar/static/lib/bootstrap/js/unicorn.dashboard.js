$(document).ready(function(){unicorn.peity();var h=[],k=[];for(var e=0;e<14;e+=0.5){h.push([e,Math.sin(e)]);k.push([e,Math.cos(e)])}var f=$.plot($(".chart"),[{data:h,label:"sin(x)",color:"#BA1E20"},{data:k,label:"cos(x)",color:"#459D1C"}],{series:{lines:{show:true},points:{show:true}},grid:{hoverable:true,clickable:true},yaxis:{min:-1.6,max:1.6}});var c=null;$(".chart").bind("plothover",function(l,n,i){if(i){if(c!=i.dataIndex){c=i.dataIndex;$("#tooltip").fadeOut(200,function(){$(this).remove()});var d=i.datapoint[0].toFixed(2),m=i.datapoint[1].toFixed(2);unicorn.flot_tooltip(i.pageX,i.pageY,i.series.label+" of "+d+" = "+m)}}else{$("#tooltip").fadeOut(200,function(){$(this).remove()});c=null}});var a=new Date();var g=a.getDate();var b=a.getMonth();var j=a.getFullYear();$(".calendar").fullCalendar({header:{left:"prev,next",center:"title",right:"month,basicWeek,basicDay"},editable:true,events:[{title:"All day event",start:new Date(j,b,1)},{title:"Long event",start:new Date(j,b,5),end:new Date(j,b,8)},{id:999,title:"Repeating event",start:new Date(j,b,2,16,0),end:new Date(j,b,3,18,0),allDay:false},{id:999,title:"Repeating event",start:new Date(j,b,9,16,0),end:new Date(j,b,10,18,0),allDay:false},{title:"Lunch",start:new Date(j,b,14,12,0),end:new Date(j,b,15,14,0),allDay:false},{title:"Birthday PARTY",start:new Date(j,b,18),end:new Date(j,b,20),allDay:false},{title:"Click for Google",start:new Date(j,b,27),end:new Date(j,b,29),url:"http://www.google.com"}]})});unicorn={peity:function(){$.fn.peity.defaults.line={strokeWidth:1,delimeter:",",height:24,max:null,min:0,width:50};$.fn.peity.defaults.bar={delimeter:",",height:24,max:null,min:0,width:50};$(".peity_line_good span").peity("line",{colour:"#B1FFA9",strokeColour:"#459D1C"});$(".peity_line_bad span").peity("line",{colour:"#FFC4C7",strokeColour:"#BA1E20"});$(".peity_line_neutral span").peity("line",{colour:"#CCCCCC",strokeColour:"#757575"});$(".peity_bar_good span").peity("bar",{colour:"#459D1C"});$(".peity_bar_bad span").peity("bar",{colour:"#BA1E20"});$(".peity_bar_neutral span").peity("bar",{colour:"#757575"})},flot_tooltip:function(a,c,b){$('<div id="tooltip">'+b+"</div>").css({top:c+5,left:a+5}).appendTo("body").fadeIn(200)}};