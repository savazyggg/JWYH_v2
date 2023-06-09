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

const MainPage = () => {
  const [isLogined, setIsLogined] = useRecoilState(isLoginedState);

  const [token, setToken] = useState({});
  const [path, setPath] = useState([]);
  const [jwt, setjwt] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  const tockenStr = localStorage.getItem("jwt");
  const loginCheck = () => {
    if (tockenStr) {
      setIsLogined(true);
      const user = jwt_decode(tockenStr);
      console.log(user);
      setToken(user);
      console.log(isLogined);
    } else {
      setPath([...location.pathname.split("/")]);
    }
  };

  useEffect(() => {
    loginCheck();
  }, [isLogined]);

  return (
    <Container>
      <>
        <Header token={isLogined && token} path={path} />
        {/* <UserInputText isLogin={isLogin} /> */}
      </>
      <>
        {isLogined && <GetLetter token={token} />}
        {/* <WritingLetterButton isLogin={isLogined} /> */}
      </>
      {token && <LetterCarousel token={token}></LetterCarousel>}
    </Container>
  );
};

export default MainPage;

const Container = muiStyled(Box)({
  height: "100%",
  gridTemplateRows: "100px 250px 100px 1fr",
});

// const MainPage = () => {
//   const [isLogined, setIsLogined] = useRecoilState(isLoginedState);

//   setIsLogined(true);
//   console.log(isLogined);

//   return (
//     <Container>
//       {/* <> */}
//       {/* <Header />
//         <UserInputText isLogin={isLogined} />
//       </>
//       <>
//         <GetLetter />
//         <WritingLetterButton isLogin={isLogined} />
//       </>
//       <LetterCarousel></LetterCarousel> */}
//     </Container>
//   );
// };
// export default MainPage;
