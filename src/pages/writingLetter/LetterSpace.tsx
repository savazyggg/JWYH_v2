import { Container } from "@mui/material";
import styled from "@emotion/styled";
import EditorQill from "./EditorQuill";
interface Props {
  value: string;
  onChange: (value: string) => void;
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
        <EditorQill value={value} onChange={onChange} />
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
