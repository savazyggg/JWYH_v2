import Header from "../../components/organisms/header/Header";
import WritingLetterButton from "./WritingLetterButton";
import { styled as muiStyled } from "@mui/system";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { LetterCarousel, LetterInterface } from "./LetterCarousel";

import { useEffect, useState } from "react";

// recoil
import { useRecoilState } from "recoil";
import { isLoginedState, nickNameState } from "../../recoilStore";
import { getLetters } from "../../apis/getLetters";
// recoil

const GuestMainPage = () => {
  const [isLogined, _setIsLogined] = useRecoilState(isLoginedState);
  const [userId, _setUserId] = useRecoilState(nickNameState);
  const [letters, setLetters] = useState<LetterInterface[]>([]);
  const [_userId, set_userId] = useState("");

  const location = useLocation();
  const handleLetterData = async (userId = "") => {
    const url = "http://34.64.195.153:5000";
    if (userId.length !== 0) {
      await getLetters(url, userId).then((value: any) => {
        setLetters(value);
      });
    }
  };

  useEffect(() => {
    handleLetterData(_userId);
  }, [_userId]);

  useEffect(() => {
    const guestId = location.pathname.split("/").pop();
    if (guestId !== undefined) set_userId(guestId);
  }, []);

  return (
    <Container>
      <>
        <Header></Header>
      </>
      <>
        <Info>
          <ShakingText>{userId}</ShakingText> 님에게 편지를 보내보세요! <br />
          생일🥳, 기념일🎂, 연인의 날🥰 등 <ShakingText> 특별한 </ShakingText>
          날짜에 편지를 받는다면
          <br />
          <ShakingText>감동 </ShakingText> 은 배가 될거에요
        </Info>
        <WritingLetterButton isLogin={isLogined} />
      </>
      {letters.length && (
        <LetterCarousel
          isGuest={true}
          letters={letters}
          handleLetterData={undefined}
          className={""}
        ></LetterCarousel>
      )}
    </Container>
  );
};

export default GuestMainPage;

const Container = muiStyled(Box)({
  height: "100%",
  display: "grid",
  gridTemplateRows: "250px 100px 1fr",
});

const Info = muiStyled(Box)({
  alignContent: "center",
  lineHeight: "1.8",
  fontSize: "24px",
  color: "#fff",
  fontWeight: "600",
  marginTop: "65px",
});

const ShakingText = styled.div`
  font-size: 32px !important;
  color: #93ba7b !important;
  display: inline-block !important;
  whitespace: pre;
  animation: shake 0.6s ease-in-out infinite;

  @keyframes shake {
    from {
      transform: rotate(2deg);
    }
    to {
      transform: rotate(-2deg);
    }
  }
`;
