import Sidebar from "./Sidebar";
import styled from "@emotion/styled";
import LetterSpace from "./LetterSpace";
import { useState } from "react";
import SendButton from "./SendButton";
import Input from "./InputBox";
import Header from "../../components/organisms/header/Header";
import { useParams } from "react-router-dom";

interface SendData {
  content: string;
  style: string;
  sender: string;
  "unlock-year": string;
  "unlock-month": string;
  "unlock-date": string;
}

const WritingLetterPage: React.FC = () => {
  const [letterWriting, setLetterWriting] = useState<string>("");
  const [lettrStyle, setLetterStyle] = useState<string>("rgb(186, 138, 123)");
  const [senderName, setSenderName] = useState<string>("");
  const [unlockDate, setUnlockDate] = useState<string>("");
  const [successSendingStatus, setSuccessSendingStatus] =
    useState<boolean>(false);

  const { userID } = useParams();

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSenderName(e.target.value);
  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUnlockDate(e.target.value);
  const onLetterWritingChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setLetterWriting(e.target.value);
  const onLetterStyleChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const letterStyle = window
      .getComputedStyle(e.currentTarget)
      .getPropertyValue("background-color");
    console.log(letterStyle);
    setLetterStyle(letterStyle);
  };

  const onSubmit = async () => {
    const SEND_LETTER_API = `http://34.64.195.153:5000/letters/send/${userID}`;

    const sendData: SendData = {
      content: letterWriting,
      style: lettrStyle,
      sender: senderName,
      "unlock-year": unlockYear,
      "unlock-month": unlockMonth,
      "unlock-date": unlockDay,
    };

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
    console.log(sendData);
    setSuccessSendingStatus(true);
    return response.json();

    //필수값 넣었는지 확인후 버튼 활성화하게 해야될듯, 이벤트 변경 필요
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

  //todo 06.03 윤지 header넣고 브라우저에 스크롤바 생김, 이미 사이드바, 편지지안에 내부 스크롤바가 있음으로 브라우저에선 없어야함, 어떻게 없애지..?
  //todo header nickname값은 컴포넌트안에서 fetch 받아서 유지되는데 로그인 값은 페이지에서 상태값 받아서 로컬이나 스토어에서 가져오지 않는이상 유지가 안됨.
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
        <SendButton type="button" onClick={onSubmit} />
      </Container>
    </>
  );
};

export default WritingLetterPage;

const Container = styled.div`
  width: 780px;
  margin-left: 250px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
