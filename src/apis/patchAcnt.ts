interface PatchAcntBody {
  nickName: string;
  password: string;
}

async function PatchAcnt(
  url: string,
  token: string,
  urlParam: string,
  patchAcntBody: PatchAcntBody
): Promise<JSON> {
  url = url + "/api/mypage/" + urlParam;
  const response = await fetch(url, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + token,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(patchAcntBody),
  });
  return response.json();
}

export { PatchAcnt };
export type { PatchAcntBody };
