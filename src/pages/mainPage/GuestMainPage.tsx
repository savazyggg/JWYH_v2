import GetLetter from "./GetLetter";
import Header from "../../components/organisms/header/Header";
import UserInputText from "./UserInputText";
import WritingLetterButton from "./WritingLetterButton";
import { styled as muiStyled } from "@mui/system";
import Box from "@mui/material/Box";
import jwt_decode from "jwt-decode";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LetterCarousel, LetterInterface } from "./LetterCarousel";

import { useEffect, useState, lazy, Suspense } from "react";

// recoil
import { useRecoilState } from "recoil";
import { isLoginedState } from "../../recoilStore";
import { getLetters } from "../../apis/getLetters";
// recoil

const GuestMainPage = () => {
  const [isLogined, setIsLogined] = useRecoilState(isLoginedState);
  const [letters, setLetters] = useState<LetterInterface[]>([]);
  const [_userId, set_userId] = useState("");

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
  const handleLetterData = async (userId = "") => {
    const url = "http://34.64.195.153:5000";
    if (userId.length !== 0) {
      await getLetters(url, userId).then((value) => {
        setLetters(value);
      });
    }
  };

  useEffect(() => {
    handleLetterData(_userId);
  }, [letters, _userId]);

  useEffect(() => {
    const guestId = location.pathname.split("/").pop();
    if (guestId !== undefined) set_userId(guestId);
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
      {letters.length && (
        <LetterCarousel isGuest={true} letters={letters}></LetterCarousel>
      )}{" "}
    </Container>
  );
};

export default GuestMainPage;

const Container = muiStyled(Box)({
  height: "100%",
  gridTemplateRows: "100px 250px 100px 1fr",
});
