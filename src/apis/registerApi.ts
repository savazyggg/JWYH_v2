interface SingUpData {
  userId: string;
  nickName: string;
  password: string;
}
/**
 * 회원가입정보를 보내고 response 받아옴
 * @module register
 * @example
 * register("http://127.0.0.1:3000", formData);
 * @param {string} url - 서버 주소,
 * @param {FormData} formData - formData 객체 [userId], [password],[nickName],
 * @returns {JSON} 회원가입후 return을 뭘 받아야함?
 */
//TODO interface 만들어서 하는게 더 편할듯
async function register(url = "", data: SingUpData) {
  url = url + "/api/register";
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
export { register };
export type { SingUpData };
