/**
 * @async
 * @module
 * 로그인 정보를 보내고 jwt를 받아오는 api
 * @example login("http://127.0.0.1:3000", LoginData);
 * @param {string} url - 서버 주소,
 * @param {LoginData},
 */
async function getLetters(url: string, userId: string): Promise<JSON> {
  url = url + "/api/main/" + userId;
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.json();
}

export { getLetters };
