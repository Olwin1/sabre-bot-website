import * as React from "react";
import getUser from "./User";
import { Sidebar } from "./Components/Side";
import { Main } from "./Components/Main";
import axios from "axios";
import { getCookie } from "./cookie-utils";
import { Buffer } from "buffer";

/* HOOK REACT EXAMPLE */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const App = () => {
  const Outer = () => {
    const [guilds, setGuilds] = React.useState({});
    const [guild, setGuild] = React.useState({});
    React.useEffect(() => {
      axios
        .get("http://localhost:3000/api/guilds", {
          headers: { token: "Bearer " + getCookie("token") },
        })
        .then(async (resu) => {
          let wait = 0;
          if (resu.headers["x-ratelimit-remaining"] == "0") {
            wait = parseInt(resu.headers["x-ratelimit-reset-after"]);
          }
          await delay(wait * 1000);

          setGuilds(resu.data);

          delay(2000).then(() => {
            console.log("loadguild");
            axios
              .get("http://localhost:3000/api/guild", {
                headers: {
                  token: "Bearer " + getCookie("token"),
                  guildId: "704255331680911402",
                  userId: "416617058248425473",
                },
              })
              .then(async (resu) => {
                setGuild(resu.data);
              });
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    const Inner = () => {
      let x = getUser();
      x.credits = 321;
      x.background = 1;

      console.log(x, "x is load");

      return (
        <div className="is-tall">
          <section id="both" className="main-content columns is-tall">
            <aside
              id="aside"
              className="column is-2 is-narrow-mobile is-tall section is-hidden-mobile is-scrollable"
            >
              <Sidebar guilds={guilds} />
            </aside>
            <div className="wrapperThing">
              <div id="main" className="container column is-10">
                <div className="section">
                  <Main user={x} guildId={"704255331680911402"} guild={guild} />
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    };
    return <Inner />;
  };
  return <Outer />;
};

export default App;
