import { j as e } from "./jsx-runtime-94f6e698.js";
import { B as n } from "./Button-1703f682.js";
const r = ({ user: l, onLogin: s, onLogout: i, onCreateAccount: a }) =>
  e.jsx("header", {
    children: e.jsxs("div", {
      className: "storybook-header",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx("svg", {
              width: "32",
              height: "32",
              viewBox: "0 0 32 32",
              xmlns: "http://www.w3.org/2000/svg",
              children: e.jsxs("g", {
                fill: "none",
                fillRule: "evenodd",
                children: [
                  e.jsx("path", {
                    d: "M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z",
                    fill: "#FFF",
                  }),
                  e.jsx("path", {
                    d: "M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z",
                    fill: "#555AB9",
                  }),
                  e.jsx("path", {
                    d: "M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z",
                    fill: "#91BAF8",
                  }),
                ],
              }),
            }),
            e.jsx("h1", { children: "Acme" }),
          ],
        }),
        e.jsx("div", {
          children: l
            ? e.jsxs(e.Fragment, {
                children: [
                  e.jsxs("span", {
                    className: "welcome",
                    children: [
                      "Welcome, ",
                      e.jsx("b", { children: l.name }),
                      "!",
                    ],
                  }),
                  e.jsx(n, { size: "small", onClick: i, label: "Log out" }),
                ],
              })
            : e.jsxs(e.Fragment, {
                children: [
                  e.jsx(n, { size: "small", onClick: s, label: "Log in" }),
                  e.jsx(n, {
                    primary: !0,
                    size: "small",
                    onClick: a,
                    label: "Sign up",
                  }),
                ],
              }),
        }),
      ],
    }),
  });
try {
  (r.displayName = "Header"),
    (r.__docgenInfo = {
      description: "",
      displayName: "Header",
      props: {
        user: {
          defaultValue: null,
          description: "",
          name: "user",
          required: !1,
          type: { name: "User" },
        },
        onLogin: {
          defaultValue: null,
          description: "",
          name: "onLogin",
          required: !0,
          type: { name: "() => void" },
        },
        onLogout: {
          defaultValue: null,
          description: "",
          name: "onLogout",
          required: !0,
          type: { name: "() => void" },
        },
        onCreateAccount: {
          defaultValue: null,
          description: "",
          name: "onCreateAccount",
          required: !0,
          type: { name: "() => void" },
        },
      },
    });
} catch {}
export { r as H };
//# sourceMappingURL=Header-f13548e4.js.map
