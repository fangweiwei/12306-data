var alertWarningMsg;
var alertWarningMsgByHeader;
var alertWarningMsgByTit_header;
(function () {
    var e = null;
    $(document).ready(function () {
        e = b()
    });
    var a = null;
    if (typeof globalRepeatSubmitToken != "undefined") {
        a = globalRepeatSubmitToken
    }
    var j = null;
    var l = "_json_att";
    var d = "_es_hiddenform";
    var k = "<form  method='post' id='" + d + "'><input type='hidden' name='" + l + "'></input></form>";
    var h = $.ajax;
    ots_global = {};
    $.ajax = function (o, n) {
        if (typeof o == "object") {
            n = o;
            o = undefined
        }
        n = n || {};
        var m = n.isAlert || true;
        if (n.success) {
            var p = n.success;
            n.success = function (y, s, x) {
                if (y && y.validateMessagesShowId) {
                    var w = y.messages;
                    if (w && w.length > 0) {
                        var v = "";
                        for (var u = 0; u < w.length; u++) {
                            v += w[u] + "\n"
                        }
                        dhtmlx.alert({
                            title: w["message.info"],
                            ok: w["button.ok"],
                            text: v,
                            callback: function () {
                                if (y.url) {
                                    window.location = ctx + y.url
                                }
                            }
                        })
                    }
                    var z = y.validateMessages;
                    var v = "";
                    for (var t in z) {
                        v += t + " :" + z[t] + "</br>"
                    }
                    if (v) {
                        if (m) {
                            dhtmlx.alert({
                                title: w["message.info"],
                                ok: w["button.ok"],
                                text: v,
                                callback: function () {}
                            })
                        } else {
                            $("#" + y.validateMessagesShowId).html(v).show()
                        }
                    } else {
                        $("#" + y.validateMessagesShowId).html("").hide()
                    } if (y.attributes) {
                        j = y.attributes
                    }
                    if (y.repeatSubmitToken && y.repeatSubmitToken != "") {
                        a = y.repeatSubmitToken
                    }
                }
                p.call(this, y, s, x)
            }
        }
        var r = n.data || {};
        var q = true;
        if (n.isTakeParam == false) {
            q = false
        }
        if (q) {
            if (j) {
                r[l] = j
            } else {
                r[l] = $("input[name=_json_att]").val()
            }
        }
        if ("undefined" != typeof (a) && a != null) {
            r.REPEAT_SUBMIT_TOKEN = a
        }
        n.data = r;
        h.call(this, o, n)
    };
    if (typeof otsRedirect == "undefined") {
        otsRedirect = function (r, o, p, q) {
            p = p || {};
            if (r && r == "post") {
                if ($("#" + d).length == 0) {
                    $(document.body).append(k)
                }
                if (j) {
                    $("#" + d + " input[name='" + l + "']").val(j)
                }
                $("#" + d + " input[name='" + l + "'] ~ input").remove();
                if (a != null) {
                    $("#" + d).append("<input type='hidden' name='REPEAT_SUBMIT_TOKEN'></input>");
                    $("#" + d + " input[name='REPEAT_SUBMIT_TOKEN']").val(a)
                }
                if (p) {
                    for (var n in p) {
                        var m = "<input type='hidden' name='" + n + "'></input>";
                        $("#" + d).append(m);
                        $("#" + d + " input[name='" + n + "']").val(p[n])
                    }
                }
                if (q != null) {
                    $("#" + d).attr("target", q)
                } else {
                    $("#" + d).removeAttr("target")
                }
                $("#" + d).attr("action", o);
                $("#" + d).submit()
            } else {
                if (j) {
                    if (o.indexOf("?") > 0) {
                        o += "&" + l + "=" + j
                    } else {
                        o += "?" + l + "=" + j
                    }
                }
                if (p) {
                    for (var n in p) {
                        if (o.indexOf("?") > 0) {
                            o += "&" + n + "=" + p[n]
                        } else {
                            o += "?" + n + "=" + p[n]
                        }
                    }
                }
                switch (q) {
                    case "_blank":
                        window.open(o);
                        break;
                    default:
                        window.location.href = o
                }
            }
        }
    }(function () {
        var m = {
            dateformat: "%Y-%m-%d",
            monthesFNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            monthesSNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            daysFNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            daysSNames: ["日", "一", "二", "三", "四", "五", "六"],
            weekstart: 1
        };
        ots_global.calendarLang = ots_global.calendarLang || {};
        ots_global.calendarLang.zh_CN = m
    })();

    function b() {
        var m = new dhtmlXWindows();
        m.enableAutoViewport(true);
        m.setSkin("dhx_terrace");
        m.setImagePath(ctx + "resources/js/rich/windows/imgs/");
        return m
    }
    alertWarningMsgByHeader = function (m) {
        alertWarningMsg(messages["message.info"], m, "", messages["button.ok"])
    };
    alertWarningMsgByTit_header = function (m, n) {
        alertWarningMsg(m, n, "", messages["button.ok"])
    };
    alertWarningMsg = function (p, s, n) {
        i(p, s, n, messages["button.ok"]);
        $("#qd_closeDefaultWarningWindowDialog_id").click(function () {
            f()
        });
        $("#gb_closeDefaultWarningWindowDialog_id").click(function () {
            f()
        });
        var r = "defaultwarningAlert_id";
        var o = c(r);
        var m = $(window).width() / 2 - 300;
        var q = g() + ($(window).height() / 2 - 200);
        o.setDimension($("#content_" + r).width(), $("#content_" + r).height() + 10);
        $(".dhtmlx_window_active").height($("#content_" + r).height());
        $(".dhtmlx_window_active").css({
            left: m + "px",
            top: q + "px"
        })
    };

    function g() {
        if ("pageYOffset" in window) {
            return window.pageYOffset
        } else {
            if (document.compatMode == "BackCompat") {
                return document.body.scrollTop
            } else {
                return document.documentElement.scrollTop
            }
        }
    }

    function i(o, q, m, p) {
        var n = '<div id="defaultwarningAlert_id" style="display:none;" ><div class="mark"></div><div class="up-box w600" id="content_defaultwarningAlert_id"><div class="up-box-hd" ><span id="content_defaultwarningAlert_title">' + o + '</span><a href="#nogo"id="gb_closeDefaultWarningWindowDialog_id">关闭</a></div><div class="up-box-bd"><div class="up-con clearfix"><span class="icon i-warn"></span> <div class="r-txt"><div class="tit" id="content_defaultwarningAlert_hearder" >' + q + '</div><P  id="content_defaultwarningAlert_body">' + m + '</P></div></div> <div class="lay-btn"><a href="#nogo" id="qd_closeDefaultWarningWindowDialog_id" class="btn92s">' + p + "</a></div></div></div></div>";
        $("body").append(n)
    }

    function c(n) {
        var m = e.createWindow(n + "_", 50, 10, 660, 100);
        m.attachObject(n);
        m.clearIcon();
        m.denyResize();
        m.setModal(true);
        m.center();
        m.button("park").hide();
        m.button("minmax1").hide();
        m.hideHeader();
        return m
    }

    function f() {
        var m = "defaultwarningAlert_id";
        if (e.isWindow(m + "_")) {
            e.window(m + "_").close()
        }
    }
})();
var refreshImg = null;
var _top_;
var isDebug = false;
refreshImg = function (d, b, a) {
    var g = "img-check";
    if ("undefined" == typeof (a)) {
        a = "img_rand_code"
    } else {
        g = "img-check2"
    }
    $("#" + a).attr("src", ctx + "passcodeNew/getPassCodeNew.do?module=" + d + "&rand=" + b + "&" + Math.random());
    var c = $("#" + g).html();
    $("#" + g).html(c);
    try {
        $("#i-ok").hide();
        if ($("#i-ok2")[0]) {
            $("#i-ok2").hide()
        }
        $("#randCode").val("");
        $("#randCode").removeClass("error");
        if ($("#randCode2")[0]) {
            $("#randCode2").val("")
        }
    } catch (f) {}
};

function isLogin() {
    if ("undefined" != typeof (sessionInit) && (sessionInit) && (null != sessionInit)) {
        $("#login_user").attr("href", ctx + "index/initMy12306");
        $("#login_user").prev("span").html("您好，");
        $("#login_user").html(sessionInit);
        $("#regist_out").attr("href", ctx + "login/loginOut");
        $("#regist_out").html("退出")
    } else {
        $("#login_user").attr("href", ctx + "login/init");
        $("#login_user").prev("span").html("您好，请&nbsp");
        $("#login_user").html("登录");
        $("#regist_out").attr("href", ctx + "regist/init");
        $("#regist_out").html("注册")
    }
}

function loginAsyn(a) {
    if (a != null) {
        $("#login_user").attr("href", ctx + "index/initMy12306");
        $("#login_user").prev("span").html("您好，");
        $("#login_user").html(a);
        $("#regist_out").attr("href", ctx + "login/loginOut");
        $("#regist_out").html("退出")
    } else {
        $("#login_user").attr("href", ctx + "login/init");
        $("#login_user").prev("span").html("您好，请");
        $("#login_user").html("登录");
        $("#regist_out").attr("href", ctx + "regist/init");
        $("#regist_out").html("注册")
    }
}

function _initGuideShow(b) {
    var a = $(".nav-list a");
    a.removeClass("on");
    $("#js-xd").find(".nav-list").show();
    $("#js-xd").unbind("mouseout");
    $("#js-xd").unbind("mouseover");
    $.each(a, function (c) {
        if (c == b) {
            $(a[c]).addClass("on");
            return
        }
    })
}

function checkHover(b, a) {
    if (getEvent(b).type == "mouseover") {
        return !contains(a, getEvent(b).relatedTarget || getEvent(b).fromElement) && !((getEvent(b).relatedTarget || getEvent(b).fromElement) === a)
    } else {
        return !contains(a, getEvent(b).relatedTarget || getEvent(b).toElement) && !((getEvent(b).relatedTarget || getEvent(b).toElement) === a)
    }
}

function getEvent(a) {
    return a || window.event
}

function contains(a, b) {
    if (a.contains) {
        return a != b && a.contains(b)
    } else {
        return !!(a.compareDocumentPosition(b) & 16)
    }
}

function initPageTitle(b) {
    $(".nav ul li").not("#js-xd li").eq(b).children("a").addClass("current");
    var c = $(".nav ul li a").not(".nav-list a");
    for (var a = 0; a < c.length; a++) {
        if (b != a) {
            c.eq(a).on("mouseenter", function () {
                $(this).addClass("current")
            }).on("mouseleave", function () {
                    $(this).removeClass("current")
                })
        }
    }
}
clickCheckBoxName = function () {
    $("input[class='check']").each(function () {
        var c = $(this);
        var a = c.next("label").attr("for");
        var b = c.attr("id");
        if (null == b || "" == b || "undefined" == b) {
            var b = "checkbox_" + generateMixed();
            c.attr("id", b)
        }
        c.next("label").attr("for", b).css("cursor", "pointer")
    })
};

function generateMixed() {
    var b = "";
    var c = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    for (var a = 0; a < 10; a++) {
        var d = Math.ceil(Math.random() * 61);
        b += c[d]
    }
    return b
}

function showHelpName() {
    $.ajax({
        url: "../login/existUser",
        type: "POST",
        success: function (a) {
            if (a.success) {
                sessionInit = a.name;
                if ("undefined" != typeof (sessionInit) && (sessionInit) && (null != sessionInit)) {
                    $("#login_user").attr("href", "../index/initMy12306");
                    $("#login_user").prev("span").html("<font>意见反馈:<a class='cursor colorA' href='mailto:12306yjfk@rails.com.cn'>12306yjfk@rails.com.cn</a></font> 您好，");
                    $("#login_user").html(sessionInit);
                    $("#regist_out").attr("href", "../login/loginOut");
                    $("#regist_out").html("退出")
                } else {
                    $("#login_user").attr("href", "../login/init");
                    $("#login_user").prev("span").html("<font>意见反馈:<a class='cursor colorA' href='mailto:12306yjfk@rails.com.cn'>12306yjfk@rails.com.cn</a></font> 您好，请&nbsp");
                    $("#login_user").html("登录");
                    $("#regist_out").attr("href", "../regist/init");
                    $("#regist_out").html("注册")
                }
            }
        }
    })
}

function controContentHeight() {
    var e = 0;
    var b = 0;
    if (window.attachEvent) {
        var a = navigator.appVersion;
        if (a.indexOf("MSIE 7.0") >= 0) {
            e = 53
        } else {
            e = 80;
            if (!document.getElementById("forget_password_id")) {
                b = 12
            }
        }
    } else {
        e = 78;
        if (!document.getElementById("forget_password_id")) {
            b = 15
        }
    }
    var c = 0;
    if (!$(".nav-list").is(":hidden")) {
        c = $(".nav-list").height()
    }
    var d = $(window).height() - $(".header").height() - $(".footer").height() - e + b - c;
    if (d > 400) {
        if ($("#scroll").css("display") == "block") {
            $(".content").css("min-height", d - 30)
        } else {
            $(".content").css("min-height", d)
        }
    }
}
jQuery.extend({
    showNotice: function () {
        if ("undefined" == typeof (isShowNotice) || "N" != isShowNotice) {
            $("#scroll").css("display", "block");
            var c = "<li><a >“网上购票”可购买预售期内不晚于开车前2小时的列车车票；“网上订票”可预订4至20日列车车票。</a></li>";
            if (noticeContent && "undefined" != typeof (noticeContent)) {
                var b = noticeContent.length;
                if (b > 0) {
                    for (var a = 0; a < b; a++) {
                        c += "<li><a>" + noticeContent[a] + "</a></li>"
                    }
                }
            }
            $("#scroll .notice_in ul").html(c)
        } else {
            if ("N" == isShowNotice) {
                $("#scroll").hide();
                $("div.ban-area").hide()
            }
        }
    }
});
$(function () {
    var d = 0;
    $(document).ready(function () {
        if ("undefined" == typeof (sessionInit)) {
            showHelpName()
        } else {}
        controContentHeight();
        $(".menu-list").on("mouseover", function (e) {
            if (checkHover(e, this)) {
                d = 1
            }
        }).on("mouseleave", function () {
                d = 0;
                $(".menu-list").hide()
            });
        $(".nav>ul>li>a").click(function () {
            $(".nav>ul>li").removeClass();
            $(this).parent().addClass("current")
        });
        $(".notice_in ul a").click(function () {
            otsRedirect("post", ctx + "index/showAnnouncement")
        });
        if ($(".phone-link").html() == undefined) {
            $(".login-info").prepend("<div class='phone-link'><a href='../appDownload/init'>手机版</a></div>")
        }
        b()
    });

    function b() {
        document.body.appendChild($('<a href="#" id="_return_top" class="return-top" title="返回顶部" style="display: block;"></a>')[0]);
        var e = !window.XMLHttpRequest;
        $("#_return_top").css({
            position: e ? "absolute" : "fixed",
            bottom: "30px",
            right: "30px"
        }).goToTop(5);
        $(window).on("scroll resize", function () {
            $("#_return_top").goToTop(5)
        })
    }
    $("#js-my").on("mouseover", function () {
        if (a) {
            clearTimeout(a)
        }
        $(".menu-list").show()
    });
    var a = null;
    $("#js-my").on("mouseout", function () {
        a = setTimeout(function () {
            if (d != 1) {
                d = 0;
                $(".menu-list").hide()
            }
        }, 120)
    });
    $("#js-xd").on("mouseover", function () {
        if (c) {
            clearTimeout(c)
        }
        $("#js-xd").addClass("nav-guide");
        $(this).find(".nav-list").show()
    });
    var c = null;
    $("#js-xd").on("mouseout", function (e) {
        var f = $(this);
        c = setTimeout(function () {
            f.find(".nav-list").hide()
        }, 120)
    });
    $(".pos-rel input").focus(function () {
        $(this).next().show();
        $(this).css("border", "1px solid #2D8DCF")
    });
    $(".pos-rel input").blur(function () {
        $(this).next().hide();
        $(this).css("border", "1px solid #CFCDC7")
    });
    $("#scroll>a:last").click(function () {
        $.ajax({
            url: ctx + "Notice/showNotice",
            type: "POST",
            success: function (e) {
                if (e.status) {
                    $("#scroll").hide();
                    $("div.ban-area").hide()
                }
            }
        })
    });
    if (!window.debug) {
        window.debug = function (f) {
            try {
                if (!window.console) {
                    window.console = {};
                    window.console.log = function () {
                        return
                    }
                }
                if (isDebug) {
                    window.console.log(f + " ")
                }
            } catch (g) {}
        }
    }
});
(function (a) {
    a.fn.goToTop = function (d) {
        var e = a(window);
        var c = a(this);
        var b = (e.scrollTop() > d) ? true : false;
        if (b) {
            c.stop().show()
        } else {
            c.stop().hide()
        }
        return this
    };
    a.fn.headerFloat = function () {
        var b = function (c) {
            var d = false;
            a(window).on("scroll resize", function () {
                var e = a(this).scrollTop();
                if (!d) {
                    d = c.position().left - 1
                }
                _top_ = c.position().top;
                if (e > _top_ + 30) {
                    if (!(navigator.appVersion.indexOf("MSIE 6") > -1)) {
                        a("#floatTable")[0].style.position = "fixed";
                        a("#floatTable")[0].style.top = 0;
                        a("#floatTable").css("z-index", "1900");
                        a("#floatTable").css("left", d)
                    } else {
                        a("#floatTable").css({
                            position: "absolute",
                            top: e,
                            left: d
                        })
                    }
                    a("#floatTable").show()
                } else {
                    a("#floatTable").css({
                        top: _top_
                    });
                    a("#floatTable").hide()
                }
            })
        };
        return a(this).each(function () {
            b(a(this))
        })
    }
})(jQuery);
var favorite_names = "@bji|北京|BJP|0@sha|上海|SHH|1@tji|天津|TJP|2@cqi|重庆|CQW|3@csh|长沙|CSQ|4@cch|长春|CCT|5@cdu|成都|CDW|6@fzh|福州|FZS|7@gzh|广州|GZQ|8@gya|贵阳|GIW|9@hht|呼和浩特|HHC|10@heb|哈尔滨|HBB|11@hfe|合肥|HFH|12@hzh|杭州|HZH|13@hko|海口|VUQ|14@jna|济南|JNK|15@kmi|昆明|KMM|16@lsa|拉萨|LSO|17@lzh|兰州|LZJ|18@nni|南宁|NNZ|19@nji|南京|NJH|20@nch|南昌|NCG|21@sya|沈阳|SYT|22@sjz|石家庄|SJP|23@tyu|太原|TYV|24@wlq|乌鲁木齐|WMR|25@wha|武汉|WHN|26@xnx|西宁西|XXO|27@xan|西安|XAY|28@ych|银川|YIJ|29@zzh|郑州|ZZF|30";
(function (x) {
    jQuery.extend({
        ht_getcookie: function (O) {
            var N = document.cookie.indexOf(O);
            var M = document.cookie.indexOf(";", N);
            return N == -1 ? "" : unescape(document.cookie.substring(N + O.length + 1, (M > N ? M : document.cookie.length)))
        },
        ht_setcookie: function (S, R, Q, P, N, O) {
            var M = new Date();
            M.setTime(M.getTime() + Q * 1000);
            document.cookie = escape(S) + "=" + escape(R) + (M ? "; expires=" + M.toGMTString() : "") + (P ? "; path=" + P : "; path=/") + (N ? "; domain=" + N : "") + (O ? "; secure" : "")
        },
        textFocus: function (O) {
            var N, M, O = O === undefined ? 0 : parseInt(O);
            this.each(function () {
                if (!this.setSelectionRange) {
                    N = this.createTextRange();
                    O === 0 ? N.collapse(false) : N.move("character", O);
                    N.select()
                } else {
                    M = this.value.length;
                    O === 0 ? this.setSelectionRange(M, M) : this.setSelectionRange(O, O)
                }
                this.focus()
            });
            return this
        }
    });
    var s = [];
    var y = [];
    var z = [];
    var A = [];
    var r = 0;
    var t = 0;
    var v = 0;
    var J = 0;
    var K = false;
    var f = false;
    var B = false;
    var u = 0;
    var C = null;
    var i = -1;
    var e = [];
    var d = [];
    var c = [];
    var b = [];
    var L = [];
    var p = [];
    var o = [];
    var m = [];
    var l = [];
    var k = [];
    var E = [];
    var a = false;
    var F = true;
    var q = 30;
    var g = "简码/汉字";
    var j = "简码/汉字";
    var n = "inp-txt_select";
    var h = "inp-txt";
    var w = false;
    var D = null;
    var I = null;
    var G = false;
    var H = x.ht_getcookie("hj_favcity");
    x.stationFor12306 = {
        bindInputs: [],
        get_initInputValue: function () {
            return g
        },
        get_initTopInputValue: function () {
            return j
        },
        city_Bind: function (N) {
            if (N.length == 0) {
                return
            }
            var M = "";
            x.each(N, function (O) {
                if (H == N[O][2]) {
                    M += "<div class='cityline' id='citem_" + O + "' cturn='" + N[O][6] + "'><span class='ralign'><b>" + N[O][1] + "</b></span></div>\n"
                } else {
                    M += "<div class='cityline' id='citem_" + O + "' cturn='" + N[O][6] + "'><span class='ralign'>" + N[O][1] + "</span></div>\n"
                }
            });
            x("#panel_cities").html(M);
            x(".cityline").mouseover(function () {
                x.stationFor12306.city_shiftSelect(this)
            }).click(function () {
                    x.stationFor12306.city_confirmSelect();
                    z = x.stationFor12306.filterCity("");
                    x.stationFor12306.city_showlist(0)
                });
            x.stationFor12306.city_shiftSelect(x("#citem_0"))
        },
        city_changeSelectIndex: function (M) {
            var N = v + M;
            if (N == -1) {
                x.stationFor12306.city_showlist(u - 1);
                x.stationFor12306.city_shiftSelect(x("#citem_" + (A.length - 1)))
            } else {
                if (N == A.length) {
                    x.stationFor12306.city_showlist(u + 1);
                    x.stationFor12306.city_shiftSelect(x("#citem_0"))
                } else {
                    x.stationFor12306.city_shiftSelect(x("#citem_" + N))
                }
            }
        },
        city_confirmSelect: function () {
            C.val(J[1]);
            curObjCode.val(J[2]);
            if (w) {
                x.stationFor12306.setStationInCookies(J[1], J[2])
            }
            x("#form_cities").css("display", "none");
            x("#form_cities2").css("display", "none");
            x("#form_cities3").css("display", "none");
            i = -1;
            t = 0;
            x.stationFor12306.setStationStyle();
            if (F) {
                x.stationFor12306.LoadJS(J[2])
            }
            if (D) {
                D(C, curObjCode)
            }
        },
        city_shiftSelect: function (N) {
            if (r != N) {
                if (r != 0) {
                    x(r).removeClass("citylineover").addClass("cityline").css("backgroundColor", "white")
                }
                if (N != 0) {
                    try {
                        r = N;
                        var M = x(r).removeClass("cityline").addClass("citylineover").css("backgroundColor", "#c8e3fc");
                        v = Number(M.attr("id").split("_")[1]);
                        J = s[Number(M.attr("cturn"))];
                        x("#cityid").val(J[2])
                    } catch (O) {}
                }
            }
        },
        city_shiftSelectInLi: function (M) {
            if (t != M) {
                if (t != 0) {
                    x(t).removeClass("ac_over").addClass("ac_odd")
                }
                if (M != 0) {
                    try {
                        t = M;
                        x(t).removeClass("ac_odd").addClass("ac_over")
                    } catch (N) {}
                }
            }
        },
        js: function (N) {
            var M;
            for (M = 1; M <= 7; M++) {
                if (M == N) {
                    x("#ul_list" + M).css("display", "block");
                    x("#nav_list" + M).addClass("action");
                    if (M == 1 || M == 7) {
                        x("#flip_cities2").css("display", "none")
                    }
                    if (M > 1 && M < 7) {
                        var P = x.stationFor12306.tHtmlGetCityName(N - 1, -1, 0);
                        if (P > q) {
                            var O = Math.ceil((P + 1) / q);
                            if (O > 1) {
                                x.stationFor12306.pageDesigh(O, 0, M)
                            }
                            x("#flip_cities2").css("display", "block")
                        } else {
                            x("#flip_cities2").css("display", "none")
                        }
                    } else {
                        C.focus()
                    }
                } else {
                    x("#ul_list" + M).css("display", "none");
                    x("#nav_list" + M).removeClass("action")
                }
            }
            if (1 != N) {
                x(".ac_even").on("mouseover", function () {
                    x.stationFor12306.city_shiftSelectInLi(this)
                }).on("click", function () {
                        C.val(x(this).text());
                        curObjCode.val(x(this).attr("data"));
                        if (w) {
                            x.stationFor12306.setStationInCookies(x(this).text(), x(this).attr("data"))
                        }
                        x("#form_cities2").css("display", "none");
                        i = -1;
                        t = 0;
                        x.stationFor12306.setStationStyle();
                        if (F) {
                            x.stationFor12306.LoadJS(x(this).attr("data"))
                        }
                        if (D) {
                            D(C, curObjCode)
                        }
                    })
            }
        },
        tHtmlGetCityName: function (N, M, P) {
            switch (N) {
                case 0:
                    if (M == -1) {
                        return y.length
                    }
                    if (M == -2) {
                        return y
                    }
                    return y[M];
                    break;
                case 1:
                    if (M == -1) {
                        return e.length
                    }
                    if (M == -2) {
                        return e
                    }
                    if (e.length > q) {
                        var O = Math.ceil((e.length + 1) / q);
                        if (O > 1) {
                            p = e.slice(q * (P), Math.min(q * (P + 1), e.length));
                            return p[M]
                        }
                    }
                    return e[M];
                    break;
                case 2:
                    if (M == -1) {
                        return d.length
                    }
                    if (M == -2) {
                        return d
                    }
                    if (d.length > q) {
                        var O = Math.ceil((d.length + 1) / q);
                        if (O > 1) {
                            o = d.slice(q * (P), Math.min(q * (P + 1), d.length));
                            return o[M]
                        }
                    }
                    return d[M];
                    break;
                case 3:
                    if (M == -1) {
                        return c.length
                    }
                    if (M == -2) {
                        return c
                    }
                    if (c.length > q) {
                        var O = Math.ceil((c.length + 1) / q);
                        if (O > 1) {
                            m = c.slice(q * (P), Math.min(q * (P + 1), c.length));
                            return m[M]
                        }
                    }
                    return c[M];
                    break;
                case 4:
                    if (M == -1) {
                        return b.length
                    }
                    if (M == -2) {
                        return b
                    }
                    if (b.length > q) {
                        var O = Math.ceil((b.length + 1) / q);
                        if (O > 1) {
                            l = b.slice(q * (P), Math.min(q * (P + 1), b.length));
                            return l[M]
                        }
                    }
                    return b[M];
                    break;
                case 5:
                    if (M == -1) {
                        return L.length
                    }
                    if (M == -2) {
                        return L
                    }
                    if (L.length > q) {
                        var O = Math.ceil((L.length + 1) / q);
                        if (O > 1) {
                            k = L.slice(q * (P), Math.min(q * (P + 1), L.length));
                            return k[M]
                        }
                    }
                    return L[M];
                    break;
                default:
                    return "error";
                    break
            }
        },
        closeShowCity: function () {
            x("#form_cities2").css("display", "none");
            i = -1;
            t = 0;
            x.each(x.stationFor12306.bindInputs, function (Q, P) {
                var O = "#" + P;
                var N = "#" + P + "Text";
                var M = x(N).val();
                if ("" == M) {
                    x(N).val(g);
                    x.stationFor12306.from_to_station_class_gray(x(N));
                    x(O).val("")
                }
            })
        },
        showAllCity: function () {
            var T = "";
            var N = "342px";
            if (w) {
                N = "400px"
            }
            T = '<div class="com_hotresults" id="thetable" style="width:' + N + '"><div style="width:100%;"><div class="ac_title"><span>拼音支持首字母输入</span><a class="ac_close" style="cursor:pointer" title="关闭" onclick="$.stationFor12306.closeShowCity()"></a></div><ul class="AbcSearch clx" id="abc">';
            if (w) {
                T = T + '<li class="action" index="7" method="liHotTab"  onclick="$.stationFor12306.js(7)" id="nav_list7">常用</li>'
            }
            T = T + '<li index="1" method="liHotTab"  onclick="$.stationFor12306.js(1)" id="nav_list1">热门</li><li index="2" method="liHotTab"  onclick="$.stationFor12306.js(2)" id="nav_list2">A－E</li><li index="3" method="liHotTab"  onclick="$.stationFor12306.js(3)" id="nav_list3">F－J</li><li index="4" method="liHotTab"  onclick="$.stationFor12306.js(4)" id="nav_list4">K－O</li><li index="5" method="liHotTab"  onclick="$.stationFor12306.js(5)" id="nav_list5">P－T</li><li index="6" method="liHotTab"  onclick="$.stationFor12306.js(6)" id="nav_list6">U－Z</li></ul>';
            if (w) {
                T += '<ul class="popcitylist" style="overflow: auto;max-height: 280px;height: 191px;" method="hotData" id="ul_list7">';
                var U = x.stationFor12306.getStationInCookies();
                var Q = U.length;
                if (Q > 2) {
                    G = true;
                    for (var V = 0; V < Q; V++) {
                        T += '<li class="ac_even"   title="' + U[V][0] + '" data="' + U[V][1] + '">' + U[V][0] + "</li>"
                    }
                }
                T += "</ul>"
            }
            T += '<ul class="popcitylist" style="overflow: auto;max-height: 280px;height: 191px;display:none;" method="hotData" id="ul_list1">';
            var P = x.stationFor12306.tHtmlGetCityName(0, -1, 0);
            var S = "";
            if (!w) {
                S = " openLi"
            }
            for (var V = 0; V < P; V++) {
                T += '<li class="ac_even' + S + '"   title="' + x.stationFor12306.tHtmlGetCityName(0, V, 0)[1] + '" data="' + x.stationFor12306.tHtmlGetCityName(0, V, 0)[2] + '">' + x.stationFor12306.tHtmlGetCityName(0, V, 0)[1] + "</li>"
            }
            T += "</ul>";
            for (var W = 2; W <= 6; W++) {
                var R = W - 1;
                var M = x.stationFor12306.tHtmlGetCityName(R, -1, 0);
                if (M > q) {
                    var O = Math.ceil((M + 1) / q);
                    if (O > 1) {
                        T += '<ul  class="popcitylist" style="overflow: auto; max-height: 260px; height: 170px;display:none;" id="ul_list' + W + '">';
                        x.stationFor12306.pageDesigh(O, 0, W)
                    }
                    x("#flip_cities2").css("display", "block")
                } else {
                    T += '<ul  class="popcitylist" style="overflow: auto; max-height: 260px; height: 191px;display:none;" id="ul_list' + W + '">';
                    x("#flip_cities2").css("display", "none");
                    var S = "";
                    if (!w) {
                        S = " openLi"
                    }
                    for (var V = 0; V < x.stationFor12306.tHtmlGetCityName(R, -1, 0); V++) {
                        T += '<li class="ac_even' + S + '"   title="' + x.stationFor12306.tHtmlGetCityName(R, V, 0)[1] + '" data="' + x.stationFor12306.tHtmlGetCityName(R, V, 0)[2] + '">' + x.stationFor12306.tHtmlGetCityName(R, V, 0)[1] + "</li>"
                    }
                }
                T += "</ul>"
            }
            T += '<div id="flip_cities2"> 翻页控制区</div>';
            T += "</div>";
            x("#panel_cities2").html(T);
            x("#thetable").on("click", function () {
                if (x("#form_cities2").css("display") == "block") {
                    if (i == 1 | i == 0) {
                        i == -1
                    }
                    C.select()
                }
            });
            x("#form_cities").on("click", function () {
                if (x("#form_cities").css("display") == "block") {
                    if (i == 1 | i == 0) {
                        i == -1
                    }
                    C.select()
                }
            });
            x(".ac_even").on("mouseover", function () {
                x.stationFor12306.city_shiftSelectInLi(this)
            }).on("click", function () {
                    C.val(x(this).text());
                    curObjCode.val(x(this).attr("data"));
                    if (w) {
                        x.stationFor12306.setStationInCookies(x(this).text(), x(this).attr("data"))
                    }
                    x("#form_cities2").css("display", "none");
                    i = -1;
                    t = 0;
                    x.stationFor12306.setStationStyle();
                    if (F) {
                        x.stationFor12306.LoadJS(x(this).attr("data"))
                    }
                    if (D) {
                        D(C, curObjCode)
                    }
                });
            x("#flip_cities2").css("display", "none");
            return s
        },
        LoadJS: function (O) {
            if (((typeof (mm_addjs) != "undefined")) && ("" != mm_addjs) && (mm_addjs == 1)) {
                var N = document.getElementsByTagName("HEAD").item(0);
                var M = document.createElement("SCRIPT");
                M.src = mm_srcjs + O + ".js";
                M.type = "text/javascript";
                N.appendChild(M)
            }
        },
        pageDesigh: function (R, T, S) {
            var P = "";
            if (R > 1) {
                if (T == -1) {
                    T = (R - 1)
                } else {
                    if (T == R) {
                        T = 0
                    }
                }
                E = x.stationFor12306.tHtmlGetCityName(S - 1, -2, 0).slice(q * (T), Math.min(q * (T + 1), x.stationFor12306.tHtmlGetCityName(S - 1, -2, 0).length));
                var Q = "";
                if (!w) {
                    Q = " openLi"
                }
                for (var N = 0; N < E.length; N++) {
                    var O = E[N];
                    P += '<li class="ac_even' + Q + '"   title="' + O[1] + '" data="' + O[2] + '">' + O[1] + "</li>"
                }
                x("#ul_list" + S).html(P);
                var M = (T == 0) ? "&laquo;&nbsp;上一页" : "<a style='cursor:pointer'    class='cityflip' onclick='$.stationFor12306.pageDesigh(" + R + "," + (T - 1) + "," + S + ");return false;'>&laquo;&nbsp;上一页</a>";
                M += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;";
                M += (T == R - 1) ? "下一页&nbsp;&raquo;" : "<a style='cursor:pointer' class='cityflip'  onclick='$.stationFor12306.pageDesigh(" + R + "," + (T + 1) + "," + S + ")'>下一页&nbsp;&raquo;</a>";
                x("#flip_cities2").html(M);
                if (i == 1 | i == 0 | i == 2) {
                    i == -1
                }
                if (C) {
                    C.select()
                }
            } else {}
            x(".ac_even").on("mouseover", function () {
                x.stationFor12306.city_shiftSelectInLi(this)
            }).on("click", function () {
                    C.val(x(this).text());
                    curObjCode.val(x(this).attr("data"));
                    if (w) {
                        x.stationFor12306.setStationInCookies(x(this).text(), x(this).attr("data"))
                    }
                    x("#form_cities2").css("display", "none");
                    i = -1;
                    t = 0;
                    x.stationFor12306.setStationStyle();
                    if (F) {
                        x.stationFor12306.LoadJS(x(this).attr("data"))
                    }
                    if (D) {
                        D(C, curObjCode)
                    }
                })
        },
        filterCity: function (P) {
            if (P.length == 0) {
                x("#top_cities").html(j);
                return s
            }
            var N = [];
            var M = /[^A-z]/.test(P);
            for (var O = 0; O < s.length; O++) {
                if (x.stationFor12306.isMatchCity(s[O], P, M)) {
                    N.push(s[O])
                }
            }
            if (N.length > 0) {
                x("#top_cities").html('按"<font color=red>' + P + '</font>"检索：');
                return N
            } else {
                x("#top_cities").html("无法匹配:<font color=red>" + P + "</font>");
                return []
            }
        },
        replaceChar: function (M, O, N) {
            return M.substr(0, O) + N + M.substr(O + 1, M.length - 1)
        },
        isMatchCity: function (R, U, O) {
            var U = U.toLowerCase();
            var N = [R[4].toLowerCase(), R[1], R[3].toLowerCase()];
            var T = -1;
            var Q = -1;
            if (O) {
                U = U.split("");
                for (var P = 0; P < U.length; P++) {
                    var W = N[1].indexOf(U[P]);
                    if (W > T && W <= P) {
                        N[1] = x.stationFor12306.replaceChar(N[1], W, "-");
                        T = W
                    } else {
                        return false
                    }
                }
            } else {
                U = U.split("");
                var M = true;
                var S = true;
                for (var P = 0; P < U.length; P++) {
                    var W = N[0].indexOf(U[P]);
                    if (W > T && W <= P) {
                        N[0] = x.stationFor12306.replaceChar(N[0], W, "-");
                        T = W
                    } else {
                        M = false;
                        break
                    }
                }
                for (var P = 0; P < U.length; P++) {
                    var V = N[2].indexOf(U[P]);
                    if (V > Q && V <= P) {
                        N[2] = x.stationFor12306.replaceChar(N[2], V, "-");
                        Q = V
                    } else {
                        S = false;
                        break
                    }
                }
                if ((M == false) && (S == false)) {
                    return false
                }
            }
            return true
        },
        city_showlist: function (O) {
            if (z.length > 6) {
                var N = Math.ceil((z.length + 1) / 6);
                if (O == -1) {
                    O = (N - 1)
                } else {
                    if (O == N) {
                        O = 0
                    }
                }
                A = z.slice(6 * (O), Math.min(6 * (O + 1), z.length));
                x.stationFor12306.city_Bind(A);
                var M = (O == 0) ? "<span style='float:left;'>&laquo;&nbsp;向前</span>" : "<a style='float:left;cursor:pointer' href='' class='cityflip' onclick='$.stationFor12306.city_showlist(" + (O - 1) + ");return false;'>&laquo;&nbsp;向前</a>";
                M += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                M += (O == N - 1) ? "<span style='float:right;'>向后&nbsp;&raquo;</span>" : "<a style='float:right;cursor:pointer' href='' class='cityflip' onclick='$.stationFor12306.city_showlist(" + (O + 1) + ");return false;'>向后&nbsp;&raquo;</a>";
                x("#flip_cities").html(M);
                x("#flip_cities").css("display", "block")
            } else {
                O = 0;
                A = z;
                x.stationFor12306.city_Bind(A);
                x("#flip_cities").css("display", "none")
            }
            u = O;
            if (x("#form_cities").css("display") == "block") {
                a = true;
                C.focus()
            }
        },
        fixDivBugInIE6: function (M) {
            try {
                M.bgiframe();
                if (M.width() > x("> ul", M).width()) {
                    M.css("overflow", "hidden")
                } else {
                    x("> iframe.bgiframe", M).width(x("> ul", M).width());
                    M.css("overflow", "scroll")
                } if (M.height() > x("> ul", M).height()) {
                    M.css("overflow", "hidden")
                } else {
                    x("> iframe.bgiframe", M).height(x("> ul", M).height());
                    M.css("overflow", "scroll")
                }
            } catch (N) {}
        },
        clearStation: function (M) {
            i = -1;
            var O = C.val();
            var P = curObjCode.val();
            if (O == "" || P == "") {
                C.val("");
                curObjCode.val("")
            } else {
                var N = O + "|" + P;
                if (typeof (station_names) != "undefined") {
                    if (station_names.indexOf(N) == -1) {
                        C.val("");
                        curObjCode.val("")
                    } else {
                        if ("click" == M) {
                            C.select();
                            if (x("#form_cities").is(":hidden")) {
                                x("#form_cities2").css("display", "block")
                            }
                        }
                    }
                } else {
                    C.val("");
                    curObjCode.val("")
                }
            }
        },
        MapCityID: function (N) {
            for (var M = 0; M < s.length; M++) {
                if (s[M][1] == N) {
                    return s[M][2]
                }
            }
            return 0
        },
        MapCityName: function (M) {
            for (var N = 0; N < s.length; N++) {
                if (s[N][2] == M) {
                    return s[N][1]
                }
            }
            return ""
        },
        SetISPos: function (Q) {
            if (I) {
                I(x("#form_cities"), x("#form_cities2"))
            } else {
                x("#form_cities").css("left", Q.position().left);
                x("#form_cities").css("top", Q.position().top + Q.height() + 12);
                x("#form_cities2").css("left", Q.position().left);
                x("#form_cities2").css("top", Q.position().top + Q.height() + 12)
            }
            var P = Q.offset().top;
            var M = x("#search_div");
            var N = x("#choice_div");
            M.css("top", P);
            N.css("top", P);
            var O = Q.offset().left;
            M.css("left", O);
            N.css("left", O)
        },
        myHandlerFg: function (M) {
            if (M == null) {
                M.keyCode = 9
            } else {
                if (!M.which && M.which == 13) {
                    M.preventDefault()
                } else {
                    if (M.which && M.keyCode == 13) {
                        M.which = 9
                    }
                }
            }
        },
        myHandler2: function (M) {
            if (M == null) {
                M = window.event;
                M.returnValue = false
            } else {
                if (M.which && M.which == 13) {
                    var O = document.getElementById("Upload_Data3");
                    if (document.createEvent) {
                        var N = document.createEvent("MouseEvents");
                        N.initEvent("click", true, false);
                        O.dispatchEvent(N)
                    } else {
                        if (document.createEventObject) {
                            O.fireEvent("onclick")
                        }
                    }
                } else {
                    if (!M.which && M.which == 13) {
                        M.preventDefault()
                    }
                }
            }
        },
        from_to_station_class_plain: function (M) {
            if (h && h != "") {
                M.removeClass(h)
            }
            if (n && n != "") {
                M.addClass(n)
            }
        },
        from_to_station_class_gray: function (M) {
            if (n && n != "") {
                M.removeClass(n)
            }
            if (h && h != "") {
                M.addClass(h)
            }
        },
        setStationStyle: function () {
            var M = C.val();
            if (M == "") {
                C.val(g);
                x.stationFor12306.from_to_station_class_gray(C);
                curObjCode.val("")
            } else {
                x.stationFor12306.from_to_station_class_plain(C)
            }
        },
        setCurValue: function () {
            C.val(J[1]);
            curObjCode.val(J[2])
        },
        bindEvent: function (M) {
            var O = "#" + M;
            var N = "#" + M + "Text";
            x(N).keydown(function (Q) {
                C = x(N);
                curObjCode = x(O);
                i = 0;
                a = true;
                F = true;
                x("#form_cities2").css("display", "none");
                t = 0;
                var P = x(N).width();
                if (-[1, ]) {
                    P = P - 4
                }
                x("#form_cities").css("width", P);
                x("#form_cities").css("display", "block");
                x(".AbcSearch li").removeClass("action");
                x(".popcitylist").css("display", "none");
                if (G && w) {
                    x("#ul_list7").css("display", "block");
                    x("#nav_list7").addClass("action")
                } else {
                    x("#nav_list1").addClass("action");
                    x("#ul_list1").css("display", "block")
                }
                x("#flip_cities2").css("display", "none");
                x(".ac_even").removeClass("ac_over").addClass("ac_odd");
                Q = Q || window.event;
                if (Q.keyCode == 40) {
                    x.stationFor12306.city_changeSelectIndex(1);
                    x("#form_cities").css("display", "block");
                    x.stationFor12306.SetISPos(C);
                    x.stationFor12306.setCurValue()
                } else {
                    if (Q.keyCode == 38) {
                        x.stationFor12306.city_changeSelectIndex(-1);
                        x.stationFor12306.setCurValue();
                        x("#form_cities").css("display", "block");
                        x.stationFor12306.SetISPos(C)
                    } else {
                        if (Q.keyCode == 13) {
                            x.stationFor12306.city_confirmSelect();
                            if (document.addEventListener) {
                                document.addEventListener("keypress", x.stationFor12306.myHandlerFg, true)
                            } else {
                                evt = window.event;
                                evt.keyCode = 9
                            }
                        }
                    }
                }
            }).focus(function () {
                    F = true;
                    if (a) {
                        x("#form_cities2").css("display", "none");
                        t = 0;
                        a = false;
                        i = -1
                    } else {
                        if (i == -1) {
                            x(".AbcSearch li").removeClass("action");
                            x(".popcitylist").css("display", "none");
                            x("#flip_cities2").css("display", "none");
                            if (G && w) {
                                x("#ul_list7").css("display", "block");
                                x("#nav_list7").addClass("action")
                            } else {
                                x("#nav_list1").addClass("action");
                                x("#ul_list1").css("display", "block")
                            }
                            x(".ac_even").removeClass("ac_over").addClass("ac_odd");
                            x("#form_cities2").css("display", "block")
                        }
                    }
                    C = x(N);
                    curObjCode = x(O);
                    i = 0;
                    K = true;
                    x.stationFor12306.SetISPos(C)
                }).blur(function () {
                    C = x(N);
                    curObjCode = x(O);
                    i = 0;
                    a = false;
                    F = true;
                    if (!f && !B) {
                        x.stationFor12306.clearStation("blur");
                        K = false;
                        x("#form_cities").css("display", "none");
                        x("#form_cities2").css("display", "none");
                        i = -1;
                        t = 0;
                        z = x.stationFor12306.filterCity("");
                        x.stationFor12306.city_showlist(0);
                        x.stationFor12306.setStationStyle()
                    }
                }).keyup(function (P) {
                    C = x(N);
                    curObjCode = x(O);
                    i = 0;
                    a = true;
                    P = P || window.event;
                    if (P.keyCode != 40 && P.keyCode != 38 && P.keyCode != 37 && P.keyCode != 39 && P.keyCode != 13 && P.keyCode != 9) {
                        z = x.stationFor12306.filterCity(C.val());
                        x.stationFor12306.city_showlist(0)
                    }
                }).click(function () {
                    x.stationFor12306.clearStation("click")
                });
            x.stationFor12306.bindInputs.push(M)
        },
        getStationInCookies: function () {
            var O = [];
            var N = x.ht_getcookie("_city_name_save_station");
            if (N) {
                var M = N.split(",");
                if (M && M.length > 0) {
                    x.each(M, function (S, R) {
                        var P = R.split("#");
                        var Q = [];
                        Q[0] = P[0];
                        Q[1] = P[1];
                        O[S] = Q
                    })
                }
            }
            return O
        },
        setStationInCookies: function (W, N) {
            var T = x.stationFor12306.getStationInCookies();
            var Q = [];
            var X = T.length;
            var P = true;
            var Y = 10;
            for (var R = 0; R < X; R++) {
                if (T[R][0] == W && T[R][1] == N) {
                    P = false
                }
                Q.push(T[R])
            }
            if (P) {
                Q.push([W, N])
            }
            var S = Q;
            var O = "";
            var U = S.length;
            var R = 0;
            if (U > Y) {
                R = 1
            }
            var M = R;
            if (U > 1) {
                x("#ul_list7").html("");
                G = true
            }
            var V = "";
            for (; R < U; R++) {
                if (R > M) {
                    O += ","
                }
                O += S[R][0] + "#" + S[R][1];
                if (G && w) {
                    V += '<li class="ac_even" onmouseover="$.stationFor12306.city_shiftSelectInLi(this);" onclick="$.stationFor12306.li_click(this);"   title="' + S[R][0] + '" data="' + S[R][1] + '">' + S[R][0] + "</li>"
                }
            }
            if (G && w) {
                x("#ul_list7").html(V)
            }
            x.ht_setcookie("_city_name_save_station", O, 365 * 24 * 60 * 60)
        },
        li_click: function (M) {
            C.val(x(M).text());
            curObjCode.val(x(M).attr("data"));
            if (w) {
                x.stationFor12306.setStationInCookies(x(M).text(), x(M).attr("data"))
            }
            x("#form_cities2").css("display", "none");
            i = -1;
            t = 0;
            x.stationFor12306.setStationStyle();
            if (F) {
                x.stationFor12306.LoadJS(x(M).attr("data"))
            }
            if (D) {
                D(C, curObjCode)
            }
        },
        init: function (R, S) {
            if (typeof (S) != "undefined") {
                if (typeof (S._init_input) != "undefined") {
                    g = S._init_input
                }
                if (typeof (S._top_4_initInput) != "undefined") {
                    j = S._top_4_initInput
                }
                if (typeof (S.confirmCallBack) != "undefined") {
                    D = S.confirmCallBack
                }
                if (typeof (S._selected_class) != "undefined") {
                    n = S._selected_class
                }
                if (typeof (S._unselected_class) != "undefined") {
                    h = S._unselected_class
                }
                if (typeof (S._12306_openFavorite) != "undefined") {
                    w = S._12306_openFavorite
                }
                if (typeof (S.position) != "undefined") {
                    I = S.position
                }
            }
            if (typeof (station_names) != "undefined") {
                var O = station_names.split("@");
                for (var N = 0; N < O.length; N++) {
                    var Q = O[N];
                    var P = Q.toString().charAt(0);
                    if (P == "a" || P == "b" || P == "c" || P == "d" || P == "e") {
                        e.push(Q.split("|"))
                    }
                    if (P == "f" || P == "g" || P == "h" || P == "i" || P == "j") {
                        d.push(Q.split("|"))
                    }
                    if (P == "k" || P == "l" || P == "m" || P == "n" || P == "o") {
                        c.push(Q.split("|"))
                    }
                    if (P == "p" || P == "q" || P == "r" || P == "s" || P == "t") {
                        b.push(Q.split("|"))
                    }
                    if (P == "u" || P == "v" || P == "w" || P == "x" || P == "y" || P == "z") {
                        L.push(Q.split("|"))
                    }
                    if (Q.length > 0) {
                        Q = Q.split("|");
                        if (H != "" && Q[2] == H) {
                            favcity = Q;
                            s.unshift(Q);
                            if (N > 6) {
                                s.push(Q)
                            }
                        } else {
                            s.push(Q)
                        }
                    }
                }
                for (var N = 0; N < s.length; N++) {
                    s[N].push(N)
                }
            }
            if (typeof (favorite_names) != "undefined") {
                var M = favorite_names.split("@");
                for (var N = 0; N < M.length; N++) {
                    var Q = M[N];
                    if (Q.length > 0) {
                        Q = Q.split("|");
                        y.push(Q)
                    }
                }
                for (var N = 0; N < y.length; N++) {
                    y[N].push(N)
                }
            }
            z = x.stationFor12306.filterCity("");
            x.stationFor12306.city_showlist(0);
            x.stationFor12306.showAllCity();
            a = false;
            x.stationFor12306.fixDivBugInIE6(x("#form_cities"));
            x.stationFor12306.fixDivBugInIE6(x("#form_cities2"));
            if (R && R.length > 0) {
                x.each(R, function (U, T) {
                    x.stationFor12306.bindEvent(T)
                })
            }
            x("#form_cities").mousedown(function () {
                f = true
            }).mouseup(function () {
                    f = false
                });
            x("#form_cities2").mousedown(function () {
                B = true
            }).mouseup(function () {
                    B = false
                })
        }
    }
})(jQuery);
(function (a) {
    a.jsearch = function (c, b) {
        var d = this;
        d.$el = a(c);
        d.el = c;
        d.init = function () {
            d.options = a.extend({}, a.jsearch.defaultOptions, b);
            d.options.current_datas = d.options.datas;
            if (d.options.initFilters) {
                d.options.initFilters(d)
            }
            if (d.options.initExeCallBack) {
                d.options.callback(d.excFilter(false))
            }
        };
        d.addFieldAllFilter = function (j, l, m, i, g, e) {
            if ("undefined" == typeof (j) || "undefined" == typeof (m) || "undefined" == typeof (i)) {
                throw "参数错误"
            }
            if (g && "undefined" != typeof (g) && "function" != typeof (g)) {
                throw "参数错误"
            }
            if ("undefined" == typeof (l) || l == "" || l == null) {
                l = j
            }
            if ("undefined" == typeof (e)) {
                e = true
            }
            if (m && m.length == 0) {
                return
            }
            if (!d.options.filters) {
                d.options.filters = []
            }
            var n = d.options.filters.length;
            var h = -1;
            for (var f = 0; f < n; f++) {
                if (l == d.options.filters[f]["key"]) {
                    h = f;
                    d.options.filters[f]["values"] = m;
                    d.options.filters[f]["type"] = i;
                    if (g) {
                        d.options.filters[f]["callFilter"] = g
                    }
                    break
                }
            }
            if (h < 0 || n == 0) {
                if (g) {
                    d.options.filters.push({
                        name: j,
                        key: l,
                        values: m,
                        isCheck: true,
                        type: i,
                        callFilter: g
                    })
                } else {
                    d.options.filters.push({
                        name: j,
                        key: l,
                        values: m,
                        isCheck: true,
                        type: i
                    })
                }
            }
            if (e) {
                return d.excFilter()
            }
        };
        d.removeFieldAllFilter = function (h) {
            if (!d.options.filters || d.options.filters.length <= 0) {
                return d.options.current_datas
            }
            var i = d.options.current_datas;
            var g = d.options.filters.length;
            var f = -1;
            var j = [];
            for (var e = 0; e < g; e++) {
                if (h == d.options.filters[e]["key"]) {
                    f = e
                } else {
                    j.push(d.options.filters[e])
                }
            }
            d.options.filters = j;
            if (f >= 0) {
                i = d.excFilter()
            }
            return i
        };
        d.addFilter = function (m, o, n, e, l, i, f) {
            if ("undefined" == typeof (m) || "undefined" == typeof (n) || "undefined" == typeof (e) || "undefined" == typeof (l)) {
                throw "参数错误"
            }
            if (i && "undefined" != typeof (i) && "function" != typeof (i)) {
                throw "参数错误"
            }
            if ("undefined" == typeof (o) || o == "" || o == null) {
                o = m
            }
            if ("undefined" == typeof (f)) {
                f = true
            }
            if (!d.options.filters) {
                d.options.filters = []
            }
            var p = d.options.filters.length;
            var j = -1;
            for (var h = 0; h < p; h++) {
                if (o == d.options.filters[h]["key"]) {
                    j = h;
                    if (e) {
                        var g = d.options.filters[h]["values"];
                        if (!g) {
                            g = []
                        }
                        g.push(n)
                    } else {
                        d.options.filters[h]["values"] = n
                    }
                    d.options.filters[h]["type"] = l;
                    if (i) {
                        d.options.filters[h]["callFilter"] = i
                    }
                    break
                }
            }
            if (p == 0 || j < 0) {
                if (e) {
                    var g = [n];
                    if (i) {
                        d.options.filters.push({
                            name: m,
                            key: o,
                            values: g,
                            isCheck: true,
                            type: l,
                            callFilter: i
                        })
                    } else {
                        d.options.filters.push({
                            name: m,
                            key: o,
                            values: g,
                            isCheck: true,
                            type: l
                        })
                    }
                } else {
                    if (i) {
                        d.options.filters.push({
                            name: m,
                            key: o,
                            values: n,
                            isCheck: false,
                            type: l,
                            callFilter: i
                        })
                    } else {
                        d.options.filters.push({
                            name: m,
                            key: o,
                            values: n,
                            isCheck: false,
                            type: l
                        })
                    }
                }
            }
            if (f) {
                return d.excFilter()
            }
        };
        d.removeFilter = function (n, m, e) {
            if (!d.options.filters) {
                return d.options.current_datas
            }
            var o = d.options.current_datas;
            var q = d.options.filters.length;
            var j = -1;
            var l = [];
            for (var g = 0; g < q; g++) {
                if (n == d.options.filters[g]["key"]) {
                    j = g;
                    if (e) {
                        var p = [];
                        var f = d.options.filters[g]["values"];
                        if (f) {
                            for (var h = 0; h < f.length; h++) {
                                if (m != f[h]) {
                                    p.push(f[h])
                                }
                            }
                            if (p.length > 0) {
                                d.options.filters[g]["values"] = p;
                                l.push(d.options.filters[g])
                            }
                        }
                    }
                } else {
                    l.push(d.options.filters[g])
                }
            }
            d.options.filters = l;
            if (j >= 0) {
                o = d.excFilter()
            }
            return o
        };
        d.equals = function (f, e) {
            if (equalsField) {
                return f[equalsField] == e[equalsField]
            }
            return false
        };
        d.excFilter = function (h) {
            if ("undefined" == typeof (h)) {
                h = true
            }
            var i = new Date().getTime();
            var e = [];
            var g = d.options.datas.length;
            for (var f = 0; f < g; f++) {
                if (d.needNotFilter(d.options.datas[f])) {
                    e.push(d.options.datas[f])
                }
            }
            debug("计算耗时:" + (new Date().getTime() - i) + "毫秒");
            i = new Date().getTime();
            d.options.current_datas = e;
            if (h) {
                d.options.callback(d.options.current_datas)
            }
            debug("渲染耗时:" + (new Date().getTime() - i) + "毫秒");
            return d.options.current_datas
        };
        d.needNotFilter = function (p) {
            if (d.options.filters) {
                var y = d.options.filters;
                var j = y.length;
                if (j == 0) {
                    return true
                }
                for (var t = 0; t < j; t++) {
                    var x = y[t];
                    var s = x.name;
                    var w = x.type;
                    var q = x.callFilter;
                    if (!q) {
                        if (x.isCheck) {
                            var h = x.values;
                            var r = h.length;
                            if (r == 0) {
                                return true
                            }
                            var m = false;
                            var n = p[s];
                            if (w == "trainType") {
                                var z = n.charAt(0);
                                for (var v = 0; v < r; v++) {
                                    if ("QT" == h[v]) {
                                        if (z != "G" && z != "C" && z != "D" && z != "Z" && z != "T" && z != "K") {
                                            m = true;
                                            break
                                        }
                                    } else {
                                        if (z == "C" && h[v] == "G") {
                                            m = true;
                                            break
                                        } else {
                                            if (z == h[v]) {
                                                m = true;
                                                break
                                            }
                                        }
                                    }
                                }
                                if (!m) {
                                    return false
                                }
                            } else {
                                if (w == "between") {
                                    for (var v = 0; v < r; v++) {
                                        var A = parseInt(n.replace(":", ""), 10);
                                        var f = parseInt(h[v].substring(0, 4), 10);
                                        var g = parseInt(h[v].substring(4, 8), 10);
                                        if (A >= f && A <= g) {
                                            m = true;
                                            break
                                        }
                                    }
                                    if (!m) {
                                        return false
                                    }
                                } else {
                                    if (w == "seatType") {
                                        for (var v = 0; v < r; v++) {
                                            var u = p[h[v].toLowerCase() + "_num"];
                                            if (u != "--" && u != "无") {
                                                m = true;
                                                break
                                            }
                                        }
                                        if (!m) {
                                            return false
                                        }
                                    } else {
                                        if (w == "stationStarting") {
                                            if (!((a("#sf").is(":checked") && a("#gl").is(":checked")) || (!a("#sf").is(":checked") && !a("#gl").is(":checked")))) {
                                                var u = p.start_station_name;
                                                if (a("#sf").is(":checked")) {
                                                    for (var v = 0; v < r; v++) {
                                                        if (h[v] == u) {
                                                            m = true;
                                                            break
                                                        }
                                                    }
                                                } else {
                                                    if (a("#gl").is(":checked")) {
                                                        var e = true;
                                                        for (var v = 0; v < r; v++) {
                                                            if (h[v] == u) {
                                                                e = false;
                                                                break
                                                            }
                                                        }
                                                        m = e
                                                    }
                                                }
                                            }
                                            if (!m) {
                                                return false
                                            }
                                        } else {
                                            for (var v = 0; v < r; v++) {
                                                if (h[v] == "" || h[v] == n) {
                                                    m = true;
                                                    break
                                                }
                                            }
                                            if (!m) {
                                                return false
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            var l = x.values;
                            if (w == "like") {
                                var n = p[s];
                                if (l == "" || n.indexOf(l) >= 0) {
                                    m = true;
                                    break
                                } else {
                                    return false
                                }
                            } else {
                                if (l != p[s]) {
                                    return false
                                }
                            }
                        }
                    } else {
                        var o = [];
                        if (x.isCheck) {
                            o = x.values
                        } else {
                            o.push(x.values)
                        }
                        return q(p, o)
                    }
                }
            }
            return true
        };
        d.removeSameElem = function () {
            for (var f = 0; f < d.options.current_datas.length; f++) {
                for (var e = f + 1; e < d.options.current_datas.length; e++) {
                    if (d.equals(d.options.current_datas[f], d.options.current_datas[e])) {
                        d.options.current_datas = removeElement(e, d.options.current_datas);
                        f = -1;
                        break
                    }
                }
            }
            return d.options.current_datas
        };
        d.descSort = function (g, e, f) {
            if ("undefined" == typeof (g)) {
                throw "参数错误"
            }
            if (!f && "function" != typeof (f)) {
                f = function (i, h) {
                    if (i[g] > h[g]) {
                        return -1
                    } else {
                        return 1
                    }
                }
            }
            d.options.current_datas.sort(f);
            if (e) {
                d.options.callback(d.options.current_datas)
            }
        };
        d.ascSort = function (g, e, f) {
            if ("undefined" == typeof (g)) {
                throw "参数错误"
            }
            if (!f && "function" != typeof (f)) {
                f = function (i, h) {
                    if (i[g] > h[g]) {
                        return 1
                    } else {
                        return -1
                    }
                }
            }
            d.options.current_datas.sort(f);
            if (e) {
                d.options.callback(d.options.current_datas)
            }
        };
        d.destroy = function () {
            if (d.options.datas) {
                d.options.datas.splice(0, 100000000)
            }
            if (d.options.current_datas) {
                d.options.current_datas.splice(0, 100000000)
            }
            if (d.options.filters) {
                d.options.filters.splice(0, 100000000)
            }
        };
        d.init();
        return d
    };
    a.jsearch.defaultOptions = {
        datas: [],
        equalsField: null,
        cacheField: null,
        initExeCallBack: false,
        initFilters: function () {},
        callback: function () {}
    };
    a.fn.jsearch = function () {
        var b = Array.prototype.slice.call(arguments);
        return (new a.jsearch(this, b[0]))
    }
})(jQuery);
var czxxcx_messages = {
    to_station_request: "请输入目的地!",
    from_station_request: "请输入出发地!",
    jianma_hanzi: "简拼/全拼/汉字",
    trainDate_request: "请输入出发日期!",
    trainDate_error: "请输入合法的出发日期(1970-01-01)!",
    backTrainDate_request: "请输入返程日期!",
    backTrainDate_error: "请输入合法的返程日期(1970-01-01)!",
    error_date: "请输入合法的往返日期(返程日期不能小于出发日期)!"
};
(function () {
    $.stopStation = function (a) {
        var b = this;
        b.init = function () {
            b.options = $.extend({}, $.stopStation.defaultOptions, a);
            if (null == b.options.url || null == b.options.getSearchDate) {
                throw "error options,url can not be null"
            }
            b.options.mouseOnPanel = 0;
            if (!$("#" + b.options.showDivId)[0]) {
                var d = [];
                var c = -1;
                d[++c] = '<div class="station" style="display:none;" id="' + b.options.showDivId + '"><b></b>';
                d[++c] = '<div class="station-info" id="' + b.options.showTitleId + '"></div>';
                d[++c] = '<div class="station-hd"><span class="zx">站序</span><span class="zm">站名</span><span class="dzsj">到站时间</span>';
                d[++c] = '<span class="cfsj">出发时间</span><span class="tlsj">停留时间</span>';
                d[++c] = '<a id="_stopStation_close_id" class="close" title="关闭" href="javascript:" </a></div>';
                d[++c] = '<div class="station-bd"><table><tbody id="' + b.options.showTableId + '"></tbody></table></div></div>';
                $(d.join("")).appendTo($("body:eq(0)"));
                $("#_stopStation_close_id").on("click", b.close)
            }
            $("#" + b.options.showDivId).css("z-index", "20001");
            if (b.options.mouseOutClose) {
                $("#" + b.options.showDivId).on("mouseenter", function (e) {
                    b.options.mouseOnPanel = 1
                }).on("mouseleave", function () {
                        b.options.mouseOnPanel = 0;
                        $("#" + b.options.showDivId).hide().appendTo($("body:eq(0)"));
                        $("#" + b.options.showTableId).html("")
                    })
            }
        };
        b.close = function () {
            $("#" + $.stopStation.defaultOptions.showDivId).closest("tr").removeAttr("style");
            $("#" + $.stopStation.defaultOptions.showDivId).removeAttr("style");
            b.options.mouseOnPanel = 0;
            $("#" + $.stopStation.defaultOptions.showDivId).hide().appendTo($("body:eq(0)"));
            $("#" + $.stopStation.defaultOptions.showTableId).html("")
        };
        b.open = function (f, j, h, e, i, c) {
            $("#" + $.stopStation.defaultOptions.showDivId).closest("tr").removeAttr("style");
            $("#" + $.stopStation.defaultOptions.appendTo + f).closest("tr").attr("style", "z-index:1111");
            $("#" + $.stopStation.defaultOptions.showDivId).attr("style", "z-index:20001");
            if (a.timer) {
                clearTimeout(a.timer)
            }
            var g = a.getSearchDate();
            if (i && "" != i && null != i) {
                var d = formatDate(i);
                if ("-" != d) {
                    g = formatDate(i)
                } else {
                    g = a.getSearchDate()
                }
            } else {
                g = a.getSearchDate()
            }
            $.ajax({
                url: a.url,
                type: "get",
                isTakeParam: false,
                beforeSend: function (k) {
                    k.setRequestHeader("If-Modified-Since", "0");
                    k.setRequestHeader("Cache-Control", "no-cache")
                },
                data: {
                    train_no: j,
                    from_station_telecode: h,
                    to_station_telecode: e,
                    depart_date: g
                },
                success: function (n) {
                    var q = n.data.data;
                    if (q && q.length > 0) {
                        var o = [];
                        var r = -1;
                        for (var m = 0; m < q.length; m++) {
                            var l = q[m];
                            if (m == 0) {
                                var s = null;
                                s = l.train_class_name;
                                if ("0" == c || "2" == c || "4" == c) {
                                    c = "无空调"
                                } else {
                                    c = "有空调"
                                } if (!s) {
                                    s = "&nbsp;&nbsp;"
                                }
                                $("#" + $.stopStation.defaultOptions.showTitleId).html('<span class="item1">' + l.station_train_code + '次      </span><span class="item2">' + l.start_station_name + "<em>--></em>" + l.end_station_name + '</span><span class="item3">' + s + '</span><span class="item4">' + c + "</span>").find("span").css("color", "#333")
                            }
                            var p = "";
                            if (!l.isEnabled) {
                                p = " style='color: #999;' "
                            }
                            o[++r] = '<tr><td width="50" class="tc" ' + p + ">" + l.station_no + "</td>";
                            o[++r] = '<td width="75" ' + p + ">" + l.station_name + "</td>";
                            o[++r] = '<td width="75" ' + p + ">" + l.arrive_time + "</td>";
                            o[++r] = '<td width="75" ' + p + ">" + l.start_time + "</td>";
                            o[++r] = "<td " + p + ">" + l.stopover_time + "</td></tr>"
                        }
                        $("#" + $.stopStation.defaultOptions.showTableId).html(o.join(""));
                        $("#" + $.stopStation.defaultOptions.showDivId).appendTo($("#" + $.stopStation.defaultOptions.appendTo + f)).show()
                    }
                }
            })
        };
        b.init();
        myStopStation = b;
        return b
    };
    $.fn.stopStation = function () {
        return (new $.stopStation(Array.prototype.slice.call(arguments)[0]))
    };
    $.stopStation.defaultOptions = {
        url: null,
        mouseOutClose: false,
        showDivId: "train_div_",
        showTableId: "train_table_",
        showTitleId: "train_span_",
        appendTo: "train_num_",
        getSearchDate: null
    }
})();
var myStopStation = function () {};
var formatDate = function (b) {
    if (b && (b.length == 8)) {
        var c = b.substring(0, 4);
        var d = b.substring(4, 6);
        var a = b.substring(6, 8);
        return c + "-" + d + "-" + a
    } else {
        return "-"
    }
};
(function () {
    var a;
    var e = null;
    var h = [];
    var f = null;
    var g = null;
    var i = true;
    var c = null;
    var b = false;
    var d = null;
    $(document).ready(function () {
        $("#img_rand_code").css("cursor", "pointer");
        $("#from_station_imageB").css("cursor", "pointer");
        $(".btn-all").css("cursor", "pointer");
        $("#_date_btn").css("cursor", "pointer");
        _initGuideShow(1);
        $("#train_start_date").val(initTrainDate);
        $("#train_start_date").css("color", "#999");
        $("#train_start_date").focus(function () {
            WdatePicker({
                doubleCalendar: true,
                minDate: initTrainDate,
                maxDate: initToDate,
                isShowClear: false,
                readOnly: true,
                qsEnabled: false,
                onpicked: function () {
                    $("#train_start_date").css("color", "#333");
                    if ($("#train_start_date").hasClass("error")) {
                        $("#train_start_date").removeClass("error")
                    }
                    $("#train_start_date").blur()
                }
            })
        });
        $("#_date_btn").click(function () {
            $("#train_start_date").focus()
        });
        $._init_show_more();
        $.stationFor12306.init(["fromStation"], {
            _init_input: czxxcx_messages.jianma_hanzi,
            _top_4_initInput: czxxcx_messages.jianpin_hanzi,
            _selected_class: "color333",
            _unselected_class: "error"
        });
        $("#from_station_imageB").click(function () {
            if ($("#fromStationText").val() == czxxcx_messages.jianma_hanzi || $("#fromStationText").val() == czxxcx_messages.jianpin_hanzi) {
                $("#fromStationText").val("")
            }
            $("#fromStationText").focus()
        });
        if ("Y" == openRandCodeCheck) {
            $("#randCodeLi").show();
            $("#randCode").on("keyup", function (j) {
                j = j || window.event;
                if (j.keyCode == 13) {
                    if (i && !b) {
                        $._to_search()
                    }
                }
                if ($("#randCode").val().length == 4 && d != $("#randCode").val()) {
                    $.ajax({
                        url: ctx + "passcodeNew/checkRandCodeAnsyn",
                        type: "post",
                        data: {
                            randCode: $("#randCode").val(),
                            rand: "sjrand"
                        },
                        async: false,
                        success: function (k) {
                            if (k.data == "N") {
                                $("#randCode_span").removeClass("i-ok")
                            } else {
                                $("#randCode").removeClass("error");
                                $("#randCode_span").addClass("i-ok")
                            }
                        }
                    })
                } else {
                    if ($("#randCode").val().length != 4) {
                        $("#randCode").addClass("error");
                        $("#randCode_span").removeClass("i-ok")
                    }
                }
                d = $("#randCode").val()
            }).on("blur", function () {
                    if ($("#randCode").val() == "" || $("#randCode").val().length != 4) {
                        $("#randCode").addClass("error")
                    }
                })
        }
        $.init_filter_event();
        $._init_sort_event();
        $._init_other_sort_event();
        $.stopStation({
            url: ctx + "czxx/queryByTrainNo",
            getSearchDate: function () {
                return f
            }
        });
        $("#_sear_tips").html('<p>全国高铁动车组车票（C、D、G字头列车）起售时间均为<strong class="colorA">11:00</strong>。</p>');
        initPageTitle(3);
        $._init_cookies_req()
    });
    jQuery.extend({
        _checkAll: function (l, n) {
            var k = $("input[name='" + l + "']");
            var m = $("input[name='" + l + "']:checked");
            if (k && m && m.length == k.length) {
                $(n).removeClass("btn-all-sel");
                k.removeAttr("checked");
                if (e) {
                    if ("cc_start_time" == l) {
                        e.removeFieldAllFilter("start_time")
                    } else {
                        if ("cc_arrive_time" == l) {
                            e.removeFieldAllFilter("arrive_time")
                        } else {
                            e.removeFieldAllFilter(l)
                        }
                    }
                }
            } else {
                var j = [];
                $(n).removeClass("btn-all-sel");
                $.each(k, function (p, o) {
                    k[p]["checked"] = "checked";
                    j.push($(k[p]).val())
                });
                if (e) {
                    if ("station_train_code" == l) {
                        e.addFieldAllFilter("station_train_code", null, j, "trainType")
                    } else {
                        if ("cc_start_time" == l) {
                            e.addFieldAllFilter("start_time", null, j, "between")
                        } else {
                            if ("station_name" == l) {
                                e.addFieldAllFilter("station_name", null, j, "")
                            } else {
                                if ("cc_arrive_time" == l) {
                                    e.addFieldAllFilter("arrive_time", null, j, "between")
                                }
                            }
                        }
                    }
                }
            }
        },
        _init_cookies_req: function () {
            var l = $.jc_getcookie("_jc_save_czxxcx_toStation");
            if (l) {
                var k = l.split(",");
                if (k && k.length == 2) {
                    $("#fromStationText").val(k[0]);
                    $("#fromStation").val(k[1])
                }
            }
            var j = $.jc_getcookie("_jc_save_czxxcx_fromDate");
            if (j) {
                if (j >= initTrainDate && j <= initToDate) {
                    $("#train_start_date").val(j)
                }
            }
        },
        _reset_cookies_values: function () {
            $.jc_setcookie("_jc_save_czxxcx_toStation", $("#fromStationText").val() + "," + $("#fromStation").val(), 365 * 24 * 60 * 60);
            $.jc_setcookie("_jc_save_czxxcx_fromDate", $("#train_start_date").val(), 365 * 24 * 60 * 60)
        },
        init_filter_event: function () {
            $("#sear-sel-bd input[name='station_train_code']").on("click", function () {
                if ($(this).is(":checked")) {
                    var j = $("#sear-sel-bd input[name='station_train_code']");
                    var k = $("#sear-sel-bd input[name='station_train_code']:checked");
                    if (j && k && k.length == j.length) {
                        $("#span_station_train_code").removeClass("btn-all-sel")
                    } else {
                        $("#span_station_train_code").addClass("btn-all-sel")
                    } if (e) {
                        e.addFilter("station_train_code", null, $(this).val(), true, "trainType")
                    }
                } else {
                    if (e) {
                        e.removeFilter("station_train_code", $(this).val(), true)
                    }
                    if ($("#sear-sel-bd input[name='station_train_code']:checked").length <= 0) {
                        $("#span_station_train_code").removeClass("btn-all-sel")
                    } else {
                        $("#span_station_train_code").addClass("btn-all-sel")
                    }
                }
            }).css("cursor", "pointer");
            $("#sear-sel-bd input[name='cc_start_time']").on("click", function () {
                if ($(this).is(":checked")) {
                    var j = $("input[name='cc_start_time']");
                    var k = $("input[name='cc_start_time']:checked");
                    if (j && k && k.length == j.length) {
                        $("#span_cc_start_time").removeClass("btn-all-sel")
                    } else {
                        $("#span_cc_start_time").addClass("btn-all-sel")
                    } if (e) {
                        e.addFilter("start_time", null, $(this).val(), true, "between")
                    }
                } else {
                    if (e) {
                        e.removeFilter("start_time", $(this).val(), true)
                    }
                    if ($("input[name='cc_start_time']:checked").length <= 0) {
                        $("#span_cc_start_time").removeClass("btn-all-sel")
                    } else {
                        $("#span_cc_start_time").addClass("btn-all-sel")
                    }
                }
            }).css("cursor", "pointer");
            $("#sear-sel-bd input[name='cc_arrive_time']").on("click", function () {
                if ($(this).is(":checked")) {
                    var j = $("#sear-sel-bd input[name='cc_arrive_time']");
                    var k = $("#sear-sel-bd input[name='cc_arrive_time']:checked");
                    if (j && k && k.length == j.length) {
                        $("#span_cc_arrive_time").removeClass("btn-all-sel")
                    } else {
                        $("#span_cc_arrive_time").addClass("btn-all-sel")
                    } if (e) {
                        e.addFilter("arrive_time", null, $(this).val(), true, "between")
                    }
                } else {
                    if (e) {
                        e.removeFilter("arrive_time", $(this).val(), true)
                    }
                    if ($("#sear-sel-bd input[name='cc_arrive_time']:checked").length <= 0) {
                        $("#span_cc_arrive_time").removeClass("btn-all-sel")
                    } else {
                        $("#span_cc_arrive_time").addClass("btn-all-sel")
                    }
                }
            }).css("cursor", "pointer")
        },
        _init_other_sort_event: function () {
            $("#other_span_starttime").on("click", function () {
                $("#_span_starttime").trigger("click")
            }).css("cursor", "pointer");
            $("#other_span_endtime").on("click", function () {
                $("#_span_endtime").trigger("click")
            }).css("cursor", "pointer");
            $("#other_span_lishi").on("click", function () {
                $("#_span_lishi").trigger("click")
            }).css("cursor", "pointer")
        },
        _init_sort_event: function () {
            $("#_span_starttime").on("click", function () {
                $("#_span_endtime").attr("class", "b2");
                $("#_span_lishi").attr("class", "b2");
                $("#other_span_endtime").attr("class", "b2");
                $("#other_span_lishi").attr("class", "b2");
                if ($(this).attr("class") == "b2" || $(this).attr("class") == "b3") {
                    $(this).attr("class", "b4");
                    $("#other_span_starttime").attr("class", "b4");
                    if (e) {
                        e.descSort("start_start_time", true, function (m, l) {
                            var k = Number(m.start_start_time.replace(":", ""));
                            var j = Number(l.start_start_time.replace(":", ""));
                            if (k > j) {
                                return -1
                            } else {
                                return 1
                            }
                        })
                    }
                } else {
                    $(this).attr("class", "b3");
                    $("#other_span_starttime").attr("class", "b3");
                    if (e) {
                        e.ascSort("start_start_time", true, function (m, l) {
                            var k = Number(m.start_start_time.replace(":", ""));
                            var j = Number(l.start_start_time.replace(":", ""));
                            if (k > j) {
                                return 1
                            } else {
                                return -1
                            }
                        })
                    }
                }
            }).css("cursor", "pointer");
            $("#_span_endtime").on("click", function () {
                $("#_span_starttime").attr("class", "b2");
                $("#_span_lishi").attr("class", "b2");
                $("#other_span_starttime").attr("class", "b2");
                $("#other_span_lishi").attr("class", "b2");
                if ($(this).attr("class") == "b2" || $(this).attr("class") == "b3") {
                    $(this).attr("class", "b4");
                    $("#other_span_endtime").attr("class", "b4");
                    if (e) {
                        e.descSort("end_arrive_time", true, function (m, l) {
                            var k = Number(m.end_arrive_time.replace(":", ""));
                            var j = Number(l.end_arrive_time.replace(":", ""));
                            if (k > j) {
                                return -1
                            } else {
                                return 1
                            }
                        })
                    }
                } else {
                    $(this).attr("class", "b3");
                    $("#other_span_endtime").attr("class", "b3");
                    if (e) {
                        e.ascSort("end_arrive_time", true, function (m, l) {
                            var k = Number(m.end_arrive_time.replace(":", ""));
                            var j = Number(l.end_arrive_time.replace(":", ""));
                            if (k > j) {
                                return 1
                            } else {
                                return -1
                            }
                        })
                    }
                }
            }).css("cursor", "pointer");
            $("#_span_lishi").on("click", function () {
                $("#_span_starttime").attr("class", "b2");
                $("#_span_endtime").attr("class", "b2");
                $("#other_span_starttime").attr("class", "b2");
                $("#other_span_endtime").attr("class", "b2");
                if ($(this).attr("class") == "b2" || $(this).attr("class") == "b3") {
                    $(this).attr("class", "b4");
                    $("#other_span_lishi").attr("class", "b4");
                    if (e) {
                        e.descSort("running_time", true, function (o, n) {
                            var m = o.running_time;
                            var l = n.running_time;
                            var k = 0;
                            var j = 0;
                            if (m != "--") {
                                k = Number(m.replace("小时", "").replace("分", ""))
                            }
                            if (l != "--") {
                                j = Number(l.replace("小时", "").replace("分", ""))
                            }
                            if (k > j) {
                                return -1
                            } else {
                                return 1
                            }
                        })
                    }
                } else {
                    $(this).attr("class", "b3");
                    $("#other_span_lishi").attr("class", "b3");
                    if (e) {
                        e.ascSort("running_time", true, function (o, n) {
                            var m = o.running_time;
                            var l = n.running_time;
                            var k = 0;
                            var j = 0;
                            if (m != "--") {
                                k = Number(m.replace("小时", "").replace("分", ""))
                            }
                            if (l != "--") {
                                j = Number(l.replace("小时", "").replace("分", ""))
                            }
                            if (k > j) {
                                return 1
                            } else {
                                return -1
                            }
                        })
                    }
                }
            }).css("cursor", "pointer")
        },
        _init_checked_data: function (j) {
            if ($("#_span_starttime").attr("class") == "b3" || $("#_span_starttime").attr("class") == "b4") {
                $("#_span_endtime").attr("class", "b2");
                $("#_span_lishi").attr("class", "b2");
                if ($("#_span_starttime").attr("class") == "b4") {
                    j.sort(function (n, m) {
                        var l = Number(n.start_start_time.replace(":", ""));
                        var k = Number(m.start_start_time.replace(":", ""));
                        if (l > k) {
                            return -1
                        } else {
                            return 1
                        }
                    })
                } else {
                    j.sort(function (n, m) {
                        var l = Number(n.start_start_time.replace(":", ""));
                        var k = Number(m.start_start_time.replace(":", ""));
                        if (l > k) {
                            return 1
                        } else {
                            return -1
                        }
                    })
                }
            } else {
                if ($("#_span_endtime").attr("class") == "b3" || $("#_span_endtime").attr("class") == "b4") {
                    $("#_span_starttime").attr("class", "b2");
                    $("#_span_lishi").attr("class", "b2");
                    if ($("#_span_endtime").attr("class") == "b4") {
                        j.sort(function (n, m) {
                            var l = Number(n.end_arrive_time.replace(":", ""));
                            var k = Number(m.end_arrive_time.replace(":", ""));
                            if (l > k) {
                                return -1
                            } else {
                                return 1
                            }
                        })
                    } else {
                        j.sort(function (n, m) {
                            var l = Number(n.end_arrive_time.replace(":", ""));
                            var k = Number(m.end_arrive_time.replace(":", ""));
                            if (l > k) {
                                return 1
                            } else {
                                return -1
                            }
                        })
                    }
                } else {
                    if ($("#_span_lishi").attr("class") == "b3" || $("#_span_lishi").attr("class") == "b4") {
                        $("#_span_starttime").attr("class", "b2");
                        $("#_span_endtime").attr("class", "b2");
                        if ($("#_span_lishi").attr("class") == "b4") {
                            j.sort(function (p, o) {
                                var n = p.running_time;
                                var m = o.running_time;
                                var l = 0;
                                var k = 0;
                                if (n != "--") {
                                    l = Number(n.replace("小时", "").replace("分", ""))
                                }
                                if (m != "--") {
                                    k = Number(m.replace("小时", "").replace("分", ""))
                                }
                                if (l > k) {
                                    return -1
                                } else {
                                    return 1
                                }
                            })
                        } else {
                            j.sort(function (p, o) {
                                var n = p.running_time;
                                var m = o.running_time;
                                var l = 0;
                                var k = 0;
                                if (n != "--") {
                                    l = Number(n.replace("小时", "").replace("分", ""))
                                }
                                if (m != "--") {
                                    k = Number(m.replace("小时", "").replace("分", ""))
                                }
                                if (l > k) {
                                    return 1
                                } else {
                                    return -1
                                }
                            })
                        }
                    }
                }
            }
            return j
        },
        _init_show_more: function () {
            $("#show_more").click(function () {
                if ($("#sear-sel-bd").height() == 44) {
                    var j = "44px";
                    var l = 88;
                    var k = 22;
                    if (h && h.length > 7 && h.length <= 14) {
                        j = (l + k) + "px"
                    } else {
                        if (h && h.length > 14 && h.length <= 21) {
                            j = (l + k * 2) + "px"
                        } else {
                            if (h.length > 21) {
                                j = (l + k * 3) + "px"
                            } else {
                                j = l + "px"
                            }
                        }
                    }
                    document.getElementById("sear-sel-bd").style.height = j;
                    $("#show_more").addClass("open");
                    $("#show_more").attr("title", "收缩")
                } else {
                    document.getElementById("sear-sel-bd").style.height = "44px";
                    $("#show_more").removeClass("open");
                    $("#show_more").attr("title", "展开")
                }
            })
        },
        _re_init_show_more: function () {
            if ($("#sear-sel-bd").height() != 44) {
                var j = "44px";
                var l = 88;
                var k = 22;
                if (h && h.length > 7 && h.length <= 14) {
                    j = (l + k) + "px"
                } else {
                    if (h && h.length > 14 && h.length <= 21) {
                        j = (l + k * 2) + "px"
                    } else {
                        if (h.length > 21) {
                            j = (l + k * 3) + "px"
                        } else {
                            j = l + "px"
                        }
                    }
                }
                document.getElementById("sear-sel-bd").style.height = j;
                $("#show_more").attr("title", "收缩")
            }
        },
        _to_search: function () {
            if (!i) {
                return
            }
            if ("" == $("#train_start_date").val()) {
                $("#train_start_date").addClass("error");
                return
            }
            if ($("#train_start_date").val() < initTrainDate || $("#train_start_date").val() > initToDate) {
                $.alertError("发车日期不在预售期内！<br>" + initTrainDate + "到" + initToDate, $("#train_start_date"));
                return
            }
            if ("" == $("#fromStationText").val() || $("#fromStationText").val() == czxxcx_messages.jianma_hanzi || $("#fromStationText").val() == czxxcx_messages.jianpin_hanzi) {
                $("#fromStationText").addClass("error");
                return
            }
            var j = $("#randCode").val();
            if ("Y" == openRandCodeCheck) {
                if ("" == j) {
                    $("#randCode").addClass("error");
                    return
                }
                if (j.length != 4) {
                    $.alertError("验证码必须为4位！", $("#randCode"));
                    $("#randCode").val("");
                    return
                } else {
                    if (!/^[a-zA-Z0-9]+$/.test(j)) {
                        $.alertError("验证码只能由数字字母组成！", $("#randCode"));
                        $("#randCode").val("");
                        return
                    } else {
                        $.ajax({
                            url: ctx + "passcodeNew/checkRandCodeAnsyn",
                            type: "post",
                            data: {
                                randCode: j,
                                rand: "sjrand"
                            },
                            async: false,
                            success: function (k) {
                                if (k.data == "N") {
                                    $.alertError("您输入的验证码不正确！", $("#randCode"));
                                    $("#randCode").val("");
                                    refreshImg("login", "sjrand");
                                    $("#randCode_span").removeClass("i-ok");
                                    return
                                } else {
                                    $("#randCode_span").addClass("i-ok");
                                    $.execute_search()
                                }
                            }
                        })
                    }
                }
            } else {
                $.execute_search()
            }
        },
        rendarSearTable: function (p) {
            var m = "";
            var v = p.length;
            if (v <= 0) {
                return $("#queryTable").html()
            }
            var t = [],
                r = -1;
            t[++r] = $("#queryTable").html();
            t[++r] = "<tbody id='_query_table_datas'>";
            for (var n = 0; n < v; n++) {
                var j = "";
                if (!(n % 2)) {
                    j = "bgc"
                }
                var s = n + 1;
                t[++r] = "<tr class='" + j + "'>";
                var u = p[n];
                t[++r] = "<td>" + s + "</td>";
                t[++r] = "<td><div class='train-num clearfix' id='train_num_" + s + "'>";
                t[++r] = "<a title='点击查看停靠站信息' href='javascript:' class='number' onclick='myStopStation.open(\"" + s + '","' + u.train_no + '","' + u.start_station_telecode + '","' + u.end_station_telecode + '","' + u.start_train_date + '","' + u.train_seat_feature + "\")'>" + u.station_train_code + "</a></div></td>";
                t[++r] = "<td>" + u.train_class_name + "</td>";
                t[++r] = "<td><strong>" + u.start_station_name + "</strong><br /><strong>" + u.end_station_name + "</strong></td>";
                t[++r] = "<td class='ft14'><strong>" + u.start_start_time + "</strong><br /><strong class='color999'>" + u.end_arrive_time + "</strong></td>";
                t[++r] = "<td>" + u.arrive_time + "</td>";
                t[++r] = "<td>" + u.start_time + "</td></td>";
                t[++r] = "<td>" + u.station_name + "</td></td>";
                var l = u.arrive_day_diff;
                var o = u.running_time;
                var q = "";
                if (o == "--") {
                    q = ""
                } else {
                    if ("0" == l) {
                        q = "当日到达"
                    } else {
                        if ("1" == l) {
                            q = "次日到达"
                        } else {
                            if ("2" == l) {
                                q = "第三日到达"
                            } else {
                                q = "第四日到达"
                            }
                        }
                    }
                }
                t[++r] = "<td class='no-br'><strong>" + u.running_time + "</strong><br /><span class='color999'>" + q + "</span></td></tr>"
            }
            t[++r] = "</tbody>";
            return t.join("")
        },
        execute_search: function () {
            $._reset_cookies_values();
            myStopStation.close();
            var j = dhtmlx.modalbox({
                targSrc: '<div><img src="' + ctx + 'resources/images/loading.gif"></img></div>'
            });
            $._lock_btn();
            $.ajax({
                url: ctx + "czxx/query",
                type: "get",
                beforeSend: function (k) {
                    k.setRequestHeader("If-Modified-Since", "0");
                    k.setRequestHeader("Cache-Control", "no-cache")
                },
                data: {
                    train_start_date: $("#train_start_date").val(),
                    train_station_name: $("#fromStationText").val(),
                    train_station_code: $("#fromStation").val(),
                    randCode: $("#randCode").val()
                },
                success: function (k) {
                    dhtmlx.modalbox.hide(j);
                    if (k.data.flag) {
                        var n = k.data.data;
                        f = $("#train_start_date").val();
                        g = $("#fromStationText").val();
                        var l = 0;
                        if (n && n.length > 0) {
                            e = $("#_query_table_datas").jsearch({
                                datas: n,
                                equalsField: "station_train_code",
                                initExeCallBack: true,
                                initFilters: function (o) {
                                    $._initFilter(o)
                                },
                                callback: function (o) {
                                    $("#_query_table_datas").remove();
                                    $("#queryTable").html($.rendarSearTable($._init_checked_data(o)));
                                    $._init_sort_event();
                                    l = o.length;
                                    $._init_search_result(l);
                                    $("#float").headerFloat()
                                }
                            });
                            $.initTrainOption(n);
                            $._init_search_result(l);
                            $._re_init_show_more();
                            clickCheckBoxName()
                        } else {
                            $.alertError("没有查询到" + f + "," + g + "车站信息！")
                        }
                    } else {
                        var m = k.data.message;
                        if (!m) {
                            m = "查询失败！"
                        }
                        $.alertError(m)
                    } if ("Y" == openRandCodeCheck) {
                        $("#randCode").val("");
                        $("#randCode_span").removeClass("i-ok");
                        refreshImg("login", "sjrand")
                    }
                },
                error: function () {
                    dhtmlx.modalbox.hide(j);
                    if ("Y" == openRandCodeCheck) {
                        $("#randCode").val("");
                        $("#randCode_span").removeClass("i-ok");
                        refreshImg("login", "sjrand")
                    }
                }
            })
        },
        _initRadioFilterDatas: function (l) {
            var k = $("input[name='" + l + "']:checked");
            var j = [];
            if (k.length > 0) {
                $.each(k, function (o, m) {
                    j.push($(k[o]).val())
                })
            }
            return j
        },
        _initFilter: function (j) {
            j.addFieldAllFilter("station_train_code", null, $._initRadioFilterDatas("station_train_code"), "trainType", null, false);
            j.addFieldAllFilter("start_time", null, $._initRadioFilterDatas("cc_start_time"), "between", null, false);
            j.addFieldAllFilter("arrive_time", null, $._initRadioFilterDatas("cc_arrive_time"), "between", null, false);
            j.removeFieldAllFilter("station_name")
        },
        alertError: function (k, j) {
            b = true;
            dhtmlx.alert({
                title: messages["message.error"],
                ok: messages["button.ok"],
                text: k,
                type: "alert-error",
                callback: function () {
                    if (j) {
                        if (j.val() == czxxcx_messages.jianma_hanzi || j.val() == czxxcx_messages.jianpin_hanzi) {
                            j.val("")
                        }
                        j.focus()
                    }
                    window.setTimeout(function () {
                        b = false
                    }, (i ? 500 : 5000))
                }
            })
        },
        createButtnDate: function (o, m, l, j, n) {
            dhtmlXCalendarObject.prototype.langData[global_lang] = ots_global.calendarLang[global_lang];
            var k = new dhtmlXCalendarObject({
                input: o,
                button: m
            });
            k.setDateFormat("%Y-%m-%d");
            k.loadUserLanguage(global_lang);
            if (l && j) {
                k.setSensitiveRange(l, j)
            }
            k.setSkin("dhx_terrace");
            if (n) {
                $("#" + o).val(n)
            }
            k.hideTime();
            return k
        },
        initTrainOption: function (p) {
            dhtmlXCombo_defaultOption.prototype._DrawHeaderButton = function () {};
            $("#train_combo_box").hide();
            var m = [];
            var r = [];
            if (!a) {
                a = new dhtmlXCombo("train_combo_box_div", "cc", 90)
            } else {
                a.setComboText("")
            }
            a.clearAll();
            $(p).each(function () {
                m.push([this.station_train_code, this.station_train_code]);
                r.push(this.station_name)
            });
            a.addOption($.removeSameElem(m));
            a.enableFilteringMode(true);
            a.attachEvent("onBlur", function () {
                if (a.getComboText() != "") {
                    if (e) {
                        e.addFilter("station_train_code", "combo_station_train_code", a.getComboText(), false, "")
                    }
                } else {
                    if (e) {
                        e.removeFilter("combo_station_train_code", a.getComboText(), false)
                    }
                }
            });
            $(".dhx_combo_input").css("text-transform", "uppercase");
            a.attachEvent("onChange", function () {
                if (a.getComboText() != "") {
                    if ($("#iLcear").is(":hidden")) {
                        $("#iLcear").show()
                    }
                    if (e) {
                        e.addFilter("station_train_code", "combo_station_train_code", a.getComboText(), false, "")
                    }
                } else {
                    if (e) {
                        e.removeFilter("combo_station_train_code", a.getComboText(), false)
                    }
                }
            });
            var q = [];
            for (var n = 0; n < r.length; n++) {
                var o = r[n];
                var k = true;
                for (var l = 0; l < q.length; l++) {
                    if (o == q[l]) {
                        k = false;
                        break
                    }
                }
                if (k) {
                    q.push(o)
                }
            }
            h = q;
            $("#_ul_station").html("");
            $.each(q, function (s, j) {
                $("<li><input name='station_name' value=\"" + j + "\" type='checkbox' class='check' /><label for=''>" + j + "</label></li>").appendTo($("#_ul_station"))
            });
            $("#sear-sel-bd input[name='station_name']").on("click", function () {
                if ($(this).is(":checked")) {
                    var j = $("#sear-sel-bd input[name='station_name']");
                    var s = $("#sear-sel-bd input[name='station_name']:checked");
                    if (j && s && s.length == j.length) {
                        $("#span_station_name").removeClass("btn-all-sel")
                    } else {
                        $("#span_station_name").addClass("btn-all-sel")
                    } if (e) {
                        e.addFilter("station_name", null, $(this).val(), true, "")
                    }
                } else {
                    if (e) {
                        e.removeFilter("station_name", $(this).val(), true)
                    }
                    if ($("#sear-sel-bd input[name='station_name']:checked").length <= 0) {
                        $("#span_station_name").removeClass("btn-all-sel")
                    } else {
                        $("#span_station_name").addClass("btn-all-sel")
                    }
                }
            }).css("cursor", "pointer");
            $("#span_station_name").removeClass("btn-all-sel");
            $("#_ul_station").show();
            $("#sear-sel-bd .dhx_combo_input").on("click", function () {
                if ($(this).val() != "") {
                    $(this).select()
                }
            });
            if (!$("#iLcear")[0]) {
                $("#sear-sel-bd .dhx_combo_box").append($('<span style="display: none;" class="i-clear dhx_combo_img_iClear" id="iLcear"></span>'));
                $("#iLcear").on("click", function () {
                    if (a) {
                        a.setComboText("");
                        $(this).hide()
                    }
                })
            }
            $("#sear-sel-bd .dhx_combo_input").on("keyup", function () {
                if ($(this).val() == "") {
                    $("#iLcear").hide()
                } else {
                    if ($("#iLcear").is(":hidden")) {
                        $("#iLcear").show()
                    }
                }
            })
        },
        trim: function (j) {
            return j.replace(/(^\s*)|(\s*$)/g, "")
        },
        _init_search_result: function (m) {
            $("#_sear_tips").html("<p>搜索结果：经过&nbsp;<strong>" + g + "</strong>&nbsp;列车共有" + m + "趟</p>");
            var l = '<p class="sell-time"><strong>起售时间：</strong>';
            for (var j = 0; j < h.length; j++) {
                var n = qss_citys[h[j]];
                if (n == null || n == "" || n == "undefined") {
                    n = ""
                }
                l += '<span class="mr25">' + h[j] + "：<strong>" + n + "</strong></span>"
            }
            l += "</p>";
            $(l).appendTo($("#_sear_tips"));
            $('<p>全国高铁动车组车票（C、D、G字头列车）起售时间均为<strong class="colorA">11:00</strong>。</p>').appendTo($("#_sear_tips"))
        },
        removeSameElem: function (p) {
            var m = [];
            for (var n = 0; n < p.length; n++) {
                var o = p[n];
                var k = true;
                for (var l = 0; l < m.length; l++) {
                    if (o[0] == m[l][0]) {
                        k = false;
                        break
                    }
                }
                if (k) {
                    m.push(o)
                }
            }
            return m
        },
        _lock_btn: function () {
            i = false;
            $("#_a_search_btn").addClass("btn-disabled");
            c = window.setTimeout(function () {
                i = true;
                $("#_a_search_btn").removeClass("btn-disabled")
            }, 5000)
        }
    })
})();