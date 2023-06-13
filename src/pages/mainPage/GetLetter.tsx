import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isLoginedState } from "../../recoilStore";
import { LetterInterface } from "./LetterCarousel";

interface LetterListProps {
  letters: LetterInterface[];
}
const GetLetter = (props: LetterListProps) => {
  const { letters } = props;
  const [readableLetters, setReadableLetters] = useState<LetterInterface[]>([]);

  useEffect(() => {
    const currentDate = new Date();
    const filteredLetters = letters.filter((letter) => {
      // 편지를 읽을 수 있는 조건
      const unlockDate = new Date(
        letter.unlockYear,
        letter.unlockMonth - 1,
        letter.unlockDate
      );
      return unlockDate <= currentDate;
    });

    setReadableLetters(filteredLetters);
  }, [letters]);

  return (
    <Container>
      <div>
        <ShakingText>{letters?.length}</ShakingText>개의 편지 도착
        <br />
        <ShakingText>{readableLetters.length}</ShakingText>개의 편지를 읽으실수
        있어요
      </div>
    </Container>
  );
};

export default GetLetter;

const Container = styled.div`
  padding-top: 10%;
  div {
    font-size: 24px;
    color: #fff;
    font-weight: 700;
  }
`;
const ShakingText = styled.div`
  font-size: 38px !important;
  color: #93ba7b !important;
  display: inline-block;
  animation: shake 0.4s ease-in-out infinite;

  @keyframes shake {
    from {
      transform: rotate(2deg);
    }
    to {
      transform: rotate(-2deg);
    }
  }
`;
