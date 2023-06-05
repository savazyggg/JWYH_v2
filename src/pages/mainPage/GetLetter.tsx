import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const API = "어쩌고";
const GetLetter = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLetterData() {
      try {
        const response = await fetch("https://api.github.com/users/openai");
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err);
      }
    }
    fetchLetterData();
  }, []);
  console.log(userData);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!userData) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container>
        {/* <p>쌓인 편지 {userData.name}개</p> 전체 편지는 나중에 api나오면*/}
        <h2>{userData.blog}개의 편지가 열렸어요!</h2>
        {/* 열린 편지만 (unlock && 안읽은 편지) */}
      </Container>
    );
  }
};

export default GetLetter;

const Container = styled.div`
  margin-top: 200px;
  margin-bottom: 50px;
  h2 {
    color: #93ba7b;
  }
`;
