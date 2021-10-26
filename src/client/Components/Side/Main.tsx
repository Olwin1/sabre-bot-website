import React from "react";
import { FC } from 'react'

interface TyProp {
    link: string,
    text: string,
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

const Sidebar = () => {
  return (
    <div className="is-tall">
      <p>Dashboard</p>
      <ul className="menu-list">
        <Subitem link="overview" text="Overview" />
        <Subitem link="settings" text="Settings" />
        <Subitem link="embed" text="Embed" />

        <br />

        <Subitem link="moderation" text="Moderation" />
        <Subitem link="automod" text="Auto-Mod" />
        <Subitem link="welcomer" text="Welcomer" />
        <Subitem link="autoresponder" text="Auto-responder" />
        <Subitem link="leveling" text="Leveling" />
        <Subitem link="autorole" text="Auto-Role" />
        <Subitem link="reactionroles" text="Reaction Roles" />
        <Subitem link="music" text="Music" />

        <br /><br />

        <Subitem link="modlog" text="Mod-Log" />

      </ul>
    </div>
  );
};

export default Sidebar;
