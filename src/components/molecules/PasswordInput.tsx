import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";

import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PasswordInput = ({
  isPwError,
  pwErMsg,
  pwValue,
  passwordInputChange,
  children,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <FormControl error={isPwError} sx={{ width: "100%" }} variant="outlined">
      <InputLabel htmlFor="password">비밀번호</InputLabel>
      <OutlinedInput
        id="password"
        type={showPassword ? "text" : "password"}
        value={pwValue}
        aria-describedby="password-input"
        onChange={passwordInputChange}
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
      <FormHelperText>{children}</FormHelperText>
    </FormControl>
  );
};

export default PasswordInput;
