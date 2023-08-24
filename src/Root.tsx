import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";

const Layout = () => {
  return (
    <SLayOut>
      <Outlet />
    </SLayOut>
  );
};

export default Layout;

const SLayOut = styled.main`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100vh;
  * {
    font-family: "Noto Sans KR", sans-serif;
  }
`;
