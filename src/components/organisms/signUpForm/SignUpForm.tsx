import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
// import Link from "@mui/material/Link";
import { register, SingUpData } from "../../../apis/registerApi";
import { Link, useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
// import Stack from "@mui/material/Stack";

export default function SignUpForm() {
  const navigate = useNavigate();
  const defaultIdErMsg = "영문 소문자, 숫자 6~12 입력 해주세요";
  const exsistErMsg = "이미 존재하는 아이디 입니다.";
  const [isError, setIsError] = useState(false);
  const [erMsg, setErMsg] = useState("");
  const [idValue, setIdValue] = useState<string>("");
  const [nickValue, setNickValue] = useState<string>("");
  const [pwValue, setPwValue] = useState<string>("");
  const [pwcValue, setPwcValue] = useState<string>("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordChk, setShowPasswordChk] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleClickShowPasswordChk = () => setShowPasswordChk((show) => !show);
  const handleMouseDownPasswordChk = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleSignUp = async (e: any) => {
    e.preventDefault();
    console.log("SignUp Clicked");
    console.log(idValue.length);
    if (idValue.length === 0) {
      setErMsg("아이디 값이 존재 하지 않습니다.");
      setIsError(true);
      return;
    }
    if (nickValue.length === 0) {
      setErMsg("닉네임 값이 존재 하지 않습니다.");
      setIsError(true);
      return;
    }
    if (pwValue.length === 0) {
      setErMsg("비밀번호 값이 존재 하지 않습니다.");
      setIsError(true);
      return;
    }
    if (pwcValue.length === 0) {
      setErMsg("비밀번호 확인 값이 존재 하지 않습니다.");
      setIsError(true);
      return;
    }
    const data: SingUpData = {
      userId: idValue,
      nickName: nickValue,
      password: pwValue,
    };
    const url = "https://kdt-sw-4-team14.elicecoding.com";
    await register(url, data).then((res) => {
      if (res.ok) {
        navigate("/login");
      } else {
        setIsError(true);
        setErMsg(exsistErMsg);
      }
    });
  };

  return (
    // <Stack spacing={2}>
    <div
      style={{
        display: "grid",
        minWidth: "500px",
        minHeight: "500px",
        gridTemplateRows: "56px 56px 56px 56px 40px 40px",
        gridGap: "25px",
      }}
    >
      <FormControl error={isError} sx={{ width: "100%" }} variant="outlined">
        <InputLabel htmlFor="identification">아이디</InputLabel>
        <OutlinedInput
          id="identification"
          type="text"
          value={idValue}
          aria-describedby="id-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIsError(false);
            setIdValue(() => {
              const eventValue = e.target.value;
              const regxId = new RegExp(/^(?=.*[a-z])(?=.*\d)[a-z\d]{6,12}$/);
              const isValidId = regxId.test(eventValue);
              setErMsg(defaultIdErMsg);
              if (isValidId) {
                setIsError(false);
                setErMsg("");
              } else {
                setIsError(true);
              }
              return eventValue;
            });
          }}
          label="아이디"
        />
        <FormHelperText>{}</FormHelperText>
      </FormControl>
      <FormControl sx={{ width: "100%" }} variant="outlined" error={isError}>
        <InputLabel htmlFor="nickname">닉네임</InputLabel>
        <OutlinedInput
          id="nickname"
          type="text"
          value={nickValue}
          aria-describedby="Nick-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNickValue(e.target.value);
            setIsError(false);
            setErMsg("");
          }}
          label="닉네임"
        />
      </FormControl>
      <FormControl error={isError} sx={{ width: "100%" }} variant="outlined">
        <InputLabel htmlFor="password">비밀번호</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          value={pwValue}
          aria-describedby="password-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPwValue(() => {
              const eventValue = e.target.value;
              const regxPw = new RegExp(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[a-zA-Z\d@#$%^&+=]{8,}$/
              );
              const isValidPw = regxPw.test(eventValue);
              console.log(isValidPw);
              console.log(eventValue);
              if (isValidPw) {
                setIsError(false);
                setErMsg("");
                return eventValue;
              } else {
                setErMsg(
                  "*()!을 제외한 영문 대소문자, 숫자, 특수문자 포함 8자리 이상 입력해주세요"
                );
                setIsError(true);
              }
              return eventValue;
            });
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
        <FormHelperText>{}</FormHelperText>
      </FormControl>
      <FormControl error={isError} sx={{ width: "100%" }} variant="outlined">
        <InputLabel htmlFor="passwordChk">비밀번호 확인</InputLabel>
        <OutlinedInput
          id="passwordChk"
          type={showPasswordChk ? "text" : "password"}
          value={pwcValue}
          aria-describedby="passwordChk-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPwcValue(() => {
              const eventValue = e.target.value;
              const regxPw = new RegExp(pwValue);
              const isValidPwc = regxPw.test(eventValue);
              console.log(isValidPwc);
              console.log(eventValue);
              if (isValidPwc) {
                setIsError(false);
                setErMsg("");
              } else {
                setErMsg("비밀번호가 다릅니다");
                setIsError(true);
              }
              return eventValue;
            });
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle passwordChk visibility"
                onClick={handleClickShowPasswordChk}
                onMouseDown={handleMouseDownPasswordChk}
                edge="end"
              >
                {showPasswordChk ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="비밀번호"
        />
        <FormHelperText>{erMsg}</FormHelperText>
      </FormControl>
      <Button
        onClick={handleSignUp}
        type="button"
        fullWidth
        variant="contained"
        disabled={isError}
      >
        회원가입
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
      {/* // </Stack> */}
    </div>
  );
}
