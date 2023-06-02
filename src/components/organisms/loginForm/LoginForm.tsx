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

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

interface LoginFormProps {
  greetings: string;
  setGreetings: React.Dispatch<React.SetStateAction<string>>;
}
export default function LoginForm(props: LoginFormProps) {
  const { greetings, setGreetings } = props;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  useEffect(() => {
    setGreetings("로그인");
  }, []);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = "http://127.0.0.1:3033";
    localStorage.setItem("jwt", JSON.stringify(await login(url, formData)));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Stack>
            <Grid>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-userId">
                  아이디
                </InputLabel>
                <OutlinedInput
                  id="userId"
                  name="userId"
                  type="text"
                  label="아이디"
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
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
              </FormControl>
            </Grid>
          </Stack>
          <Button type="submit" fullWidth variant="contained">
            로그인
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
