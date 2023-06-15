import { Stack, Card } from "@mui/material";
import styled from "@emotion/styled";

interface Props {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const LetterStyle: React.FC<Props> = ({ onClick }) => {
  const color = [
    "#A27BBA",
    "#7B81BA",
    "#BAB07B",
    "#7BA3BA",
    "#ADBA7B",
    "#7BBAA7",
    "#BA8A7B",
    "#607851",
    "#93BA7B",
    "#757851",
    "#95A5A6",
    "#5A6F6A",
  ];

  return (
    <Container direction="row" flexWrap="wrap" justifyContent="start" gap={3}>
      {color.map((el) => {
        return (
          <Card
            onClick={onClick}
            key={el}
            sx={{
              width: { md: "90px", xs: "90px" },
              height: 115,
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
  margin-left: 13px;
  margin-top: 15px;
  img {
    width: 80%;
    margin-top: 20px;
    margin-left: 7px;
    align-itme: center;
    cursor: pointer;
  }
`;
