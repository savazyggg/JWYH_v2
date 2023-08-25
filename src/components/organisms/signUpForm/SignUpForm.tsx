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
import IdInput from "../../molecules/IdInput";
import PasswordInput from "../../molecules/PasswordInput";
// import Stack from "@mui/material/Stack";

export default function SignUpForm() {
  const navigate = useNavigate();
  const exsistErMsg = "이미 존재하는 아이디 입니다.";
  const [isIdError, setIsIdError] = useState(false);
  const [erMsg, setErMsg] = useState("");
  const [idValue, setIdValue] = useState<string>("");
  const [nickValue, setNickValue] = useState<string>("");
  const [pwValue, setPwValue] = useState<string>("");
  const [pwcValue, setPwcValue] = useState<string>("");

  const idInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdValue(() => {
      const eventValue = e.target.value;
      if (isIdGood(eventValue)) {
        setIsIdError(false);
      } else {
        setIsIdError(true);
      }
      return eventValue;
    });
  };

  const passwordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwValue(() => {
      const eventValue = e.target.value;
      if (isPwGood(eventValue)) {
        setIsIdError(false);
      } else {
        setIsIdError(true);
      }
      return eventValue;
    });
  };
  const [showPasswordChk, setShowPasswordChk] = useState(false);
  const handleClickShowPasswordChk = () => setShowPasswordChk((show) => !show);
  const handleMouseDownPasswordChk = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const isPwGood = (pw: string): boolean => {
    const regxPw = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[a-zA-Z\d@#$%^&+=]{8,}$/
    );
    return regxPw.test(pw);
  };
  const isIdGood = (id: string): boolean => {
    const regxId = new RegExp(/^(?=.*[a-z])(?=.*\d)[a-z\d]{6,12}$/);
    return regxId.test(id);
  };
  const handleSignUp = async (e: any) => {
    e.preventDefault();
    //값이 비어있는지 확인
    if (pwValue.length === 0) {
      setErMsg("비밀번호 값이 존재 하지 않습니다.");
      setIsIdError(true);
      return;
    }
    if (pwcValue.length === 0) {
      setErMsg("비밀번호 확인 값이 존재 하지 않습니다.");
      setIsIdError(true);
      return;
    }

    if (isPwGood(pwValue) === false) {
      setErMsg(
        "비밀 번호를 *()!을 제외한 영문 대소문자, 숫자, 특수문자 포함 8자리 이상 입력해주세요"
      );
      setIsIdError(true);
      return;
    }
    if (isPwGood(pwcValue) === false) {
      setErMsg(
        "비밀 번호를 *()!을 제외한 영문 대소문자, 숫자, 특수문자 포함 8자리 이상 입력해주세요"
      );
      setIsIdError(true);
      return;
    }

    if (isIdGood(idValue) === false) {
      setErMsg("아이디는 영문 소문자, 숫자 6~12 입력 해주세요");
      setIsIdError(true);
      return;
    }
    if ((pwValue === pwcValue) === false) {
      setErMsg("비밀번호와 비밀번호 확인 값이 다릅니다");
      setIsIdError(true);
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
        setIsIdError(true);
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
      <IdInput
        isIdError={isIdError}
        idValue={idValue}
        idInputChange={idInputChange}
      >
        영문 소문자, 숫자 6~12 입력 해주세요
      </IdInput>
      <FormControl sx={{ width: "100%" }} variant="outlined" error={isIdError}>
        <InputLabel htmlFor="nickname">닉네임</InputLabel>
        <OutlinedInput
          id="nickname"
          type="text"
          value={nickValue}
          aria-describedby="Nick-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNickValue(() => {
              const eventValue = e.target.value;
              if (eventValue.length === 0) {
                setErMsg("닉네임 값이 존재 하지 않습니다.");
                setIsIdError(true);
              } else {
                setIsIdError(false);
              }
              return eventValue;
            });
          }}
          label="닉네임"
        />
      </FormControl>
      <PasswordInput
        isPwError={isIdError}
        pwErMsg={erMsg}
        pwValue={pwValue}
        passwordInputChange={passwordInputChange}
      >
        *()!을 제외한 영문 대소문자, 숫자, 특수문자 포함 8자리 이상 입력해주세요
      </PasswordInput>

      <FormControl error={isIdError} sx={{ width: "100%" }} variant="outlined">
        <InputLabel htmlFor="passwordChk">비밀번호 확인</InputLabel>
        <OutlinedInput
          id="passwordChk"
          type={showPasswordChk ? "text" : "password"}
          value={pwcValue}
          aria-describedby="passwordChk-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPwcValue(() => {
              const eventValue = e.target.value;
              if (isPwGood(eventValue)) {
                setIsIdError(false);
              } else {
                setIsIdError(true);
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
        disabled={isIdError}
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
