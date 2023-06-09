import Header from "../../components/organisms/header/Header";

import GetLetter from "./GetLetter";
import UserInputText from "./UserInputText";
import WritingLetterButton from "./WritingLetterButton";
import { styled as muiStyled } from "@mui/system";
import Box from "@mui/material/Box";
import LetterCarousel from "./LetterCarousel";
import jwt_decode from "jwt-decode";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useEffect, useState, lazy, Suspense } from "react";

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
  const [path, setPath] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const loginCheck = () => {
    if (localStorage.getItem("jwt")) {
      setIsLogin(true);
      const tokenStr = localStorage.getItem("jwt");
      const user = jwt_decode(tokenStr);
      setToken(user);
    } else {
      setPath([...location.pathname.split("/")]);
    }
  };

  const onLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLogined(!isLogined);
    setIsLogin(false);
    navigate("/login");
  };

  useEffect(() => {
    loginCheck();
  }, []);

  return (
    <Container>
      <>
        <Header
          isLogin={isLogin}
          onLogOut={onLogOut}
          token={isLogin ? token : null}
          path={path}
        />
        {/* <UserInputText isLogin={isLogin} /> */}
      </>
      <>
        <GetLetter token={isLogin ? token : null} />
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
