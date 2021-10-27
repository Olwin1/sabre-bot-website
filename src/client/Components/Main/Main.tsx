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
      {component.toLowerCase() === "#settings" && <modules.Settings />}
      {component.toLowerCase() === "#embed" && <modules.Settings />}

      {component.toLowerCase() === "#moderation" && <modules.Settings />}
      {component.toLowerCase() === "#automod" && <modules.Settings />}
      {component.toLowerCase() === "#welcomer" && <modules.Settings />}
      {component.toLowerCase() === "#autoresponder" && <modules.Settings />}
      {component.toLowerCase() === "#leveling" && <modules.Settings />}
      {component.toLowerCase() === "#autorole" && <modules.Settings />}
      {component.toLowerCase() === "#reeactionroles" && <modules.Settings />}
      {component.toLowerCase() === "#music" && <modules.Settings />}


      {component.toLowerCase() === "#modlog" && <modules.Settings />}



    </div>
  );
};

export default Main;
