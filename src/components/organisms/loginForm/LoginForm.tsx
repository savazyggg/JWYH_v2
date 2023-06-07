import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { LoginData, login } from "../../../apis/loginApi";

export default function LoginForm() {
  const [idValue, setIdValue] = useState<string>("");
  const [pwValue, setPwValue] = useState<string>("");
  // const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //TODO FormData 말고 interface 받아서 하기
    console.log("logined");
    const url = "http://34.64.195.153:5000";
    const data: LoginData = {
      userId: idValue,
      password: pwValue,
    };
    const jwt = JSON.stringify(await login(url, data));
    localStorage.setItem("jwt", jwt);
  };
  return (
    <Stack>
      <TextField
        id="identification"
        label="아이디"
        variant="outlined"
        helperText="Some important text"
        color="primary"
        value={idValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIdValue(e.target.value);
        }}
      />
      <TextField
        id="password"
        label="비밀번호"
        variant="outlined"
        helperText="Some important text"
        value={pwValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPwValue(e.target.value);
        }}
      />
      <Button
        sx={{ width: "100%" }}
        type="button"
        variant="contained"
        onClick={handleSubmit}
      >
        로그인
      </Button>
    </Stack>
  );
}
