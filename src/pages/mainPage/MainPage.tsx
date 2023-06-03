import React from "react";
import { styled as muiStyled } from "@mui/system";
import Box from "@mui/material/Box";
import LetterCarousel from "./LetterCarousel";
function MainPage() {
  return (
    <Container>
      <Header></Header>
      <InfoDiv></InfoDiv>
      <LetterCarousel></LetterCarousel>
    </Container>
  );
}
const Container = muiStyled(Box)({
  display: "grid",
  height: "100%",
  gridTemplateRows: "100px 300px 1fr",
});
const InfoDiv = muiStyled(Box)({
  border: "1px solid red",
});
const Header = muiStyled(Box)({
  border: "1px solid red",
});

export default MainPage;
