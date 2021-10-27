import React, { FC,useState } from "react";


interface TyProps {
  user:JSON
}

const Main: FC<TyProps> = (props) => {
  return (
    <div>
      <p>Overview</p>
      <p>{JSON.stringify(props.user)}</p>
      </div>
  )
};


export default Main;