var _yyClientInstalled=null;function checkYYClientInstalled(){if(_yyClientInstalled!==null){return _yyClientInstalled}var c=false,l="undefined",d="object",i="歪歪",h="yy_checker.Checker.1",m="application/x-checker",f=window,b=navigator;if(typeof b.plugins!=l&&typeof b.plugins[i]==d){var k=b.plugins[i].description;if(k&&!(typeof b.mimeTypes!=l&&b.mimeTypes[m]&&!b.mimeTypes[m].enabledPlugin)){c=true}}else{if(typeof f.ActiveXObject!=l){try{var j=new ActiveXObject(h);c=true}catch(g){}}}_yyClientInstalled=c;return c}function gotoYYClientChannel(a,c,f){if(checkYYClientInstalled()){try{var b="yy://join:room_id="+a;if(c){b+="&sub_room_id="+c}location.href=b}catch(d){if(f&&!isNaN(f)){window.open("http://m.yy.com/live/"+f)}else{window.open("http://m.yy.com")}}}else{if(f&&!isNaN(f)){window.open("http://m.yy.com/live/"+f)}else{window.open("http://m.yy.com")}}};