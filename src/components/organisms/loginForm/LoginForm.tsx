import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { LoginData, login } from "../../../apis/loginApi";
import { Link, useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";

import { useRecoilState } from "recoil";
import { isLoginedState } from "../../../recoilStore";

export default function LoginForm() {
  const [idValue, setIdValue] = useState<string>("");
  const [isIdError, setIdIsError] = useState(true);
  const [idErMsg, setIdErMsg] = useState("id Error");
  const [pwValue, setPwValue] = useState<string>("");
  const [isPwError, setPwIsError] = useState(true);
  const [pwErMsg, setPwErMsg] = useState("pw Error");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogined, setIsLogined] = useRecoilState(isLoginedState);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const googleUrl = "http://localhost:3000";
  const navigate = useNavigate();
  const handleLogin = async (e: any) => {
    e.preventDefault();
    console.log("logined");
    const url = "http://34.64.195.153:5000";
    const data: LoginData = {
      userId: idValue,
      password: pwValue,
    };
    const jwt = JSON.stringify(await login(url, data));
    localStorage.setItem("jwt", jwt);
    setIsLogined(!isLogined);
    navigate("/main");
  };

  return (
    <Stack spacing={2}>
      <FormControl error={isIdError} sx={{ width: "100%" }} variant="outlined">
        <InputLabel htmlFor="identification">아이디</InputLabel>
        <OutlinedInput
          id="identification"
          type="text"
          value={idValue}
          aria-describedby="id-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIdValue(e.target.value);
          }}
          label="아이디"
        />
        <FormHelperText>{idErMsg}</FormHelperText>
      </FormControl>
      <FormControl error={isPwError} sx={{ width: "100%" }} variant="outlined">
        <InputLabel htmlFor="password">비밀번호</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          value={pwValue}
          aria-describedby="password-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPwValue(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="비밀번호"
        />
        <FormHelperText>{pwErMsg}</FormHelperText>
      </FormControl>
      <Button
        sx={{ width: "100%" }}
        type="button"
        variant="contained"
        onClick={handleLogin}
      >
        로그인
      </Button>
      <Link
        style={{ width: "100%" }}
        to={googleUrl + "/login/federated/google"}
      >
        <Button sx={{ width: "100%" }} type="button" variant="contained">
          구글 로그인
        </Button>
      </Link>
    </Stack>
  );
}
