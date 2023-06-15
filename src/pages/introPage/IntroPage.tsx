import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Box, Stack, ThemeProvider, createTheme } from "@mui/material";
import EnvelopeIntro from "../../components/organisms/envelopeIntro/EnvelopeIntro";
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
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Stack gap={3} direction={"column"}>
            <Box
              sx={{ width: "100%" }}
              style={{
                color: "#93BA7B",
                fontWeight: "900",
                letterSpacing: "-16px",
                marginBottom: "160px",
                lineHeight: "0.9",
              }}
            >
              JWYH
              <Box
                sx={{ width: "100%" }}
                style={{
                  color: "#fff",
                  fontWeight: "400",
                  letterSpacing: "-1px",
                  lineHeight: "0px",
                }}
              >
                you will be Happy
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "end",
                width: "100%",
                height: "100%",
              }}
            >
              <EnvelopeIntro></EnvelopeIntro>
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
