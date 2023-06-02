import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRef } from "react";

//TODO 임의로 로그인 status 해당 컴포넌트에서 설정 추후에 프롭으로 내려받을것
const UserInputText = () => {
  const [inputEdit, setInputEdit] = useState<boolean>(false);
  const [loginUserInput, setLoginUserInput] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const localStorageCheck = localStorage.getItem("jwt");
  const loginCheck = () => localStorageCheck && setIsLogin(true);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loginCheck();
  }, [isLogin]);

  console.log(inputEdit);
  const onInputChange = (e) => {
    setLoginUserInput(e.target.value);
  };

  const onButtonClick = () => {
    setInputEdit((current) => !current);
    if (inputRef.current !== null) {
      inputRef.current.disabled = false;
      inputRef.current.focus();
    }
  };

  const placeholderText = "상태메세지를 설정해주세요";

  return (
    <Container>
      <Input
        disabled={!inputEdit}
        value={loginUserInput}
        onChange={onInputChange}
        ref={inputRef}
        placeholder={loginUserInput ? "" : placeholderText}
        autoFocus={inputEdit}
      ></Input>

      {isLogin ? (
        <>
          <button onClick={onButtonClick}>수정하기</button>
        </>
      ) : (
        ""
      )}
    </Container>
  );
};

export default UserInputText;

const Input = styled.input`
  background-color: #343434;
  border: 0px;
  color: white;
`;

const Container = styled.div`
  margin-top: 20px;
  margin-left: 100px;
  position: fixed;
  left: 0;
`;
