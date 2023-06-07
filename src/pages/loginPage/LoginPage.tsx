import { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoginForm from "../../components/organisms/loginForm/LoginForm";
import Stack from "@mui/material/Stack";
function LoginPage() {
  return (
    <>
      <Container
        maxWidth="sm"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Stack direction={"column"} spacing={2}>
          <Typography
            sx={{ width: "100%" }}
            component="h1"
            variant="h4"
            style={{ color: "#93BA7B" }}
          >
            로그인 페이지!!"
          </Typography>
          <LoginForm />
        </Stack>
      </Container>
    </>
  );
}

export default LoginPage;
