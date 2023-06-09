import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const GetLetter = ({ token }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchLetterData(token) {
      try {
        const response = await fetch(
          `http://34.64.195.153:5000/api/main/${token.id}`
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
    fetchLetterData(token);
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!userData) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container>
        <div>{`총 ${userData.length}개의 편지가 도착했어요`}</div>
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
