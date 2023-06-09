import { atom, selector } from "recoil";

const isLoginedState = atom({
  key: "isLogined",
  default: false,
});

const uniqueIdState = atom({
  key: "uniqueId",
  default: "",
});

const uniqueIdState = atom({
  key: "uniqueId",
  default: "",
});

export { isLoginedState, uniqueIdState };
