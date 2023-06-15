interface FindPwData {
  userId: string;
  nickName: string;
}
/**

 */
async function postPwReset(url: string, data: FindPwData) {
  url = url + "/api/reset";
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

export { postPwReset };
export type { FindPwData };
