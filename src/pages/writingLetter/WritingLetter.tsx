import Sidebar from "./Sidebar";
import styled from "@emotion/styled";
import LetterSpace from "./LetterSpace";
import { useState } from "react";
import SendButton from "./SendButton";
import Input from "./InputBox";

const WritingLetter = () => {
  const [letterWriting, setLetterWriting] = useState<string>("");
  const [lettrStyle, setLetterStyle] = useState<string>("");
  const [senderName, setSenderName] = useState<string>("");
  const [unlockDate, setUnlockDate] = useState<string>("");

  const onNameChange = (e) => setSenderName(e.target.value);
  const onDateChange = (e) => setUnlockDate(e.target.value);
  const onLetterWritingChange = (e) => setLetterWriting(e.target.value);
  const onLetterStyleChange = (e) => {
    const letterStyle = window
      .getComputedStyle(e.target)
      .getPropertyValue("background-color");
    console.log(letterStyle);
    setLetterStyle(letterStyle);
  };

  const unlockDateSpilt = unlockDate.split("-");

  const sendData = {
    content: letterWriting,
    style: lettrStyle,
    sender: senderName,
    "unlock-year": unlockDateSpilt[0],
    "unlock-month": unlockDateSpilt[1],
    "unlock-date": unlockDateSpilt[2],
  };

  return (
    <>
      <Sidebar onClick={onLetterStyleChange} />
      <LetterSpace
        value={letterWriting}
        onChange={onLetterWritingChange}
        letterStyle={lettrStyle}
      />
      <Container>
        <Input
          type="text"
          placeholder="보내는 사람의 이름을 입력해 주세요"
          inputValue={senderName}
          onChange={onNameChange}
        />
        <Input
          type="date"
          placeholder="열리는 날짜를 입력해 주세요."
          inputValue={unlockDate}
          onChange={onDateChange}
        />
        <SendButton onClick={() => console.log(sendData)} />
      </Container>
    </>
  );
};

export default WritingLetter;

const Container = styled.div`
  width: 780px;
  height: 50px;
  margin-left: 30px;
  display: flex;
  text-align: center;

  justify-content: space-between;
`;
