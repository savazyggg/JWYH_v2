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
  const [letterStyleShow, setLetterStyleShow] = useState<boolean>(true);

  return sidebarShow ? (
    <SidebarNav show={sidebarShow}>
      <CloseWrapper>
        <ul>
          <li onClick={() => setLetterStyleShow(true)}>편지지</li>
          <li onClick={() => setLetterStyleShow(false)}>편집</li>
        </ul>
        <CustomClose onClick={() => setSidebarShow(false)}>X</CustomClose>
      </CloseWrapper>
      {letterStyleShow ? <LetterStyle onClick={onClick} /> : <Notice />}
    </SidebarNav>
  ) : (
    <Button onClick={() => setSidebarShow(true)}>사이드바</Button>
  );
};

export default Sidebar;

const SidebarNav = styled.div<{ show: boolean }>`
  margin-top: 50px; //헤더 높이만큼
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background: #343434;
  width: 260px;
  z-index: 16;
  transform: ${(show) => (show ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.2s; //애니메이션이 안먹음 ..ㅠ
  overflow: auto;

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
  left: 0;
  position: fixed;
`;
