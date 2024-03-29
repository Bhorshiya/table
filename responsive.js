! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e || self).Podtable = t()
}(this, function() {
    function e(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r
    }

    function t(t, n) {
        var r = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
        if (r) return (r = r.call(t)).next.bind(r);
        if (Array.isArray(t) || (r = function(t, n) {
                if (t) {
                    if ("string" == typeof t) return e(t, n);
                    var r = Object.prototype.toString.call(t).slice(8, -1);
                    return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? e(t, n) : void 0
                }
            }(t)) || n && t && "number" == typeof t.length) {
            r && (t = r);
            var i = 0;
            return function() {
                return i >= t.length ? {
                    done: !0
                } : {
                    done: !1,
                    value: t[i++]
                }
            }
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
    return function(e, n) {
        void 0 === n && (n = {});
        var r, i, o = {},
            a = Object.assign({}, {
                keepCell: [],
                priority: [],
                method: null,
                rowGroup: !1
            }, n),
            l = function(e) {
                return "string" == typeof e || e instanceof String ? document.querySelector(e) : e
            }(e);
        ! function(e) {
            if (!(e instanceof HTMLTableElement) || null == e || null == e.tHead) throw new Error("Invalid HTMLTableElement");
            if (e.tHead.rows.length <= 0 || e.tHead.rows[0].cells.length < 0) throw new Error("Invalid tHead HTMLTableRowElement");
            h(e), v()
        }(l);
        var s = i.clientWidth,
            c = [],
            d = [],
            u = {
                current: -1
            };

        function h(e) {
            r = e.tHead.rows[0]
        }

        function v() {
            (i = document.createElement("div")).setAttribute("id", "podtable-container"), l.parentNode.insertBefore(i, l), i.appendChild(l)
        }

        function f(e) {
            var t = document.createElement("tr"),
                n = document.createElement("td"),
                r = document.createElement("div");
            n.colSpan = d.length, r.classList.add("child-grid-row"), t.classList.add("child");
            for (var i = 0; i < e.length; i++) r.append(e[i]);
            return n.append(r), t.append(n), t
        }

        function m(e) {
            var t = document.createElement("div");
            t.classList.add("child-grid-col");
            var n = document.createElement("div"),
                r = document.createElement("div");
            return n.innerHTML = l.tHead.rows[0].cells[e.cellIndex].innerHTML, r.innerHTML = e.innerHTML, t.append(n), t.append(r), t
        }

        function p(e) {
            if (!(c.length <= 0)) {
                var t = e.currentTarget.parentElement;
                if (t.classList.contains("has-child")) t.classList.remove("has-child"), t.nextElementSibling.remove();
                else {
                    t.classList.add("has-child");
                    for (var n = [], r = 0; r < t.cells.length; r++) t.cells[r].classList.contains("hidden") && n.push(m(t.cells[r]));
                    t.parentNode.insertBefore(f(n), t.nextSibling)
                }
            }
        }

        function g(e) {
            if (!(c.length <= 0)) {
                var t = document.querySelectorAll(".toggle"),
                    n = e.currentTarget;
                if (n.classList.contains("expanded")) {
                    for (var r = 0; r < t.length; r++) t[r].parentElement.classList.contains("has-child") && t[r].click();
                    n.classList.remove("expanded")
                } else {
                    for (var i = 0; i < t.length; i++) t[i].parentElement.classList.contains("has-child") || t[i].click();
                    n.classList.add("expanded")
                }
            }
        }

        function L() {
            c.length > 0 ? l.classList.add("hide-toggle") : (document.querySelectorAll(".has-child").forEach(function(e) {
                e.classList.remove("has-child")
            }), l.classList.remove("hide-toggle"), l.tHead.rows[0].cells[l.tHead.rows[0].cells.length - 1].classList.remove("expanded"))
        }

        function y() {
            var e = document.querySelectorAll("tr.child");
            if (e.length > 0) {
                for (var n, r = [], i = t(e); !(n = i()).done;) r.push(n.value.previousElementSibling);
                for (var o = 0; o < r.length; o++) {
                    for (var a, l = [], s = t(r[o].cells); !(a = s()).done;) {
                        var d = a.value;
                        d.classList.contains("hidden") && l.push(m(d))
                    }
                    r[o].nextElementSibling.remove(), c.length > 0 && r[o].after(f(l)), L()
                }
            }
        }

        function b(e, n) {
            void 0 === n && (n = l), c.push(e);
            for (var r, i = t(n.rows); !(r = i()).done;) {
                var o = r.value;
                o.classList.contains("child") || o.hasAttribute("data-ptr-ignore") || o.cells[e].classList.add("hidden")
            }
            T(e)
        }

        function E() {
            for (var e = 0; e < c.length; e++)
                for (var n, r = t(l.rows); !(n = r()).done;) {
                    var i = n.value;
                    i.classList.contains("child") || i.hasAttribute("data-ptr-ignore") || i.cells[c[e]].classList.remove("hidden")
                }
            c = []
        }

        function w() {
            E();
            for (var e = 0; e < d.length; e++) r.clientWidth > i.clientWidth && (c.includes(d[e]) || a.keepCell.includes(d[e]) || (b(d[e]), y()));
            L()
        }

        function S() {
            w(), c.length <= 0 && (T(-1), y())
        }

        function A() {
            c = [];
            for (var e = d.length, t = 0; t < e; t++) r.clientWidth > i.clientWidth && (c.includes(d[t]) || a.keepCell.includes(d[t]) || b(d[t]));
            L()
        }

        function T(e) {
            u.current = e, a.method && C()
        }

        function C() {
            if (a.method) try {
                a.method(u)
            } catch (e) {
                console.error(e)
            }
        }
        return function() {
                for (var e = [], t = 0; t < r.cells.length; t++) e.push(t);
                if (d = Array.isArray(a.priority) && a.priority.length > 0 ? Array.from(new Set(a.priority.concat(e.reverse()))) : e.reverse(), !Array.isArray(a.keepCell)) throw TypeError("keepCell is not an array");
                a.keepCell.push(0, e.length - 1)
            }(),
            function(e) {
                for (var n, r = t(e.rows); !(n = r()).done;) {
                    var i = n.value;
                    "TBODY" == i.parentElement.tagName.toUpperCase() && (i.hasAttribute("data-ptr-ignore") || i.firstElementChild.classList.add("toggle")), 
                    "THEAD" == i.parentElement.tagName.toUpperCase() && i.lastElementChild.classList.add("main-toggle")
                }
            }(l), o.watchResize = !1, o.nativeResize = !1, o.observer = !1,
            (function(e) {
                var currentlyOpenRow = null; // Variable to keep track of the currently open row
            
                if (A(), function() {
                    for (var n, r = t(e.rows); !(n = r()).done;) {
                        var i = n.value;
                        if (!i.parentElement.classList.contains("fw-light")) { // Check if parent element is not the header
                            i.addEventListener('click', function(event) {
                                var t = event.currentTarget;
                                if (!(c.length <= 0) && !t.classList.contains('header')) {
                                    if (currentlyOpenRow && currentlyOpenRow !== t) { // If another row is already open, close it
                                        currentlyOpenRow.classList.remove("has-child");
                                        currentlyOpenRow.nextElementSibling.remove();
                                    }
                                    if (t.classList.contains("has-child")) {
                                        t.classList.remove("has-child");
                                        t.nextElementSibling.remove();
                                        currentlyOpenRow = null; // No row is open now
                                    } else {
                                        t.classList.add("has-child");
                                        var n = [];
                                        for (var r = 0; r < t.cells.length; r++) {
                                            if (t.cells[r].classList.contains("hidden")) {
                                                n.push(m(t.cells[r]));
                                            }
                                        }
                                        if (n.length > 0) {
                                            t.parentNode.insertBefore(f(n), t.nextSibling);
                                            currentlyOpenRow = t; // Set the current row as open
                                        }
                                    }
                                    L();
                                }
                            });
                        }
                    }
                }(), !function() {
                    try {
                        return o.nativeResize = new ResizeObserver(function(e) {
                            e[0].target.clientWidth !== s && (w(), c.length <= 0 && (T(-1), y())), s = e[0].target.clientWidth;
                        }), o.nativeResize.observe(i), !0;
                    } catch (e) {
                        return !1;
                    }
                }()) try {
                    o.watchResize = function(e, t) {
                        var n = {},
                            r = document.createElement("object");
            
                        function i() {
                            this.contentDocument.defaultView.addEventListener("resize", t);
                        }
                        return n.start = function() {
                            r.classList.add("pt-object"), r.type = "text/html", r.data = "about:blank", r.onload = i, e.appendChild(r);
                        }, n.stop = function() {
                            r.contentDocument.defaultView.removeEventListener("resize", t), e.removeChild(r);
                        }, n;
                    }(i, S), o.watchResize.start();
                } catch (e) {
                    window.addEventListener("resize", S);
                }
            })(l),
            
            
            
            function(e) {
                function n(e) {
                    e.hasAttribute("data-ptr-ignore") || (e.lastElementChild.classList.add("toggle"), e.lastElementChild.addEventListener("click", function(e) {
                        return p(e)
                    }))
                }
                var r = a.rowGroup ? e : e.tBodies[0];
                o.observer = new MutationObserver(function(r) {
                    for (var i, o = t(r); !(i = o()).done;) {
                        var a = i.value;
                        if ("childList" == a.type && 1 == a.addedNodes.length) {
                            if ("TBODY" == a.addedNodes[0].tagName.toUpperCase())
                                for (var l, s = t(a.addedNodes[0].children); !(l = s()).done;) n(l.value), C();
                            "TR" != a.addedNodes[0].tagName.toUpperCase() || a.addedNodes[0].classList.contains("child") || (n(a.addedNodes[0]), C())
                        } else "childList" == a.type && 1 == a.removedNodes.length && "TR" == a.removedNodes[0].tagName.toUpperCase() && !a.removedNodes[0].classList.contains("child") && a.removedNodes[0].classList.contains("has-child") && a.nextSibling.remove()
                    }
                    h(e), E(), A()
                }), o.observer.observe(r, {
                    childList: !0
                })
            }(l), u.destroy = function() {
                return window.removeEventListener("resize", S), E(),
                    function(e, n, r) {
                        r.observer.disconnect(), void 0 !== typeof r.nativeResize && !1 !== r.nativeResize && r.nativeResize.disconnect(), void 0 !== typeof r.watchResize && !1 !== r.watchResize && r.watchResize.stop();
                        for (var i, o = t(e.querySelectorAll("tr.has-child")); !(i = o()).done;) {
                            var a = i.value;
                            a.classList.remove("has-child"), a.nextElementSibling.classList.contains("child") && a.nextElementSibling.remove()
                        }
                        e.classList.remove("hide-toggle"), n.replaceWith.apply(n, n.childNodes)
                    }(l, i, o), void
                function() {
                    for (var e = document.querySelectorAll(".toggle"), t = 0; t < e.length; t++) e[t].removeEventListener("click", p);
                    document.querySelector(".main-toggle").removeEventListener("click", g)
                }()
            }, u
    }
});
//# sourceMappingURL=podtable.js.map
