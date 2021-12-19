import React, { FC, useState } from "react";
import useToggle from "./hooks/toggle";

interface TyProps {
  user: JSON;
}
interface CardProps {
  data: Array<string>;
}
interface BtnProps {
  type: string;
}
const Button: FC<BtnProps> = (props) => {
  let toggle = false;
  const t = (type: string) => {
    const x = document.getElementById("btn" + type);
    const y = document.getElementById("handle" + type);
    toggle = !toggle;

    //Send Click Data To API.
    const apiGet = async (type:string, toggle:boolean) => {
        y.classList.add("lds-ring");
        return window.fetch("https://jsonplaceholder.typicode.com/users/1")
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            y.classList.remove("lds-ring");
            return response.json()
          })
    };
    apiGet(props.type, toggle);

    if (toggle) {
      x.classList.add("is-ToggleButtonA");
      y.classList.add("handleA");
    } else {
      x.classList.remove("is-ToggleButtonA");
      y.classList.remove("handleA");
    }
  };

  return (
    <button
      id={"btn" + props.type}
      className={
        !toggle ? "is-ToggleButton" : "is-ToggleButton is-ToggleButtonA"
      }
      onClick={() => t(props.type)}
    >
      <div
        id={"handle" + props.type}
        className={!toggle ? "handle" : "handle handleA"}
      >
        <div></div>
      </div>
    </button>
  );
};
const CommandsList: FC<CardProps> = (props) => {
  return(
    <div>
      <div className="float-right">
        <Button type={props.data[0]} />
      </div>
      <h1 className="title is-6">{props.data[0]}</h1>
      <p className="subtitle is-6 is-indented">{props.data[1]}</p>
    </div>
  )
}

const Main: FC<TyProps> = (props) => {
  const toggled = false
  const Button: FC<BtnProps> = (props) => {
    let toggle = toggled;

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


  const roleSet = async (type: string, role: string, element: string) => {
    const y = document.getElementById(element)
    y.classList.add("is-loading");
    return window
      .fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        y.classList.remove("is-loading");
        console.log(type, role)
        return response.json();
      });
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
        <div className="select is-rounded is-primary" id="helper-select">
          <select name="languages" id="helper" disabled={toggled? false : true} onChange={(e) => roleSet("helper",e.target.value,"helper-select")}>
            <option value="helper">Helper</option>
            <option value="helper2">Helper2</option>
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
        <div className="select is-rounded is-primary" id="mod-select">
          <select name="languages" id="mod" disabled={toggled? false : true} onChange={(e) => roleSet("mod",e.target.value,"mod-select")}>
            <option value="moderator">Moderator</option>
            <option value="moderator">Moderator2</option>
          </select>
        </div>


        <br />
        <br />
        <hr />
        <br />
        <br />
        <h2 className="title is-5">Commands</h2>
        <p className="subtitle is-6">
          The More Powerful Moderation Commands. Commands Such as Bans, Channel
          Locks and Kicks Will Only Be Available To Members With This Role.
        </p>
        <div className="is-list is-100" id="mod-select">
          <ul>
            <li><CommandsList data={new Array("/ban", "Pretty Self Explanitory")} /></li>

          </ul>
        </div>




      </div>
    </div>
  );
};

export default Main;
