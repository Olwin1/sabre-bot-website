import React, { FC, useState } from "react";
import * as modules from "./Modules";
import axios from "axios";
import {getCookie} from "../../cookie-utils"
interface TyProps {
  user: JSON;
  guildId: string;
  guild: any;
}
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const Main: FC<TyProps> = (props) => {
  let page = window.location.hash
  if(page == "" ) {
    page = "#overview"
  }
  const [guild, setGuild] = useState({});
  const [component, setComponent] = useState(page);
  console.log("ckeck" + props.guildId != "" && Object.keys(guild).length === 0)
  console.log(guild)
  /*if(props.guildId != "" && Object.keys(guild).length === 0) {
    axios
    .get("http://localhost:3000/api/guild", {headers: {"token": "Bearer " + getCookie("token"), "guildId": props.guildId}})
    .then((resu) => {
      console.log(resu.data)
      setGuild(resu.data)
    })
    .catch((error) => {
      //console.error(error);
    });

  }*/

  const locationHashChanged = () => {
    setComponent(window.location.hash);
  };

  window.onhashchange = locationHashChanged;

  return (
    <div>
      {component.toLowerCase() === "#overview" && <modules.Overview user={props.user}/>}
      {component.toLowerCase() === "#settings" && <modules.Settings user={props.user}/>}
      {component.toLowerCase() === "#embed" && <modules.Embed user={props.user}/>}

      {component.toLowerCase() === "#moderation" && <modules.Moderation user={props.user}/>}
      {component.toLowerCase() === "#automod" && <modules.Settings user={props.user}/>}
      {component.toLowerCase() === "#welcomer" && <modules.Settings user={props.user}/>}
      {component.toLowerCase() === "#autoresponder" && <modules.Settings user={props.user}/>}
      {component.toLowerCase() === "#leveling" && <modules.Settings user={props.user}/>}
      {component.toLowerCase() === "#autorole" && <modules.Settings user={props.user}/>}
      {component.toLowerCase() === "#reeactionroles" && <modules.Settings user={props.user}/>}
      {component.toLowerCase() === "#music" && <modules.Settings user={props.user}/>}

      {component.toLowerCase() === "#profile" && <modules.Profile user={props.user}/>}
      {component.toLowerCase() === "#credits" && <modules.Settings user={props.user}/>}
      {component.toLowerCase() === "#background" && <modules.Settings user={props.user}/>}
      {component.toLowerCase() === "#reward" && <modules.Settings user={props.user}/>}
      {component.toLowerCase() === "#logout" && <modules.Settings user={props.user}/>}

      {component.toLowerCase() === "#modlog" && <modules.Settings user={props.user}/>}



    </div>
  );
};

export default Main;
