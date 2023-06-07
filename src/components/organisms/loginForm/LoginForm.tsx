import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import login from "../../../apis/loginApi";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import TextField from "@mui/material/TextField";

export default function LoginForm() {
  const [idValue, setIdValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        value={idValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIdValue(e.target.value);
        }}
      />
      <Button sx={{ width: "100%" }} type="button" variant="contained">
        로그인
      </Button>
    </Stack>
  );
}
