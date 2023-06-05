// import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  // const error = useRouteError();
  // console.error(error);

  return (
    <div id="error-page">
      <h1 style={{ color: "white" }}>404</h1>
      <p style={{ color: "white" }}>페이지 없어요</p>
      <p>{/* <i>{error.statusText || error.message}</i> */}</p>
    </div>
  );
}
