/* @update: 2015-8-10 16:5:5 */
!
function() {
    var t = [1e3, 2e5, 1e4],
    e = function() {
        function t(t, e) {
            n[t] = [n[e], n[e] = n[t]][0]
        }
        function e(t) {
            for (var e = n.length; e--;) if (n[e].type == t) return n[e];
            return null
        }
        if (!pageData) return console && console.error("\u540e\u53f0\u6ca1\u6709\u8fd4\u56de\u6570\u636e"),
        void 0;
        for (var n = pageData,
        a = n.length,
        i = 0; a > i; i++) n[i].type = i;
        var o = 1;
        return o = 5 == a ? 2 : o,
        t(0, o),
        {
            data: n,
            find: e
        }
    } (),
    n = {
        init: function() {
            var t = this.fillData();
            this.btnInit(),
            this.scrollInit(),
            this.bannerInit(t)
        },
        fillData: function() {
            function t() {
                a.css({
                    opacity: 1,
                    filter: "alpha(opacity=100)"
                }).removeClass("li_1 li_2 li_3 li_4 li_5 li_6 currentLi")
            }
            var n = $(".banner"),
            a = n.find(".item"),
            i = /^\d+/,
            o = a.length,
            s = "\u5df2\u552e\u7f44",
            r = "disabled",
            f = "hidden";
            4 == o ? n.css("margin-left", 190) : 5 == o && (a.first().css("margin-left", 0), a.last().css("margin-right", 0), n.css("margin-left", 5)),
            a.each(function(t, n) {
                var a = $(n),
                o = a.find(".details-box"),
                l = a.find(".cont"),
                d = a.find("table").find("th").eq(0),
                c = e.data[t];
                a.attr("type", c.type);
                var m = Number(c.rate).toFixed(2);
                a.find(".profit").find("b").text(m).end().find("span").text("%");
                var u = parseInt(c.name);
                if (isNaN(u)) l.find("h6").html(c.name),
                o.find("h4").html(c.name),
                c.desc || d.text("\u9884\u8ba1\u6bcf\u65e5\u53ef\u8d5a(\u5143)");
                else {
                    var v = c.name.replace(i, ""),
                    p = '<span class="font-arial">' + u + "</span>" + v;
                    l.find("h6").html(p),
                    o.find("h4").html(p),
                    c.desc || d.text("\u9884\u8ba1" + c.name + "\u53ef\u8d5a(\u5143)")
                }
                c.desc && d.text(c.desc),
                a.addClass("li_" + (t + 1)),
                0 == c.type && a.addClass("currentLi active"),
                "true" === c.isEmpty || c.isEmpty === !0 ? (a.find(".save").addClass(r).text(s), a.find(".next-times").removeClass(f).html(c.remark)) : c.tips && a.find(".next-times").removeClass(f).addClass("tips").html(c.tips)
            });
            var l = null,
            d = Tools.getAnimationEndName();
            return a.filter(":last").on(d,
            function() {
                clearTimeout(l),
                t()
            }),
            l = setTimeout(function() {
                t()
            },
            300 * o),
            5 == o ? 2 : 1
        },
        bannerInit: function(n) {
            function a() {
                function t(t) {
                    var n = e.eq(t);
                    n.find(".back-box").removeClass(I),
                    n.find(".details-box").removeClass(T),
                    n.click()
                }
                var e = g.find(".item"),
                a = e.length;
                $("body").on("click", ".left-arrow",
                function() {
                    if (!w) {
                        var e = n - 1;
                        0 > n - 1 && (e = a - 1),
                        t(e)
                    }
                }).on("click", ".right-arrow",
                function() {
                    if (!w) {
                        var a = n + 1;
                        n + 1 >= e.length && (a = 0),
                        t(a)
                    }
                })
            }
            function i() {
                setTimeout(function() {
                    w = !1
                },
                1e3)
            }
            function o() {
                function t(t) {
                    $(t).removeClass(a).addClass(o),
                    setTimeout(function() {
                        $(t).removeClass(o)
                    },
                    200)
                }
                function e(t, e) {
                    var n = $(t).index(),
                    a = g.find(".item"),
                    i = a.eq(n),
                    o = i.offset().left,
                    r = /\-?[0-9]+/g;
                    n > e && (o -= Tools.isIE() ? 0 : 230);
                    var f = $(window).width(),
                    l = f / 2,
                    d = parseInt(g.css("margin-left"));
                    if (s) {
                        var t = g.get(0),
                        c = t.style.transform || t.style.webkitTransform || t.style.mozTransform || t.style.msTransform,
                        m = c.match(r);
                        d = m && m.length > 0 ? parseInt(m[0]) : 0;
                        var u = l - o - 205 + d;
                        Tools.startMove(g.get(0), {
                            transform: u
                        },
                        {
                            time: 800,
                            type: "buffer",
                            end: function() {
                                w = !1
                            }
                        })
                    } else {
                        var u = l - o - 205 + d;
                        Tools.startMove(g.get(0), {
                            "margin-left": u
                        },
                        {
                            time: 800,
                            type: "buffer",
                            end: function() {
                                w = !1
                            }
                        })
                    }
                }
                //圆形banner的动画  .item是圆块的类  1e3是1000=1秒  E = "active"在line395, 
                var a = "sonar",
                i = g.find(".item"),
                o = "sonarOut";
                setTimeout(function() {
                    i.hover(function() {
                        w || $(this).hasClass(E) || $(this).addClass(a)
                    },
                    function() {
                        t(this)
                    }).on("mousedown",
                    function() {
                        t(this)
                    })
                },
                1e3),
                i.on("click",
                function() {
                    var t = $(this);
                    if (!w && !t.hasClass(E)) {
                        w = !0,
                        t.removeClass("sonarOut");
                        var a = n;
                        n = t.index();
                        var i = Tools.getAnimationEndName();
                        C = g.find(".item.active"),
                        t.find(".back-box").removeClass(I),
                        t.find(".details-box").removeClass(T),
                        i ? (t.addClass("switchZoom").addClass(E), C.addClass("switchShrink"),
                        function(t, n, a) {
                            setTimeout(function() {
                                t.removeClass("switchShrink").removeClass(E),
                                n.removeClass("switchZoom")
                            },
                            1e3),
                            e(n, a)
                        } (C, t, a)) : (t.addClass(E), C.removeClass(E), e(t, a))
                    }
                });
                var s = Tools.getAnimationEndName()
            }
            function s() {
                $("[act=btn_save]").on("click", //<a class="save ta-c size18" act="btn_save" href="javascript:;">转入</a> 
                function() {
                    if (!k && !$(this).hasClass("disabled")) {
                        var t = $(this).parents(".item").eq(0);
                        t.find(".details-box").addClass(T).removeClass(I),
                        t.find(".back-box").removeClass(v).addClass(I)
                    }
                }),
                $("[act=btn_back]").on("click",
                function() {
                    var t = $(this).parents(".item").eq(0);
                    t.find(".details-box").addClass(I).removeClass(T),
                    t.find(".back-box").removeClass(v).removeClass(I).addClass(T)
                })
            }
            function r() {
                $("body").on("click", "[act=mock_amount]",
                function() {
                    var t = $(this).parents(".item"),
                    e = t.find("[act=mock_amount]"),
                    n = t.find("[act=txt_amount]"),
                    a = e.position();
                    $(this).hide();
                    var i = e.text();
                    n.css({
                        left: a.left,
                        top: a.top
                    }).show().focus().val(i),
                    Tools.setTextPosition(n.get(0))
                }),
                $("[act=txt_amount]").on("blur",
                function() {
                    var t = $(this),
                    e = t.parents(".item"),
                    n = e.find(".tip-text"),
                    a = e.find("[act=mock_amount]"),
                    i = e.find(".bar-active"),
                    o = e.find(".bar-icon"),
                    s = e.find(".details-box").find(".profit").text();
                    s = parseFloat(s);
                    var r = t.val(),
                    f = r;
                    r > p ? (k = !0, l(t, n, a, 1, p), f = p) : h > r ? (k = !0, l(t, n, a, 0, h), f = h) : (k = !1, a.text(r)),
                    d(f, i, o),
                    c(f, e),
                    t.hide(),
                    a.show()
                })
            }
            function f() {
                function t(t, s, r, f, l) {
                    $(t);
                    t.n = 0,
                    function(t, s, r, f, l) {
                        clearInterval(t.timer),
                        t.timer = setInterval(function() {
                            t.n++;
                            var a = parseInt(t.n / n * o),
                            i = parseInt(t.n / n * b);
                            e(i, a),
                            t.n == n && (clearInterval(t.timer), e(b, o))
                        },
                        30),
                        Tools.drag(l.get(0), {
                            min: i,
                            max: a
                        },
                        function(t) {
                            var n = parseInt(t / a * p),
                            i = parseInt(100 * Math.round(n / 100));
                            i = i >= h ? i: h,
                            e(i, t)
                        })
                    } (t, s, r, f, l)
                }
                function e(t, e) {
                    g.find(".item").each(function(n, a) {
                        var i = $(a),
                        o = i.find("[act=mock_amount]"),
                        s = i.find("[act=txt_amount]"),
                        r = i.find(".bar-active"),
                        f = i.find(".bar-icon");
                        o.html(t),
                        s.val(t),
                        r.width(e),
                        f.css({
                            left: e
                        }),
                        c(t, i)
                    })
                }
                var n = 25,
                a = y,
                i = parseInt(h / p * a),
                o = parseInt(b / p * a);
                i -= 6,
                a -= 8,
                g.find(".item").each(function(e, n) {
                    var a = $(n),
                    i = a.find("[act=mock_amount]"),
                    o = a.find("[act=txt_amount]"),
                    s = a.find(".bar-active"),
                    r = a.find(".bar-icon");
                    t(n, i, o, s, r)
                })
            }
            function l(t, e, n, a, i) {
                e.text(m[a]).addClass(u),
                setTimeout(function() {
                    e.removeClass(u),
                    k = !1
                },
                2e3),
                t.val(i),
                n.text(i)
            }
            function d(t, e, n) {
                var a = parseInt(t / p * y);
                e.width(a),
                n.css({
                    left: a
                })
            }
            function c(t, n) {
                var a = n.find("table").find("td"),
                i = n.attr("type"),
                o = e.find(i) || {},
                s = o.days ? o.days: 1,
                r = o.rate ? o.rate: 5.5,
                f = o.bank ? o.bank: .35,
                l = t * (Math.pow(1 + r / 100, s / 365) - 1),
                d = t * f / 100 / 365 * s;
                l = l.toFixed(2),
                d = d.toFixed(2),
                a.eq(0).text(l),
                a.eq(1).text(d)
            }
            var m = ["\u4e0d\u80fd\u4f4e\u4e8e\u8d77\u8d2d\u91d1\u989d", "\u5355\u7b14\u6700\u9ad8\u53ef\u8d2d20\u4e07"],
            u = "opa1",
            v = "hidden",
            p = t[1],
            h = t[0],
            b = t[2],
            g = $(".banner"),
            C = g.find(".item.active"),
            x = g.find(".bar"),
            y = x.width(),
            T = "zoom-out",
            I = "zoom-in",
            w = !1,
            k = !1,
            E = "active",
            n = n ? n: 1;
            g.css("transform", "translateX(0)"),
            a(),
            i(),
            o(),
            r(),
            s(),
            Tools.isIE() ? f() : setTimeout(function() {
                f()
            },
            800)
        },
        scrollInit: function() {
            var t = [$(".section2 ul").offset().top, $(".section4").offset().top],
            e = $(".question-list").find("ul").find("li"),
            n = [];
            e.each(function(t, e) {
                n.push({
                    top: $(e).offset().top,
                    obj: e
                })
            });
            var a = $(window).height(),
            i = $(".section2 .fea-icon"),
            o = $(".section2 .fea-desc"),
            s = $(".section4 .right"),
            r = $(".section4 .right .details-app .tip"),
            f = "hidden",
            l = "opacity1",
            d = "feaIconRotate",
            c = i.find("div"),
            m = "isAnimated";
            c.data(m, !1),
            c.hover(function() {
                var t = $(this);
                t.addClass(d),
                t.data(m) || (t.data(m, !0), t.get(0).timer = setTimeout(function() {
                    t.removeClass(d),
                    t.data(m, !1)
                },
                300))
            }),
            $(window).scroll(function() {
                var e = $(window).scrollTop() + a;
                e > t[1] + 300 && (s.addClass("phoneUpIn"), r.removeClass(f).addClass("tipRotate")),
                e > t[0] && (i.hasClass(l) || (i.addClass("fea-animate"), setTimeout(function() {
                    i.removeClass("fea-animate").addClass(l)
                },
                900), o.addClass("fea-descAnimate")));
                for (var d = 0,
                c = n.length; c > d; d++) {
                    var m = n[d];
                    e > m.top && $(m.obj).addClass("phoneUpIn")
                }
            })
        },
        btnInit: function() {
            var t = "rotateInDownRight",
            e = $(".details-wx"),
            n = $(".details-app"),
            a = [],
            i = 500,
            o = "tipRotate";
            $(".btn-box div").hover(function() {
                a = $(this).hasClass("btn-wx") ? [e, n] : [n, e],
                a[1].stop().animate({
                    opacity: 0
                },
                i).find(".tip").removeClass(t).removeClass(o),
                a[0].stop().animate({
                    opacity: 1
                },
                i).find(".tip").addClass(t).removeClass(o)
            },
            function() {})
        }
    };
    $(function() {
        n.init()
    })
} ();
var Tools = {
    setTextPosition: function(t, e) {
        if (t) {
            var e = e || t.value.length;
            if (t.setSelectionRange) setTimeout(function() {
                t.setSelectionRange(e, e),
                t.focus()
            },
            0);
            else if (t.createTextRange) {
                var n = t.createTextRange();
                n.move("character", e),
                n.select()
            }
        }
    },
    drag: function(t, e, n) {
        var a = e.min,
        i = e.max;
        t.onmousedown = function(e) {
            {
                var o = e || event,
                s = o.clientX - this.offsetLeft;
                o.clientY - this.offsetTop
            }
            return document.onmousemove = function(e) {
                var o = e || event,
                r = o.clientX - s;
                r = a > r ? a: r,
                r = r > i ? i: r,
                $(t).css({
                    left: r
                }),
                n && n(r)
            },
            document.onmouseup = function() {
                document.onmousemove = null,
                document.onmouseup = null,
                t.setCapture && t.releaseCapture()
            },
            t.setCapture && t.setCapture(),
            !1
        }
    },
    getAnimationEndName: function() {
        for (var t = ["Moz", "webkit", "ms", "O"], e = {
            Moz: "animationend",
            webkit: "webkitAnimationEnd",
            ms: "MSAnimationEnd",
            O: "oAnimationEnd"
        },
        n = "", a = document.createElement("div"), i = 0, o = t.length; o > i; i++) if (t[i] + "Animation" in a.style) {
            n = t[i];
            break
        }
        var s = e[n];
        return s ? s: ""
    },
    isIE: function() {
        var t = !1,
        e = navigator.userAgent;
        return e.indexOf("MSIE") > 0 ? (e.indexOf("MSIE 6.0") > 0 || e.indexOf("MSIE 7.0") > 0 || e.indexOf("MSIE 8.0") > 0 || e.indexOf("MSIE 9.0") > 0) && (t = !0) : t = !1,
        t
    }
}; !
function() {
    function t(t) {
        for (var n in t) {
            var a = e(n);
            a != n && (t[a] = t[n], delete t[n])
        }
        return t
    }
    function e(t) {
        return "float" == t ? obj.currentStyle ? "styleFloat": "cssFloat": (t.indexOf("-") > -1 && (t = t.replace(/-(\w)/,
        function() {
            return arguments[1].toUpperCase()
        })), t)
    }
    function n(t, n) {
        return n = e(n),
        t.currentStyle ? t.currentStyle[n] : getComputedStyle(t, !1)[n]
    }
    Tools.startMove = function(e, a, i) {
        i = i || {},
        i.time = i.time || 3e3,
        i.type = i.type || "linear";
        var o = /\-?[0-9]+/g,
        s = parseInt(i.time / 30),
        r = 0,
        f = {},
        l = {};
        a = t(a);
        for (var d in a) {
            if ("opacity" == d) f[d] = parseInt(100 * Math.round(n(e, "opacity")));
            else if ("transform" == d) {
                var c = e.style.transform || e.style.webkitTransform || e.style.mozTransform || e.style.msTransform,
                m = c.match(o);
                f[d] = parseInt(m[0])
            } else f[d] = parseInt(n(e, d));
            if (isNaN(f[d])) {
                var u = {
                    left: e.offsetLeft,
                    top: e.offsetTop,
                    width: e.offsetWidth,
                    height: e.offsetHeight,
                    margin: 0,
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0,
                    padding: 0,
                    paddingLeft: 0,
                    paddingTop: 0,
                    paddingRight: 0,
                    paddingBottom: 0,
                    borderWidth: 0,
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    opacity: 100,
                    zIndex: 0
                };
                f[d] = u[d] || 0
            }
            l[d] = a[d] - f[d]
        }
        clearInterval(e.timer),
        e.timer = setInterval(function() {
            r++;
            for (var t in a) {
                switch (i.type) {
                case "linear":
                    var n = f[t] + r * l[t] / s;
                    break;
                case "buffer":
                    var o = 1 - r / s,
                    n = f[t] + l[t] * (1 - o * o * o);
                    break;
                case "speed":
                    var o = r / s,
                    n = f[t] + l[t] * o * o * o
                }
                "opacity" == t ? (e.style.filter = "alpha(opacity:" + n + ")", e.style.opacity = n / 100) : "transform" == t ? (e.style.transform = "translateX(" + n + "px)", e.style.webkitTransform = "translateX(" + n + "px)", e.style.mozTransform = "translateX(" + n + "px)", e.style.msTransform = "translateX(" + n + "px)") : e.style[t] = n + "px"
            }
            r == s && (clearInterval(e.timer), i.end && i.end())
        },
        30)
    }
} ();