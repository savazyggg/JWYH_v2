import React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

const IdInput = ({ isIdError, idValue, idInputChange }) => {
  return (
    <FormControl error={isIdError} sx={{ width: "100%" }} variant="outlined">
      <InputLabel htmlFor="identification">아이디</InputLabel>
      <OutlinedInput
        id="identification"
        type="text"
        value={idValue}
        aria-describedby="id-input"
        onChange={idInputChange}
        label="아이디"
      />
      <FormHelperText></FormHelperText>
    </FormControl>
  );
};

export default IdInput;
