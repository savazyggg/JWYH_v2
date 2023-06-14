import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
// import Link from "@mui/material/Link";
import { register, SingUpData } from "../../../apis/registerApi";
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AcntAlertModal from "../acntAlertModal/AcntAlertModal";
import { func, string } from "prop-types";
import { PatchAcnt, PatchAcntBody } from "../../../apis/patchAcnt";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface JwtDecoded {
  id: string;
  nickName: string;
  objectId: string;
}
interface AcntUpdFormProps {
  token: JwtDecoded;
  jwt: string;
}
export default function AcntUpdForm(props: AcntUpdFormProps) {
  const { token, jwt } = props;
  const { id, nickName, objectId } = token;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [isDel, setIsDel] = useState(false);

  const [isPwError, setIsPwError] = useState(false);
  const [isPwcError, setIsPwcError] = useState(false);

  const [nickValue, setNickValue] = useState<string>(nickName);
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
  const url = "http://34.64.195.153:5000";
  const handleAcntDel = () => {
    console.log("del");
  };
  const handleAcntUpd = async () => {
    const body: PatchAcntBody = {
      nickName: nickValue,
      password: pwValue,
    };
    try {
      await PatchAcnt(url, jwt, id, body);
      console.log("upd");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack spacing={2}>
      <FormControl sx={{ width: "100%" }} variant="outlined">
        <InputLabel htmlFor="nickname">닉네임</InputLabel>
        <OutlinedInput
          id="nickname"
          type="text"
          value={nickValue}
          aria-describedby="Nick-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNickValue(e.target.value);
          }}
          label="닉네임"
        />
      </FormControl>
      <FormControl error={isPwError} sx={{ width: "100%" }} variant="outlined">
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
                setIsPwError(false);
                return eventValue;
              } else {
                setIsPwError(true);
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
        <FormHelperText>
          *()!을 제외한 영문 대소문자, 숫자, 특수문자 포함 8자리 이상 입력
          해주세요
        </FormHelperText>
      </FormControl>
      <FormControl
        error={isPwError || isPwcError}
        sx={{ width: "100%" }}
        variant="outlined"
      >
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
                setIsPwcError(false);
              } else {
                setIsPwcError(true);
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
        <FormHelperText>
          {(isPwError || isPwcError) && "비밀번호가 맞지 않습니다"}
        </FormHelperText>
      </FormControl>
      <Button
        onClick={() => {
          setIsDel(false);
          setIsModalOpen(true);
          setModalMsg("수정 하시겠습니까?");
        }}
        type="button"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isPwError || isPwcError}
      >
        수정
      </Button>
      <Button
        onClick={() => {
          setIsDel(true);
          setIsModalOpen(true);
          setModalMsg("삭제 하시겠습니까?");
        }}
        type="button"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isPwError || isPwcError}
        color="error"
      >
        계정 삭제
      </Button>
      <AcntAlertModal
        modalMsg={modalMsg}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handler={isDel ? handleAcntDel : handleAcntUpd}
        // handler={handleAcntUpd}
      ></AcntAlertModal>
    </Stack>
  );
}
