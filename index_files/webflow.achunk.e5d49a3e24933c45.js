"use strict";
(self.webpackChunk = self.webpackChunk || []).push([["456"], {
    9461: function(e, t, n) {
        var a = n(43949);
        a.define("brand", e.exports = function(e) {
            var t, n = {}, r = document, l = e("html"), o = e("body"), c = window.location, s = /PhantomJS/i.test(navigator.userAgent), i = "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange";
            function f() {
                var n = r.fullScreen || r.mozFullScreen || r.webkitIsFullScreen || r.msFullscreenElement || !!r.webkitFullscreenElement;
                e(t).attr("style", n ? "display: none !important;" : "")
            }
            function d() {
                var e = o.children(".w-webflow-badge")
                  , n = e.length && e.get(0) === t
                  , r = a.env("editor");
                if (n) {
                    r && e.remove();
                    return
                }
                e.length && e.remove(),
                r || o.append(t)
            }
            n
        }
        )
    }
}]);
