import { Container } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";

const Letter = styled.div`
  margin: 0 auto;
  width: 800px;
  height: 80vh;
  background-color: #a27bba;
  border-radius: 15px;
`;

const Textarea = styled.textarea`
  visibility: visible;
  background-color: transparent;
  width: 800px;
  height: 80vh;
  color: black;
  z-index: 16;
  border: none;
`;

const LetterSpace = () => {
  const [letter, setLetter] = useState("");

  const onChange = (e) => {
    setLetter(e.target.value);
  };

  return (
    <Container>
      <Letter>
        <Textarea onChange={onChange} value={letter}></Textarea>
      </Letter>
    </Container>
  );
};

export default LetterSpace;
