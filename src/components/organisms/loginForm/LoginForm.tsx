import * as React from "react";
import Button from "@mui/material/Button";
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
import Grid from "@mui/material/Grid";
import jwt_decode from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
//리코일
import { useRecoilState } from "recoil";
import {
  isLoginedState,
  jwtStringState,
  uniqueIdState,
  userIdState,
  nickNameState,
  providerState,
} from "../../../recoilStore";
//리코일

export default function LoginForm() {
  const [idValue, setIdValue] = useState<string>("");
  const [isIdError, setIdIsError] = useState(false);
  const [pwValue, setPwValue] = useState<string>("");
  const [isPwError, setPwIsError] = useState(false);
  const [pwErMsg, _setPwErMsg] = useState("로그인 실패!!");
  const [showPassword, setShowPassword] = useState(false);

  //리코일
  const [recoilIsLogined, setRecoilIsLogined] = useRecoilState(isLoginedState);
  const [_recoilUniqueId, setRecoilUniqueId] = useRecoilState(uniqueIdState);
  const [_recoilUserId, setRecoilUserId] = useRecoilState(userIdState);
  const [_recoilNickName, setRecoilNickName] = useRecoilState(nickNameState);
  const [_recoilJwtString, setRecoilJwtString] = useRecoilState(jwtStringState);
  const [_recoilProvider, setRecoilProvider] = useRecoilState(providerState);

  //리코일

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const setRecoilInit = (data: any) => {
    //레거시
    const jwt = JSON.stringify(data);
    const jwtParsed = JSON.parse(jwt);
    localStorage.setItem("jwt", jwt);
    //레거시 todo 리코일에서 jwtString 사용으로  바꿔야함

    //리코일
    setRecoilIsLogined(!recoilIsLogined);
    setRecoilJwtString(jwtParsed.token);
    interface JwtDecoded {
      id: string;
      nickName: string;
      objectId: string;
      iat: number;
      provider: string;
    }
    const decoded: JwtDecoded = jwt_decode(jwtParsed.token);
    const { id, nickName, objectId, provider } = decoded;
    setRecoilUniqueId(objectId);
    setRecoilUserId(id);
    setRecoilNickName(nickName);
    setRecoilProvider(provider);

    //리코일

    navigate("/main");
  };

  const googleSocialLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const response = await axios.post(
          "https://kdt-sw-4-team14.elicecoding.com/api/auth/google/callback",
          { code: codeResponse.code }
        );
        console.log(response.data);
        setRecoilInit(response.data);
        // Handle the response from the backend
      } catch (error) {
        alert("로그인 실패!!!");
        console.log(error);
        // Handle the error
      }
    },
    onError: (errorResponse) => {
      alert("로그인 실패!!!");
      console.log(errorResponse);
    },
    flow: "auth-code",
  });
  const navigate = useNavigate();
  const handleLogin = async (e: any) => {
    e.preventDefault();
    const url = "https://kdt-sw-4-team14.elicecoding.com";
    const data: LoginData = {
      userId: idValue,
      password: pwValue,
    };

    await login(url, data)
      .then((res) => {
        if (res.ok === false) {
          setIdIsError(true);
          setPwIsError(true);
          throw new Error("로그인 실패");
        }
        return res.json();
      })
      .then((data) => {
        setRecoilInit(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      style={{
        display: "grid",
        minWidth: "500px",
        minHeight: "500px",
        gridTemplateRows: "56px 56px 0px 40px",
        gridGap: "25px",
      }}
    >
      <FormControl error={isIdError} sx={{ width: "100%" }} variant="outlined">
        <InputLabel htmlFor="identification">아이디</InputLabel>
        <OutlinedInput
          id="identification"
          type="text"
          value={idValue}
          aria-describedby="id-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIdIsError(false);
            setIdValue(e.target.value);
          }}
          label="아이디"
        />
        <FormHelperText></FormHelperText>
      </FormControl>
      <FormControl error={isPwError} sx={{ width: "100%" }} variant="outlined">
        <InputLabel htmlFor="password">비밀번호</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          value={pwValue}
          aria-describedby="password-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPwIsError(false);
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
        <FormHelperText>{isPwError && pwErMsg}</FormHelperText>
      </FormControl>
      <div></div>
      <Grid container rowSpacing={1} justifyContent={"center"}>
        <Grid item xs={6} padding={"8px"}>
          <Button
            sx={{ width: "100%" }}
            type="button"
            variant="contained"
            onClick={handleLogin}
          >
            로그인
          </Button>
        </Grid>
        <Grid padding={"8px"} item xs={6}>
          <Button
            sx={{ width: "100%" }}
            type="button"
            variant="contained"
            onClick={googleSocialLogin}
          >
            구글 로그인
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Link
            style={{
              padding: "8px",
              display: "flex",
              justifyContent: "flex-end",
              color: "white",
              width: "100%",
            }}
            to="/signup"
          >
            회원 가입 하러 가기
          </Link>
        </Grid>
      </Grid>
      {/* // </Stack> */}
    </div>
  );
}
