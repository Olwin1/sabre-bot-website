import React, { FC,useState } from "react";
import * as modules from "./Modules";

interface TyProps {
  user:JSON
}

const Main: FC<TyProps> = (props) => {
  const [component, setComponent] = useState("Overview");
  return (
    <div>
      {component === 'Overview' && <modules.Overview />}
      {component === 'Settings' && <modules.Settings />}
      <p>Dis Is Da Main LOlolololololol</p>
      <p>{JSON.stringify(props.user)}</p>
      <button onClick={() => setComponent("Settings")}>Settings</button>
      <button onClick={() => setComponent("Overview")}>Overview</button>
      </div>
  )
};
const Test1 = () => {
  return(<p>Test1</p>)
}
const Test2 = () => {
  return(<p>Test2</p>)
}

export default Main;