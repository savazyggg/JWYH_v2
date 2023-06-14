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
  // console.log(_userId);
  // const { userID } = useParams(); //api에 userID로 바꿀것 지금은 test로 6479a10af202ae0a7070c8aa로 지정

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSenderName(e.target.value);
  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUnlockDate(e.target.value);
  const onLetterWritingChange = (value: string) => setLetterWriting(value);
  const onLetterStyleChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const letterStyle = window
      .getComputedStyle(e.currentTarget)
      .getPropertyValue("background-color");
    console.log(letterStyle);
    setLetterStyle(letterStyle);
  };

  const onSubmit = async () => {
    console.log(_userId[0]);
    console.log("버튼 클릭");
    const SEND_LETTER_API = `http://34.64.195.153:5000/api/letters/send/${_userId[0]}`;

    const sendData: SendData = {
      content: letterWriting,
      style: lettrStyle,
      sender: senderName,
      unlockYear,
      unlockMonth: unlockMonth,
      unlockDate: unlockDay,
    };
    //console.log(sendData);

    const keys = Object.keys(sendData);
    for (const key of keys) {
      if (!sendData[key]) {
        alert("편지 내용, 보내는 이, 편지가 열리는 날짜를 입력해주세요.");
        return;
      }
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
      console.log(response, "편지보냄");
      console.log(successSendingStatus);
      setSuccessSendingStatus(true);
      // return response.json();
    } catch (error) {
      console.error(error);
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
  width: 780px;
  margin-left: 250px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
