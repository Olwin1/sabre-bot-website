import * as React from "react";
import getUser from "./User";
import { Sidebar } from "./Components/Side";
import { Main } from "./Components/Main";
import axios from "axios";
import { getCookie } from "./cookie-utils";
import { Buffer } from 'buffer';

/* HOOK REACT EXAMPLE */
const App = () => {
  var x = getUser();
  x.modules = {
    "moderation": {"toggle": true, "helper_role": "749037230533640194", "mod_role": "749037140851032075"},
    "automod": {"toggle": true},
    "welcomer": {"toggle": true},
    "autoresponder": {"toggle": true},
    "leveling": {"toggle": true},
    "autorole": {"toggle": true},
    "reactionroles": {"toggle": true},
    "music": {"toggle": true},
    "modlog": {"toggle": true},
  };
  x.channels = {
    "704255332234297436": "【🌐】general",
    "746500764633006150": "【🤖】bot-commands",
    "749015960274599946": "【📷】media"
  }
  x.roles = {
    "873594402428289105": "SeXy PinKy, LoVer",
    "749037230533640194": "Platypus",
    "749037140851032075": "Wombat"
  }
  const checkTime = () => {
    const t = window.localStorage.getItem("timestamp")
    if(t) {
      const diff = Date.now() - parseInt(t)
      if (Math.floor(diff / 1000) > 86400) {
        return true
      }
    }
    return false
  }
  const [guilds, setGuilds] = React.useState({})

    axios
    .get("http://localhost:3000/api/guilds", {headers: {"token": "Bearer " + getCookie("token")}})
    .then((resu) => {
      console.log(`statusCode: ${resu.status}`);
      //console.log(resu);
      console.log(resu + "result" + typeof(resu))
      const bufferOriginal = Buffer.from(resu.data);
      setGuilds(JSON.parse(bufferOriginal.toString('utf8')))

    })
    .catch((error) => {
      console.error(error);
    });


  
  console.log(x, "x is load");
  return (
    <div className="is-tall">
      <section id="both" className="main-content columns is-tall">
        <aside
          id="aside"
          className="column is-2 is-narrow-mobile is-tall section is-hidden-mobile is-scrollable"
        >
          <Sidebar guilds={guilds}/>
        </aside>
        <div className="wrapperThing">
        <div id="main" className="container column is-10">
          <div className="section">
            <Main user={x} guildId={"704255331680911402"}/>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
};

export default App;
