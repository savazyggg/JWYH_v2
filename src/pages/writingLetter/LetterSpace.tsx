import { Container } from "@mui/material";
import styled from "@emotion/styled";
import LetterForm from "../../components/organisms/letterForm/LetterForm";

const LetterSpace = ({ value, onChange, letterStyle }) => {
  console.log("편지지컴포넌트에서 편지지색 :" + letterStyle);
  return (
    <Container>
      <Letter
        style={{
          backgroundColor: letterStyle ? letterStyle : "rgb(186, 138, 123)",
        }}
      >
        <LetterForm value={value} onChange={onChange} />
      </Letter>
    </Container>
  );
};

export default LetterSpace;

const Letter = styled.div<{ letterStyle: string }>`
  margin: 0 auto;
  width: 800px;
  height: 80vh;
  border-radius: 15px;
  overflow: auto;
`;
