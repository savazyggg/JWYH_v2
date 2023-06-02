import { useState } from "react";
import styled from "@emotion/styled";

const UserInputText = () => {
  const [inputEdit, setInputEdit] = useState<boolean>(false);
  const [loginUserInput, setLoginUserInput] = useState<string>("");
  const localStorageCheck = localStorage.getItem("jwt");
  const loginCheck = localStorageCheck ? true : false;
  console.log(inputEdit);
  const onInputChange = (e) => {
    setLoginUserInput(e.target.value);
  };
  const onButtonClick = () => {
    setInputEdit((current) => !current);
  };
  return (
    <div>
      <Input
        disabled={inputEdit}
        value={loginUserInput}
        onChange={onInputChange}
      ></Input>
      {inputEdit ? "" : <button onClick={onButtonClick}>확인</button>}

      {loginCheck ? <button onClick={onButtonClick}>수정하기</button> : ""}
    </div>
  );
};

export default UserInputText;

const Input = styled.input`
  background-color: #343434;
  border: 0px;
  color: white;
`;
