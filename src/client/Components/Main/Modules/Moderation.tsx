import React, { FC, useState } from "react";
import useToggle from "./hooks/toggle";

interface TyProps {
  user: JSON;
}
interface CardProps {
  data: JSON;
}
interface BtnProps {
  type: string;
}
const Card: FC<CardProps> = (props) => {
  return (
    <div className="float-right is-padded">
      <div className="select is-rounded is-primary">
        <select name="languages" id="languages">
          <option value="english">English</option>
        </select>
      </div>
    </div>
  );
};

const Main: FC<TyProps> = (props) => {
  const Button: FC<BtnProps> = (props) => {
    let toggle = false;

    const t = (type: string) => {
      const x = document.getElementById("btn" + type);
      const y = document.getElementById("Modulehandle" + type);
      toggle = !toggle;

      //Send Click Data To API.
      const apiGet = async (type: string, toggle: boolean) => {
        y.classList.add("lds-ring");
        return window
          .fetch("https://jsonplaceholder.typicode.com/users/1")
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            y.classList.remove("lds-ring");
            return response.json();
          });
      };
      apiGet(props.type, toggle);
      const helper = document.getElementById("helper") as HTMLInputElement;
      helper.disabled = !helper.disabled;
      const mod = document.getElementById("mod") as HTMLInputElement;
      mod.disabled = !mod.disabled;
      if (toggle) {
        x.classList.add("is-ModuleButtonA");
        y.classList.add("ModulehandleA");
      } else {
        x.classList.remove("is-ModuleButtonA");
        y.classList.remove("ModulehandleA");
      }
    };
    return (
      <button
        id={"btn" + props.type}
        className={
          !toggle ? "is-ModuleButton" : "is-ModuleButton is-ModuleButtonA"
        }
        onClick={() => t(props.type)}
      >
        <div
          id={"Modulehandle" + props.type}
          className={!toggle ? "Modulehandle" : "Modulehandle ModulehandleA"}
        >
          <div></div>
        </div>
      </button>
    );
  };

  return (
    <div>
      <h1 className="title is-4">Moderation</h1>
      <div className="is-card">
        <div className="columns">
          <div className="column">
            <h2>Toggle Module</h2>
          </div>
          <div>
            <Button type="toggle_moderation" />
          </div>
        </div>

        <h2 className="title is-5">Helper Role</h2>
        <p className="subtitle is-6">
          The Most Basic Of Moderation Commands. In Order To Use Commands Such
          as Warn and Mute You Will Need To Have The Role Specified Here.
        </p>
        <div className="select is-rounded is-primary">
          <select name="languages" id="helper">
            <option value="helper">Helper</option>
          </select>
        </div>
        <br />
        <br />
        <hr />
        <h2 className="title is-5">Mod Role</h2>
        <p className="subtitle is-6">
          The More Powerful Moderation Commands. Commands Such as Bans, Channel
          Locks and Kicks Will Only Be Available To Members With This Role.
        </p>
        <div className="select is-rounded is-primary">
          <select name="languages" id="mod">
            <option value="moderator">Moderator</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Main;
