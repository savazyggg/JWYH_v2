import { atom, selector } from "recoil";

const isLoginedState = atom({
  key: "isLogined",
  default: false,
});

const tokenState = atom({
  key: 'tokenState',
  default: null, // 기본값 설정
});

export { isLoginedState, tokenState };
