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

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [token, setToken] = useState();
  const [path, setPath] = useState([]);
  // const [jwt, setjwt] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const loginCheck = () => {
    const tokenStr = localStorage.getItem("jwt");
    console.log(tokenStr);
    if (tokenStr) {
      const user = jwt_decode(tokenStr);
      console.log(user);
      setToken(user);
      setIsLogin(true);
      console.log(isLogin);
    } else {
      setIsLogin(false);
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
        {/* {isLogin && <GetLetter token={token} />}
        <WritingLetterButton isLogin={isLogin} /> */}
      </>
      {/* <LetterCarousel token={token}></LetterCarousel> */}
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
