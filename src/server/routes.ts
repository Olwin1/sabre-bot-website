import e, * as express from "express";
import * as path from "path";
import axios from "axios";
import * as net from "net";
import {json,urlencoded} from 'body-parser';

const router = express.Router();


// create application/json parser
var jsonParser = json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = urlencoded({ extended: false })

  const sendPayloadToSabre = async (data:String, type:String) => {
    return new Promise((resolve, reject) => {
  const client =  new net.Socket();
  console.log(1)

  client.connect(63432, "localhost", () => {
  console.log(1)
  console.log("Connected");
    const payload:JSON = {
      "data": data,
      "type": type,
    } as unknown as JSON
  console.log(1)
  client.write(JSON.stringify(payload));
  });
  console.log(1)

  client.on("data", (data) => {
    console.log("Received: " + data);
    resolve(data);
    client.destroy(); // kill client after server's response
    return {"success": true}
  });
  client.on("error", (exception) => {
    console.log(exception);
    return {"success": false}

  console.log(1)
});
//return {"success": true}
  })}



router.post("/api/embed", jsonParser, async (req, res, next) => {
  const token_b = req.header("token");
  const token = token_b.replace("Bearer ", "");
      console.log(`statusCode: ${res.status}`);
      //console.log(resu);
      const embed = req.body
      
      await sendPayloadToSabre(JSON.stringify({
        "token": token,
        "title": embed.title,
        "url": embed.url,
        "desc": embed.desc,
        "a_url": embed.a_url,
        "a_ico": embed.a_ico,
        "a": embed.a,
        "colour": embed.colour,
        "footer": embed.footer,
        "img": embed.img,
        "edit": embed.edit,
        "fields": embed.fields,
        "fields_t": embed.fields_t,
        "content": embed.content
    }), "sendEmbed").then((r) => {
    res.json(r)
    console.log(r + " || respon")
  })

});

router.get("/api/guilds", async (req, res) => {
  const token_b = req.header("token");
  const token = token_b.replace("Bearer ", "");
  await sendPayloadToSabre(JSON.stringify({
    "token": token
  }), "getGuilds").then((r) => {
    res.json(r)
    console.log(r + " || respon")
  })
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
