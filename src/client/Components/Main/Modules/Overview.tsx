import React, { FC, useState } from "react";
import useToggle from "./hooks/toggle";
interface TyProps {
  user: JSON;
}
interface BtnProps {
  type: string;
}

const Main: FC<TyProps> = (props) => {
  const [isOn, toggleIsOn] = useToggle();

  const Content: FC<TyProps> = (props) => {

    const Button: FC<BtnProps> = (props) => {
      if(isOn) {
        return(
          <button onClick={() => toggleIsOn()}>On</button>
        )
      }
      else {
        return(
          <button onClick={() => toggleIsOn()}>Off</button>
        )
      }
    }
    return (
      <div>
        <h1 className="title is-4">List Of Available Modules</h1>
        <p>What Modules Do You Want To Use?</p>

        <div className="is-card">
          <h1 className="title is-5">Leveling</h1>
          <p className="subtitle is-6 is-indented">USe This To Lvlup</p>
          <Button type="" />
        </div>
        <p>{JSON.stringify(props.user)}</p>
      </div>
    );
  };
  return (
    <div>
      <Content user={props.user} />
    </div>
  );
};


export default Main;
