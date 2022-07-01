import e, * as express from "express";
import * as path from "path";
import axios, { responseEncoding } from "axios";
import { json } from "body-parser";
import getToken from "../../token";
import getRedisPass from "../../redisPass";
import { Client } from "pg";
type members = {
  u_id: string;
  g_id: string;
  exp: number;
  infraction_description: string;
  infraction_date: string;
};
type rr = {
  id: string[];
  level: number[];
  channel: string;
};
const pg = new Client({
  user: "postgres",
  host: "localhost",
  database: "sabre",
  password: "***REMOVED***",
});
pg.connect();

import { createClient } from "redis";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
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

const update_guild = async (guild: any) => {
  await red.set(guild.id, JSON.stringify(guild));
};

const get_guild = async (guild_id: any) => {
  const value = await red.get(guild_id);
  if (!value) {
    let res = await pg.query(
      "SELECT role_rewards, toggle_moderation,  toggle_automod, toggle_welcomer, toggle_autoresponder, toggle_leveling, toggle_autorole, toggle_reactionroles, toggle_music, toggle_modlog, automod_links, automod_invites, automod_mention, automod_swears, welcome_join_channel, welcome_join_message, welcome_join_role, welcome_join_message_p, welcome_leave_message, welcome_leave_channel, modlog_channel, modlog_bans, modlog_warns, modlog_mutes, modlog_purge, modlog_lock, modlog_kick, reaction_roles, role_rewards_id, role_rewards_level, role_rewards_channel FROM guilds WHERE id=$1",
      [guild_id]
    );
    if (!res.rows) {
      // If Guild Is Not Found... Create It
      await pg.query("INSERT INTO guilds (id) VALUES ($1)", [guild_id]);
      res = await pg.query(
        "SELECT role_rewards, toggle_moderation,  toggle_automod, toggle_welcomer, toggle_autoresponder, toggle_leveling, toggle_autorole, toggle_reactionroles, toggle_music, toggle_modlog, automod_links, automod_invites, automod_mention, automod_swears, welcome_join_channel, welcome_join_message, welcome_join_role, welcome_join_message_p, welcome_leave_message, welcome_leave_channel, modlog_channel, modlog_bans, modlog_warns, modlog_mutes, modlog_purge, modlog_lock, modlog_kick, reaction_roles, role_rewards_id, role_rewards_level, role_rewards_channel FROM guilds WHERE id=$1",
        [guild_id]
      );
    }

    console.log("res is: " + JSON.stringify(res));
    const guild = {
      id: guild_id,
      //role_rewards: res.rows[0]["role_rewards"],
      toggle: {
        moderation: res.rows[0]["toggle_moderation"],
        automod: res.rows[0]["toggle_automod"],
        welcomer: res.rows[0]["toggle_welcomer"],
        autoresponder: res.rows[0]["toggle_autoresponder"],
        leveling: res.rows[0]["toggle_leveling"],
        autorole: res.rows[0]["toggle_autorole"],
        reactionroles: res.rows[0]["toggle_reactionroles"],
        music: res.rows[0]["toggle_music"],
        modlog: res.rows[0]["toggle_modlog"],
      },
      automod: {
        links: res.rows[0]["automod_links"],
        invites: res.rows[0]["automod_invites"],
        mention: res.rows[0]["automod_mention"],
        swears: res.rows[0]["automod_swears"],
      },
      welcome: {
        join: {
          channel: res.rows[0]["welcome_join_channel"],
          message: res.rows[0]["welcome_join_message"],
          role: res.rows[0]["welcome_join_role"],
          private: res.rows[0]["welcome_join_message_p"],
        },
        leave: {
          message: res.rows[0]["welcome_leave_message"],
          channel: res.rows[0]["welcome_leave_channel"],
        },
      },
      modlog: {
        channel: res.rows[0]["modlog_channel"],
        bans: res.rows[0]["modlog_bans"],
        warns: res.rows[0]["modlog_warns"],
        mutes: res.rows[0]["modlog_mutes"],
        purge: res.rows[0]["modlog_purge"],
        lock: res.rows[0]["modlog_lock"],
        kick: res.rows[0]["modlog_kick"],
      },
      reaction_roles: res.rows[0]["reaction_roles"],
      members: [] as members[],
      role_rewards: {
        id: res.rows[0]["role_rewards_id"],
        level: res.rows[0]["role_rewards_level"],
        channel: res.rows[0]["role_rewards_channel"],
      } as rr,
    };

    res = await pg.query(
      "SELECT user_id, exp, infraction_description, infraction_date FROM members WHERE guild_id=$1",
      [guild_id]
    );
    for (let member of res.rows) {
      guild["members"].push({
        u_id: member.user_id,
        g_id: guild_id,
        exp: member.exp,
        infraction_description: member.infraction_description,
        infraction_date: member.infraction_date,
      });
    }
    red.set(guild.id, JSON.stringify(guild));

    return guild;
  }
  return JSON.parse(value);
};
// create application/json parser
var jsonParser = json();

router.post("/api/embed", jsonParser, async (req, res, next) => {
  const token_b = req.header("token");
  const token = token_b?.replace("Bearer ", "");
  console.log(`statusCode: ${res.status}`);
  //console.log(resu);
  const unformatted = req.body;
  let fields = [] as any;
  for (let i = 0; i < unformatted.fields.length; i++) {
    if (unformatted.fields[i] != "" && unformatted.fields_t[i] != "") {
      fields.push({
        value: unformatted.fields[i],
        name: unformatted.fields_t[i],
      });
    }
  }
  const data = {
    content: unformatted.content != "" ? unformatted.content : null,
    tts: false,
    embeds: [
      {
        title: unformatted.title != "" ? unformatted.title : null,
        "description ": unformatted.desc != "" ? unformatted.desc : null,
        "url ": unformatted.url != "" ? unformatted.url : null,
        color:
          unformatted.colour.replace("#", "") != ""
            ? parseInt(unformatted.colour.replace("#", ""), 16)
            : null,
        footer: {
          text: unformatted.footer != "" ? unformatted.footer : null,
          url: unformatted.a_ico != "" ? unformatted.a_ico : null,
        },
        image: { url: unformatted.img != "" ? unformatted.img : null },
        thumbnail: { url: unformatted.a_ico != "" ? unformatted.a_ico : null },
        author: {
          name: unformatted.a != "" ? unformatted.a : null,
          url: unformatted.a_url != "" ? unformatted.a_url : null,
          icon_url: unformatted.a_ico != "" ? unformatted.a_ico : null,
        },
        fields: fields,
      },
    ],
  };
  axios
    .post(
      "https://discord.com/api/v9/channels/746500764633006150/messages",
      data,
      { headers: { Authorization: "Bot " + bot_token } }
    )
    .then(async (resu) => {
      console.log("success || : " + resu);
      res.json(resu);
    })
    .catch((error) => {
      console.error(error);
    });
});

router.get("/api/guilds", async (req, res) => {
  const token_b = req.header("token");
  const token = token_b?.replace("Bearer ", "");
  if (!token_b) {
    res.status(401);
    return;
  }
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
  if (!token_b) {
    res.status(401);
    return;
  }
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
  console.log(0);
  const token_b = req.header("token");
  console.log(1);
  const guild = req.header("guildId");
  const user = req.header("userId");
  console.log(2);
  const token = token_b?.replace("Bearer ", "");
  let retval = { guild: {}, roles: {}, db_guild: {}, channels: {} };
  let tmp = await get_guild(guild);
  for (let member of tmp.members) {
    let new_members = [] as any;
    if (member.u_id == user) {
      new_members.push(member);
      tmp.members = new_members;
      break;
    }
  }
  retval.db_guild = tmp;
  console.log(3);
  await delay(1000);
  axios
    .get("https://discord.com/api/v9/guilds/" + guild + "/channels", {
      headers: { Authorization: "Bot " + bot_token },
    })
    .then(async (resu) => {
      let wait = 0;
      if (resu.headers["x-ratelimit-remaining"] == "0") {
        wait = parseInt(resu.headers["x-ratelimit-reset-after"]);
      }
      await delay(wait * 1000);
      console.log(4);
      let found = false;
      if (resu.status != 200) {
        res.json({ error: resu.status });
        return;
      }
      retval.channels = resu.data;

      axios
        .get(
          "https://discord.com/api/v9/guilds/" + guild + "/members/" + user,
          { headers: { Authorization: "Bot " + bot_token } }
        )
        .then(async (resu) => {
          let wait = 0;
          if (resu.headers["x-ratelimit-remaining"] == "0") {
            wait = parseInt(resu.headers["x-ratelimit-reset-after"]);
          }
          await delay(wait * 1000);
          console.log(7);
          console.log(`statusCode Line 152: ${resu.status}`);
          //console.log(resu);
          retval["guild"] = resu.data;
          console.log(8);
          axios
            .get("https://discord.com/api/v9/guilds/" + guild + "/roles", {
              headers: { Authorization: "Bot " + bot_token },
            })
            .then(async (resu) => {
              let wait = 0;
              if (resu.headers["x-ratelimit-remaining"] == "0") {
                wait = parseInt(resu.headers["x-ratelimit-reset-after"]);
              }
              await delay(wait * 1000);
              console.log(9);
              console.log(`statusCode Line 165: ${resu.status}`);
              //console.log(resu);
              retval["roles"] = resu.data;
              res.json(retval);
              console.log(10);
            })
            .catch((error) => {
              console.error(error);
              console.log(11);
            });
        })
        .catch((error) => {
          console.error(error);
          console.log(12);
        });
    })
    .catch((error) => {
      console.error(error);
      console.log(13);
    });
});

//Welcome API Endpoints

router.post("/api/welcome", jsonParser, async (req, res, next) => {
  const token_b = req.header("token");
  console.log(req.body + " || BODY");
  const guild = await get_guild(req.body.guild);
  if (req.body.type == "join") {
    guild.welcome.join.channel = req.body.channel;
    guild.welcome.join.message = req.body.message;
    update_guild(guild);
    res.sendStatus(200);
  } else if (req.body.type == "join_p") {
    guild.welcome.join.private = req.body.message;
    update_guild(guild);
    res.sendStatus(200);
  } else if (req.body.type == "join_r") {
    guild.welcome.join.role = req.body.message;
    update_guild(guild);
    res.sendStatus(200);
  } else if (req.body.type == "leave") {
    guild.welcome.leave.channel = req.body.channel;
    guild.welcome.leave.message = req.body.message;
    update_guild(guild);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
  //console.log(resu);
});
router.post("/api/levels", jsonParser, async (req, res, next) => {
  const token_b = req.header("token");
  console.log(req.body + " || BODY");
  const guild = await get_guild(req.body.guild);
  guild.role_rewards.id = req.body.id;
  guild.role_rewards.level = req.body.levels;
  guild.role_rewards.channel = req.body.channel;
  update_guild(guild);
  res.sendStatus(200);
  //console.log(resu);
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
