import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import IntroPage from "./pages/introPage/IntroPage";
import WritingLetterPage from "./pages/writingLetter/WritingLetterPage";
import "./App.css";
import MainPage from "./pages/mainPage/MainPage";
import Storage from "./pages/storagePage/Storage";
import ErrorPage from "./pages/errorPage/ErrorPage";
import SignUpPage from "./pages/signUpPage/SignUpPage";
import LoginPage from "./pages/loginPage/LoginPage";
import StorageLetter from "./pages/storagePage/StorageLetter";
import GuestMainPage from "./pages/mainPage/GuestMainPage";
import AcntUpdPage from "./pages/acntUpdPage/AcntUpdPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Layout from "./Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <IntroPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/mypage", element: <AcntUpdPage /> },
      { path: "/writingletter/:_id", element: <WritingLetterPage /> },
      { path: "/main", element: <MainPage /> },
      { path: "/main/:_id", element: <GuestMainPage /> },
      { path: "/storage", element: <Storage /> },
      { path: "/:id/:year/:month", element: <StorageLetter /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <GoogleOAuthProvider clientId="221947933367-6qlcs81lju9hsahq4gi97q9vsatpq394.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </RecoilRoot>
);
