import Sidebar from "./Sidebar";
import styled from "@emotion/styled";
import LetterSpace from "./LetterSpace";
import { useState } from "react";
import SendButton from "./SendButton";
import Input from "./InputBox";
import Header from "../../components/organisms/header/Header";
import { useRecoilState } from "recoil";
import { uniqueIdState } from "../../recoilStore";

interface SendData {
  content: string;
  style: string;
  sender: string;
  unlockYear: number;
  unlockMonth: number;
  unlockDate: number;
  [key: string]: string | number;
}

const WritingLetterPage: React.FC = () => {
  const [letterWriting, setLetterWriting] = useState<string>("");
  const [lettrStyle, setLetterStyle] = useState<string>("rgb(186, 138, 123)");
  const [senderName, setSenderName] = useState<string>("");
  const [unlockDate, setUnlockDate] = useState<string>("");
  const [successSendingStatus, setSuccessSendingStatus] =
    useState<boolean>(false);
  const _userId = useRecoilState(uniqueIdState);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSenderName(e.target.value);
  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUnlockDate(e.target.value);
  const onLetterWritingChange = (value: string) => setLetterWriting(value);
  const onLetterStyleChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const letterStyle = window
      .getComputedStyle(e.currentTarget)
      .getPropertyValue("background-color");
    setLetterStyle(letterStyle);
  };

  const onSubmit = async () => {
    const SEND_LETTER_API = `https://kdt-sw-4-team14.elicecoding.com/api/letters/send/${_userId[0]}`;

    const sendData: SendData = {
      content: letterWriting,
      style: lettrStyle,
      sender: senderName,
      unlockYear,
      unlockMonth,
      unlockDate: unlockDay,
    };

    const keys = Object.keys(sendData);
    for (const key of keys) {
      if (!sendData[key]) {
        alert("편지 내용, 보내는 이, 편지가 열리는 날짜를 입력해주세요.");
        return;
      }
      setSuccessSendingStatus(true);
    }

    try {
      const response = await fetch(SEND_LETTER_API, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(sendData),
      });
      return response.json();
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  const unlockDateSpilt = unlockDate.split("-");

  const unlockYear = +unlockDateSpilt[0];
  const unlockMonth =
    unlockDateSpilt[1] && unlockDateSpilt[1][0] == "0"
      ? +unlockDateSpilt[1][1]
      : +unlockDateSpilt[1];
  const unlockDay =
    unlockDateSpilt[2] && unlockDateSpilt[2][0] == "0"
      ? +unlockDateSpilt[2][1]
      : +unlockDateSpilt[2];

  return (
    <>
      <Header />
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
        <SendButton
          type="button"
          onClick={onSubmit}
          onSuccessSendingStatus={successSendingStatus}
        />
      </Container>
    </>
  );
};

export default WritingLetterPage;

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
