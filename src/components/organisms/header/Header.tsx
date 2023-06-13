import styled from "@emotion/styled";
import jwt_decode from "jwt-decode";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoginedState, uniqueIdState } from "../../../recoilStore";
import { useEffect, useState } from "react";
import { getNickName } from "../../../apis/getNickName";

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
    if (guestId !== undefined) {
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
    if (isLogined === true) onLogIn();
    if (isLogined === false) onGuestIn();
  }, [isLogined]);

  return (
    <SHeader>
      <Container>
        <LeftContainer>
          <div>{nickName} 님의 레터스페이스 입니다</div>
          {/* <div>{!isLogined && `${userNick}님의 레터스페이스 입니다`}</div> */}
        </LeftContainer>
        <>
          {isLogined ? (
            <>
              <LoginContainer>
                <ul>
                  <Link to="/mypage">
                    <li>마이페이지</li>
                  </Link>
                  <Link to="/">
                    <li>보관함</li>
                  </Link>
                </ul>
                <Button onClick={onLogOut}>Log out</Button>
              </LoginContainer>
            </>
          ) : (
            <></>
            // <div>
            //   <Link to="/login">
            //     <Button>Log in</Button>
            //   </Link>
            //   <Link to="/signup">
            //     <Button>Sign up</Button>
            //   </Link>
            // </div>
          )}
        </>
      </Container>
    </SHeader>
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

const Button = styled.button`
  margin-top: 12px;
  height: 30px;
  margin-left: 12px;
`;
