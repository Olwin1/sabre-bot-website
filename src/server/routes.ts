import e, * as express from "express";
import * as path from "path";
import axios from "axios";
import { json } from "body-parser";
import getToken from "../../token";
import getRedisPass from "../../redisPass";
import { Client } from "pg";
const pg = new Client({
  user: "postgres",
  host: "localhost",
  database: "sabre",
  password: "***REMOVED***",
});
pg.connect();

import { createClient } from "redis";
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const red = createClient({
  url: "redis://default:" + getRedisPass() + "@161.97.86.11:6379",
});
red.on("connect", () => console.log("::> Redis Client Connected"));
red.connect();
red.on("error", (err) => {
  console.log("Error " + err);
});

const router = express.Router();
const bot_token = getToken();

const checkExists = async (guildId: any) => {
  const t = await red.get(guildId);
  if (!t) {
    const res = await pg.query("SELECT id FROM guilds WHERE id=$1", [guildId]);
    if (res.rows.length != 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

// create application/json parser
var jsonParser = json();

router.post("/api/embed", jsonParser, async (req, res, next) => {
  const token_b = req.header("token");
  const token = token_b.replace("Bearer ", "");
  console.log(`statusCode: ${res.status}`);
  //console.log(resu);
});

router.get("/api/guilds", async (req, res) => {
  const token_b = req.header("token");
  const token = token_b.replace("Bearer ", "");
  axios
    .get("https://discord.com/api/v9/users/@me/guilds", {
      headers: { Authorization: token_b },
    })
    .then(async (resu) => {
      console.log(`statusCode Line 62: ${resu.status}`);
      let guilds = [] as any[];

      const g = resu.data;
      const runLoop = async () => {
        for (var i = 0; i < resu.data.length; i++) {
          if ((Number.parseInt(g[i]["permissions"]) & 0x20) == 0x20) {
            // Check For Manage Server Permissions.

            let tmp = {
              id: g[i]["id"],
              name: g[i]["name"],
              icon: g[i]["icon"],
              hasSabre: false,
            };
            await checkExists(g[i]["id"]).then(async (tt) => {
              if (await checkExists(g[i]["id"])) {
                tmp["hasSabre"] = true;
              }
              guilds.push(tmp);
            });
          }
        }
      };
      await runLoop().then(() => {
        res.json(guilds);
      });
    })
    .catch((error) => {
      //console.error(error);
    });
});

router.get("/api/user", async (req, res) => {
  const token_b = req.header("token");
  const guild = req.header("guildId");
  axios
    .get("https://discord.com/api/v9/users/@me/guilds", {
      headers: { Authorization: token_b },
    })
    .then((resu) => {
      console.log(`statusCode Line 103: ${resu.status}`);
      //console.log(resu);

      res.json(resu.data);
    })
    .catch((error) => {
      //console.error(error);
    });
});

router.get("/api/guild", async (req, res) => {
  console.log(0)
  const token_b = req.header("token");
  console.log(1)
  const guild = req.header("guildId");
  console.log(2)
  const token = token_b.replace("Bearer ", "");
  let retval = { guild: {}, member: {} };
  console.log(3)
  await delay(1000)
  axios
    .get("https://discord.com/api/v9/users/@me/guilds", {
      headers: { Authorization: token_b },
    })
    .then(async (resu) => {
      let wait = 0
      if(resu.headers["x-ratelimit-remaining"] == "0") {
        wait = parseInt(resu.headers["x-ratelimit-reset-after"])
      }
      await delay(wait * 1000)
  console.log(4)
  let found = false;
      if (resu.status != 200) {
        res.json({ error: resu.status });
        return;
      }
      for (let i in resu.data) {
        if (resu.data[i]["id"] == guild) {
          found = true;
        }
      }
      if (!found) {
  console.log(5)
  res.json({ error: 804 });
        return;
      }
  console.log(6)
  axios
        .get(
          "https://discord.com/api/v9/guilds/" +
            guild +
            "/members/416617058248425473",
          { headers: { Authorization: "Bot " + bot_token } }
        )
        .then(async (resu) => {
          let wait = 0
          if(resu.headers["x-ratelimit-remaining"] == "0") {
            wait = parseInt(resu.headers["x-ratelimit-reset-after"])
          }
          await delay(wait * 1000)
  console.log(7)
  console.log(`statusCode Line 152: ${resu.status}`);
          //console.log(resu);
          retval["guild"] = resu.data;
  console.log(8)
  axios
            .get(
              "https://discord.com/api/v9/guilds/" +
                guild +
                "/members/416617058248425473",
              { headers: { Authorization: "Bot " + bot_token } }
            )
            .then(async (resu) => {
              let wait = 0
              if(resu.headers["x-ratelimit-remaining"] == "0") {
                wait = parseInt(resu.headers["x-ratelimit-reset-after"])
              }
              await delay(wait * 1000)
  console.log(9)
  console.log(`statusCode Line 165: ${resu.status}`);
              //console.log(resu);
              retval["member"] = resu.data;
              res.json(retval);
  console.log(10)
})
            .catch((error) => {
              console.error(error);
  console.log(11)
});
        })
        .catch((error) => {
          console.error(error);
  console.log(12)
});
    })
    .catch((error) => {
      console.error(error);
  console.log(13)
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
