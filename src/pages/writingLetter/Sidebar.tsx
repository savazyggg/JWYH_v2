import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import LetterStyle from "./LetterStyle";
import { useState } from "react";
import Notice from "./Notice";
interface Props {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Sidebar: React.FC<Props> = ({ onClick }) => {
  const [sidebarShow, setSidebarShow] = useState<boolean>(false);
  const [letterStyleShow, setLetterStyleShow] = useState<boolean>(false);

  return sidebarShow ? (
    <SidebarNav show={sidebarShow}>
      <CloseWrapper>
        <ul>
          <li onClick={() => setLetterStyleShow(false)}>안내사항</li>
          <li onClick={() => setLetterStyleShow(true)}>편지지</li>
        </ul>
        <CustomClose onClick={() => setSidebarShow(false)}>X</CustomClose>
      </CloseWrapper>
      {letterStyleShow ? <LetterStyle onClick={onClick} /> : <Notice />}
    </SidebarNav>
  ) : (
    <Button onClick={() => setSidebarShow(true)}>◀︎ 편지지 고르러가기</Button>
  );
};

export default Sidebar;

const SidebarNav = styled.div<{ show: boolean }>`
  margin-top: 50px; //헤더 높이만큼
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: #242424;
  width: 260px;
  z-index: 16;
  transform: ${(show) => (show ? "translateX(0)" : "translateX(-100%)")};
  overflow: auto;

  ::-webkit-scrollbar {
    width: 10px;
    background-color: #343434;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #242424;
  }

  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: start;
  color: white;
  font-weight: 600;

  ul {
    display: flex;
    justify-content: flex-start;
    margin: 0px;
  }
  li {
    list-style: none;
    float: left;
    padding: 0 15px;
    margin: 0 5px;
    justify-content: center;
    text-align: center;
    cursor: pointer;
  }
`;

const CustomClose = styled(CloseIcon)`
  cursor: pointer;
  font: black;
`;

const CloseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  margin-top: 60px;
  left: 0;
  position: fixed;
  background-color: #93ba7b;
  font-size: 15px;
  font-weight: 700;
  color: white;
  padding: 5px;
  border: 0;
`;
