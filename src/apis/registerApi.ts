export default async function register(url = "", formData: FormData) {
  const data: any = {};
  formData.forEach((value, key) => (data[key] = value));
  url = url + "/api/register";
  console.log(data);
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
