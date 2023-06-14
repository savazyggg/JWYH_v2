/**
 * @async
 * @module

 */
async function delAcnt(
  url: string,
  token: string,
  urlParam: string
): Promise<JSON> {
  url = url + "/api/mypage/" + urlParam;
  const response = await fetch(url, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.json();
}

export { delAcnt };
