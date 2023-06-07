import { atom, selector } from "recoil";

const isLoginedState = atom({
  key: "isLogined",
  default: false,
});
export { isLoginedState };
