$(document).ready(function(){var b=$("#loginform");var a=$("#recoverform");var c=400;$("#to-recover").click(function(){b.fadeTo(c,0.01).css("z-index","100");a.fadeTo(c,1).css("z-index","200")});$("#to-login").click(function(){a.fadeTo(c,0.01).css("z-index","100");b.fadeTo(c,1).css("z-index","200")});if($.browser.msie==true&&$.browser.version.slice(0,3)<10){$("input[placeholder]").each(function(){var d=$(this);$(d).val(d.attr("placeholder"));$(d).focus(function(){if(d.val()==d.attr("placeholder")){d.val("")}});$(d).blur(function(){if(d.val()==""||d.val()==d.attr("placeholder")){d.val(d.attr("placeholder"))}})})}});