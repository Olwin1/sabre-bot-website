import React, { FC, useState } from "react";

interface TyProps {
  user: JSON;
}
interface CardProps {
  data: JSON;
}
const Card: FC<CardProps> = (props) => {
  return (
    <div className="float-right is-padded">
      <div className="select is-rounded is-primary">
        <p>dddd</p>
      </div>
    </div>
  );
};

const Main: FC<TyProps> = (props) => {
  return (
    <div>
      <h1 className="title is-4">General Options</h1>
      <div className="is-card">
        <div className="columns">
          <div className="column">
            <p>Languages</p>
          </div>
          <div>
            <Card data={props.user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
