import GetLetter from "./GetLetter";
import Header from "../../components/organisms/header/Header";
import UserInputText from "./UserInputText";
import WritingLetterButton from "./WritingLetterButton";
import { styled as muiStyled } from "@mui/system";
import Box from "@mui/material/Box";
import jwt_decode from "jwt-decode";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getLetters } from "../../apis/getLetters";

import { useEffect, useState, lazy, Suspense } from "react";

// recoil
import { useRecoilState } from "recoil";
import { isLoginedState, userIdState } from "../../recoilStore";
import { LetterCarousel, LetterInterface } from "./LetterCarousel";
// recoil

const MainPage = () => {
  const [isLogined, setIsLogined] = useRecoilState(isLoginedState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [letters, setLetters] = useState<LetterInterface[]>([]);
  // const [token, setToken] = useState({});
  // const [userId, setUserId] = useState("");

  const loginCheck = () => {
    const tokenStr = localStorage.getItem("jwt");
    if (tokenStr !== null) {
      interface JwtDecoded {
        iat: number;
        id: string;
        nickName: string;
        objectId: string;
      }
      const JwtDecoded: JwtDecoded = jwt_decode(tokenStr);
      setUserId(JwtDecoded.id);
      console.log(userId);
      handleLetterData(JwtDecoded.id);
    }
  };
  const handleLetterData = async (userId = "") => {
    const url = "http://34.64.195.153:5000";
    if (userId.length !== 0) {
      await getLetters(url, userId).then((value) => {
        setLetters(value);
      });
    }
  };
  useEffect(() => {
    loginCheck();
  }, [isLogined]);
  useEffect(() => {
    handleLetterData(userId);
  }, [userId]);

  return (
    <Container>
      <>
        <Header></Header>
        {/* <UserInputText isLogin={isLogin} /> */}
      </>
      <>
        {/* {isLogined && <GetLetter token={token} />}
        <WritingLetterButton isLogin={isLogined} /> */}
      </>
      {letters.length && (
        <LetterCarousel
          letters={letters}
          isGuest={false}
          handleLetterData={handleLetterData}
        ></LetterCarousel>
      )}
    </Container>
  );
};

export default MainPage;

const Container = muiStyled(Box)({
  height: "100%",
  gridTemplateRows: "100px 250px 100px 1fr",
});
