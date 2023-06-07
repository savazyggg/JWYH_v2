import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SignUpForm from "../../components/organisms/signUpForm/SignUpForm";
import Stack from "@mui/material/Stack";
function SignUpPage() {
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
            회원가입!!"
          </Typography>
          <SignUpForm />
        </Stack>
      </Container>
    </>
  );
}

export default SignUpPage;
