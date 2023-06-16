// import { useEffect, useState } from "react";
// import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AcntUpdForm from "../../components/organisms/acntUpdForm/AcntUpdForm";
import Stack from "@mui/material/Stack";
import Header from "../../components/organisms/header/Header";
import { createTheme, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";
// import jwt_decode from "jwt-decode";

import { useRecoilState } from "recoil";
import { isLoginedState } from "../../recoilStore";

// interface JwtDecoded {
//   id: string;
//   nickName: string;
//   objectId: string;
// }
function AcntUpdPage() {
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
  const [isLogined, _setIsLogined] = useRecoilState(isLoginedState);

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
          <Stack spacing={2}>
            <Header></Header>
            {isLogined && <AcntUpdForm />}
            <Link
              style={{
                color: "white",
                display: "flex",
                justifyContent: "flex-end",
              }}
              to="/main"
            >
              메인 페이지로 돌아가기
            </Link>
          </Stack>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default AcntUpdPage;
