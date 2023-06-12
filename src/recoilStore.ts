import { atom, selector } from "recoil";

const isLoginedState = atom({
  key: "isLogined",
  default: false,
});

const uniqueIdState = atom({
  key: "uniqueId",
  default: "",
});
const userIdState = atom({
  key: "userId",
  default: "",
});

export { isLoginedState, uniqueIdState, userIdState };
