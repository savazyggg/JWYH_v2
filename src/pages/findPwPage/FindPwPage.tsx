import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import FindPwForm from "../../components/organisms/findPwForm/FindPwForm";
import { theme } from "../../common/core";

function FindPwPage() {
  return (
    <>
      <Container
        maxWidth="sm"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Stack direction={"column"} spacing={2}>
          <Typography
            sx={{ width: "100%" }}
            component="h1"
            variant="h4"
            style={{ color: theme.green }}
          >
            비밀번호 찾기 페이지
          </Typography>
          <FindPwForm />
        </Stack>
      </Container>
    </>
  );
}

export default FindPwPage;
