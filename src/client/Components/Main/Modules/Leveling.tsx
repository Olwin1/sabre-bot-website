import React, { FC, ReactElement, useState } from "react";
import axios from "axios";
import { getCookie } from "../../../cookie-utils";
import { json } from "body-parser";
import e from "express";
import { Store } from "react-notifications-component";

interface TyProps {
  user: any;
}
interface CardProps {
  children: React.ReactNode;
}
interface LevelingProps {
  guild: string;
  bottom: boolean;
  keyy: number;
  v: lvl;
}
const Card: FC<CardProps> = (props) => {
  return <div className="is-card column">{props.children}</div>;
};
type welcomeItem = {
  join_message: string;
  join_channel: string;
  private: string;
  role: string;
  leave_message: string;
  leave_channel: string;
};
type welcomeType =
  | "join_message"
  | "leave_message"
  | "private"
  | "join_channel"
  | "leave_channel"
  | "role";

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
type welcome = {
  join: join;
  leave: leave;
};
type join = {
  channel: string;
  message: string;
  private: string;
  role: string;
};
type leave = {
  channel: string;
  message: string;
};
type lvl = {
  level: number;
  role: string;
};
let ran = false;

const Main: FC<TyProps> = (props) => {
  let levels_origin = [] as lvl[];
  const [levels, setLevels] = React.useState(levels_origin);
  const [refresh, setRefresh] = React.useState(false);
  console.log(66);

  const [saved, setSaved] = React.useState(true);
  const roles = props.user.roles as role[];
  React.useEffect(() => {
    roles ? roles.shift() : null;
  }, []);

  if (Object.keys(props.user).length != 0) {
    if (props.user.db_guild) {
      console.log("A");
      if (props.user.db_guild.role_rewards) {
        console.log("B");
        if (
          props.user.db_guild.role_rewards.level &&
          props.user.db_guild.role_rewards.id &&
          !ran
        ) {
          console.log("C");
          for (let i = 0; i < props.user.db_guild.role_rewards.id.length; i++) {
            levels_origin.push({
              role: props.user.db_guild.role_rewards.id[i],
              level: props.user.db_guild.role_rewards.level[i],
            });
          }
          if (levels != levels_origin) {
            setLevels(levels_origin);
            ran = true;

            console.log("setted");
          }
        }
      }
    }

    let tmp = props.user.channels;
    let tmp2 = [] as any;
    for (let x = 0; x < tmp.length; x++) {
      if (tmp[x].type == 0) {
        tmp2.push(tmp[x]);
      }
    }
  }
  let levels_change = levels;

  const LevelingComponent: FC<LevelingProps> = (props) => {
    const messageEmpty = <div></div>;
    const [message, setMessage] = React.useState(messageEmpty);
    const [message2, setMessage2] = React.useState(messageEmpty);
    //const [messageType, setMessageType] = React.useState('info');

    const DELAY = 3500;

    React.useEffect(() => {
      if (message == messageEmpty) {
        return;
      }

      const timer = window.setTimeout(() => setMessage(messageEmpty), DELAY);
      return () => {
        window.clearTimeout(timer);
      };
    }, [message]);

    //if (items.leave_channel != "None") {
    //    defchannel = items.leave_channel

    //}
    const Counter = () => {
      const [val, setVal] = React.useState(props.v.level.toString());
      let first = false;
      React.useEffect(() => {
        first = true;
      }, []);
      React.useEffect(() => {
        if (!first) {
          console.log(44);

          saved ? setSaved(false) : null;
        }
      });
      const handleDec = () => {
        let num = parseInt(val) - 1;
        if (num >= 0) {
          setVal(num.toString(10));
        }
      };
      const handleInc = () => {
        let num = parseInt(val) + 1;
        setVal(num.toString(10));
      };
      const calcTime = () => {
        let level = 0;
        let exp = 0;
        let x = exp;
        let y = 0;
        while (level < parseInt(val)) {
          x = 5 * level ** 2 + 50 * level + 100;
          y += x;
          exp += x;
          level += 1;
        }
        console.log(level, exp, x);
        const msgs = exp / 17.5;
        const mins = Math.round(msgs / 3);
        let display = "";
        if (mins < 60) {
          display = mins.toString() + " mins";
        } else if (mins < 1440) {
          let hours = Math.trunc(mins / 60);
          let remaining_mins = mins - hours * 60;
          display = hours + " hours " + remaining_mins + " mins";
        } else if (mins < 10080) {
          let hours = mins / 60;
          let days = Math.trunc(hours / 24);

          hours = Math.round(hours - days * 24);
          display = days + " days " + hours + " hours ";
        } else if (mins < 43800) {
          let hours = mins / 60;
          let days = hours / 24;
          let weeks = Math.trunc(days / 7);

          days = Math.round(days - weeks * 7);
          display = weeks + " weeks " + days + " days";
        } else if (mins < 525600) {
          let hours = mins / 60;
          let days = hours / 24;
          let weeks = days / 7;
          let months = Math.trunc(weeks / 4.34524);

          weeks = Math.round(weeks - months * 4.34524);
          display = months + " months " + weeks + " weeks";
        } else {
          let hours = mins / 60;
          let days = hours / 24;
          let years = Math.trunc(days / 365.25);
          let months = Math.round((years * 365.25) / 30.4167);

          display = years + " years " + months + " months";
        }

        return "Avg: " + display;
      };
      levels_change[props.keyy].level = parseInt(val);
      return (
        <div>
          <div className="columns counting-div">
            <div className="zero-padd">
              <button
                className="button counting-button"
                onClick={() => handleDec()}
              >
                -
              </button>
            </div>
            <div className="zero-r-padd zero-l-padd">
              <input
                className="counting-input"
                type="text"
                placeholder="value..."
                value={val}
                maxLength={3}
                onChange={(e) => {
                  setVal(e.target.value.replace(/[^0-9.]/g, ""));
                }}
              />
            </div>
            <div className="zero-padd">
              <button
                className="button counting-button"
                onClick={() => handleInc()}
              >
                +
              </button>
            </div>
          </div>
          <p>{calcTime()}</p>
        </div>
      );
    };
    const deleteComponent = (key: string, keyy: number) => {
      console.log("W");
      let levels_change_tmp = [] as lvl[];
      for (let i = 0; i < levels_change.length; i++) {
        console.log("X");
        console.log(i, keyy);
        if (i != keyy) {
          console.log("Y");
          levels_change_tmp.push(levels_change[i]);
        }
      }
      console.log("Z");
      if (levels_change_tmp.length != levels_change.length) {
        console.log("|");
        levels_change = levels_change_tmp;
        setLevels(levels_change);
        console.log(33);

        saved ? setSaved(false) : null;
      }
    };
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      levels_change[props.keyy].role = e.target.selectedOptions[0].value;
      saved ? setSaved(false) : null;
    };
    return (
      <div
        className={
          props.bottom
            ? "columns level-card bottom-card is-variable is-8"
            : "columns level-card is-variable is-8"
        }
      >
        <div className="column">
          <div className="columns is-8 is-variable">
            <div className="column">
              <h1 className="sub-header">
                <Counter />
              </h1>
            </div>
            <div className="column">
              <div className="select is-primary">
                <select
                  onChange={(e) => handleChange(e)}
                  defaultValue={props.v.role}
                >
                  {roles.map((role) => (
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
                      id={role.id}
                    >
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="column">
              <button
                onClick={() => deleteComponent(props.v.role, props.keyy)}
                className="button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  if (Object.keys(props.user).length != 0) {
    let optionsAreaValue: string | null;
    const saveContent = () => {
      let lvls = [] as number[];
      let ids = [] as string[];
      for (let i = 0; i < levels_change.length; i++) {
        lvls.push(levels_change[i].level);
        ids.push(levels_change[i].role);
        setLevels(levels_change);
        levels_origin = levels;
        setRefresh(!refresh);
      }
      const body = {
        levels: lvls,
        id: ids,
        guild: props.user["db_guild"]["id"],
        channel: optionsAreaValue != "null" ? optionsAreaValue : null,
      };
      if (saved) {
        return;
      }
      axios
        .post("http://localhost:3000/api/levels", body, {
          headers: { token: "Bearer " + getCookie("token") },
        })
        .then(async (resu) => {
          levels_origin = levels;
          !saved ? setSaved(true) : null;
          Store.addNotification({
            title: "Success",
            message: "Role Rewards Saved!",
            type: "success",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
        })
        .catch((error) => {
          Store.addNotification({
            title: "Error",
            message: "Role Rewards Failed To Save!",
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
          console.error(error);
        });
    };
    const addReward = async () => {
      levels_change.push({ level: 0, role: "0" } as lvl);
      console.log(levels_change, levels);
      await setLevels(levels_change);
      console.log("updated? plsssssss");
      console.log(22);
      saved ? setSaved(false) : null;
      setRefresh(!refresh);
    };
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      optionsAreaValue = e.target.selectedOptions[0].value;
      console.log(11);
      saved ? setSaved(false) : null;
    };
    return (
      <div>
        <h1 className="title is-4">Leveling Setup</h1>
        <p>Levelup Messages Channel</p>
        <div className="select is-primary">
          <select
            onChange={(e) => {
              handleChange(e);
            }}
          >
            <option
              style={{ color: "#cfcfcf" }}
              value={"null"}
              key={"null"}
              key-id={"null"}
            >
              Current Channel
            </option>
            {props.user.channels.map((channel: any) => (
              <option
                style={{ color: "#cfcfcf" }}
                value={channel.id}
                key={channel.id}
                key-id={channel.id}
              >
                {channel.name}
              </option>
            ))}
          </select>
        </div>
        <br />
        <hr />
        <br />
        <div className="columns leveling-table-top is-variable is-8">
          <div className="column">
            <b>Level</b>
          </div>
          <div className="column">
            <b>Role Reward</b>
          </div>
          <div className="column is-one-fifth">
            <b>Actions</b>
          </div>
        </div>
        {levels.map((val, i) => (
          <LevelingComponent
            guild={props.user["db_guild"]["id"]}
            v={val}
            bottom={levels.length - 1 == i ? true : false}
            key={i}
            keyy={i}
          />
        ))}
        <button className="button" onClick={() => addReward()}>
          Add Reward
        </button>
        <div className={!saved ? "save-component" : "save-component hidden"}>
          <div className="columns">
            <div className="column save-left">
              <p className="save-text">Careful! You Have Unsaved Changes</p>
            </div>
            <div className="column save-right">
              <button className="button" onClick={() => saveContent()}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
};

export default Main;
