import * as express from "express";
import * as path from "path";
import axios from "axios";
import * as net from "net";

const router = express.Router();

  const sendPayloadToSabre = (data:String) => {
  const client =  new net.Socket();
  console.log(1)

  client.connect(63432, "localhost", () => {
  console.log(1)
  console.log("Connected");
    const payload:JSON = {
      "data": data,
    } as unknown as JSON
  console.log(1)
  client.write(JSON.stringify(payload));
  });
  console.log(1)

  client.on("data", (data) => {
    console.log("Received: " + data);
    client.destroy(); // kill client after server's response
  });
  client.on("error", (exception) => {
    console.log(exception);

  console.log(1)
});
  }



router.get("/api/embed", (req, res, next) => {
  const token_b = req.header("token");
  const token = token_b.replace("Bearer ", "");
  axios
    .get("https://discord.com/api/v9/oauth2/@me", {headers: {"Authorization": token_b}})
    .then((resu) => {
      console.log(`statusCode: ${resu.status}`);
      //console.log(resu);
      console.log(resu.data)
      res.json(resu.data)
      sendPayloadToSabre(JSON.stringify({
        "title": "",
        "url": "",
        "desc": "",
        "a_url": "",
        "a_ico": "",
        "a": "",
        "colour": "",
        "footer": "",
        "img": "",
        "edit": "",
        "fields": [],
        "fields_t": [],
        "content": ""
    }))
    })
    .catch((error) => {
      console.error(error);
    });
});

// This is the client ID and client secret that you obtained
// while registering the application
const clientID = "764794183083884546";
const clientSecret = "qskoeh4YUAc-yP2VzHyaJ9ntLPxgXH4S";

// Declare the redirect route
router.get("/oauth/redirect", (req, res) => {
  res.redirect("/redirect_cookiesave.html");
  //res.redirect(`/welcome.html`);
});

//Create Login Page
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/login.html"));
});

export default router;
