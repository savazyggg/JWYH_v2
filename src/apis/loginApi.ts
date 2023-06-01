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
