import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const GetLetter = (token) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  // console.log(token.token.id);
  useEffect(() => {
    async function fetchLetterData(token1) {
      try {
        const response = await fetch(
          `http://34.64.195.153:5000/api/main/${token1}`
        );
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err);
      }
    }
    fetchLetterData(token.token.id);
  }, []);
  // console.log(userData);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!userData) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container>
        <div>총 10 개의 편지중 2개의 편지가 열렸습니다!</div>
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
