import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const Greetings = styled.label`
  font-size: 50px;
`;

const Intro = () => {
  return (
    <>
      <Greetings>만나서 반가워요!</Greetings>
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#cfe8fc", width: "360px", height: "360px" }}>
          <span>편지</span>
        </Box>
      </Container>
      <Button>로그인</Button>
      <Button>회원가입</Button>
    </>
  );
};

export default Intro;
