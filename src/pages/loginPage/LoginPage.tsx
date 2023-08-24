import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoginForm from "../../components/organisms/loginForm/LoginForm";
import Stack from "@mui/material/Stack";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { theme as design } from "../../common/core";

const theme = createTheme({
  palette: {
    primary: {
      main: design.green,
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
          backgroundColor: design.bg,
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
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Stack sx={{ paddingTop: "50px" }} direction={"column"} spacing={2}>
            <Typography
              sx={{ width: "100%" }}
              component="h1"
              variant="h4"
              style={{ color: design.green, fontWeight: "900" }}
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
