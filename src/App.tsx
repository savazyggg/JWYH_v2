import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
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
import SignUpForm from "./components/organisms/signUpForm/SignUpForm";
import LoginForm from "./components/organisms/loginForm/LoginForm";
import StorageLetter from "./pages/storagePage/StorageLetter";

//TODO 06.03 윤지 : 라우팅 테스트용으로 임시로 만듬, 경로 경우의수 산정하여 리다이렉트 등 기능 넣을것
//TODO 06.03 윤지 : 로그인, 회원가입 인트로페이지에서 props을 받던데 라우팅 할때 어떻게 할지? - 헤더에서 (링크걸어야됨) 윤서님과 확인하기
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <CssBaseline />
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/writingletter" element={<WritingLetterPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/:id/:year/:month" element={<StorageLetter />} />
        {/* <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} /> */}
      </Routes>
    </RecoilRoot>
  </BrowserRouter>
);
