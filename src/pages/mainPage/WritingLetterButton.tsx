import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { uniqueIdState } from "../../recoilStore";

const WritingLetterButton = ({ isLogin }) => {
  const nav = useNavigate();
  const _userId = useRecoilState(uniqueIdState)[0];
  console.log(_userId);
  const moveWriting = () => {
    console.log(`/writingletter/${_userId}`);
    nav(`/writingletter/${_userId}`);
  };
  return (
    isLogin || (
      <div>
        <Button onClick={moveWriting}>편지쓰러가기!</Button>
      </div>
    )
  );
};

export default WritingLetterButton;

const Button = styled.button`
  margin-top: 140px;
  border-radius: 13px;
  background-color: #93ba7b;
  width: 150px;
  height: 50px;
  color: white;
  font-size: 20px;
  border: 0px;
  cursor: pointer;
  border: 0px;
  &:hover {
    background-color: #bed7a9;
  }
`;
