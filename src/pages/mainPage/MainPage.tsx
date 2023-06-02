import React from "react";
import GetLetter from "./GetLetter";
import UserInputText from "./UserInputText";
import WritingLetterButton from "./WritingLetterButton";

const MainPage = () => {
  return (
    <div>
      <UserInputText />
      <GetLetter />
      <WritingLetterButton />
    </div>
  );
};

export default MainPage;
