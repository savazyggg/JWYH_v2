import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Box, Stack, ThemeProvider, createTheme } from "@mui/material";
import Envelope from "../../components/organisms/envelope/Envelope";
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
function IntroPage() {
  useEffect(() => {
    try {
      localStorage.removeItem("jwt");
    } catch (error) {
      console.log(error);
      console.log("jwt가 없습니다.");
    }
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container style={{ display: "flex", justifyContent: "center" }}>
          <Stack sx={{ paddingTop: "50px" }} gap={3} direction={"column"}>
            <Typography
              sx={{ width: "100%" }}
              component="h1"
              variant="h4"
              style={{ color: "#93BA7B" }}
            >
              만나서 반가워요!!
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "end",
                width: "100%",
                height: "420px",
              }}
            >
              <Envelope></Envelope>
              {/* <img
              style={{ width: "100%" }}
              src="https://dummyimage.com/400x400/bababa/000000"
            ></img> */}
            </Box>
            <Stack direction={"row"}>
              <Link style={{ width: "100%" }} to="/login">
                <Button sx={{ width: "90%" }} type="button" variant="contained">
                  로그인
                </Button>
              </Link>

              <Link style={{ width: "100%" }} to="/signup">
                <Button sx={{ width: "90%" }} type="button" variant="contained">
                  회원가입
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default IntroPage;
