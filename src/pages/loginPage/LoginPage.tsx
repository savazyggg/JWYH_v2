import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoginForm from "../../components/organisms/loginForm/LoginForm";
import Stack from "@mui/material/Stack";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
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
    MuiGrid: {
      styleOverrides: {
        root: {
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        },
      },
    },
  },
});

function LoginPage() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          maxWidth="sm"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Stack sx={{ paddingTop: "50px" }} direction={"column"} spacing={2}>
            <Typography
              sx={{ width: "100%" }}
              component="h1"
              variant="h4"
              style={{ color: "#93BA7B" }}
            >
              로그인
            </Typography>
            <LoginForm />
          </Stack>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default LoginPage;
