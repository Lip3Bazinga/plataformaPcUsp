!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e = e || self).ConfettiGenerator = t());
})(this, function () {
  "use strict";
  return function (e) {
    var a = {
      target: "confetti-holder",
      max: 80,
      size: 1,
      animate: !0,
      respawn: !0,
      props: ["circle", "square", "triangle", "line"],
      colors: [
        [165, 104, 246],
        [230, 61, 135],
        [0, 199, 228],
        [253, 214, 126],
      ],
      clock: 25,
      interval: null,
      rotate: !1,
      start_from_edge: !1,
      width: window.innerWidth,
      height: window.innerHeight,
    };
    if (
      (e &&
        (e.target && (a.target = e.target),
        e.max && (a.max = e.max),
        e.size && (a.size = e.size),
        null != e.animate && (a.animate = e.animate),
        null != e.respawn && (a.respawn = e.respawn),
        e.props && (a.props = e.props),
        e.colors && (a.colors = e.colors),
        e.clock && (a.clock = e.clock),
        null != e.start_from_edge && (a.start_from_edge = e.start_from_edge),
        e.width && (a.width = e.width),
        e.height && (a.height = e.height),
        null != e.rotate && (a.rotate = e.rotate)),
      "object" != typeof a.target && "string" != typeof a.target)
    )
      throw new TypeError("The target parameter should be a node or string");
    if (
      ("object" == typeof a.target &&
        (null === a.target || !a.target instanceof HTMLCanvasElement)) ||
      ("string" == typeof a.target &&
        (null === document.getElementById(a.target) ||
          !document.getElementById(a.target) instanceof HTMLCanvasElement))
    )
      throw new ReferenceError(
        "The target element does not exist or is not a canvas element"
      );
    var t =
        "object" == typeof a.target
          ? a.target
          : document.getElementById(a.target),
      o = t.getContext("2d"),
      r = [];
    function n(e, t) {
      e = e || 1;
      var r = Math.random() * e;
      return t ? Math.floor(r) : r;
    }
    var i = a.props.reduce(function (e, t) {
      return e + (t.weight || 1);
    }, 0);
    function s() {
      var e =
        a.props[
          (function () {
            for (var e = Math.random() * i, t = 0; t < a.props.length; ++t) {
              var r = a.props[t].weight || 1;
              if (e < r) return t;
              e -= r;
            }
          })()
        ];
      return {
        prop: e.type ? e.type : e,
        x: n(a.width),
        y: a.start_from_edge
          ? a.clock < 0
            ? parseFloat(a.height) + 10
            : -10
          : n(a.height),
        src: e.src,
        radius: n(4) + 1,
        size: e.size,
        rotate: a.rotate,
        line: Math.floor(n(65) - 30),
        angles: [n(10, !0) + 2, n(10, !0) + 2, n(10, !0) + 2, n(10, !0) + 2],
        color: a.colors[n(a.colors.length, !0)],
        rotation: (n(360, !0) * Math.PI) / 180,
        speed: n(a.clock / 7) + a.clock / 30,
      };
    }
    function l(e) {
      if (e)
        switch (
          ((o.fillStyle = o.strokeStyle =
            "rgba(" + e.color + ", " + (3 < e.radius ? 0.8 : 0.4) + ")"),
          o.beginPath(),
          e.prop)
        ) {
          case "circle":
            o.moveTo(e.x, e.y),
              o.arc(e.x, e.y, e.radius * a.size, 0, 2 * Math.PI, !0),
              o.fill();
            break;
          case "triangle":
            o.moveTo(e.x, e.y),
              o.lineTo(e.x + e.angles[0] * a.size, e.y + e.angles[1] * a.size),
              o.lineTo(e.x + e.angles[2] * a.size, e.y + e.angles[3] * a.size),
              o.closePath(),
              o.fill();
            break;
          case "line":
            o.moveTo(e.x, e.y),
              o.lineTo(e.x + e.line * a.size, e.y + 5 * e.radius),
              (o.lineWidth = 2 * a.size),
              o.stroke();
            break;
          case "square":
            o.save(),
              o.translate(e.x + 15, e.y + 5),
              o.rotate(e.rotation),
              o.fillRect(-15 * a.size, -5 * a.size, 15 * a.size, 5 * a.size),
              o.restore();
            break;
          case "svg":
            o.save();
            var t = new window.Image();
            t.src = e.src;
            var r = e.size || 15;
            o.translate(e.x + r / 2, e.y + r / 2),
              e.rotate && o.rotate(e.rotation),
              o.drawImage(
                t,
                (-r / 2) * a.size,
                (-r / 2) * a.size,
                r * a.size,
                r * a.size
              ),
              o.restore();
        }
    }
    function c() {
      (a.animate = !1),
        clearInterval(a.interval),
        requestAnimationFrame(function () {
          o.clearRect(0, 0, t.width, t.height);
          var e = t.width;
          (t.width = 1), (t.width = e);
        });
    }
    return {
      render: function () {
        (t.width = a.width), (t.height = a.height), (r = []);
        for (var e = 0; e < a.max; e++) r.push(s());
        return requestAnimationFrame(function e() {
          for (var t in (o.clearRect(0, 0, a.width, a.height), r)) l(r[t]);
          !(function () {
            for (var e = 0; e < a.max; e++) {
              var t = r[e];
              t &&
                (a.animate && (t.y += t.speed),
                t.rotate && (t.rotation += t.speed / 35),
                ((0 <= t.speed && a.height < t.y) ||
                  (t.speed < 0 && t.y < 0)) &&
                  (a.respawn
                    ? ((r[e] = t),
                      (r[e].x = n(a.width, !0)),
                      (r[e].y = t.speed < 0 ? parseFloat(a.height) : -10))
                    : (r[e] = void 0)));
            }
            r.every(function (e) {
              return void 0 === e;
            }) && c();
          })(),
            a.animate && requestAnimationFrame(e);
        });
      },
      clear: c,
    };
  };
});