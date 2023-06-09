import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isLoginedState } from "../../recoilStore";

const GetLetter = ({ token }) => {
  const [isLogined, setIsLogined] = useRecoilState(isLoginedState);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  console.log(isLogined);
  console.log(token);

  useEffect(() => {
    async function fetchLetterData() {
      // console.log(token);
      const response = await fetch(`http://34.64.195.153:5000/api/main/aaa`);
      const data = await response.json();
      setUserData(data);
    }
    fetchLetterData();
  }, []);
  return (
    <Container>
      <div>{`총 ${userData.length}개의 편지가 도착했어요`}</div>
    </Container>
  );
};

export default GetLetter;

const Container = styled.div`
  margin-top: 200px;
  margin-bottom: 50px;
  h2 {
    color: #93ba7b;
  }
`;
