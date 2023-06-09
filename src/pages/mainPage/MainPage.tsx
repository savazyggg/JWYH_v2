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
import { isLoginedState } from "../../recoilStore";
import { LetterCarousel, LetterInterface } from "./LetterCarousel";
// recoil

const MainPage = () => {
  const [isLogined, setIsLogined] = useRecoilState(isLoginedState);
  const [letters, setLetters] = useState<LetterInterface[]>([]);
  // const [token, setToken] = useState({});
  // const [ userId, setUserId] = useState("");
  const [path, setPath] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  let userId = "";
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
      // console.log(JwtDecoded);
      userId = JwtDecoded.id;
      // setUserId(JwtDecoded.id);

      // setToken(user);
      // console.log(isLogined);
    }
  };
  const handleLetterData = async () => {
    const url = "http://34.64.195.153:5000";
    // const userId = "aaa";
    // const userId = "zzz123";
    await getLetters(url, userId).then((value) => {
      setLetters(value);
    });
  };
  useEffect(() => {
    handleLetterData();
  }, [letters]);

  useEffect(() => {
    loginCheck();
  }, [isLogined]);

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
        <LetterCarousel isGuest={false} letters={letters}></LetterCarousel>
      )}
    </Container>
  );
};

export default MainPage;

const Container = muiStyled(Box)({
  height: "100%",
  gridTemplateRows: "100px 250px 100px 1fr",
});
