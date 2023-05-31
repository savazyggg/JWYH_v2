import { useState } from "react";
import styled from "@emotion/styled";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import "./App.css";

const Greetings = styled.label`
  font-size: 50px;
`;

function App() {
  return (
    <>
      <Greetings>만나서 반가워요!</Greetings>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#cfe8fc", width: "360px", height: "360px" }}>
          <span>편지</span>
        </Box>
      </Container>
      <Button>로그인</Button>
      <Button>회원가입</Button>
    </>
  );
}

export default App;
