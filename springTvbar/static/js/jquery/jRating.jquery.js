(function(a){a.fn.jRating=function(c){var b={bigStarsPath:"jquery/icons/stars.png",smallStarsPath:"jquery/icons/small.png",phpPath:"php/jRating.php",type:"big",step:false,isDisabled:false,showRateInfo:true,canRateAgain:false,sendRequest:true,length:5,decimalLength:0,rateMax:20,rateInfosX:-45,rateInfosY:5,nbRates:1,onSuccess:null,onError:null,onClick:null};if(this.length>0){return this.each(function(){var p=a.extend(b,c),o=0,u=0,m=0,k="",r=false,h=0,t=p.nbRates;if(a(this).hasClass("jDisabled")||p.isDisabled){var i=true}else{var i=false}f();a(this).height(m);var e=parseFloat(a(this).attr("data-average")),l=parseInt(a(this).attr("data-id")),n=u*p.length,s=e/p.rateMax*n,d=a("<div>",{"class":"jRatingColor",css:{width:s}}).appendTo(a(this)),e=a("<div>",{"class":"jRatingAverage",css:{width:0,top:-m}}).appendTo(a(this)),j=a("<div>",{"class":"jStar",css:{width:n,height:m,top:-(m*2),background:"url("+k+") repeat-x"}}).appendTo(a(this));a(this).css({width:n,overflow:"hidden",zIndex:1,position:"relative"});if(!i){a(this).unbind().bind({mouseenter:function(y){var v=g(this);var w=y.pageX-v;if(p.showRateInfo){var x=a("<p>",{"class":"jRatingInfos",html:q(w)+' <span class="maxRate">/ '+p.rateMax+"</span>",css:{top:(y.pageY+p.rateInfosY),left:(y.pageX+p.rateInfosX)}}).appendTo("body").show()}},mouseover:function(v){a(this).css("cursor","pointer")},mouseout:function(){a(this).css("cursor","default");if(r){e.width(h)}else{e.width(0)}},mousemove:function(x){var v=g(this);var w=x.pageX-v;if(p.step){o=Math.floor(w/u)*u+u}else{o=w}e.width(o);if(p.showRateInfo){a("p.jRatingInfos").css({left:(x.pageX+p.rateInfosX)}).html(q(o)+' <span class="maxRate">/ '+p.rateMax+"</span>")}},mouseleave:function(){a("p.jRatingInfos").remove()},click:function(x){var v=this;r=true;h=o;t--;if(!p.canRateAgain||parseInt(t)<=0){a(this).unbind().css("cursor","default").addClass("jDisabled")}if(p.showRateInfo){a("p.jRatingInfos").fadeOut("fast",function(){a(this).remove()})}x.preventDefault();var w=q(o);e.width(o);a(".datasSent p").html("<strong>idBox : </strong>"+l+"<br /><strong>rate : </strong>"+w+"<br /><strong>action :</strong> rating");a(".serverResponse p").html("<strong>Loading...</strong>");if(p.onClick){p.onClick(v,w)}if(p.sendRequest){a.post(p.phpPath,{idBox:l,rate:w,action:"rating"},function(y){if(!y.error){a(".serverResponse p").html(y.server);if(p.onSuccess){p.onSuccess(v,w)}}else{a(".serverResponse p").html(y.server);if(p.onError){p.onError(v,w)}}},"json")}}})}function q(w){var x=parseFloat((w*100/n)*parseInt(p.rateMax)/100);var y=Math.pow(10,parseInt(p.decimalLength));var v=Math.round(x*y)/y;return v}function f(){switch(p.type){case"small":u=12;m=10;k=p.smallStarsPath;break;default:u=23;m=20;k=p.bigStarsPath}}function g(v){if(!v){return 0}return v.offsetLeft+g(v.offsetParent)}})}}})(jQuery);