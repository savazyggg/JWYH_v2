import GetLetter from "./GetLetter";
import Header from "../../components/organisms/header/Header";
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

const GuestMainPage = () => {
  const [isLogined, setIsLogined] = useRecoilState(isLoginedState);

  //   const [token, setToken] = useState({});
  const [path, setPath] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location.pathname.split("/").pop());
  // console.log(path.token);
  //   const tockenStr = localStorage.getItem("jwt");
  //   const loginCheck = () => {
  //     if (tockenStr) {
  //       setIsLogined(true);
  //       const user = jwt_decode(tockenStr);
  //       console.log(user);
  //       setToken(user);
  //       console.log(isLogined);
  //     } else {
  //       setPath([...location.pathname.split("/")]);
  //     }
  //   };

  useEffect(() => {
    setPath(location.pathname.split("/").pop());
  }, []);

  return (
    <Container>
      <>
        <Header></Header>
        {/* <UserInputText isLogin={isLogin} /> */}
      </>
      <>
        {/* {isLogined && <GetLetter token={token} />} */}
        <WritingLetterButton isLogin={isLogined} />
      </>
      {path && <LetterCarousel token={path}></LetterCarousel>}
    </Container>
  );
};

export default GuestMainPage;

const Container = muiStyled(Box)({
  height: "100%",
  gridTemplateRows: "100px 250px 100px 1fr",
});
