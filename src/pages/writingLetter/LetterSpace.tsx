import { Container } from "@mui/material";
import styled from "@emotion/styled";
import LetterForm from "../../components/organisms/letterForm/LetterForm";
interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  letterStyle?: string;
}

const LetterSpace: React.FC<Props> = ({ value, onChange, letterStyle }) => {
  //console.log("편지지컴포넌트에서 편지지색 :" + letterStyle);
  return (
    <Container>
      <Letter
        style={{
          backgroundColor: letterStyle,
        }}
      >
        <LetterForm value={value} onChange={onChange} />
      </Letter>
    </Container>
  );
};

export default LetterSpace;

const Letter = styled.div`
  margin: 61px auto 10px;
  width: 800px;
  height: 80vh;
  border-radius: 15px;
  overflow: auto;
`;
