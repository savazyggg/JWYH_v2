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
import WritingLetter from "./pages/writingLetter/WritingLetter";
import MainPage from "./pages/mainPage/MainPage";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <CssBaseline />
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/writingletter" element={<WritingLetter />} />
        <Route path="/mainpage" element={<MainPage />} />
      </Routes>
    </RecoilRoot>
  </BrowserRouter>
);
