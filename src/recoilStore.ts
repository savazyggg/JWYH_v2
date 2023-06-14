import { atom, selector } from "recoil";

//로그인 상태
const isLoginedState = atom({
  key: "isLogined",
  default: false,
});

//난수 아이디
const uniqueIdState = atom({
  key: "uniqueId",
  default: "",
});

//유저 아이디
const userIdState = atom({
  key: "userId",
  default: "",
});

//유저 닉네임
const nickNameState = atom({
  key: "nickName",
  default: "",
});

//jwt
const jwtStringState = atom({
  key: "jwtStringState",
  default: "",
});
//소셜 로그인
const providerState = atom({
  key: "providerState",
  default: "",
});

export {
  isLoginedState,
  providerState,
  uniqueIdState,
  jwtStringState,
  userIdState,
  nickNameState,
};
