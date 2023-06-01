import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import LetterStyle from "./LetterStyle";

export interface Iprops {
  sideBarShow: boolean;
  letterStyleShow: boolean;
  letterStyleChoose: string;
  extraStyleEditShow: boolean;
}

export const Sidebar = () => {
  const [sidebarStatus, setSidebarStatus] =
    useState<Iprops["sideBarShow"]>(false);
  const [letterFormStatus, setLetterFormStatus] =
    useState<Iprops["letterStyleShow"]>(true);
  const [letterStyle, setLetterStyle] =
    useState<Iprops["letterStyleChoose"]>("#0000000");
  const [extraEditStatus, setExtraEditStatus] =
    useState<Iprops["extraStyleEditShow"]>(false);

  return (
    <BugerNav show={show}>
      <CloseWrapper>
        <CustomClose>X</CustomClose>
      </CloseWrapper>

      <ul>
        <li>
          <a href="#">편지지</a>
        </li>
        <li>
          <a href="#">편집</a>
        </li>
      </ul>
      <LetterStyle />
    </BugerNav>
  );
};

export default Sidebar;

const BugerNav = styled.div`
  margin-top: 40px; //헤더 높이만큼
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background: white;
  width: 300px;
  z-index: 16;

  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: start;
  color: black;
  transition: transform 0.2s;
  ul {
    margin: 0;
    justify-content: start;
  }
  li {
    list-style: none;
    float: left;
    padding: 0 15px;
    margin: 0 5px;
    justify-content: center;
    text-align: center;

    a {
      font-weight: 600;
      color: black;
    }
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
