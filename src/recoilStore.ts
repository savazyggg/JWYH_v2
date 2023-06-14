import { atom } from "recoil";

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
const nickNameState = atom({
  key: "nickName",
  default: "",
});

const jwtState = atom({
  key: "jwtState",
  default: "",
});

export { isLoginedState, uniqueIdState, jwtState, userIdState, nickNameState };
