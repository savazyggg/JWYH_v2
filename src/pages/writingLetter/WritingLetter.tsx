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

  const unlockYear = unlockDateSpilt[0];
  const unlockMonth =
    unlockDateSpilt[1] && unlockDateSpilt[1][0] == "0"
      ? unlockDateSpilt[1][1]
      : unlockDateSpilt[1];
  const unlockDay =
    unlockDateSpilt[2] && unlockDateSpilt[2][0] == "0"
      ? unlockDateSpilt[2][1]
      : unlockDateSpilt[2];

  //memo 6/2 윤지
  //여기서 서버에 보낼 데이터 만져주는데 input박스에 name 속성 넣어야하는지?
  const sendData = {
    content: letterWriting,
    style: lettrStyle,
    sender: senderName,
    "unlock-year": unlockYear,
    "unlock-month": unlockMonth,
    "unlock-date": unlockDay,
  };

  return (
    <>
      <Sidebar onClick={onLetterStyleChange} />
      <form>
        <LetterSpace
          value={letterWriting}
          onChange={onLetterWritingChange}
          letterStyle={lettrStyle}
          required={true}
        />
        <Container>
          <Input
            labelName="sender"
            type="text"
            placeholder="보내는 사람의 이름을 입력해 주세요"
            inputValue={senderName}
            onChange={onNameChange}
            required={true}
          />
          <Input
            labelName="unlockDate"
            type="date"
            placeholder="열리는 날짜를 입력해 주세요."
            inputValue={unlockDate}
            onChange={onDateChange}
            required={true}
          />
          <SendButton type="submit" onClick={() => console.log(sendData)} />
        </Container>
      </form>
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
