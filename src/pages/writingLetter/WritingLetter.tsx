import Sidebar from "./Sidebar";
import styled from "@emotion/styled";
import LetterSpace from "./LetterSpace";
import { useState } from "react";
import SendButton from "./SendButton";
import Input from "./InputBox";

const WritingLetter = () => {
  const [nameInputValue, setNameInputValue] = useState<string>("");
  const [dateInputValue, setDateInputValue] = useState<string>("");
  const onNameChange = (e) => setNameInputValue(e.target.value);
  const onDateChange = (e) => setDateInputValue(e.target.value);

  // const sendLetterData = {
  //   content,
  //   style,
  //   sender,
  //   unlock-year,
  //   unlock-month,
  //   unlock-date
  //   }

  return (
    <>
      <Sidebar />
      <>
        <LetterSpace />
        <Container>
          <Input
            type="text"
            placeholder="보내는 사람의 이름을 입력해 주세요"
            inputValue={nameInputValue}
            onChange={onNameChange}
          />
          <Input
            type="date"
            placeholder="열리는 날짜를 입력해 주세요."
            inputValue={dateInputValue}
            onChange={onDateChange}
          />
          <SendButton
            onClick={() => console.log(nameInputValue, dateInputValue)}
          />
        </Container>
      </>
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
