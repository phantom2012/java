(function(b){if(b("#swiperTop > ul > li").size()>=4){b("#trigger").switchable("#swiperTop > ul > li",{triggerType:"click",effect:"scroll",steps:3,visible:3}).mousewheel();var a=b("#trigger").switchable();b("#swiperNext").click(function(){a.next()});b("#swiperPrev").click(function(){a.prev()})}else{b("#swiperNext,#swiperPrev").hide()}})(jQuery);