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
      /*<div>
        <h1 className="title is-4">List Of Available Modules</h1>
        <p>What Modules Do You Want To Use?</p>


        <Card data={new Array("Moderation", "Adds Commands That Allow You To Punish Wrong-doers")} />
        <Card data={new Array("Auto-Mod", "Reduce The Stress On Your Mods By Letting Sabre Take On Some Of The Work.  Block Bad Words, Invite Links, Spam, and More!")} />
        <Card data={new Array("Welcomer", "Give New Users A Warm Welcome With Sabre's Welcomer.  Customize Your Welcome Message To Suit Your Server!")} />
        <Card data={new Array("Auto-Responder", "Respond To Specific Messages Automatically With Configurable Messages From Saying Hi To Telling The Time!")} />
        <Card data={new Array("Leveling", "Sabre's Leveling Is Just Like The Big Blue Boi's Leveling But With Free Role Rewards Added On!")} />
        <Card data={new Array("Auto-Role", "Give New Members Roles Automatically With Sabre's Auto-Role.")} />
        <Card data={new Array("Reaction-Roles", "Let Your Users Give Themselves Roles.  From Colour Roles To Pinging Roles You Can Configure Anything With Sabre!")} />
        <Card data={new Array("Music", "Play Music With Sabre's High Quality Music Module! It Ain't Dead Yet!")} />
        <Card data={new Array("Modlog", "Dedicate A Channel For Sabre To Record What Goes On On Your Server.  From Detecting Deleted Messages To Showing Who Banned Your Friend.")} />

        <p>{JSON.stringify(props.user)}</p>
      </div>*/
      <div>
        <h1 className="title is-4">Hello, Olwin1</h1>
        <p>Currently Configuring: TheSabreGuild</p>
        <br />
        <br />
      <div className="columns">
                <div className="is-card column margin-15">
          <h1 className="title is-5">Total Members</h1>
          <p className="subtitle is-6 is-indented">633</p>
            </div>
            <div className="is-card column margin-15">
          <h1 className="title is-5">Total Online Members</h1>
          <p className="subtitle is-6 is-indented">45</p>
            </div>
            </div>

            <div className="is-card margin-15">
          <h1 className="title is-5">Get Premium</h1>
          <p className="subtitle is-6 is-indented">Support The Continued Development Of Sabre Bot and Get Some Sweet Cosmetic Upgrades. (Coming Soon)</p>
            </div>
            <div className="columns">
                <div className="is-card column margin-15">
          <h1 className="title is-5">Prefix</h1>
          <p className="qs"><input className="field control inputnew thirty" type="text" placeholder="Enter The Prefix You Want Here (e.g !)" maxLength={3} defaultValue="!" /></p><span className="svae"></span><br /><button className="button purple is-grun qs">Save</button>
            </div>
            <div className="is-card column margin-15">
            <h1 className="title is-5">Language</h1>
          <p className="qs"><input className="field control inputnew thirty" type="text" placeholder="Enter The Prefix You Want Here (e.g !)" maxLength={3} defaultValue="!" /></p><span className="svae"></span><br /><button className="button purple is-grun qs">Save</button>
            </div>
            </div>

            <div className="is-card margin-15">
          <h1 className="title is-5">Need Help?</h1>
          <p className="subtitle is-6 is-indented">Need help Setting Up Sabre Bot? No Worries We Have Your Back! Just Join Our Support Server And We Will Be Happy To Help!</p>
          <button className="button purple is-purple qs">Join The Support Server</button>
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
