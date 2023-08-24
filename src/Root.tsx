import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
const Layout = () => {
  return (
    <>
      <CssBaseline />
      <Outlet />
    </>
  );
};

export default Layout;

// const SLayOut = styled.main`
//   display: flex;
//   align-items: center;
//   margin: 0 auto;
//   min-height: 100vh;
//   * {
//     font-family: "Noto Sans KR", sans-serif;
//   }
// `;
