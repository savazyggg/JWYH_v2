import { Stack, Card } from "@mui/material";
import styled from "@emotion/styled";

const LetterStyle = () => {
  const color = [
    "#A27BBA",
    "#93BA7B",
    "#7B81BA",
    "#BAB07B",
    "#7BA3BA",
    "#ADBA7B",
    "#7BBAA7",
    "#BA8A7B",
    "#607851",
    "#757851",
  ];

  return (
    <Container direction="row" flexWrap="wrap" justifyContent="start" gap={3}>
      {color.map((el) => {
        return (
          <Card
            key={el}
            sx={{
              width: { md: "100px", xs: "100px" },
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
const Container = styled(Stack)`
  margin-left: 11px;
  margin-top: 10px;
`;
