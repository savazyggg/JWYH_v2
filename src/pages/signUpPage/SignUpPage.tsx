import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SignUpForm from "../../components/organisms/signUpForm/SignUpForm";
function SignUpPage() {
  return (
    <>
      <Container
        maxWidth="sm"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Typography component="h1" variant="h4" style={{ color: "#93BA7B" }}>
          회원가입!!"
        </Typography>
      </Container>
      <SignUpForm />
    </>
  );
}

export default SignUpPage;
