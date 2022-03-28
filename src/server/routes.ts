import e, * as express from "express";
import * as path from "path";
import axios from "axios";
import * as net from "net";
import {json,urlencoded} from 'body-parser';
import getToken from "../../token";
import getRedisPass from "../../redisPass";
import { Client } from "pg";
const pg = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'sabre',
  password: 'jumper123',
})
pg.connect();

import { createClient } from 'redis';

const red = createClient({url: 'redis://default:' + getRedisPass() + '@161.97.86.11:6379'});
red.on("connect", () => console.log("::> Redis Client Connected"));
red.connect();
red.on('error', err => {
    console.log('Error ' + err);
});





//console.log(z + "gotten")

const router = express.Router();
const bot_token = getToken()


const checkExists = async (guildId) => {
  const t = await red.get(guildId)
    console.log("35");
    console.log(t)
    if(!t) {
    console.log("CHECKING: " + guildId + " || 1")
    const res = await pg.query('SELECT id FROM guilds WHERE id=$1', [guildId])
    console.log("CHECKING: " + guildId + " || 2")
    // users = Result [{ name: "Walter", age: 80 }, { name: 'Murray', age: 68 }, ...]
    console.log("CHECKING: " + guildId + " || 3")
    if(res.rows.length != 0) {
    console.log("CHECKING: " + guildId + " || 4")
    return true
      }
      else{
    console.log("CHECKING: " + guildId + " || 5")
    return false
      }
    }
    else {
    console.log("CHECKING: " + guildId + " || 6")
    return true
    }

}

// create application/json parser
var jsonParser = json()
 
// create application/x-www-form-urlencoded parser
//var urlencodedParser = urlencoded({ extended: false })


/*
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
  })}*/



router.post("/api/embed", jsonParser, async (req, res, next) => {
  const token_b = req.header("token");
  const token = token_b.replace("Bearer ", "");
      console.log(`statusCode: ${res.status}`);
      //console.log(resu);
      const embed = req.body
      
  //    await sendPayloadToSabre(JSON.stringify({
  //      "token": token,
  //      "title": embed.title,
  //      "url": embed.url,
  //      "desc": embed.desc,
  //      "a_url": embed.a_url,
  //      "a_ico": embed.a_ico,
  //      "a": embed.a,
  //      "colour": embed.colour,
  //      "footer": embed.footer,
  //      "img": embed.img,
  //      "edit": embed.edit,
  //      "fields": embed.fields,
  //      "fields_t": embed.fields_t,
  //      "content": embed.content
  //  }), "sendEmbed").then((r) => {
  //  res.json(r)
  //  console.log(r + " || respon")
  //})

});

router.get("/api/guilds", async (req, res) => {
  const token_b = req.header("token");
  const token = token_b.replace("Bearer ", "");
  axios
  .get("https://discord.com/api/v9/users/@me/guilds", {headers: {"Authorization": token_b}})
  .then(async (resu) => {
    console.log(`statusCodde: ${resu.status}`);
    //console.log(resu);
    console.log("1");
    console.log(resu.data[0]);
    console.log("1");
    let guilds = []
    console.log("2");

    console.log("33");


    console.log("44");

    console.log("4");
    const g = resu.data
    const runLoop = async () => {
    for(var i = 0; i < resu.data.length; i++){
      console.log(22)
      console.log("-----------------")
      console.log((Number.parseInt(g[i]["permissions"]) & 0x20) == 0x20)
      console.log(JSON.stringify(i))
      console.log(g[i]["permissions"])
      console.log("-----------------")
    if ((Number.parseInt(g[i]["permissions"]) & 0x20) == 0x20){// Check For Manage Server Permissions.  
      console.log(44)
      let tmp = {"id": g[i]["id"], "name": g[i]["name"], "icon": g[i]["icon"], "hasSabre": false}
      await checkExists(g[i]["id"]).then(async (tt) => {
      console.log("1:" + tt)
        if(await checkExists(g[i]["id"])){
      console.log("2:" + tt)
      console.log(88)
            tmp["hasSabre"] = true

        }
      console.log("3:" + tt)
      guilds.push(tmp)
      })
    }
  }}
  await runLoop().then(() => {
    console.log(guilds);
    //await sendPayloadToSabre(JSON.stringify({
    //  "token": token,
    //  "guilds": guilds
    //}), "getGuilds").then((r) => {
    //  res.json(r)
    //  console.log(r + " || respon")
    //})

    res.json(guilds)
  })
  })
  .catch((error) => {
    //console.error(error);
  });

});

router.get("/api/user", async (req, res) => {
  const token_b = req.header("token");
  const guild = req.header("guildId");
  axios
  .get("https://discord.com/api/v9/users/@me/guilds", {headers: {"Authorization": token_b}})
  .then((resu) => {
    console.log(`statusCode: ${resu.status}`);
    //console.log(resu);

    res.json(resu.data)
  })
  .catch((error) => {
    //console.error(error);
  });
})

router.get("/api/guild", async (req, res) => {
  const token_b = req.header("token");
  const guild = req.header("guildId");
  const token = token_b.replace("Bearer ", "");
  let retval = {"guild": {}, "member": {}}
  axios
  .get("https://discord.com/api/v9/users/@me/guilds", {headers: {"Authorization": token_b}})
  .then((resu) => {
    let found = false;
    if(resu.status != 200) {
      res.json({"error": resu.status})
      return;
    }
    for(let i in resu.data) {
      if(resu.data[i]["id"] == guild) {
        found = true;
      }


    }
    if(!found) {
      res.json({"error": 804})
      return
    }
  axios
  .get("https://discord.com/api/v9/guilds/" + guild + "/members/416617058248425473", {headers: {"Authorization": "Bot " + bot_token}})
  .then((resu) => {
    console.log(`statusCode: ${resu.status}`);
    //console.log(resu);
    retval["guild"] = resu.data
    axios
  .get("https://discord.com/api/v9/guilds/" + guild + "/members/416617058248425473", {headers: {"Authorization": "Bot " + bot_token}})
  .then((resu) => {
    console.log(`statusCode: ${resu.status}`);
    //console.log(resu);
    retval["member"] = resu.data
    res.json(retval)
  })
  .catch((error) => {
    //console.error(error);
  });
  })
  .catch((error) => {
    //console.error(error);
  });
})
.catch((error) => {
  //console.error(error);
});
})





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
