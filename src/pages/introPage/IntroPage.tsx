import { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SignUpForm from "../../components/organisms/signUpForm/SignUpForm";
import LoginForm from "../../components/organisms/loginForm/LoginForm";

function IntroPage() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [greetings, setGreetings] = useState<string>("만나서 반가워요!!");
  return (
    <>
      <Container
        maxWidth="sm"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Typography component="h1" variant="h4">
          {greetings}
        </Typography>
      </Container>

      {isLogin || isSignUp ? null : (
        <>
          <Container
            maxWidth="sm"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img src="https://dummyimage.com/400x400/bababa/000000"></img>
          </Container>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  setIsLogin(!isLogin);
                }}
              >
                로그인
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  setIsSignUp(!isSignUp);
                }}
              >
                회원가입
              </Button>
            </Grid>
          </Grid>
        </>
      )}
      <>
        {isSignUp ? (
          <SignUpForm
            greetings={greetings}
            setGreetings={setGreetings}
            isSignUp={isSignUp}
            setIsSignUp={setIsSignUp}
          />
        ) : null}
        {isLogin ? (
          <LoginForm greetings={greetings} setGreetings={setGreetings} />
        ) : null}
      </>
    </>
  );
}

export default IntroPage;
