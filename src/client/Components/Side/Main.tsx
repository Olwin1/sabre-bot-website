import React from "react";
import { FC } from "react";

interface TyProp {
  link: string;
  text: string;
}
interface SideProp {
  guilds: any;
}
interface GProp {
  uid: string;
}
interface UProp {
  uid: string;
}
const Subitem: FC<TyProp> = (props): JSX.Element => {
  return (
    <li>
      <a href={"#" + props.link} className="no-select">
        {props.text}
      </a>
    </li>
  );
};
const Useritem: FC<UProp> = (props): JSX.Element => {
  return (
    <li>
      <img
        src={
          "https://www.jing.fm/clipimg/full/13-136405_clipart-big-image-default-user-icon-png.png"
        }
        width="64"
        className="no-select listImage"
      ></img>
    </li>
  );
};
const Guilditem: FC<GProp> = (props): JSX.Element => {
  return (
    <li>
      <img
        src={"https://i.imgur.com/tq6xGet.png"}
        width="64"
        className="no-select listImage"
      ></img>
    </li>
  );
};

const Sidebar: FC<SideProp> = (props) => {
  const h = window.location.hash.toLowerCase();
  let tmp =
    h == "#profile" ||
    h == "#credits" ||
    h == "#background" ||
    h == "#reward" ||
    h == "#logout" ||
    h == ""
      ? true
      : false;
  const [type, setType] = React.useState(tmp);
  const SidebarOptions = () => {
    if (!type) {
      return (
        <div className="is-tall column">
          <p>Dashboard</p>
          <ul className="menu-list">
            <Subitem link="overview" text="Overview" />
            <Subitem link="settings" text="Settings" />
            <Subitem link="embed" text="Embed" />

            <br />

            <Subitem link="moderation" text="Moderation" />
            <Subitem link="welcomer" text="Welcomer" />
            <Subitem link="leveling" text="Leveling" />
            <Subitem link="reactionroles" text="Reaction Roles" />
            <Subitem link="music" text="Music" />

            <br />
            <br />

            <Subitem link="modlog" text="Mod-Log" />
          </ul>
        </div>
      );
    } else {
      return (
        <div className="is-tall column">
          <p>User</p>
          <ul className="menu-list">
            <Subitem link="profile" text="Profile" />
            <Subitem link="credits" text="Credits" />

            <br />

            <Subitem link="background" text="Rank Backgrounds" />
            <Subitem link="reward" text="Daily Gift" />
            <br />
            <br />
            <Subitem link="logout" text="Logout" />
          </ul>
        </div>
      );
    }
  };
  const changeUser = () => {
    if (!type) {
      setType(true);
    }
    window.location.hash = "#profile";
  };

  const changeGuild = (guild_id: string) => {
    if (type) {
      setType(false);
    }
    window.location.hash = "#overview";
  };

  return (
    <div className="columns">
      <div className="is-tall column is-72px">
        <ul className="menu-list serverList">
          <div onClick={() => changeUser()}>
            <Useritem uid="416617058248425473" />
          </div>
          <hr />
          <div onClick={() => changeGuild("704255331680911402")}>
            <Guilditem uid="704255331680911402" />
          </div>
        </ul>
      </div>

      <SidebarOptions />
    </div>
  );
};

export default Sidebar;
