import React, { FC, useRef, useState } from "react";
import Picker from 'emoji-picker-react';
import { native } from "pg";
interface TyProps {
  user: any;
}
type role = {
    id: string;
    name: string;
    permissions: string;
    position: number;
    color: number;
    hoist: boolean;
    managed: boolean;
    mentionable: boolean;
    icon: string;
    unicode_emoji: string;
  };

let handleEmojiClick = ():void => null;
const Main: FC<TyProps> = (props) => {

//START EMOJIS HERE

//END EMOJIS HERE
const [chosenEmoji, setChosenEmoji] = React.useState(null);

const onEmojiClick = (event: any, emojiObject: any) => {
  setChosenEmoji(emojiObject);
};



    let textAreaValue:string
    const roles = props.user.roles as role[];
    roles ? roles.shift() : null;
    const Card = () => {
        return (
          <div className="float-right is-padded">
              <div className="select is-primary is-rounded">
                  <select>
                {roles.map((role:role) => (
                  <option
                    style={{
                      color:
                        role.color != 0
                          ? "#" + role.color.toString(16)
                          : "#cfcfcf",
                    }}
                    value={role.id}
                    key={role.id}
                    key-id={role.id}
                  >
                    {role.name}
                  </option>
                ))}
                </select>
                </div>
          </div>
        );
      };
      const addEmoji = (emoji: any) => {
          console.log(emoji)
      }
      const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        textAreaValue = e.target.value
      }
  return (
    <div>
      <h1 className="title is-4">General Options</h1>
      <div className="is-card">
        <div className="columns">
          <div className="column">
          {Object.keys(props.user).length != 0 ? (
        <Card />
      ) : (
        ""
      )}
</div>
        </div>
        <div className="column">
        <input
              id="channelidinput"
              className="input is-primary resize-lock auto-height"
              maxLength={20}
              onChange={(e) => (handleTextChange(e))}
              pattern="[0-9]"
            />

<div>
      {chosenEmoji ? (
        <span>You chose: {chosenEmoji.emoji}</span>
      ) : (
        <span>No emoji Chosen</span>
      )}
      <Picker onEmojiClick={onEmojiClick} /*pickerStyle={{ width: '100%' }}*//>
    </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
