import GetLetter from "./GetLetter";
import Header from "../../components/organisms/header/Header";
import UserInputText from "./UserInputText";
import WritingLetterButton from "./WritingLetterButton";
import { styled as muiStyled } from "@mui/system";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import jwt_decode from "jwt-decode";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getLetters } from "../../apis/getLetters";

import { useEffect, useState, lazy, Suspense } from "react";

// recoil
import { useRecoilState } from "recoil";
import { isLoginedState, userIdState } from "../../recoilStore";
import { LetterCarousel, LetterInterface } from "./LetterCarousel";
// recoil
interface JwtDecoded {
  iat: number;
  id: string;
  nickName: string;
  objectId: string;
}
const MainPage = () => {
  const [isLogined, setIsLogined] = useRecoilState(isLoginedState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [letters, setLetters] = useState<LetterInterface[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  const loginCheck = () => {
    const tokenStr = localStorage.getItem("jwt");
    if (tokenStr !== null) {
      const JwtDecoded: JwtDecoded = jwt_decode(tokenStr);

      setUserId(JwtDecoded.id);
      handleLetterData(JwtDecoded.id);
    }
  };
  const handleLetterData = async (userId = "") => {
    const url = "http://34.64.195.153:5000";
    if (userId.length !== 0) {
      await getLetters(url, userId).then((value) => {
        setLetters(value);
      });
    }
  };

  const MyAlert = () => {
    const handleClose = (
      event: React.SyntheticEvent | Event,
      reason?: string
    ) => {
      if (reason === "clickaway") {
        return;
      }
      setShowAlert(false);
    };
    return (
      <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          공유링크 복사성공! 친구에게 주소를 공유해보세요
        </Alert>
      </Snackbar>
    );
  };

  const handleShare = () => {
    const tokenStr = localStorage.getItem("jwt");
    const JwtDecoded: JwtDecoded = jwt_decode(tokenStr);
    const domain = "http://34.64.195.153:5000"; // 도메인
    const url = `${domain}/main/${JwtDecoded.objectId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("알람온");
        setShowAlert(true);
      })
      .catch((error) => {
        console.error("클립보드 복사에 실패했습니다.", error);
      });
  };
  useEffect(() => {
    loginCheck();
  }, [isLogined]);
  useEffect(() => {
    handleLetterData(userId);
  }, [userId]);

  return (
    <Container>
      <>
        <Header></Header>
        {/* <UserInputText isLogin={isLogin} /> */}
      </>
      <>
        {isLogined && (
          <>
            <GetLetter letters={letters} />{" "}
            <ShareButton onClick={handleShare}>
              친구에게 편지 써 달라하기
            </ShareButton>
            {showAlert && <MyAlert />}
          </>
        )}
      </>
      {letters.length && (
        <LetterCarousel
          letters={letters}
          isGuest={false}
          handleLetterData={handleLetterData}
        ></LetterCarousel>
      )}
    </Container>
  );
};

export default MainPage;

const Container = muiStyled(Box)({
  height: "100%",
  display: "grid",
  gridTemplateRows: "250px  1fr",
});

const ShareButton = muiStyled(Button)({
  // position: "fixed",
  bottom: "20px",
  right: "20px",
  padding: "10px 20px",
  backgroundColor: "#ccc",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
});
