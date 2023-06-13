import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import jwt_decode from "jwt-decode";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoginedState, uniqueIdState } from "../../../recoilStore";
import { useEffect, useState } from "react";
import { getNickName } from "../../../apis/getNickName";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          height: "24px",
          color: "#fff",
          backgroundColor: "#93BA7B",
          "&:hover": {
            backgroundColor: "#A695BA",
          },
        },
      },
    },
  },
});
const Header = () => {
  const [isLogined, setIsLogined] = useRecoilState(isLoginedState);
  const [uniqueId, setUniqueId] = useRecoilState(uniqueIdState);
  const [nickName, setNickName] = useState<string>();
  const location = useLocation();
  const navigate = useNavigate();
  const URL = "http://34.64.195.153:5000";

  const onLogOut = () => {
    setIsLogined(false);
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  const onLogIn = () => {
    const jwt = localStorage.getItem("jwt");
    if (localStorage.getItem("jwt") === null) {
      console.log("Header onLogin Error : JWT가 없습니다!!");
      navigate("/login");
    }
    if (jwt !== null) {
      interface JwtDecoded {
        iat: number;
        id: string;
        nickName: string;
        objectId: string;
      }
      const decoded: JwtDecoded = jwt_decode(jwt);
      setNickName(decoded.nickName);
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
        (value) => {
          //response 가 제대로 오면 이름 설정
          setNickName(JSON.stringify(value));
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
            <div>{nickName} 님의 레터스페이스 입니다</div>
          </LeftContainer>
          <>
            {isLogined && (
              <>
                <LoginContainer>
                  <ul>
                    <Link to="/">
                      <li>마이페이지</li>
                    </Link>
                    <Link to="/">
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
`;

const Container = styled.div`
  padding-top: 12px;
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
  display: flex;
  ul {
    display: flex;
  }
  li {
    list-style: none;
    float: left;
    padding: 0 15px;
    margin: 0 5px;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    color: white;
  }
`;
