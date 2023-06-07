import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

type User = {
  id: string;
  password: string;
  nickName: string;
  objectId: string;
  iat: number;
};

type HeaderProps = {
  isLogin: boolean;
  onLogOut: () => void;
  token: string;
};

const Header = ({ isLogin, onLogOut, token }: HeaderProps) => {
  const [user, setUser] = useState<User>({
    id: "",
    password: "",
    nickName: "",
    objectId: "",
    iat: 0,
  });
  console.log(token.id);
  useEffect(() => {
    setUser(token);
  }, [token]);

  return (
    <SHeader>
      <Container>
        <LeftContainer>
          <h3>{user.nickName && `${user.nickName}님의 레터스페이스 입니다`}</h3>
        </LeftContainer>
        <>
          {isLogin ? (
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
              <Link to="/">
                <Button>Log in</Button>
              </Link>
              <Link to="/">
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
