import { Container } from "@mui/material";
import styled from "@emotion/styled";

const LetterSpace = ({ required, value, onChange, letterStyle }) => {
  console.log("편지지컴포넌트에서 편지지색 :" + letterStyle);

  return (
    <Container>
      <Letter
        style={{
          backgroundColor: letterStyle ? letterStyle : "rgb(186, 138, 123)",
        }}
      >
        <Textarea
          required={required}
          onChange={onChange}
          value={value}
        ></Textarea>
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

const Textarea = styled.textarea`
  visibility: visible;
  font-size: 20px;
  background-color: transparent;
  margin-top: 80px;
  width: 700px;
  height: 60vh;
  color: black;
  z-index: 16;
  border: none;
  :focus-visible {
    outline: 0px;
  }
`;
