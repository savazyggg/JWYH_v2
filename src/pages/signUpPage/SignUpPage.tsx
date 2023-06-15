import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SignUpForm from "../../components/organisms/signUpForm/SignUpForm";
import Stack from "@mui/material/Stack";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#93ba7b",
    },
  },
  components: {
    // Name of the component ⚛️
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#fff",
          backgroundColor: "#3f3f3f",
        },
      },
    },
  },
});
function SignUpPage() {
  return (
    <>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </>
  );
}

export default SignUpPage;
