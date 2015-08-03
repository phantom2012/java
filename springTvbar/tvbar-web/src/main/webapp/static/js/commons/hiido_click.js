(function () {

    var version = 1.1;
    var win = window;
    var _hiidoDebug = win._hiidoDebug || false;
    var logger = {
        log: function () {
            if (_hiidoDebug) {
                win.console && win.console.log(arguments);
            }
        }
    };

    var hiido = {
        domain: "ylog.hiido.com",
        ipPrefix: "183.61.2.",
        ips: [91, 92, 94, 95, 96, 97, 98],
        getServerUrl: function (host) {
            host = host || this.domain;
            var ptl = location.protocol;
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
            obj.uid = this.getCookie("uid");
            obj.ui = this.getCookie("hiido_ui");
            obj.username = this.getCookie("username");
            for (h in obj) {
                if (obj.hasOwnProperty(h)) {
                    param.push(encodeURIComponent(h) + "=" + (obj[h] === undefined || obj[h] === null ? "" :
                        encodeURIComponent(obj[h])))
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
            }
            img.src = url;
        },

        getCookie: function (name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) {
                return unescape(arr[2]);
            } else {
                return null
            }
            ;
        }
    };

    var iface = {
        stat: function (opt) {
            if (!opt) {
                return false;
            }
            var svr = hiido.getServerUrl();
            var param = hiido.getParam(opt);
            var url = svr + param
            var backurl = hiido.getServerUrl(hiido.randomIp()) + param;
            hiido.send(url, backurl)
        }
    };

    if (typeof(module) === "object") {
        module.exports = iface;
    }
    window.appHiido = iface;
}).apply(this);


/**
 type=1："我的订阅"tab每日PV UV，type=2: 我与主播详情页PV UV ，type=3：在详情页点击主播头像去主播个人页的PV、UV，type=4: “正在直播”模块PV、UV，
 type=5：通过“正在直播”去到直播间的PV、UV，type=6: 粉丝PP里任务中心的总PV UV，type=7：粉丝PP里各个任务被点击的次数从多到少排序，
 taskid 只有页面类型type=7时，才传这个参数
 */
//function hiido_statPP(type,taskid) {
//    var params={
//        "act":"webyymusicpp",
//        "time":"",
//        "uid":"",
//        "type":type,
//        "taskid":taskid
//    };
//    window.appHiido.stat(params);
//}

/**
 *
 * @param anchoruid 主播uid
 * @param type 点击事件标识
 * 1、直播间点击分享    2、PC网页点击分享      3、手机网页点击分享
 * 4、点击视频       5、点击“更多详情”
 */
function hiido_statPP(anchoruid, type, source) {
    var params = {
        "eventid": 10005681,
        "act": "webevent",
        "eventype": 1,
        "time": "",
        "uid": 0,
        "class1": 'ent',
        "class2": 'agencyzc',
        "bak1": anchoruid,
        "bak2": type,
        "bak3": source
    };
    window.appHiido.stat(params);
}
