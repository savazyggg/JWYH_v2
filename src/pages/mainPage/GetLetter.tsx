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

  return (
    <Container>
      <div>{`총 ${letters?.length}개의 편지가 도착했어요`}</div>
    </Container>
  );
};

export default GetLetter;

const Container = styled.div`
  padding-top: 15%;
  div {
    font-size: 24px;
    color: #93ba7b;
  }
`;
