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
import Grid from "@mui/material/Grid";
import jwt_decode from "jwt-decode";

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
  const [idErMsg, setIdErMsg] = useState("id Error");
  const [pwValue, setPwValue] = useState<string>("");
  const [isPwError, setPwIsError] = useState(false);
  const [pwErMsg, setPwErMsg] = useState("로그인 실패!!");
  const [showPassword, setShowPassword] = useState(false);

  //리코일
  const [recoilIsLogined, setRecoilIsLogined] = useRecoilState(isLoginedState);
  const [recoilUniqueId, setRecoilUniqueId] = useRecoilState(uniqueIdState);
  const [recoilUserId, setRecoilUserId] = useRecoilState(userIdState);
  const [recoilNickName, setRecoilNickName] = useRecoilState(nickNameState);
  const [recoilJwtString, setRecoilJwtString] = useRecoilState(jwtStringState);
  const [recoilProvider, setRecoilProvider] = useRecoilState(providerState);

  //리코일

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
    const url = "http://34.64.195.153:5000";
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
        }
        const decoded: JwtDecoded = jwt_decode(jwtParsed.token);
        const { id, nickName, objectId } = decoded;
        setRecoilUniqueId(objectId);
        setRecoilUserId(id);
        setRecoilNickName(nickName);
        setRecoilProvider("");
        //리코일

        navigate("/main");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Stack spacing={2} sx={{ minWidth: "440px" }}>
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
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Button
            sx={{ width: "100%" }}
            type="button"
            variant="contained"
            onClick={handleLogin}
          >
            로그인
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Link
            style={{ width: "100%" }}
            to={googleUrl + "/login/federated/google"}
          >
            <Button sx={{ width: "100%" }} type="button" variant="contained">
              구글 로그인
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Stack sx={{}}>
            <Link
              style={{
                display: "flex",
                justifyContent: "flex-end",
                color: "white",
                width: "100%",
              }}
              to="/signup"
            >
              회원 가입 하러 가기
            </Link>
            {/* <Link
              style={{
                display: "flex",
                justifyContent: "flex-end",
                color: "white",
                width: "100%",
              }}
              to="/findpwpage"
            >
              비밀번호 찾기
            </Link> */}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
