var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-49333096-1"]);_gaq.push(["_trackPageview"]);var _hmt=_hmt||[];(function(){var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a);var c=document.createElement("script");c.src="//hm.baidu.com/hm.js?eff6886a16233d3053c89fbdf4f62245";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(c,a)})();function state_trackEvent(b,c,d,a){_gaq.push(["_trackEvent",b,c,d,a]);_hmt.push(["_trackEvent",b,c,d,a])}function state_setCustomVar(c,b,d,a){if($.isArray(a)){$.each(a,function(f,e){_hmt.push(["_setCustomVar",1,b,d,e]);_gaq.push(["_setCustomVar",1,b,d,e])})}else{_hmt.push(["_setCustomVar",1,b,d,a]);_gaq.push(["_setCustomVar",1,b,d,a])}};