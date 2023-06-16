import { Container } from "@mui/material";
import styled from "@emotion/styled";
import EditorQill from "./EditorQuill";
interface Props {
  value: string;
  onChange: (value: string) => void;
  letterStyle: string;
}

const LetterSpace: React.FC<Props> = ({ value, onChange, letterStyle }) => {
  return (
    <Container>
      <Letter
        style={{
          backgroundColor: letterStyle,
        }}
      >
        <EditorQill
          value={value}
          onChange={onChange}
          letterStyle={letterStyle}
        />
      </Letter>
    </Container>
  );
};

export default LetterSpace;

const Letter = styled.div`
  margin: 61px auto 10px;
  width: 70%;
  height: 80vh;
  border-radius: 15px;
`;
