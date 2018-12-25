window.mobileUtils = function (e, t) {
  var i = navigator.userAgent,
    n = /android|adr/gi.test(i),
    a = /iphone|ipod|ipad/gi.test(i) && !n;
  return {
    isAndroid: n,
    isIos: a,
    isMobile: n || a,
    isWeixin: /MicroMessenger/gi.test(i),
    isQQ: /QQ\/\d/gi.test(i),
    dpr: a ? Math.min(e.devicePixelRatio, 3) : 1,
    rem: null,
    fixScreen: function () {
      var i = this,
        n = t.querySelector('meta[name="viewport"]'),
        r = n ? n.content : "";
      if (r.match(/initial\-scale=([\d\.]+)/), r.match(/width=([^,\s]+)/), !n) {
        var o, s = t.documentElement,
          d = s.dataset.mw || 750,
          m = a ? Math.min(e.devicePixelRatio, 3) : 1;
        t.getElementsByTagName("body")[0], s.removeAttribute("data-mw"), s.dataset.dpr = m, n = t.createElement(
          "meta"), n.name = "viewport", n.content = function (e) {
          return "initial-scale=" + e + ",maximum-scale=" + e + ",minimum-scale=" + e+",viewport-fit=cover"
        }(1), s.firstElementChild.appendChild(n);
        var c = function () {
          var e = s.getBoundingClientRect().width;
          e = e > d ? d : e;
          var t = e / 16;
          i.rem = t, s.style.fontSize = t + "px"
        };
        e.addEventListener("resize", function () {
          clearTimeout(o), o = setTimeout(c, 300)
        }, !1), e.addEventListener("pageshow", function (e) {
          e.persisted && (clearTimeout(o), o = setTimeout(c, 300))
        }, !1), c()
      }
    }
  }
}(window, document), mobileUtils.fixScreen();