import React, { FC, useState } from "react";
import axios from "axios";
import { getCookie } from "../../../cookie-utils";

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
    let tmp2 = [];
    for (let x = 0; x < tmp.length; x++) {
      if (tmp[x].type == 0) {
        tmp2.push(tmp[x]);
      }
    }
    channels = tmp2;
  }
  const WelcomeComponentEntry: FC<WelcomeProps> = (props) => {
    console.log("def val" + props.defVal);
    let textAreaValue: string;
    let optionsAreaValue: string;
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

    const [message, setMessage] = React.useState(null);
    const [message2, setMessage2] = React.useState(null);
    //const [messageType, setMessageType] = React.useState('info');

    const DELAY = 3500;

    React.useEffect(() => {
      if (!message) {
        return;
      }

      const timer = window.setTimeout(() => setMessage(null), DELAY);
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

    return (
      <div className="columns harlemshake">
        <div
          className={
            props.type == "join" || props.type == "leave"
              ? "column"
              : "column is-two-thirds"
          }
        >
          <h1 className="sub-header">
            {props.channelText}
            {props.defVal}
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
      <h1 className="title is-4">General Options</h1>
      <div
        className="userBanner"
        style={{
          backgroundImage:
            "url(https://cdn.discordapp.com/banners/694545991336067072/a_3607f49281eacb763a93e417e7449676.gif?size=1024)",
          height: "256px",
        }}
      >
        <div className="userBannerText">
          <h1 className="userName">{props.user.username}</h1>
        </div>
      </div>
      <div className="is-card">
        <p>Languages</p>
      </div>
      <div className="columns">
        <Card>
          <p>Credits: {props.user.credits}</p>
        </Card>
        <Card>
          <p>Level: {874}</p>
        </Card>
        <Card>
          <p>Rank: {323}</p>
        </Card>
      </div>
      <p>{JSON.stringify(props.user)}</p>

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
