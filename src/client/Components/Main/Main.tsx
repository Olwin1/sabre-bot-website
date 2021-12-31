import React, { FC, useState } from "react";
import * as modules from "./Modules";

interface TyProps {
  user: JSON;
}

const Main: FC<TyProps> = (props) => {
  const [component, setComponent] = useState("#overview");

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


      {component.toLowerCase() === "#modlog" && <modules.Settings user={props.user}/>}



    </div>
  );
};

export default Main;
