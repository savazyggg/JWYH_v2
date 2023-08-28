import * as React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import { LoginData, login } from "../../../apis/loginApi";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

//리코일

import IdInput from "../../molecules/IdInput";
import PasswordInput from "../../molecules/PasswordInput";
import { GoogleLoginButton } from "../../atoms/GoogleLoginButton";
import RecoilInit from "../../atoms/RecoilInit";

export default function LoginForm() {
  const [idValue, setIdValue] = useState<string>("");
  const [isIdError, setIdIsError] = useState(false);
  const [pwValue, setPwValue] = useState<string>("");
  const [isPwError, setPwIsError] = useState(false);
  const [pwErMsg, _setPwErMsg] = useState("로그인 실패!!");

  const idInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdIsError(false);
    setIdValue(e.target.value);
  };
  const passwordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwIsError(false);
    setPwValue(e.target.value);
  };

  const googleLoginRecoil = (data) => RecoilInit(data);
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const URL = "https://kdt-sw-4-team14.elicecoding.com";
    const data: LoginData = {
      userId: idValue,
      password: pwValue,
    };

    await login(URL, data)
      .then((res) => {
        if (res.ok === false) {
          setIdIsError(true);
          setPwIsError(true);
          throw new Error("로그인 실패");
        }
        return res.json();
      })
      .then((data) => {
        RecoilInit(data);
        navigate("/main");
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
      <IdInput
        isIdError={isIdError}
        idValue={idValue}
        idInputChange={idInputChange}
      />
      <PasswordInput
        isPwError={isPwError}
        pwErMsg={pwErMsg}
        pwValue={pwValue}
        passwordInputChange={passwordInputChange}
      >
        {isPwError && pwErMsg}
      </PasswordInput>
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
          <GoogleLoginButton googleLoginRecoil={googleLoginRecoil} />
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
    </div>
  );
}
