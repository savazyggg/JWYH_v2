import Sidebar from "./Sidebar";
import styled from "@emotion/styled";
import LetterSpace from "./LetterSpace";
import { useState } from "react";
import SendButton from "./SendButton";
import Input from "./InputBox";
import SuccesSending from "./SuccesSending";

const WritingLetter = () => {
  const [letterWriting, setLetterWriting] = useState<string>("");
  const [lettrStyle, setLetterStyle] = useState<string>("");
  const [senderName, setSenderName] = useState<string>("");
  const [unlockDate, setUnlockDate] = useState<string>("");
  const [successSendingStatus, setSuccessSendingStatus] =
    useState<boolean>(false);

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
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(sendData);
    setSuccessSendingStatus(true);
    console.log(successSendingStatus);
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
          <SendButton type="button" onClick={onSubmit} />
          {successSendingStatus && <SuccesSending />}
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
