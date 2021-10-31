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
    interface CardProps {
      data:Array<string>
    }
    const Card: FC<CardProps> = (props) => {
      return(
        <div className="is-card">
          <div className="float-right">
            <Button type={props.data[0]} />
          </div>
          <h1 className="title is-5">{props.data[0]}</h1>
          <p className="subtitle is-6 is-indented">{props.data[1]}</p>
        </div>
      )
    }
    return (
      <div>
        <h1 className="title is-4">List Of Available Modules</h1>
        <p>What Modules Do You Want To Use?</p>


        <Card data={new Array("Moderation", "Adds Commands ")} />

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
