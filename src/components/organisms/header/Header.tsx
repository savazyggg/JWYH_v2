import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import jwt_decode from "jwt-decode";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  isLoginedState,
  uniqueIdState,
  nickNameState,
} from "../../../recoilStore";
import { useEffect } from "react";
import { getNickName } from "../../../apis/getNickName";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          height: "24px",
          color: "#fff",
          marginTop: "18px",
          padding: "6px 8px",
          fontWeight: "700",
          marginLeft: "10px",
          backgroundColor: "#93BA7B",
          "&:hover": {
            backgroundColor: "#76ac56",
          },
        },
      },
    },
  },
});
const Header = () => {
  const [isLogined, setIsLogined] = useRecoilState(isLoginedState);
  const [_uniqueId, setUniqueId] = useRecoilState(uniqueIdState);
  const [nickName, setNickName] = useRecoilState(nickNameState);
  const location = useLocation();
  const navigate = useNavigate();
  const URL = "https://kdt-sw-4-team14.elicecoding.com";

  const onLogOut = () => {
    setIsLogined(false);
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  const onLogIn = () => {
    const jwt = localStorage.getItem("jwt");
    if (localStorage.getItem("jwt") === null) {
      navigate("/login");
    }
    if (jwt !== null) {
      setNickName(nickName);
    }
  };

  const onGuestIn = async () => {
    const guestId = location.pathname.split("/").pop();
    if (guestId !== undefined && guestId !== "writingletter") {
      //리코일에 난수 아이디 등록
      setUniqueId(() => {
        return guestId;
      });
      //닉네임 가져옴
      await getNickName(URL, guestId).then(
        (value: any) => {
          //response 가 제대로 오면 이름 설정
          setNickName(value);
        },
        (reason) => {
          //respone 가 제대로 안오면
          setNickName("사용자");
          console.error(reason);
        }
      );
    }
  };

  useEffect(() => {
    // 페이지 로드 시에 쿠키에서 로그인 정보 확인하여 isLogined 상태 설정
    const jwt = localStorage.getItem("jwt");
    if (jwt !== null) {
      setIsLogined(true);
      onLogIn();
    } else {
      setIsLogined(false);
      onGuestIn();
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SHeader>
        <Container>
          <LeftContainer>
            <div>
              <NickNameText>{nickName} </NickNameText>님의 레터스페이스 입니다
            </div>
          </LeftContainer>
          <>
            {isLogined && (
              <>
                <LoginContainer>
                  <ul>
                    <Link to="/mypage">
                      <li>마이페이지</li>
                    </Link>
                    <Link to="/storage">
                      <li>보관함</li>
                    </Link>
                  </ul>
                  <Button variant="contained" onClick={onLogOut}>
                    Log out
                  </Button>
                </LoginContainer>
              </>
            )}
          </>
        </Container>
      </SHeader>
    </ThemeProvider>
  );
};

export default Header;

const SHeader = styled.header`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  background-color: #242424;
  color: white;
  font-weight: 700;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  width: 1200px;
  background-color: #242424;
`;

const LeftContainer = styled.div`
  display: flex;
`;

const LoginContainer = styled.div`
  line-height: 3.9;
  display: flex;
  ul {
    display: flex;
  }
  li {
    list-style: none;
    float: left;
    margin: 0 5px;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    color: white;
  }
`;

const NickNameText = styled.div`
  line-height: 1.8;
  display: inline-block;
  font-size: 32px !important;
  color: #93ba7b !important;
`;
