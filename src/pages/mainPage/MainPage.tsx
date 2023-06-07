import Header from "../../components/organisms/header/Header";
import GetLetter from "./GetLetter";
import UserInputText from "./UserInputText";
import WritingLetterButton from "./WritingLetterButton";
import { styled as muiStyled } from "@mui/system";
import Box from "@mui/material/Box";
import LetterCarousel from "./LetterCarousel";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isLoginedState } from "../../recoilStore";

//TODO 06.03 윤지: 메인페이지 url 관리하는거 너무 힘들것 같습니다. 이거 다시 제대로 얘기해봐야 할 거같아요.
//TODO 로그인한 유저가 링크복사 전송 -> 접속 -> url: 1) 로그인 x : 도메인/난수 2) 로그인o 도메인/userID 여기서 로그아웃하면? 난수로 또 바뀔지? 그리고 링크생성자와 들어가서 로그인한 아이디가 다르면? url, 랜딩 바뀜 다시생각해보기

const MainPage = () => {
  const [isLogined, setIsLogined] = useRecoilState(isLoginedState);

  useEffect(() => {
    console.log("로그인 성공 ? " + isLogined);
  }, [isLogined]);

  return (
    <Container>
      <>
        <Header />
        <UserInputText isLogin={isLogined} />
      </>
      <>
        <GetLetter />
        <WritingLetterButton isLogin={isLogined} />
      </>
      <LetterCarousel></LetterCarousel>
    </Container>
  );
};

export default MainPage;

const Container = muiStyled(Box)({
  // display: "grid",
  height: "100%",
  gridTemplateRows: "100px 250px 100px 1fr",
});
// const InfoDiv = muiStyled(Box)({
//   border: "1px solid red",
// });
// const SHeader = muiStyled(Box)({
//   border: "1px solid red",
// });
