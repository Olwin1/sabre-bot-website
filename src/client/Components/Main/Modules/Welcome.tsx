import React, { FC, useState } from "react";
import axios from "axios"
import { getCookie } from "../../../cookie-utils";

interface TyProps {
  user: any;
}
interface CardProps {
    children: React.ReactNode
}
interface WelcomeProps {
    channelText: string
    defaultValue: string
    endpoint: string
    type: string
    guild: string
}
const Card: FC<CardProps> = (props) => {
  return (
    <div className="is-card column">
        {props.children}
    </div>
  );
};
type welcomeItem = {
    join_message: string
    join_channel: string
    join_private_message: string
    join_role: string
    leave_message: string
    leave_channel: string
  };
  type welcomeType = "join_message"|"leave_message"|"join_private_message"|"join_channel"|"leave_channel"

const WelcomeComponentEntry: FC<WelcomeProps> = (props) => {

let items = {
    "join_message":"Welcome hi hello yes. {user}",
    "join_channel":"704255332234297436",
    "join_private_message": null,
     "join_role":"749036857970655292",
    "leave_message":"Fucking retard left. ({user})",
    "leave_channel":"704255332234297436"
 } as welcomeItem
 let channels = [{
    "id": "41771983423143937",
    "guild_id": "41771983423143937",
    "name": "general",
    "type": 0,
    "position": 6,
    "permission_overwrites": [] as any,
    "rate_limit_per_user": 2,
    "nsfw": true,
    "topic": "24/7 chat about how to gank Mike #2",
    "last_message_id": "155117677105512449",
    "parent_id": "399942396007890945",
    "default_auto_archive_duration": 60
  },
  {
    "id": "41771983423143935",
    "guild_id": "41771983423143937",
    "name": "not-general",
    "type": 0,
    "position": 5,
    "permission_overwrites": [],
    "rate_limit_per_user": 2,
    "nsfw": true,
    "topic": "24/7 chat about how to gank Mike #3",
    "last_message_id": "155117677105512449",
    "parent_id": "399942396007890945",
    "default_auto_archive_duration": 60
  }]

    var textAreaValue = items[props.type + "_message" as welcomeType]
    var optionsAreaValue = items[props.type + "_channel" as welcomeType]

    const [message, setMessage] = React.useState(null);
    const [message2, setMessage2] = React.useState(null);
    //const [messageType, setMessageType] = React.useState('info');



    const DELAY = 3500;

    React.useEffect(() => {
        if (!message) { return; }



        const timer = window.setTimeout(() => setMessage(null), DELAY);
        return () => {
            window.clearTimeout(timer);
        };
    }, [message]);




    const Failcomponent = () => {
        return (
            <div>
                <div className="glitch stylish" data-text="FAILED">FAILED</div>
            </div>
        );
    }

    const Checkcomponent = () => {
        return (
            <div id="results" className="search-results">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
            </div>
        );
    }
    var defchannel = ""


    //if (items.leave_channel != "None") {
    //    defchannel = items.leave_channel

    //}
    const handleClick = () => {
        const body = {"type": props.type,"endpoint":props.endpoint,"message": textAreaValue,"channel": optionsAreaValue,"guild":props.guild}
        axios
        .post("http://localhost:3000/api/welcome", body, {headers: {"token": "Bearer " + getCookie("token")}})
        .then(async (resu) => {
            setMessage(<Checkcomponent />)
        })
        .catch((error) => {
          console.error(error);
        });
    }


    return (
        <div className="columns harlemshake">
            <div className="column">
                <h1 className="sub-header">Leave Message</h1>
                <textarea id="joinmsginput" rows={4} cols={50} maxLength={2000} className="" onChange={(e) => textAreaValue = e.target.value} defaultValue={"items." + props.type + "_message"}></textarea>
                <br /><br />
                <h3 className="smolltitle">List Of Variables</h3>
                <ul>
                    <li className="smolltxt">{"{"}user{"}"}</li>
                    <li className="smolltxt">{"{"}server{"}"}</li>
                    <li className="smolltxt">{"{"}time{"}"}, {"{"}time.gmt{"}"}, {"{"}time.bst{"}"}, {"{"}time.est{"}"}, {"{"}time.utc{"}"}, {"{"}time.sgt{"}"}</li>
                </ul>
            </div>


            <div className="column">

                <div>
                    <br /><br /><br /><br />
                    <button className="button purple is-purple qs center-btn" onClick={() => handleClick()}>Submit</button>
                    <p className="red-p">*To Remove Join Messages Just Remove All Text In The Text Box and Press Submit</p>

                    {message}
                    {message2}


                </div>
            </div >



            <div className="column">
                <h1 className="sub-header">{props.channelText}</h1>
                <div>


                    <div className="selectnew">
                        <select defaultValue={defchannel} className="selectnew2" onChange={e => optionsAreaValue = e.target.selectedOptions[0].value}>
                            <option value="" style={{ background: '#000' }} disabled>Select Your Channel</option>
                            {channels.map(channel => (
                                <option style={{ color: '#cfcfcf', background: '#000' }} value={channel.id} key={channel.id} key-id={channel.id}>
                                    {channel.name}

                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div >
        </div>
    )
}



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
            

            {Object.keys(props.user).length != 0? <WelcomeComponentEntry  channelText="LEave Message" defaultValue="Bye Bye." endpoint="/welcome/leavemessage" type="leave" guild={props.user["db_guild"]["id"]}/> : ""}

    </div>
  );
};

export default Main;
