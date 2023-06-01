import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>404</h1>
      <p>페이지 없어요 ㅋㅋ</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
