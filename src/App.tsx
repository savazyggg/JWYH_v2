import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Suspense, lazy } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Layout from "./Root";
import ReactDOM from "react-dom/client";
import IntroPage from "./pages/introPage/IntroPage";
import "./App.css";

const MainPage = lazy(() => import("./pages/mainPage/MainPage"));
const Storage = lazy(() => import("./pages/storagePage/Storage"));
const ErrorPage = lazy(() => import("./pages/errorPage/ErrorPage"));
const SignUpPage = lazy(() => import("./pages/signUpPage/SignUpPage"));
const LoginPage = lazy(() => import("./pages/loginPage/LoginPage"));
const StorageLetter = lazy(() => import("./pages/storagePage/StorageLetter"));
const GuestMainPage = lazy(() => import("./pages/mainPage/GuestMainPage"));
const AcntUpdPage = lazy(() => import("./pages/acntUpdPage/AcntUpdPage"));
const WritingLetterPage = lazy(
  () => import("./pages/writingLetter/WritingLetterPage")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <IntroPage /> },
      {
        path: "/login",
        element: <LoginPage />,
      },
      { path: "/signup", element: <SignUpPage /> },
      {
        path: "/mypage",
        element: <AcntUpdPage />,
      },
      {
        path: "/writingletter/:_id",
        element: <WritingLetterPage />,
      },
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
      <Suspense fallback={<div>loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </GoogleOAuthProvider>
  </RecoilRoot>
);
