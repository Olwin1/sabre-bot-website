import React, { FC, useState } from "react";

interface TyProps {
  user: any;
}
interface CardProps {
    children: React.ReactNode
}
const Card: FC<CardProps> = (props) => {
  return (
    <div className="is-card column">
        {props.children}
    </div>
  );
};

const Main: FC<TyProps> = (props) => {
  return (
    <div>
      <h1 className="title is-4">General Options</h1>
      <div className="userBanner" style={{backgroundImage:"url(https://cdn.discordapp.com/banners/694545991336067072/a_3607f49281eacb763a93e417e7449676.gif?size=1024)",height:"256px"}}><div className="userBannerText"><h1 className="userName">{props.user.username}</h1></div></div>
      <div className="is-card">

            <p>Languages</p>
          </div>
          <div className="columns">
            <Card><p>Credits: {props.user.credits}</p></Card>
            <Card><p>Level: {874}</p></Card>
            <Card><p>Rank: {323}</p></Card>
          </div>
            <p>{JSON.stringify(props.user)}</p>

    </div>
  );
};

export default Main;
