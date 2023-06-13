import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const WritingLetterButton = ({ isLogin }) => {
  //console.log("writing letter button islogin:" + isLogin);
  return (
    isLogin || (
      <div>
        <Link to="/writingletter">
          <Button>편지쓰러가기!</Button>
        </Link>
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
