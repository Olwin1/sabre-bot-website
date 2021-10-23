import { getCookie, setCookie } from "./cookie-utils";
const getUser = () => {
  const decode = (str: string): string =>
    Buffer.from(str, "base64").toString("binary");
  const encode = (str: string): string =>
    Buffer.from(str, "binary").toString("base64");
  const cookie = getCookie("u");
  if (cookie == undefined) {
    fetch("https://discord.com/api/v9/users/@me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setCookie("u", encode(data))
        return JSON.parse(decode(getCookie("u")));
      })
      .catch((error) => {
        return error;
      });
  } else {
    return JSON.parse(decode(cookie));
  }
};
export default getUser;
