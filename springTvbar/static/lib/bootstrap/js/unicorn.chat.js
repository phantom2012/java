$(document).ready(function(){var c='<p><span class="msg-block"><strong></strong><span class="time"></span><span class="msg"></span></span></p>';$(".chat-message button").click(function(){var e=$(this).siblings("span").children("input[type=text]");if(e.val()!=""){d("You","img/demo/av1.jpg",e.val(),true)}});$(".chat-message input").keypress(function(f){if(f.which==13){if($(this).val()!=""){d("You","img/demo/av1.jpg",$(this).val(),true)}}});setTimeout(function(){d("Neytiri","img/demo/av2.jpg","I have a problem. My computer not work!")},"6000");setTimeout(function(){d("Cartoon Man","img/demo/av3.jpg","Turn off and turn on your computer then see result.")},"11000");setTimeout(function(){b("neytiri","Neytiri")},"13500");var a=0;function d(e,j,g,k){a=a+1;var n=$("#chat-messages-inner");var h=new Date();var m=h.getHours();var i=h.getMinutes();if(m<10){m="0"+m}if(i<10){i="0"+i}var f="msg-"+a;var l=e.replace(" ","-").toLowerCase();n.append('<p id="'+f+'" class="user-'+l+'"><img src="'+j+'" alt="" /><span class="msg-block"><strong>'+e+'</strong> <span class="time">- '+m+":"+i+'</span><span class="msg">'+g+"</span></span></p>");$("#"+f).hide().fadeIn(800);if(k){$(".chat-message input").val("").focus()}$("#chat-messages").animate({scrollTop:n.height()},1000)}function b(f,g){a=a+1;$(".contact-list li#user-"+f).addClass("offline").delay(1000).slideUp(800,function(){$(this).remove()});var e=$("#chat-messages-inner");var h="msg-"+a;e.append('<p class="offline" id="'+h+'"><span>User '+g+" left the chat</span></p>");$("#"+h).hide().fadeIn(800)}});