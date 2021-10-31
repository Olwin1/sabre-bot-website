import React, { FC, useState } from "react";
import useToggle from "./hooks/toggle";
interface TyProps {
  user: JSON;
}
interface CardProps {
  user: JSON;
}
interface BtnProps {
  type: string;
}

const Main: FC<TyProps> = (props) => {

  const Content: FC<CardProps> = (props) => {


    const Button: FC<BtnProps> = (props) => {
      let toggle = false;
      const t = (type:string) => {
        const x = document.getElementById("btn" + type);
        const y = document.getElementById("handle" + type);
        toggle = !toggle;
        if (toggle) {
          x.classList.add("is-ToggleButtonA");
          y.classList.add("handleA");
        } else {
          x.classList.remove("is-ToggleButtonA");
          y.classList.remove("handleA");
        }
      };

      return (
        <button id={"btn" + props.type} className={!toggle ? "is-ToggleButton" : "is-ToggleButton is-ToggleButtonA"} onClick={() => t(props.type)}>
          <div
            id={"handle" + props.type}
            className={!toggle ? "handle lds-ring" : "handle lds-ring handleA"}
          ><div></div></div>
        </button>
      );
    };
    return (
      <div>
        <h1 className="title is-4">List Of Available Modules</h1>
        <p>What Modules Do You Want To Use?</p>
        




        <div className="is-card">
          <div className="float-right">
            <Button type="Leveling" />
          </div>
          <h1 className="title is-5">Leveling</h1>
          <p className="subtitle is-6 is-indented">Change Your Leveles</p>
        </div>


        <div className="is-card">
          <div className="float-right">
            <Button type="Moderation" />
          </div>
          <h1 className="title is-5">Moderation</h1>
          <p className="subtitle is-6 is-indented">Do Mod Stuff.</p>
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
