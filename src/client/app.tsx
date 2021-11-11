import * as React from "react";
import getUser from "./User";
import { Sidebar } from "./Components/Side";
import { Main } from "./Components/Main";

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
  console.log(x, "x is load");
  return (
    <div className="is-tall">
      <section id="both" className="main-content columns is-tall">
        <aside
          id="aside"
          className="column is-2 is-narrow-mobile is-tall section is-hidden-mobile is-scrollable"
        >
          <Sidebar />
        </aside>
        <div id="main" className="container column is-10">
          <div className="section">
            <Main user={x} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
