import { getCookie, setCookie } from "./cookie-utils";
const getUser = () => {
  const decode = (str: string):string => window.atob(str);
  const encode = (str: string):string => window.btoa(str);
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
        console.log('%c [SABRE API] ', 'color: #4E1592', 'User Cache Not Found... Creating...');
        const temp = String(encode(JSON.stringify(data)))
        setCookie("u", temp)
        location.reload()
      })
      .catch((error) => {
        return error;
      });
  } else {
    return JSON.parse(decode(cookie));
  }
};
export default getUser;
