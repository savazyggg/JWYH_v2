import React from "react";
import Header from "../../components/organisms/header/Header";
import GetLetter from "./GetLetter";
import UserInputText from "./UserInputText";
import WritingLetterButton from "./WritingLetterButton";

//TODO 여기서 스토어에서 열어서 로그인여부 프롭으로 내려줄지? 컴포넌트 마다 스토어 열어서 로그인 상태 가져올지 06.03
const MainPage = () => {
  return (
    <>
      <Header />
      <UserInputText />
      <GetLetter />
      <WritingLetterButton />
    </>
  );
};

export default MainPage;
