var h = "storybook/actions",
  D = `${h}/action-event`;
let a;
const b = new Uint8Array(16);
function v() {
  if (
    !a &&
    ((a =
      typeof crypto < "u" &&
      crypto.getRandomValues &&
      crypto.getRandomValues.bind(crypto)),
    !a)
  )
    throw new Error(
      "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
    );
  return a(b);
}
const o = [];
for (let t = 0; t < 256; ++t) o.push((t + 256).toString(16).slice(1));
function x(t, e = 0) {
  return (
    o[t[e + 0]] +
    o[t[e + 1]] +
    o[t[e + 2]] +
    o[t[e + 3]] +
    "-" +
    o[t[e + 4]] +
    o[t[e + 5]] +
    "-" +
    o[t[e + 6]] +
    o[t[e + 7]] +
    "-" +
    o[t[e + 8]] +
    o[t[e + 9]] +
    "-" +
    o[t[e + 10]] +
    o[t[e + 11]] +
    o[t[e + 12]] +
    o[t[e + 13]] +
    o[t[e + 14]] +
    o[t[e + 15]]
  ).toLowerCase();
}
const A =
    typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto),
  d = { randomUUID: A };
function R(t, e, r) {
  if (d.randomUUID && !e && !t) return d.randomUUID();
  t = t || {};
  const n = t.random || (t.rng || v)();
  if (((n[6] = (n[6] & 15) | 64), (n[8] = (n[8] & 63) | 128), e)) {
    r = r || 0;
    for (let i = 0; i < 16; ++i) e[r + i] = n[i];
    return e;
  }
  return x(n);
}
const { addons: U } = __STORYBOOK_MODULE_PREVIEW_API__;
var j = { depth: 10, clearOnStoryChange: !0, limit: 50 },
  l = (t, e) => {
    let r = Object.getPrototypeOf(t);
    return !r || e(r) ? r : l(r, e);
  },
  E = (t) =>
    !!(
      typeof t == "object" &&
      t &&
      l(t, (e) => /^Synthetic(?:Base)?Event$/.test(e.constructor.name)) &&
      typeof t.persist == "function"
    ),
  I = (t) => {
    if (E(t)) {
      let e = Object.create(
        t.constructor.prototype,
        Object.getOwnPropertyDescriptors(t)
      );
      e.persist();
      let r = Object.getOwnPropertyDescriptor(e, "view"),
        n = r == null ? void 0 : r.value;
      return (
        typeof n == "object" &&
          (n == null ? void 0 : n.constructor.name) === "Window" &&
          Object.defineProperty(e, "view", {
            ...r,
            value: Object.create(n.constructor.prototype),
          }),
        e
      );
    }
    return t;
  };
function y(t, e = {}) {
  let r = { ...j, ...e },
    n = function (...i) {
      let c = U.getChannel(),
        p = R(),
        s = 5,
        u = i.map(I),
        m = i.length > 1 ? u : u[0],
        O = {
          id: p,
          count: 0,
          data: { name: t, args: m },
          options: {
            ...r,
            maxDepth: s + (r.depth || 3),
            allowFunction: r.allowFunction || !1,
          },
        };
      c.emit(D, O);
    };
  return (n.isAction = !0), n;
}
var g = (t, e) => typeof e[t] > "u" && !(t in e),
  T = (t) => {
    let {
      initialArgs: e,
      argTypes: r,
      parameters: { actions: n },
    } = t;
    if (!n || n.disable || !n.argTypesRegex || !r) return {};
    let i = new RegExp(n.argTypesRegex);
    return Object.entries(r)
      .filter(([c]) => !!i.test(c))
      .reduce((c, [p, s]) => (g(p, e) && (c[p] = y(p)), c), {});
  },
  w = (t) => {
    let {
      initialArgs: e,
      argTypes: r,
      parameters: { actions: n },
    } = t;
    return (n != null && n.disable) || !r
      ? {}
      : Object.entries(r)
          .filter(([i, c]) => !!c.action)
          .reduce(
            (i, [c, p]) => (
              g(c, e) && (i[c] = y(typeof p.action == "string" ? p.action : c)),
              i
            ),
            {}
          );
  },
  _ = [w, T];
export { _ as argsEnhancers };
//# sourceMappingURL=preview-a60aa466.js.map
