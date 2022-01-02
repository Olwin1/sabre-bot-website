import e from "express";
import React, { FC, useState, useReducer } from "react";

interface TyProps {
  user: JSON;
}
interface CardProps {
  data: JSON;
}
interface DropProps {
  iter: string;
  children: JSX.Element;
  name: string;
  isNested: boolean;
}
interface DropWrapperProps {
  iter: string;
  name: string;
}
interface TxtProps {
  isSmall: boolean;
  isLocked: boolean;
}

const Dropdown: FC<DropProps> = (props) => {
  const handleClick2 = () => {
    let element = document.getElementById("accordion-" + props.iter);
    if (element.classList.length == 1) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
    // Do Own Panel
    var panel_parent = document.getElementById(element.nextElementSibling.id);
    if (panel_parent.style.maxHeight) {
      panel_parent.style.maxHeight = null;
    } else {
      panel_parent.style.maxHeight = panel_parent.scrollHeight + "px";

      if (!props.isNested) {
        //Do Rest Of Panels
        var panel = document.getElementById(
          element.parentElement.parentElement.id
        );
        var second = document.getElementById(
          document.getElementById(panel.firstElementChild.id).firstElementChild
            .nextElementSibling.id
        );
        var third = document.getElementById(
          second.parentElement.nextElementSibling.firstElementChild
            .nextElementSibling.id
        );
        var fourth = document.getElementById(
          third.parentElement.nextElementSibling.firstElementChild
            .nextElementSibling.id
        );
        var fifth = document.getElementById(
          fourth.parentElement.nextElementSibling.firstElementChild
            .nextElementSibling.id
        );
        var sixth = document.getElementById(
          fifth.parentElement.nextElementSibling.firstElementChild
            .nextElementSibling.id
        );
        panel.style.maxHeight =
          panel.scrollHeight +
          second.scrollHeight +
          third.scrollHeight +
          fourth.scrollHeight +
          fifth.scrollHeight +
          sixth.scrollHeight +
          "px";
        console.log("running " + panel_parent.id.replace("panel-", ""));
      } else {
        let panel = document.getElementById(
          "panel-" + props.iter.split("-")[0]
        );
        panel.style.maxHeight = panel.scrollHeight + "px";
        let temp = parseInt(panel.style.maxHeight) + panel_parent.scrollHeight;
        panel.style.maxHeight = temp + "px";
      }
    }
  };
  return (
    <div id={"div-" + props.iter}>
      <button
        className="accordion"
        id={"accordion-" + props.iter}
        onClick={() => handleClick2()}
      >
        {props.name}
      </button>
      <div className="panel" id={"panel-" + props.iter}>
        {props.children}
      </div>
    </div>
  );
};
const Textbox: FC<TxtProps> = (props) => {
  let classes = "resize general";
  const general = props.isSmall ? " general-2" : "";
  const locked = props.isLocked ? " resize-lock" : "";
  classes += general + locked;
  return (
    <div className="flex">
      <textarea className={classes}></textarea>
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
  const DropdownWrapper: FC<DropWrapperProps> = (props) => {
    const handleClick = () => {
      let element = document.getElementById("accordion-" + props.iter);
      if (element.classList.length == 1) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }

      var panel = document.getElementById(element.nextElementSibling.id);
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        var second = document.getElementById(
          panel.firstElementChild.firstElementChild.nextElementSibling.id
        );

        var third = document.getElementById(
          second.parentElement.nextElementSibling.firstElementChild
            .nextElementSibling.id
        );
        var fourth = document.getElementById(
          third.parentElement.nextElementSibling.firstElementChild
            .nextElementSibling.id
        );
        var fifth = document.getElementById(
          fourth.parentElement.nextElementSibling.firstElementChild
            .nextElementSibling.id
        );
        var sixth = document.getElementById(
          fifth.parentElement.nextElementSibling.firstElementChild
            .nextElementSibling.id
        );
        panel.style.maxHeight =
          panel.scrollHeight +
          second.scrollHeight +
          third.scrollHeight +
          fourth.scrollHeight +
          fifth.scrollHeight +
          sixth.scrollHeight +
          "px";
        console.log(panel.style.maxHeight);
      }
    };
    return (
      <div className="embed-preview">
        <button
          className="accordion"
          id={"accordion-" + props.iter}
          onClick={() => handleClick()}
        >
          {props.name}
        </button>
        <div className="panel" id={"panel-" + props.iter}>
          {/*Here Is The Main Part*/}
          <Dropdown iter="1" name="Author" isNested={false}>
            <div>
              <p>Author</p>
              <Textbox isSmall={true} isLocked={true}></Textbox>
              <div className="columns">
                <div className="column">
                  <p>Author Hyperlink</p>
                  <input className="input-embed" />
                </div>
                <div className="column">
                  <p>Author Icon URL</p>
                  <input className="input-embed" />
                </div>
              </div>
            </div>
          </Dropdown>
          <Dropdown iter="2" name="Body" isNested={false}>
            <div>
              <p>Title</p>
              <input className="input-embed" />
              <p>Description</p>
              <Textbox isSmall={false} isLocked={true}></Textbox>
              <div className="columns">
                <div className="column">
                  <p>Hyperlink</p>
                  <input className="input-embed" />
                </div>
                <div className="column">
                  <p>Embed Colour</p>
                  <input className="input-embed" />
                </div>
              </div>
            </div>
          </Dropdown>
          <Dropdown iter="3" name="Fields" isNested={false}>
            <Fields />
          </Dropdown>
          <Dropdown iter="4" name="Images" isNested={false}>
            <div>Oi m8 Clix Meh</div>
          </Dropdown>
          <Dropdown iter="5" name="Footer" isNested={false}>
            <div>Oi m8 Clix Meh</div>
          </Dropdown>
        </div>
      </div>
    );
  };
  const Fields = () => {
    const [fields, setFields] = useState([{ name: "Field 1", "iter": "3-1" }]);
    const listItems = fields.map((field) => (
      <Dropdown iter={field.iter} name={field.name} isNested={true} key={field.iter}>
      <div>
        <p>Heyo</p>
      </div>
    </Dropdown>

    ));
    const addField = () => {
    const count = fields.length + 1
    let f = { name: "Field "+count, "iter": "3-"+count }
      setFields([...fields,f])
      let element = document.getElementById("accordion-3");
      let panel_parent = document.getElementById(element.nextElementSibling.id)
      let panel = document.getElementById(
        "panel-3"
      );
      panel.style.maxHeight = panel.scrollHeight + "px";
      let temp = parseInt(panel.style.maxHeight) + panel_parent.scrollHeight;
      panel.style.maxHeight = temp + "px";
    }


    return (
      <div>
        {listItems}
        <button className="button is-primary" onClick={()=>addField()}>Add Field</button>
      </div>
    );
  };

  return (
    <div>
      <h1 className="title is-4">Create Message</h1>
      <div className="is-card">
        <Card data={props.user} />
        <br />
        <br />
        <br />
        <br />
        <DropdownWrapper iter="1001" name="Embed"></DropdownWrapper>
      </div>
    </div>
  );
};

export default Main;
