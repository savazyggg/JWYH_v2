//TODO ** 윤서님이 organisms에서 만들어놓은거 복사해서 흐름보려고 만들어봄 해당 컴포넌트 없어도됨

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [nickName, setNickName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  //const API = "닉네임api"
  const onLogout = () => setIsLogin(false);

  useEffect(() => {
    async function fetchNickNameData() {
      try {
        const response = await fetch("https://api.github.com/users/openai");
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        const data = await response.json();
        setNickName(data.name);
      } catch (err) {
        setError(err);
      }
    }
    fetchNickNameData();
  }, []);
  console.log(nickName);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!nickName) {
    return <div>Loading...</div>;
  } else {
    return (
      <SHeader>
        <LeftContainer>
          {nickName && <h3>{nickName} 님의 레터 스페이스 입니다.</h3>}
          {isLogin && <Button>링크 복사</Button>}
        </LeftContainer>
        <>
          {isLogin ? (
            <LoginContainer>
              <ul>
                <Link to="/">
                  <li>마이페이지</li>
                </Link>
                <Link to="/">
                  <li>보관함</li>
                </Link>
              </ul>
              <Button onClick={onLogout}>Log out</Button>
            </LoginContainer>
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
      </SHeader>
    );
  }
};

export default Header;

const SHeader = styled.header`
  display: flex;
  justify-content: space-between;

  height: 40px;
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
`;
