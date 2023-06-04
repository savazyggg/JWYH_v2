import { s as D } from "./index-d475d2ea.js";
import { i as S } from "./index-3639c647.js";
import { c as x } from "./_commonjsHelpers-042e6b4d.js";
var a = {};
Object.defineProperty(a, "__esModule", { value: !0 });
a.spyOn = a.mocked = a.fn = v = a.ModuleMocker = void 0;
function g(i, e, t) {
  return (
    e in i
      ? Object.defineProperty(i, e, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (i[e] = t),
    i
  );
}
const d = "mockConstructor",
  I = /[\s!-\/:-@\[-`{-~]/,
  G = new RegExp(I.source, "g"),
  V = new Set([
    "arguments",
    "await",
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "enum",
    "eval",
    "export",
    "extends",
    "false",
    "finally",
    "for",
    "function",
    "if",
    "implements",
    "import",
    "in",
    "instanceof",
    "interface",
    "let",
    "new",
    "null",
    "package",
    "private",
    "protected",
    "public",
    "return",
    "static",
    "super",
    "switch",
    "this",
    "throw",
    "true",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "with",
    "yield",
  ]);
function T(i, e) {
  let t;
  switch (e) {
    case 1:
      t = function (r) {
        return i.apply(this, arguments);
      };
      break;
    case 2:
      t = function (r, o) {
        return i.apply(this, arguments);
      };
      break;
    case 3:
      t = function (r, o, c) {
        return i.apply(this, arguments);
      };
      break;
    case 4:
      t = function (r, o, c, s) {
        return i.apply(this, arguments);
      };
      break;
    case 5:
      t = function (r, o, c, s, n) {
        return i.apply(this, arguments);
      };
      break;
    case 6:
      t = function (r, o, c, s, n, u) {
        return i.apply(this, arguments);
      };
      break;
    case 7:
      t = function (r, o, c, s, n, u, l) {
        return i.apply(this, arguments);
      };
      break;
    case 8:
      t = function (r, o, c, s, n, u, l, f) {
        return i.apply(this, arguments);
      };
      break;
    case 9:
      t = function (r, o, c, s, n, u, l, f, p) {
        return i.apply(this, arguments);
      };
      break;
    default:
      t = function () {
        return i.apply(this, arguments);
      };
      break;
  }
  return t;
}
function O(i) {
  return Object.prototype.toString.apply(i).slice(8, -1);
}
function W(i) {
  const e = O(i);
  return e === "Function" || e === "AsyncFunction" || e === "GeneratorFunction"
    ? "function"
    : Array.isArray(i)
    ? "array"
    : e === "Object"
    ? "object"
    : e === "Number" || e === "String" || e === "Boolean" || e === "Symbol"
    ? "constant"
    : e === "Map" || e === "WeakMap" || e === "Set"
    ? "collection"
    : e === "RegExp"
    ? "regexp"
    : i === void 0
    ? "undefined"
    : i === null
    ? "null"
    : null;
}
function j(i, e) {
  if (
    e === "arguments" ||
    e === "caller" ||
    e === "callee" ||
    e === "name" ||
    e === "length"
  ) {
    const t = O(i);
    return (
      t === "Function" || t === "AsyncFunction" || t === "GeneratorFunction"
    );
  }
  return e === "source" ||
    e === "global" ||
    e === "ignoreCase" ||
    e === "multiline"
    ? O(i) === "RegExp"
    : !1;
}
class P {
  constructor(e) {
    g(this, "_environmentGlobal", void 0),
      g(this, "_mockState", void 0),
      g(this, "_mockConfigRegistry", void 0),
      g(this, "_spyState", void 0),
      g(this, "_invocationCallCounter", void 0),
      (this._environmentGlobal = e),
      (this._mockState = new WeakMap()),
      (this._mockConfigRegistry = new WeakMap()),
      (this._spyState = new Set()),
      (this._invocationCallCounter = 1);
  }
  _getSlots(e) {
    if (!e) return [];
    const t = new Set(),
      r = this._environmentGlobal.Object.prototype,
      o = this._environmentGlobal.Function.prototype,
      c = this._environmentGlobal.RegExp.prototype,
      s = Object.prototype,
      n = Function.prototype,
      u = RegExp.prototype;
    for (
      ;
      e != null &&
      e !== r &&
      e !== o &&
      e !== c &&
      e !== s &&
      e !== n &&
      e !== u;

    ) {
      const l = Object.getOwnPropertyNames(e);
      for (let f = 0; f < l.length; f++) {
        const p = l[f];
        if (!j(e, p)) {
          const m = Object.getOwnPropertyDescriptor(e, p);
          ((m !== void 0 && !m.get) || e.__esModule) && t.add(p);
        }
      }
      e = Object.getPrototypeOf(e);
    }
    return Array.from(t);
  }
  _ensureMockConfig(e) {
    let t = this._mockConfigRegistry.get(e);
    return (
      t ||
        ((t = this._defaultMockConfig()), this._mockConfigRegistry.set(e, t)),
      t
    );
  }
  _ensureMockState(e) {
    let t = this._mockState.get(e);
    return (
      t || ((t = this._defaultMockState()), this._mockState.set(e, t)),
      t.calls.length > 0 && (t.lastCall = t.calls[t.calls.length - 1]),
      t
    );
  }
  _defaultMockConfig() {
    return {
      mockImpl: void 0,
      mockName: "jest.fn()",
      specificMockImpls: [],
      specificReturnValues: [],
    };
  }
  _defaultMockState() {
    return { calls: [], instances: [], invocationCallOrder: [], results: [] };
  }
  _makeComponent(e, t) {
    if (e.type === "object") return new this._environmentGlobal.Object();
    if (e.type === "array") return new this._environmentGlobal.Array();
    if (e.type === "regexp") return new this._environmentGlobal.RegExp("");
    if (
      e.type === "constant" ||
      e.type === "collection" ||
      e.type === "null" ||
      e.type === "undefined"
    )
      return e.value;
    if (e.type === "function") {
      const r =
          (e.members && e.members.prototype && e.members.prototype.members) ||
          {},
        o = this._getSlots(r),
        c = this,
        s = T(function (...u) {
          const l = c._ensureMockState(n),
            f = c._ensureMockConfig(n);
          l.instances.push(this), l.calls.push(u);
          const p = { type: "incomplete", value: void 0 };
          l.results.push(p),
            l.invocationCallOrder.push(c._invocationCallCounter++);
          let m,
            w,
            k = !1;
          try {
            m = (() => {
              if (this instanceof n) {
                o.forEach((y) => {
                  if (r[y].type === "function") {
                    const A = this[y];
                    (this[y] = c.generateFromMetadata(r[y])),
                      (this[y]._protoImpl = A);
                  }
                });
                const C = f.specificMockImpls.length
                  ? f.specificMockImpls.shift()
                  : f.mockImpl;
                return C && C.apply(this, arguments);
              }
              let _ = f.specificMockImpls.shift();
              if ((_ === void 0 && (_ = f.mockImpl), _))
                return _.apply(this, arguments);
              if (n._protoImpl) return n._protoImpl.apply(this, arguments);
            })();
          } catch (_) {
            throw ((w = _), (k = !0), _);
          } finally {
            (p.type = k ? "throw" : "return"), (p.value = k ? w : m);
          }
          return m;
        }, e.length || 0),
        n = this._createMockFunction(e, s);
      return (
        (n._isMockFunction = !0),
        (n.getMockImplementation = () => this._ensureMockConfig(n).mockImpl),
        typeof t == "function" && this._spyState.add(t),
        this._mockState.set(n, this._defaultMockState()),
        this._mockConfigRegistry.set(n, this._defaultMockConfig()),
        Object.defineProperty(n, "mock", {
          configurable: !1,
          enumerable: !0,
          get: () => this._ensureMockState(n),
          set: (u) => this._mockState.set(n, u),
        }),
        (n.mockClear = () => (this._mockState.delete(n), n)),
        (n.mockReset = () => (
          n.mockClear(), this._mockConfigRegistry.delete(n), n
        )),
        (n.mockRestore = () => (n.mockReset(), t ? t() : void 0)),
        (n.mockReturnValueOnce = (u) => n.mockImplementationOnce(() => u)),
        (n.mockResolvedValueOnce = (u) =>
          n.mockImplementationOnce(() => Promise.resolve(u))),
        (n.mockRejectedValueOnce = (u) =>
          n.mockImplementationOnce(() => Promise.reject(u))),
        (n.mockReturnValue = (u) => n.mockImplementation(() => u)),
        (n.mockResolvedValue = (u) =>
          n.mockImplementation(() => Promise.resolve(u))),
        (n.mockRejectedValue = (u) =>
          n.mockImplementation(() => Promise.reject(u))),
        (n.mockImplementationOnce = (u) => (
          this._ensureMockConfig(n).specificMockImpls.push(u), n
        )),
        (n.mockImplementation = (u) => {
          const l = this._ensureMockConfig(n);
          return (l.mockImpl = u), n;
        }),
        (n.mockReturnThis = () =>
          n.mockImplementation(function () {
            return this;
          })),
        (n.mockName = (u) => {
          if (u) {
            const l = this._ensureMockConfig(n);
            l.mockName = u;
          }
          return n;
        }),
        (n.getMockName = () =>
          this._ensureMockConfig(n).mockName || "jest.fn()"),
        e.mockImpl && n.mockImplementation(e.mockImpl),
        n
      );
    } else {
      const r = e.type || "undefined type";
      throw new Error("Unrecognized type " + r);
    }
  }
  _createMockFunction(e, t) {
    let r = e.name;
    if (!r) return t;
    const o = "bound ";
    let c = "";
    if (r && r.startsWith(o))
      do (r = r.substring(o.length)), (c = ".bind(null)");
      while (r && r.startsWith(o));
    if (r === d) return t;
    (V.has(r) || /^\d/.test(r)) && (r = "$" + r),
      I.test(r) && (r = r.replace(G, "$"));
    const s =
      "return function " +
      r +
      "() {return " +
      d +
      ".apply(this,arguments);}" +
      c;
    return new this._environmentGlobal.Function(d, s)(t);
  }
  _generateMock(e, t, r) {
    const o = this._makeComponent(e);
    return (
      e.refID != null && (r[e.refID] = o),
      this._getSlots(e.members).forEach((c) => {
        const s = (e.members && e.members[c]) || {};
        s.ref != null
          ? t.push(
              (function (n) {
                return () => (o[c] = r[n]);
              })(s.ref)
            )
          : (o[c] = this._generateMock(s, t, r));
      }),
      e.type !== "undefined" &&
        e.type !== "null" &&
        o.prototype &&
        typeof o.prototype == "object" &&
        (o.prototype.constructor = o),
      o
    );
  }
  generateFromMetadata(e) {
    const t = [],
      r = {},
      o = this._generateMock(e, t, r);
    return t.forEach((c) => c()), o;
  }
  getMetadata(e, t) {
    const r = t || new Map(),
      o = r.get(e);
    if (o != null) return { ref: o };
    const c = W(e);
    if (!c) return null;
    const s = { type: c };
    if (
      c === "constant" ||
      c === "collection" ||
      c === "undefined" ||
      c === "null"
    )
      return (s.value = e), s;
    c === "function" &&
      ((s.name = e.name),
      e._isMockFunction === !0 && (s.mockImpl = e.getMockImplementation())),
      (s.refID = r.size),
      r.set(e, s.refID);
    let n = null;
    return (
      c !== "array" &&
        this._getSlots(e).forEach((u) => {
          if (c === "function" && e._isMockFunction === !0 && u.match(/^mock/))
            return;
          const l = this.getMetadata(e[u], r);
          l && (n || (n = {}), (n[u] = l));
        }),
      n && (s.members = n),
      s
    );
  }
  isMockFunction(e) {
    return !!e && e._isMockFunction === !0;
  }
  fn(e) {
    const t = e ? e.length : 0,
      r = this._makeComponent({ length: t, type: "function" });
    return e && r.mockImplementation(e), r;
  }
  spyOn(e, t, r) {
    if (r) return this._spyOnProperty(e, t, r);
    if (typeof e != "object" && typeof e != "function")
      throw new Error(
        "Cannot spyOn on a primitive value; " + this._typeOf(e) + " given"
      );
    const o = e[t];
    if (!this.isMockFunction(o)) {
      if (typeof o != "function")
        throw new Error(
          "Cannot spy the " +
            t +
            " property because it is not a function; " +
            this._typeOf(o) +
            " given instead"
        );
      const c = Object.prototype.hasOwnProperty.call(e, t);
      let s = Object.getOwnPropertyDescriptor(e, t),
        n = Object.getPrototypeOf(e);
      for (; !s && n !== null; )
        (s = Object.getOwnPropertyDescriptor(n, t)),
          (n = Object.getPrototypeOf(n));
      let u;
      if (s && s.get) {
        const l = s.get;
        (u = this._makeComponent({ type: "function" }, () => {
          (s.get = l), Object.defineProperty(e, t, s);
        })),
          (s.get = () => u),
          Object.defineProperty(e, t, s);
      } else
        (u = this._makeComponent({ type: "function" }, () => {
          c ? (e[t] = o) : delete e[t];
        })),
          (e[t] = u);
      u.mockImplementation(function () {
        return o.apply(this, arguments);
      });
    }
    return e[t];
  }
  _spyOnProperty(e, t, r = "get") {
    if (typeof e != "object" && typeof e != "function")
      throw new Error(
        "Cannot spyOn on a primitive value; " + this._typeOf(e) + " given"
      );
    if (!e)
      throw new Error("spyOn could not find an object to spy upon for " + t);
    if (!t) throw new Error("No property name supplied");
    let o = Object.getOwnPropertyDescriptor(e, t),
      c = Object.getPrototypeOf(e);
    for (; !o && c !== null; )
      (o = Object.getOwnPropertyDescriptor(c, t)),
        (c = Object.getPrototypeOf(c));
    if (!o) throw new Error(t + " property does not exist");
    if (!o.configurable) throw new Error(t + " is not declared configurable");
    if (!o[r])
      throw new Error("Property " + t + " does not have access type " + r);
    const s = o[r];
    if (!this.isMockFunction(s)) {
      if (typeof s != "function")
        throw new Error(
          "Cannot spy the " +
            t +
            " property because it is not a function; " +
            this._typeOf(s) +
            " given instead"
        );
      (o[r] = this._makeComponent({ type: "function" }, () => {
        (o[r] = s), Object.defineProperty(e, t, o);
      })),
        o[r].mockImplementation(function () {
          return s.apply(this, arguments);
        });
    }
    return Object.defineProperty(e, t, o), o[r];
  }
  clearAllMocks() {
    this._mockState = new WeakMap();
  }
  resetAllMocks() {
    (this._mockConfigRegistry = new WeakMap()),
      (this._mockState = new WeakMap());
  }
  restoreAllMocks() {
    this._spyState.forEach((e) => e()), (this._spyState = new Set());
  }
  _typeOf(e) {
    return e == null ? "" + e : typeof e;
  }
  mocked(e, t = !1) {
    return e;
  }
}
var v = (a.ModuleMocker = P);
const h = new P(x),
  U = h.fn.bind(h);
a.fn = U;
const $ = h.spyOn.bind(h);
a.spyOn = $;
const K = h.mocked.bind(h);
a.mocked = K;
const { addons: N } = __STORYBOOK_MODULE_PREVIEW_API__,
  { FORCE_REMOUNT: Y, STORY_RENDER_PHASE_CHANGED: B } =
    __STORYBOOK_MODULE_CORE_EVENTS__;
var E = new v(D),
  L = E.fn.bind(E),
  { action: z } = S({ action: L }, { retain: !0 }),
  F = N.getChannel(),
  R = new Set(),
  b = [];
F.on(Y, () =>
  b.forEach((i) => {
    var e;
    return (e = i == null ? void 0 : i.mockClear) == null ? void 0 : e.call(i);
  })
);
F.on(B, ({ newPhase: i }) => {
  i === "loading" &&
    b.forEach((e) => {
      var t;
      return (t = e == null ? void 0 : e.mockClear) == null
        ? void 0
        : t.call(e);
    });
});
var M = (i, e, t) => {
    if (R.has(e)) return e;
    R.add(e);
    try {
      if (Object.prototype.toString.call(e) === "[object Object]") {
        for (let [r, o] of Object.entries(e)) e[r] = M(i, o, r);
        return e;
      }
      if (Array.isArray(e)) return e.map((r, o) => M(i, r, `${t}[${o}]`));
      if (typeof e == "function" && e.isAction) {
        Object.defineProperty(e, "name", { value: t, writable: !1 }),
          Object.defineProperty(e, "__storyId__", { value: i, writable: !1 });
        let r = z(e);
        return b.push(r), r;
      }
    } catch {}
    return e;
  },
  H = ({ id: i, initialArgs: e }) => M(i, e),
  X = [H],
  { step: Z } = S({ step: (i, e, t) => e(t) }, { intercept: !0 }),
  ee = { throwPlayFunctionExceptions: !1 };
export { X as argsEnhancers, ee as parameters, Z as runStep };
//# sourceMappingURL=preview-bc596eab.js.map
