import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { LetterInterface } from "./LetterCarousel";

interface LetterListProps {
  letters: LetterInterface[];
}
const GetLetter = (props: LetterListProps) => {
  const letters = props.letters;
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

  return letters.length ? (
    <Container>
      <div>
        <ShakingText>{letters?.length}</ShakingText>개의 편지 도착
        <br />
        <ShakingText>{readableLetters.length}</ShakingText>개의 편지를 읽으실수
        있어요
      </div>
    </Container>
  ) : (
    <Container>
      <div>
        안녕하세요😊 아직 편지가 없습니다
        <br />
        <ShakingText> 공유하기 버튼</ShakingText>을 통해 편지를 받아보세요!
        <br />
        <ShakingText> ⬇︎ </ShakingText>
      </div>
    </Container>
  );
};

export default GetLetter;

const Container = styled.div`
  padding-top: 9%;
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
