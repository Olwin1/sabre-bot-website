import React from "react";
import { FC } from "react"

interface TyProps {
  user:JSON
}

const Main: FC<TyProps> = (props) => {
  return (
    <div>
      <p>Dis Is Da Main LOlolololololol</p>
      <p>{JSON.stringify(props.user)}</p>
      </div>
  )
};

export default Main;