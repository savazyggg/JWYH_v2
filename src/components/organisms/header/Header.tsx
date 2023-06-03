import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ isLogin, onLogOut }) => {
  const [nickName, setNickName] = useState<string>("");
  const [error, setError] = useState<string>("");

  //TODO 06.03 윤지 ** api, 링크 가안임, 갈아껴야됨
  //memo 헤더 명확하게 보려고 일단 색 다르게 설정해둠
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
  //console.log(nickName);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!nickName) {
    return <div>Loading...</div>;
  } else {
    return (
      <SHeader>
        <Container>
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
                <Button onClick={onLogOut}>Log out</Button>
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
        </Container>
      </SHeader>
    );
  }
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
