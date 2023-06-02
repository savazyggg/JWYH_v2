/**
 * @async
 * @module
 * 로그인 정보를 보내고 jwt를 받아오는 api
 * @example login("http://127.0.0.1:3000", formData);
 * @param {string} url - 서버 주소,
 * @param {FormData} formData - formData 객체 [userId], [password],
 * @return {JSON} 토큰이 포함된 JSON 객체 반환
 * { jwt: "tokentoken" }
 */
//TODO interface 만들어서 하는게 더 편할듯
export default async function login(url = "", formData: FormData) {
  url = url + "/api/login";
  const data: any = {};
  formData.forEach((value, key) => (data[key] = value));
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
  return response.json();
}
