import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AcntUpdForm from "../../components/organisms/acntUpdForm/AcntUpdForm";
import Stack from "@mui/material/Stack";
import Header from "../../components/organisms/header/Header";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { useRecoilState } from "recoil";
import { isLoginedState } from "../../recoilStore";

interface JwtDecoded {
  id: string;
  nickName: string;
  objectId: string;
}
function AcntUpdPage() {
  const [isLogined, setIsLogined] = useRecoilState(isLoginedState);

  return (
    <>
      <Container
        maxWidth="sm"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Stack direction={"column"} spacing={2}>
          <Box sx={{ height: "50px" }}>
            <Header></Header>
          </Box>
          {isLogined && <AcntUpdForm />}
        </Stack>
      </Container>
    </>
  );
}

export default AcntUpdPage;
