interface LoginData {
  userId: string;
  password: string;
}
/**
 * @async
 * @module
 * 로그인 정보를 보내고 jwt를 받아오는 api
 * @example login("http://127.0.0.1:3000", LoginData);
 * @param {string} url - 서버 주소,
 * @param {LoginData},
 */
async function login(url: string, data: LoginData) {
  url = url + "/api/login";
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response;
}

export { login };
export type { LoginData };
