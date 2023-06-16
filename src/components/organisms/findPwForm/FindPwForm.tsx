import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
// import { FindPwData, postPwReset } from "../../../apis/postPwReset";
import { FindPwData } from "../../../apis/postPwReset";

export default function FindPwForm() {
  // const navigate = useNavigate();
  const [isIdError, _setIsIdError] = useState(false);
  const [idErrorMsg, _setIdErrorMsg] = useState("아이디가 존재 하지 않습니다");
  // const [isNickError, setIsNickError] = useState(false);
  // const [NickErrorMsg, setNickErrorMsg] =
  //   useState("닉네임이 존재 하지 않습니다");
  const [idValue, setIdValue] = useState<string>("");
  const [nickValue, setNickValue] = useState<string>("");
  // const url = "https://kdt-sw-4-team14.elicecoding.com";
  const handleFindPw = async () => {
    const data: FindPwData = {
      userId: idValue,
      nickName: nickValue,
    };
    console.log("", data);
    // const newPw = await postPwReset(url, data);
    console.log("비밀번호 찾기 눌림");
  };
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
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2}>
        <FormControl
          error={isIdError}
          sx={{ width: "100%" }}
          variant="outlined"
        >
          <InputLabel htmlFor="identification">아이디</InputLabel>
          <OutlinedInput
            id="identification"
            type="text"
            value={idValue}
            aria-describedby="id-input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setIdValue(() => {
                const eventValue = e.target.value;
                return eventValue;
              });
            }}
            label="아이디"
          />
          <FormHelperText>{idErrorMsg}</FormHelperText>
        </FormControl>
        <FormControl sx={{ width: "100%" }} variant="outlined">
          <InputLabel htmlFor="nickname">닉네임</InputLabel>
          <OutlinedInput
            id="nickname"
            type="text"
            value={nickValue}
            aria-describedby="Nick-input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNickValue(e.target.value);
            }}
            label="닉네임"
          />
        </FormControl>
        <Button
          onClick={handleFindPw}
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          비밀번호 찾기
        </Button>
        <Link
          style={{
            display: "flex",
            justifyContent: "flex-end",
            color: "white",
            width: "100%",
          }}
          to="/login"
        >
          로그인 하러 가기
        </Link>
      </Stack>
    </ThemeProvider>
  );
}
