import React, { FC, ReactElement, useState } from "react";
import axios from "axios";
import { getCookie } from "../../../cookie-utils";
import { json } from "body-parser";
import { Store } from "react-notifications-component";
interface TyProps {
  user: any;
}
interface WelcomeProps {
  channelText: string;
  defVal: string;
  type: string;
  guild: string;
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
      textAreaValue = welcome.join.role;
      optionsAreaValue = null;
    }


    //if (items.leave_channel != "None") {
    //    defchannel = items.leave_channel

    //}
    const handleClick = () => {
      if(textAreaValue == "" || !textAreaValue) {
        if(optionsAreaValue && optionsAreaValue != "null") {
          Store.addNotification({
                title: "Error",
                message: "You Cannot Set An Empty Message! (Set Channel To None To Remove Message)",
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
              return
            }
      }
      else if (optionsAreaValue == "null" || !optionsAreaValue) {
        if(props.type == "join" || props.type == "leave") {
      Store.addNotification({
          title: "Error",
          message: "You Need To Specify a Channel! (Remove Message To Stop Sabre Sending It)",
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
        return
      }
      }

      const body = {
        type: props.type,
        message: textAreaValue!=""?textAreaValue:null,
        channel: optionsAreaValue!="null"?optionsAreaValue:null,
        guild: props.guild,
      };
      axios
        .post("http://localhost:3000/api/welcome", body, {
          headers: { token: "Bearer " + getCookie("token") },
        })
        .then(async (resu) => {
          Store.addNotification({
            title: "Success",
            message: "Welcome Message Successfully Saved!",
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
            message: "Welcome Message Failed To Save!",
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
                                      <option
                      style={{ color: "#cfcfcf" }}
                      value={"null"}
                      key={"null"}
                      key-id={"null"}
                    >
                      None
                    </option>
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


  return (
    <div>
      <h1 className="title is-4">Welcome Messages</h1>

      

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
      <p>{JSON.stringify(props.user)}</p>
    </div>
  );
};

export default Main;
