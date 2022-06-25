import React, { FC, ReactElement, useState } from "react";
import axios from "axios";
import { getCookie } from "../../../cookie-utils";
import { json } from "body-parser";
import e from "express";

interface TyProps {
  user: any;
}
interface CardProps {
  children: React.ReactNode;
}
interface WelcomeProps {
  channelText: string;
  defVal: string;
  type: string;
  guild: string;
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

const Main: FC<TyProps> = (props) => {
  const roles = props.user.roles as role[];
  roles ? roles.shift() : null;
  let welcome: welcome;
  let channels: any[];

  if (Object.keys(props.user).length != 0) {
    welcome = {
      join: props.user.db_guild.welcome.join as join,
      leave: props.user.db_guild.welcome.leave as leave,
    } as welcome;

    let tmp = props.user.channels;
    let tmp2 = [] as any;
    for (let x = 0; x < tmp.length; x++) {
      if (tmp[x].type == 0) {
        tmp2.push(tmp[x]);
      }
    }
    channels = tmp2;
  }
  else {
    const l = {channel:"0", message:""} as leave
    const j = {channel:"0", message:"", private:"", role:""} as join
    welcome = {join: j, leave: l}

  }
  const WelcomeComponentEntry: FC<WelcomeProps> = (props) => {
    console.log("def val" + props.defVal);
    let textAreaValue: string;
    let optionsAreaValue: string | null;
    if (props.type == "join") {
      textAreaValue = welcome.join.message;
      optionsAreaValue = welcome.join.channel;
    } else if (props.type == "leave") {
      textAreaValue = welcome.leave.message;
      optionsAreaValue = welcome.leave.channel;
    } else if (props.type == "join_p") {
      textAreaValue = welcome.join.private;
      optionsAreaValue = null;
    } else {
      let t = "role";
      textAreaValue = welcome.join.role;
      optionsAreaValue = null;
    }
    const messageEmpty = <div></div>
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

    const Failcomponent = () => {
      return (
        <div>
          <div className="glitch stylish" data-text="FAILED">
            FAILED
          </div>
        </div>
      );
    };

    const Checkcomponent = () => {
      return (
        <div id="results" className="search-results">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
      );
    };
    var defchannel = "";

    //if (items.leave_channel != "None") {
    //    defchannel = items.leave_channel

    //}
    const handleClick = () => {
      const body = {
        type: props.type,
        message: textAreaValue,
        channel: optionsAreaValue,
        guild: props.guild,
      };
      axios
        .post("http://localhost:3000/api/welcome", body, {
          headers: { token: "Bearer " + getCookie("token") },
        })
        .then(async (resu) => {
          setMessage(<Checkcomponent />);
        })
        .catch((error) => {
          setMessage2(<Failcomponent />);
          console.error(error);
        });
    };
    console.log(props.type + "||" + props.defVal);
const Counter = () => {
    const [val, setVal] = React.useState("0")
    const handleDec = () => {
        let num = parseInt(val) - 1
        if(num >= 0) {
        setVal(num.toString(10))
        }
    }
    const handleInc = () => {
        let num = parseInt(val) + 1
        setVal(num.toString(10))
    }
    const calcTime = () => {
        let level = 0
let exp = 0
let x = exp
let y = 0
while (level < parseInt(val)) {
    x = 5*(level**2)+50*level+100
    y += x
    exp += x
    level += 1
}
console.log(level, exp, x)
const msgs = exp / 17.5
const mins = Math.round(msgs / 3)
let display = ""
if(mins < 60) {
    display = mins.toString() + " mins"
}
else if (mins < 1440) {
    let hours = Math.trunc(mins / 60)
    let remaining_mins = mins - hours * 60
    display = hours + " hours " + remaining_mins + " mins"
}
else if (mins < 10080) {
    let hours = mins / 60
    let days = Math.trunc(hours / 24)

    hours = Math.round(hours - days * 24)
    display = days + " days " +hours + " hours "
}
else if (mins < 43800) {
    let hours = mins / 60
    let days = hours / 24
    let weeks = Math.trunc(days / 7)

    days = Math.round(days - weeks * 7)
    display = weeks + " weeks " +days + " days"
}
else if (mins < 525600) {
    let hours = mins / 60
    let days = hours / 24
    let weeks = days / 7
    let months = Math.trunc(weeks / 4.34524)

    weeks = Math.round(weeks - months * 4.34524)
    display = months + " months " +weeks + " weeks"
}
else {
    let hours = mins / 60
    let days = hours / 24
    let years = Math.trunc(days / 365.25)
    let months = Math.round(years * 365.25 / 30.4167)

    display = years + " years " +months + " months"
}

return("Avg: " + display)
    }
    return (
        <div>
        <div className="columns">
            <div className="column">
        <button className="button" onClick={() => handleDec()}>-</button></div>
        <div className="column"><input className='counter' type="text" placeholder="value..." value={val}  onChange={(e) => {setVal(e.target.value.replace(/[^0-9.]/g, ''))}} /></div>
    <div className="column"><button className="button"  onClick={() => handleInc()}>+</button></div>
    </div>
    <p>{calcTime()}</p>
    </div>

    )

}
    return (
      <div className="columns level-card">
        <div className="column">
          <h1 className="sub-header">
            <Counter />
          </h1>
          {props.type != "join_r" ? (
            <textarea
              id="joinmsginput"
              className="input is-primary resize-lock auto-height"
              rows={4}
              cols={50}
              maxLength={2000}
              onChange={(e) => (textAreaValue = e.target.value)}
              defaultValue={props.defVal}
            />
          ) : (
            <div className="select is-primary">
              <select
                defaultValue={props.defVal}
                onChange={(e) =>
                  (textAreaValue = e.target.selectedOptions[0].value)
                }
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
                  >
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div
          className={
            props.type == "join" || props.type == "leave"
              ? "column"
              : "column is-one-third"
          }
        >
          <div>
            <br />
            <button
              className="button is-primary center-btn"
              onClick={() => handleClick()}
            >
              Save
            </button>
            {message}
            {message2}
          </div>
        </div>

        {props.type == "join" || props.type == "leave" ? (
          <div className="column">
            <h1 className="sub-header">
              {props.channelText.split(" ").length == 2
                ? props.channelText.split(" ")[0] + " Channel"
                : props.channelText.split(" ")[0] +
                  " " +
                  props.channelText.split(" ")[1] +
                  " Channel"}
            </h1>
            <div>
              <div className="select is-primary">
                <select
                  defaultValue={
                    props.type == "join"
                      ? welcome.join.channel
                      : welcome.leave.channel
                  }
                  onChange={(e) =>
                    (optionsAreaValue = e.target.selectedOptions[0].value)
                  }
                >
                  {channels.map((channel: any) => (
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
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };
  Object.keys(props.user).length != 0
    ? console.log(
        "join: " + welcome.join.message + " || leave: " + welcome.leave.message
      )
    : null;

  return (
    <div>
      <h1 className="title is-4">Leveling Setup</h1>

      {Object.keys(props.user).length != 0 ? (
        <WelcomeComponentEntry
          channelText="Join Message"
          defVal={welcome.join.message}
          type="join"
          guild={props.user["db_guild"]["id"]}
        />
      ) : (
        ""
      )}
      {Object.keys(props.user).length != 0 ? (
        <WelcomeComponentEntry
          channelText="Leave Message"
          defVal={welcome.leave.message}
          type="leave"
          guild={props.user["db_guild"]["id"]}
        />
      ) : (
        ""
      )}
      {Object.keys(props.user).length != 0 ? (
        <WelcomeComponentEntry
          channelText="Join Private Message"
          defVal={welcome.join.private}
          type="join_p"
          guild={props.user["db_guild"]["id"]}
        />
      ) : (
        ""
      )}
      {Object.keys(props.user).length != 0 ? (
        <WelcomeComponentEntry
          channelText="Join Role"
          defVal={welcome.join.role}
          type="join_r"
          guild={props.user["db_guild"]["id"]}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Main;
