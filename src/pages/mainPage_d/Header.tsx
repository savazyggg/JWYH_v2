import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoginedState } from "../../recoilStore";

type HeaderProps = {
  token: any;
  path: any;
};

const Header = ({ token, path }: HeaderProps) => {
  const [userNick, setUserNick] = useState(null);
  const [isLogined, setIsLogined] = useRecoilState(isLoginedState);
  console.log("헤더 " + token, isLogined);

  const onLogOut = () => {
    setIsLogined(false);
    localStorage.removeItem("jwt");
  };

  useEffect(() => {
    if (!token) {
      let userId = path[path.length - 1];
      fetch(`http://34.64.195.153:5000/api/nickName/${userId}`)
        .then((res) => res.json())
        .then((res) => {
          setUserNick(res);
        });
    }
  }, [token, path]);

  return (
    <SHeader>
      <Container>
        <LeftContainer>
          <div>{isLogined && `${token.nickName}님의 레터스페이스 입니다`}</div>
          {/* <div>{!isLogined && `${userNick}님의 레터스페이스 입니다`}</div> */}
        </LeftContainer>
        <>
          {isLogined ? (
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
                <Button onClick={onLogOut}>Log out</Button>
              </LoginContainer>
            </>
          ) : (
            <div>
              <Link to="/login">
                <Button>Log in</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign up</Button>
              </Link>
            </div>
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
