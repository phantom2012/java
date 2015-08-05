(function(window, undefined) {

    'use strict';
    /* hiido-js-sdk main */
    // Base object.
    var hiido = {
        version: 2.0,
        domain: "ylog.hiido.com",
        ipPrefix: "183.61.2.",
        ips: [91, 92, 94, 95, 96, 97, 98],

        getServerUrl: function (host) {
            host = host || this.domain;
            var ptl = "http:";
            var path = "j.gif?";
            return ptl + "//" + host + "/" + path;
        },
        randomIp: function () {
            var Rand = Math.random();
            var index = Math.round(Rand * (this.ips.length - 1));
            var suff = this.ips[index];
            return this.ipPrefix + suff;
        },
        getParam: function (opt) {
            var obj = opt;
            var param = [];
            obj.time = parseInt(1 * new Date() / 1000);
            obj.ui = this.getCookie("hiido_ui");
            obj.username = this.getCookie("username");
            for (var h in obj) {
                if (obj.hasOwnProperty(h)) {
                    param.push(encodeURIComponent(h) + "=" + (obj[h] === undefined || obj[h] === null ? "" :
                        encodeURIComponent(obj[h])));
                }
            }
            return param.join("&");
        },
        send: function (url, backurl, times) {
            var reties = times || 0;
            var img = new Image();
            var self = this;
            img.onerror = function () {
                if (reties <= 1) {
                    self.send(url, backurl, ++reties);
                } else if (reties == 2) {
                    self.send(backurl, backurl, ++reties);
                }
            };
            img.src = url;
        },
        getCookie: function (name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) {
                return unescape(arr[2]);
            } else {
                return null;
            }

        },
        loadHiidoJS: function(){
            window._hiido_no = 0;
            var c = document.getElementsByTagName("head")[0] || document.documentElement;
            var b = document.createElement("script");
            b.src = "http://www.duowan.com/duowan.js";
            b.type = "text/javascript";
            var a = false;
            b.onload = b.onreadystatechange = function() {
                if (!a && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                    a = true;
                    b.onload = b.onreadystatechange = null;
                    if (c && b.parentNode) {
                        c.removeChild(b)
                    }
                }
            };
            c.insertBefore(b, c.firstChild)
        },
        stat:function(opt){
            if (!opt) {
                return false;
            }
            var svr = this.getServerUrl();
            var param = this.getParam(opt);
            var url = svr + param;
            var backurl = this.getServerUrl(hiido.randomIp()) + param;
            this.send(url, backurl);
        }
    };

    var iface = {
        /**
         * 向海度上报专题的PV/UV
         * @param myWid
         */
        addUVToHiido: function(myWid) {
            if (!$.isArray(myWid)) {
                window._hiido_wid = [];
                _hiido_wid.push(myWid)
            } else {
                window._hiido_wid = myWid
            }
            if ($.isFunction(window.hiidov3)) {
                try {
                    hiidov3()
                } catch (a) {}
            } else {
                hiido.loadHiidoJS()
            }
        },
        /**
         * 向海度上报事件
         * @param eventid  事件id
         * @param value    值
         * @param param    其它参数，根据实际情况填写，具体见程序所写
         * @param callback
         */
        reportEvent:function(eventid,value,param,callback){
            try {
                if(!eventid){
                    console.error('no eventid found');
                }
                var params = {};
                param = param ||{};

                params.eventid = eventid || 0 ;  //
                params.act = "webevent" ;
                params.eventype = "1" ;
                params.value = value || 0 ;//事件对应值
                params.uid = param.uid || 0 ;
                params.class1 = "ent"	;  //默认为ent
                params.class2 = param.class2 || "" ;  //业务分类
                params.bak1 = param.bak1 || "" ;  //可填字段1
                params.bak2 = param.bak2 || "" ; //可填字段2
                params.bak3 = param.bak3 || "" ; //可填字段3
                //后期如果还有什么字段要增加的话可以在下方拓张
                hiido.stat(params);
                if (typeof callback == 'function') {
                    callback(params);
                }
            } catch (e) {console.log('error'+e);}
        }
    };

    if (typeof(module) === "object") {
        module.exports = iface;
    }

    // Export to the window, `root`.
    window.hiidoApi = iface;
    
    // avoid conflict
    var _hiido = window.hiidoApi;

    hiido.noConflict = function () {
        if (window.hiidoApi === iface) {
            window.hiidoApi = _hiido;
        }
        return iface;
    };

}(window));