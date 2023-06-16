import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
// import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Stack from "@mui/material/Stack";

import AcntAlertModal from "../acntAlertModal/AcntAlertModal";
import { patchAcnt, PatchAcntBody } from "../../../apis/patchAcnt";
import { useRecoilState } from "recoil";
import {
  nickNameState,
  providerState,
  userIdState,
  jwtStringState,
} from "../../../recoilStore";
import { delAcnt } from "../../../apis/delAcnt";

export default function AcntUpdForm() {
  // const [isLogined, setIsLogined] = useRecoilState(isLoginedState);
  const [userId, _setUserId] = useRecoilState(userIdState);
  const [nickName, setNickName] = useRecoilState(nickNameState);
  const [jwtString, _setJwtString] = useRecoilState(jwtStringState);
  const [provider, _setProvider] = useRecoilState(providerState);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [isDel, setIsDel] = useState(false);

  const [isError, setIsError] = useState(false);

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

  const isPwGood = (pw: string): boolean => {
    const regxPw = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[a-zA-Z\d@#$%^&+=]{8,}$/
    );
    return regxPw.test(pw);
  };
  const handleClickShowPasswordChk = () => setShowPasswordChk((show) => !show);
  const handleMouseDownPasswordChk = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const url = "https://kdt-sw-4-team14.elicecoding.com";
  const handleAcntDel = async () => {
    try {
      await delAcnt(url, jwtString, userId);
      navigate("/main");
      console.log("del");
    } catch (error) {
      console.error(error);
    }
  };
  const handleAcntUpd = async () => {
    const body: PatchAcntBody = {
      nickName: nickValue,
      password: pwValue,
    };
    try {
      await patchAcnt(url, jwtString, userId, body);
      setNickName(nickValue);
      navigate("/main");
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
            setIsError(false);
            setNickValue(e.target.value);
          }}
          label="닉네임"
        />
      </FormControl>
      {provider === "local" && (
        <>
          <FormControl
            error={isError}
            sx={{ width: "100%" }}
            variant="outlined"
          >
            <InputLabel htmlFor="password">비밀번호</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              value={pwValue}
              aria-describedby="password-input"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPwValue(() => {
                  const eventValue = e.target.value;
                  if (isPwGood(eventValue)) {
                    setIsError(false);
                  } else {
                    setIsError(true);
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
            error={isError}
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
                  if (isPwGood(eventValue)) {
                    setIsError(false);
                  } else {
                    setIsError(true);
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
              {isError && "비밀번호가 맞지 않습니다"}
            </FormHelperText>
          </FormControl>
        </>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "210px 210px",
          justifyContent: "center",
          columnGap: "10px",
        }}
      >
        <Button
          onClick={() => {
            console.log(pwcValue);
            console.log(pwValue);
            if (nickValue.length === 0 && pwValue.length === 0) {
              setIsError(true);
              return;
            }
            if (pwValue.length !== 0) {
              if (isPwGood(pwValue) === false) {
                setIsError(true);
                return;
              }
              if (isPwGood(pwcValue) === false) {
                setIsError(true);
                return;
              }
              if (pwValue !== pwcValue) {
                setIsError(true);
                return;
              }
            }
            setIsDel(false);
            setIsModalOpen(true);
            setModalMsg("수정 하시겠습니까?");
          }}
          type="button"
          fullWidth
          variant="contained"
          disabled={isError}
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
          disabled={isError}
          color="error"
        >
          계정 삭제
        </Button>
      </div>

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
