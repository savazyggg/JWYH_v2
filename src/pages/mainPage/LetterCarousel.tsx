import { styled as muiStyled } from "@mui/system";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./LetterCarousel.css";
import { useState, useRef } from "react";

const StyledContainer = muiStyled(Box)({
  border: "1px solid black",
  position: "relative",
  cursor: "grab",
  width: "1000px",
});

const StyledSlide = muiStyled(Box)(({ angle }) => ({
  width: "30px",
  height: "30px",
  borderRadius: "20%",
  background: "blue",
  position: "absolute",
  top: "calc(50% - 25px)",
  left: "calc(50% - 25px)",
  transform: `rotate(${angle}deg) translateX(75px) rotate(-${angle}deg)`,
  transition: "transform 0.5s ease-in-out",
  cursor: "grab",
  userSelect: "none",
}));

const Carousel = () => {
  const anglesCount = 10; // 생성할 각도 개수
  const initialAngles = Array.from(
    { length: anglesCount },
    (_, index) => index * (360 / anglesCount)
  );
  const [angles, setAngles] = useState(initialAngles);
  const [startX, setStartX] = useState(0);
  //   const containerRef = useRef(null);

  const handleRotateAll = (rotation) => {
    setAngles((prevAngles) => {
      const newAngles = prevAngles.map((angle) => angle + rotation);
      // 회전이 한 바퀴를 넘어가면 다시 초기 위치로 설정
      const fullRotation = 360;
      const normalizedAngles = newAngles.map((angle) => {
        if (angle >= fullRotation) {
          return angle % fullRotation;
        } else if (angle < 0) {
          return fullRotation + (angle % fullRotation);
        } else {
          return angle;
        }
      });
      return normalizedAngles;
    });
  };

  const handleMouseDown = (event) => {
    setStartX(event.clientX);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event) => {
    const deltaX = event.clientX - startX;
    const sensitivity = 0.02; // 드래그 감도 조절
    const rotation = deltaX * sensitivity;
    setAngles((prevAngles) => {
      return prevAngles.map((angle) => angle + rotation);
    });
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <StyledContainer>
      {angles.map((angle, index) => (
        <StyledSlide key={index} angle={angle} />
      ))}
      <Button onClick={() => handleRotateAll(45)}>오른쪽으로 회전</Button>
      <Button onClick={() => handleRotateAll(-45)}>왼쪽으로 회전</Button>
    </StyledContainer>
  );
};

export default Carousel;
