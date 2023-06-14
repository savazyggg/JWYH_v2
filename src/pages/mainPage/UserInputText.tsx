// import { useEffect, useState } from "react";
// import styled from "@emotion/styled";
// import { useRef } from "react";

// const UserInputText = ({ isLogin }) => {
//   const [inputEdit, setInputEdit] = useState<boolean>(false);
//   const [loginUserInput, setLoginUserInput] = useState<string>("");

//   const inputRef = useRef<HTMLInputElement>(null);
//   const onInputChange = (e) => {
//     setLoginUserInput(e.target.value);
//   };

//   const onButtonClick = () => {
//     setInputEdit((current) => !current);
//     if (inputRef.current !== null) {
//       inputRef.current.disabled = false;
//       inputRef.current.focus();
//     }
//   };

//   const placeholderText = "상태메세지를 설정해주세요";

//   return (
//     <Container>
//       <Input
//         disabled={!inputEdit}
//         value={loginUserInput}
//         onChange={onInputChange}
//         ref={inputRef}
//         placeholder={isLogin ? (loginUserInput ? "" : placeholderText) : ""}
//         autoFocus={inputEdit}
//       ></Input>

//       {isLogin ? (
//         <>
//           <button onClick={onButtonClick}>수정하기</button>
//         </>
//       ) : (
//         ""
//       )}
//     </Container>
//   );
// };

// export default UserInputText;

// const Input = styled.input`
//   background-color: #343434;
//   border: 0px;
//   color: white;
// `;

// const Container = styled.div`
//   margin-top: 60px;
//   margin-left: 10%;
//   position: fixed;
//   top: 0;
//   left: 0;
// `;

export {};
