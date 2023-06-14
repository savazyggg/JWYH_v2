import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

//로그인 상태
const isLoginedState = atom({
  key: "isLogined",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

//난수 아이디
const uniqueIdState = atom({
  key: "uniqueId",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

//유저 아이디
const userIdState = atom({
  key: "userId",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

//유저 닉네임
const nickNameState = atom({
  key: "nickName",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

//jwt
const jwtStringState = atom({
  key: "jwtStringState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
//소셜 로그인
const providerState = atom({
  key: "providerState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export {
  isLoginedState,
  providerState,
  uniqueIdState,
  jwtStringState,
  userIdState,
  nickNameState,
};
