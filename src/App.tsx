import ReactDOM from "react-dom/client";
import { BrowserRouter, Outlet, Link } from "react-router-dom";
import { RecoilRoot } from "recoil";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Routes, Route } from "react-router-dom";
import IntroPage from "./pages/introPage/IntroPage";
import WritingLetterPage from "./pages/writingLetter/WritingLetterPage";
import "./App.css";
import MainPage from "./pages/mainPage/MainPage";
import Storage from "./pages/storagePage/Storage";
import ErrorPage from "./pages/errorPage/ErrorPage";
import SignUpPage from "./pages/signUpPage/SignUpPage";
import LoginPage from "./pages/loginPage/LoginPage";
// import { ThemeContext } from "@emotion/react";
import StorageLetter from "./pages/storagePage/StorageLetter";
import GuestMainPage from "./pages/mainPage/GuestMainPage";

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

//TODO 06.03 윤지 : 라우팅 테스트용으로 임시로 만듬, 경로 경우의수 산정하여 리다이렉트 등 기능 넣을것
//TODO 06.03 윤지 : 로그인, 회원가입 인트로페이지에서 props을 받던데 라우팅 할때 어떻게 할지? - 헤더에서 (링크걸어야됨) 윤서님과 확인하기

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    {/* <ThemeProvider theme={darkTheme}> */}
    <CssBaseline />
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/writingletter" element={<WritingLetterPage />} />
        <Route path="/main" element={<MainPage />} />
        {/* <Route path="/main/:_id" element={<GuestMainPage />} /> */}
        <Route path="/storage" element={<Storage />} />
        <Route path="/:id/:year/:month" element={<StorageLetter />} />
        {/* 위 주소를 제외한 모든 주소는 error 페이지로 */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </RecoilRoot>
    {/* </ThemeProvider> */}
  </BrowserRouter>
);
