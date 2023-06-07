import Header from "../../components/organisms/header/Header";
import GetLetter from "./GetLetter";
import UserInputText from "./UserInputText";
import WritingLetterButton from "./WritingLetterButton";
import { styled as muiStyled } from "@mui/system";
import Box from "@mui/material/Box";
import LetterCarousel from "./LetterCarousel";
import jwt_decode from "jwt-decode";

import { useEffect, useState } from "react";

// recoil
import { useRecoilState } from "recoil";
import { isLoginedState } from "../../recoilStore";
// recoil

const MainPage = () => {
  // recoil
  const [isLogined, setIsLogined] = useRecoilState(isLoginedState);
  // recoil

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [token, setToken] = useState();
  const localStorageCheck = localStorage.getItem("jwt");

  const loginCheck = () => {
    if (localStorageCheck) {
      let jwtString = JSON.parse(localStorage.getItem("jwt"));
      setToken(jwt_decode(jwtString.token));
      // console.log(token);
      setIsLogin(true);
    }
  };

  const onLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLogined(!isLogined);
    setIsLogin(false);
  };

  useEffect(() => {
    loginCheck();
  }, []);

  return (
    <Container>
      <>
        <Header
          isLogin={isLogin}
          token={isLogin ? token : ""}
          onLogOut={onLogOut}
        />
        <UserInputText isLogin={isLogin} />
      </>
      <>
        {/* <GetLetter /> */}
        {/* <WritingLetterButton isLogin={isLogin} /> */}
      </>
      {/* <LetterCarousel></LetterCarousel> */}
    </Container>
  );
};

export default MainPage;

const Container = muiStyled(Box)({
  height: "100%",
  gridTemplateRows: "100px 250px 100px 1fr",
});
