import { Stack, Card } from "@mui/material";
import styled from "@emotion/styled";

const Container = styled(Stack)`
  margin-left: 34px;
  margin-top: 10px;
`;

const LetterStyle = () => {
  const color = ["blue", "red", "yellow", "black"];

  return (
    <Container direction="row" flexWrap="wrap" justifyContent="start" gap={4}>
      {color.map((el) => {
        return (
          <Card
            key={el}
            sx={{
              width: { md: "100px", xs: "100%" },
              height: 120,
              boxShadow: "none",
              borderRadius: "13px",
              backgroundColor: `${el}`,
              cursor: "pointer",
            }}
          ></Card>
        );
      })}
    </Container>
  );
};

export default LetterStyle;
