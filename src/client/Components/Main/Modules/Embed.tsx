import React, { FC, useState } from "react";

interface TyProps {
  user: JSON;
}
interface CardProps {
  data: JSON;
}
interface DropProps {
    iter: string;
  }
const Dropdown: FC<DropProps> = (props) => {
    const handleClick = () => {
        let element = document.getElementById("accordion-" + props.iter)
        if (element.classList.length == 1) {
            element.classList.add("active")
        }
        else {
            element.classList.remove("active")
        }

        var panel = document.getElementById(element.nextElementSibling.id);
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
        
    }
  return (
    <div>
      <button className="accordion" id={"accordion-" + props.iter} onClick={() => handleClick()}>Section 1</button>
      <div className="panel" id={"panel-" + props.iter}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
};
const Card: FC<CardProps> = (props) => {
  const Textbox = () => {
    return (
      <div className="flex">
        <textarea className="resize general">
          Hey, welcome to &lt;:discohook:736648398081622016&gt; Discohook! The
          easiest way to build and send Discord messages with embeds using
          webhooks. The embeds below explain a bit more, but you're not required
          to read them. If you're ready, click on the "Clear All" button in the
          editor to start making your own messages. Discohook has [a support
          server](https://discohook.app/discord)! Feel free to join and ask any
          questions you may have, or suggest things you'd like to see. There's
          also [a complementary bot](https://discohook.app/bot), it's completely
          optional but you may want it. _ _
        </textarea>
      </div>
    );
  };
  return (
    <div className="float-left is-padded">
      <Textbox />
    </div>
  );
};

const Main: FC<TyProps> = (props) => {
  return (
    <div>
      <h1 className="title is-4">Create Message</h1>
      <div className="is-card">
        <div className="columns">
          <div className="column">
            <Card data={props.user} />
          </div>
          <div className="column">
            <Dropdown iter="1"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
