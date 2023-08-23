import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { uniqueIdState } from "../../recoilStore";
import { theme } from "../../common/core";

interface WritingLetterButtonProps {
  isLogin: boolean;
}
const WritingLetterButton: React.FC<WritingLetterButtonProps> = ({
  isLogin,
}) => {
  const nav = useNavigate();
  const _userId = useRecoilState(uniqueIdState)[0];
  const moveWriting = () => {
    nav(`/writingletter/${_userId}`);
  };
  return !isLogin ? (
    <div>
      <Button onClick={moveWriting}>편지쓰러가기!</Button>
    </div>
  ) : null;
};

export default WritingLetterButton;

const Button = styled.button`
  margin-top: 12px;
  border-radius: 13px;
  background-color: ${theme.green};
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
