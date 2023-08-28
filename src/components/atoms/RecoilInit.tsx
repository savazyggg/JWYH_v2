import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  isLoginedState,
  jwtStringState,
  uniqueIdState,
  userIdState,
  nickNameState,
  providerState,
} from "../../../src/recoilStore";
import { JwtDecoded } from "../../../src/common/interface";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const RecoilInit = (data) => {
  const [recoilIsLogined, setRecoilIsLogined] = useRecoilState(isLoginedState);
  const [_recoilUniqueId, setRecoilUniqueId] = useRecoilState(uniqueIdState);
  const [_recoilUserId, setRecoilUserId] = useRecoilState(userIdState);
  const [_recoilNickName, setRecoilNickName] = useRecoilState(nickNameState);
  const [_recoilJwtString, setRecoilJwtString] = useRecoilState(jwtStringState);
  const [_recoilProvider, setRecoilProvider] = useRecoilState(providerState);
  const navigate = useNavigate();
  const setRecoilInit = (data: any) => {
    //레거시
    const jwt = JSON.stringify(data);
    const jwtParsed = JSON.parse(jwt);
    localStorage.setItem("jwt", jwt);
    //레거시 todo 리코일에서 jwtString 사용으로  바꿔야함

    //리코일
    setRecoilIsLogined(true);
    setRecoilJwtString(jwtParsed.token);

    const decoded: JwtDecoded = jwt_decode(jwtParsed.token);
    const { id, nickName, objectId, provider } = decoded;
    setRecoilUniqueId(objectId);
    setRecoilUserId(id);
    setRecoilNickName(nickName);
    setRecoilProvider(provider);
    recoilIsLogined && navigate("/main");
    //리코일
  };
  useEffect(() => {
    setRecoilInit(data);
  }, [data]);

  // 반환할 JSX가 없으므로 null 반환
  return null;
};

export default RecoilInit;
